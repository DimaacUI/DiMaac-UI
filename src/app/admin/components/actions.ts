'use server';

import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/auth';
import { requireDb } from '@/db';
import { components } from '@/db/schema';
import { commitFiles, triggerDeploy, isGitHubConfigured, type CommitFile } from '@/lib/github/client';
import { renderComponentRegistry, renderNavRegistry, demoFilePath, toPascalCase } from '@/lib/components/codegen';

/**
 * Publishing a component is a git operation, not a database one.
 *
 * A live React demo has to be compiled, so the portal writes the demo file plus
 * the regenerated registries to GitHub in a single commit and lets Vercel
 * rebuild. The DB row records what was published and the resulting commit.
 */

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
}

const componentSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens only'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  tags: z.array(z.string()).default([]),
  dependencies: z.array(z.string()).default([]),
  cli: z.string().nullable().default(null),
  fullscreen: z.boolean().default(false),
  isNew: z.boolean().default(true),
  navSectionName: z.string().min(1, 'Pick a sidebar section'),
  demoSource: z.string().min(1, 'Demo component source is required'),
  componentSource: z.string().nullable().default(null),
  componentFileName: z.string().nullable().default(null),
  props: z.array(z.unknown()).default([]),
});

export type ComponentInput = z.input<typeof componentSchema>;

export interface PublishResult {
  ok: boolean;
  error?: string;
  commitSha?: string;
  commitUrl?: string;
  deployTriggered?: boolean;
}

/** Sanity-check the demo source before it can break a production build. */
function validateDemoSource(source: string, slug: string): string | null {
  const expected = `${toPascalCase(slug)}Demo`;

  if (!/export\s+default/.test(source)) {
    return `The demo must have a default export (e.g. "export default function ${expected}() { … }").`;
  }
  if (source.includes('process.env') && !source.includes('NEXT_PUBLIC_')) {
    return 'Demo components run in the browser — they cannot read server environment variables.';
  }
  return null;
}

export async function publishComponent(input: ComponentInput): Promise<PublishResult> {
  await requireAdmin();

  const parsed = componentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid component' };
  }

  if (!isGitHubConfigured()) {
    return {
      ok: false,
      error: 'GITHUB_PAT is not set. Add a token with Contents write access to publish components.',
    };
  }

  const data = parsed.data;

  const sourceError = validateDemoSource(data.demoSource, data.slug);
  if (sourceError) return { ok: false, error: sourceError };

  const db = requireDb();
  const category = data.navSectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  try {
    // Record the component first so the registries render with it included.
    const existing = await db
      .select({ id: components.id })
      .from(components)
      .where(eq(components.slug, data.slug))
      .limit(1);

    const demoPath = demoFilePath(data.slug, category);

    const row = {
      slug: data.slug,
      title: data.title,
      description: data.description,
      tags: data.tags,
      dependencies: data.dependencies,
      cli: data.cli,
      fullscreen: data.fullscreen,
      isNew: data.isNew,
      navSectionName: data.navSectionName,
      demoSourcePath: demoPath,
      githubFiles: data.componentFileName
        ? [
            {
              name: data.componentFileName,
              githubPath: `src/components/ui/${data.componentFileName}`,
              displayName: `components/ui/${data.componentFileName}`,
            },
          ]
        : [],
      props: data.props,
      deployStatus: 'publishing',
      updatedAt: new Date(),
    };

    if (existing.length > 0) {
      await db.update(components).set(row).where(eq(components.id, existing[0]!.id));
    } else {
      const [last] = await db
        .select({ sortOrder: components.sortOrder })
        .from(components)
        .orderBy(desc(components.sortOrder))
        .limit(1);
      await db.insert(components).values({ ...row, sortOrder: (last?.sortOrder ?? -1) + 1 });
    }

    const allRows = await db.select().from(components);

    // One commit: the demo, optional source, and both regenerated registries.
    const files: CommitFile[] = [
      { path: demoPath, content: data.demoSource },
      { path: 'src/data/generatedComponents.tsx', content: renderComponentRegistry(allRows) },
      { path: 'src/config/generatedNavigation.ts', content: renderNavRegistry(allRows) },
    ];

    if (data.componentSource && data.componentFileName) {
      files.push({
        path: `src/components/ui/${data.componentFileName}`,
        content: data.componentSource,
      });
    }

    const commit = await commitFiles(
      files,
      `Add ${data.title} component via admin portal\n\nPublished from admin.dimaac.com`,
    );

    const deployTriggered = await triggerDeploy();

    await db
      .update(components)
      .set({
        deployStatus: deployTriggered ? 'deploying' : 'committed',
        deployCommitSha: commit.sha,
        deployError: null,
        publishedAt: new Date(),
      })
      .where(eq(components.slug, data.slug));

    revalidatePath('/admin/components');

    return {
      ok: true,
      commitSha: commit.sha,
      commitUrl: commit.url,
      deployTriggered,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Publish failed';

    await db
      .update(components)
      .set({ deployStatus: 'failed', deployError: message })
      .where(eq(components.slug, data.slug))
      .catch(() => {});

    return { ok: false, error: message };
  }
}

export async function deleteComponent(id: string): Promise<PublishResult> {
  await requireAdmin();

  const db = requireDb();
  await db.delete(components).where(eq(components.id, id));

  if (isGitHubConfigured()) {
    try {
      const allRows = await db.select().from(components);
      await commitFiles(
        [
          { path: 'src/data/generatedComponents.tsx', content: renderComponentRegistry(allRows) },
          { path: 'src/config/generatedNavigation.ts', content: renderNavRegistry(allRows) },
        ],
        'Remove component via admin portal',
      );
      await triggerDeploy();
    } catch (error) {
      return {
        ok: false,
        error: `Removed from the database, but the repo update failed: ${
          error instanceof Error ? error.message : 'unknown error'
        }`,
      };
    }
  }

  revalidatePath('/admin/components');
  return { ok: true };
}
