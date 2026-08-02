'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { auth } from '@/auth';
import { requireDb } from '@/db';
import { templates as templatesTable } from '@/db/schema';
import { TEMPLATES_CACHE_TAG } from '@/lib/templates/repository';
import { deleteBlob } from '@/lib/blob';
import { seedTemplates } from '@/lib/templates/seed';

/**
 * Every mutation the templates admin can perform.
 *
 * All of these re-validate the public catalog immediately, which is what makes
 * a template appear on ui.dimaac.com without a rebuild.
 */

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
}

function revalidatePublicCatalog(slug?: string) {
  revalidateTag(TEMPLATES_CACHE_TAG);
  revalidatePath('/templates');
  if (slug) revalidatePath(`/templates/${slug}`);
}

const templateSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens only'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  tier: z.enum(['free', 'pro']),
  stack: z.enum(['html', 'vite', 'nextjs']),
  tags: z.array(z.string()).default([]),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  previewType: z.enum(['live', 'video']),
  previewUrl: z.string().nullable().default(null),
  previewVideoUrl: z.string().nullable().default(null),
  previewRoot: z.string().nullable().default(null),
  fullscreenPreview: z.boolean().default(false),
  zipBlobUrl: z.string().nullable().default(null),
  zipFileName: z.string().nullable().default(null),
  zipSizeBytes: z.number().nullable().default(null),
  comingSoon: z.boolean().default(false),
  isNew: z.boolean().default(false),
  published: z.boolean().default(true),
});

export type TemplateInput = z.input<typeof templateSchema>;

export interface ActionResult {
  ok: boolean;
  error?: string;
  slug?: string;
}

/**
 * A pro template must have something to show people who haven't bought it.
 * Enforced here rather than only in the UI so the rule can't be bypassed.
 */
function validateProPreview(data: z.infer<typeof templateSchema>): string | null {
  if (data.tier !== 'pro' || data.comingSoon) return null;
  if (data.previewType !== 'video') {
    return 'Pro templates must use a video preview — a live preview would expose the paid source.';
  }
  if (!data.previewVideoUrl) {
    return 'Pro templates need a preview video. Upload one before publishing.';
  }
  return null;
}

export async function createTemplate(input: TemplateInput): Promise<ActionResult> {
  await requireAdmin();

  const parsed = templateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid template' };
  }

  const proError = validateProPreview(parsed.data);
  if (proError) return { ok: false, error: proError };

  const db = requireDb();

  const existing = await db
    .select({ id: templatesTable.id })
    .from(templatesTable)
    .where(eq(templatesTable.slug, parsed.data.slug))
    .limit(1);

  if (existing.length > 0) {
    return { ok: false, error: `A template with the slug "${parsed.data.slug}" already exists.` };
  }

  const [last] = await db
    .select({ sortOrder: templatesTable.sortOrder })
    .from(templatesTable)
    .orderBy(desc(templatesTable.sortOrder))
    .limit(1);

  await db.insert(templatesTable).values({
    ...parsed.data,
    sortOrder: (last?.sortOrder ?? -1) + 1,
  });

  revalidatePublicCatalog(parsed.data.slug);
  return { ok: true, slug: parsed.data.slug };
}

export async function updateTemplate(id: string, input: TemplateInput): Promise<ActionResult> {
  await requireAdmin();

  const parsed = templateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid template' };
  }

  const proError = validateProPreview(parsed.data);
  if (proError) return { ok: false, error: proError };

  const db = requireDb();

  await db
    .update(templatesTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(templatesTable.id, id));

  revalidatePublicCatalog(parsed.data.slug);
  return { ok: true, slug: parsed.data.slug };
}

export async function deleteTemplate(id: string): Promise<ActionResult> {
  await requireAdmin();

  const db = requireDb();

  const [row] = await db
    .select()
    .from(templatesTable)
    .where(eq(templatesTable.id, id))
    .limit(1);

  if (!row) return { ok: false, error: 'Template not found' };

  await db.delete(templatesTable).where(eq(templatesTable.id, id));

  // Clean up stored files after the row is gone.
  await Promise.all(
    [row.zipBlobUrl, row.thumbnail, row.previewVideoUrl]
      .filter((url): url is string => Boolean(url?.startsWith('http')))
      .map(deleteBlob),
  );

  revalidatePublicCatalog(row.slug);
  return { ok: true };
}

export async function setTemplatePublished(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();

  const db = requireDb();
  const [row] = await db
    .update(templatesTable)
    .set({ published, updatedAt: new Date() })
    .where(eq(templatesTable.id, id))
    .returning({ slug: templatesTable.slug });

  revalidatePublicCatalog(row?.slug);
  return { ok: true };
}

export async function reorderTemplates(orderedIds: string[]): Promise<ActionResult> {
  await requireAdmin();

  const db = requireDb();

  await Promise.all(
    orderedIds.map((id, index) =>
      db
        .update(templatesTable)
        .set({ sortOrder: index, updatedAt: new Date() })
        .where(eq(templatesTable.id, id)),
    ),
  );

  revalidatePublicCatalog();
  return { ok: true };
}

/** One-click import of the templates that shipped in templateData.ts. */
export async function importStaticTemplates(): Promise<ActionResult & { summary?: string }> {
  await requireAdmin();

  try {
    const result = await seedTemplates();
    revalidatePublicCatalog();
    return {
      ok: true,
      summary: `${result.templatesInserted} added, ${result.templatesUpdated} updated, ${result.zipsUploaded} zips uploaded.`,
    };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Import failed' };
  }
}
