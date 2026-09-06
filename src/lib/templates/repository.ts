import { unstable_cache } from 'next/cache';
import { asc, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { templates as templatesTable, type TemplateRow } from '@/db/schema';
import type { TemplatePage, TemplatePreviewType, TemplateStack, TemplateTier } from '@/types/templates';
import { templateData } from '@/data/templateData';

/**
 * Single read path for template data.
 *
 * With DATABASE_URL set, templates come from Postgres and the admin portal can
 * change them without a rebuild. Without it — or if the query fails — we fall
 * back to the static templateData.ts that shipped with the build, so the public
 * site can never go down because of a database problem.
 */

export const TEMPLATES_CACHE_TAG = 'templates';

function rowToTemplatePage(row: TemplateRow): TemplatePage {
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    description: row.description,
    tier: row.tier as TemplateTier,
    stack: row.stack as TemplateStack,
    tags: row.tags ?? [],
    thumbnail: row.thumbnail,
    previewType: row.previewType as TemplatePreviewType,
    ...(row.previewUrl ? { previewUrl: row.previewUrl } : {}),
    ...(row.previewVideoUrl ? { previewVideoUrl: row.previewVideoUrl } : {}),
    ...(row.previewRoot ? { previewRoot: row.previewRoot } : {}),
    ...(row.zipFileName ? { zipFileName: row.zipFileName } : {}),
    ...(row.comingSoon ? { comingSoon: true } : {}),
    ...(row.isNew ? { isNew: true } : {}),
    ...(row.fullscreenPreview ? { fullscreenPreview: true } : {}),
  };
}

/** Static snapshot compiled into the build — the safety net. */
function staticTemplates(): TemplatePage[] {
  return Object.values(templateData);
}

const loadFromDb = unstable_cache(
  async (): Promise<TemplatePage[] | null> => {
    const db = getDb();
    if (!db) return null;

    const rows = await db
      .select()
      .from(templatesTable)
      .where(eq(templatesTable.published, true))
      .orderBy(asc(templatesTable.sortOrder), asc(templatesTable.createdAt));

    // An empty table means "not seeded yet" — prefer the static data over
    // showing an empty catalog.
    if (rows.length === 0) return null;

    return rows.map(rowToTemplatePage);
  },
  ['templates:all'],
  { tags: [TEMPLATES_CACHE_TAG], revalidate: 300 },
);

/**
 * Any static template the database doesn't know yet, followed by the database
 * rows. Templates shipped in the repo (thumbnail, preview video and zip all
 * committed) therefore appear as soon as the deploy lands, and `npm run
 * db:seed` can import them into the admin portal later without a gap.
 */
export async function getAllTemplates(): Promise<TemplatePage[]> {
  let fromDb: TemplatePage[] | null = null;
  try {
    fromDb = await loadFromDb();
  } catch (error) {
    console.error('[templates] database read failed, using static data:', error);
  }
  if (!fromDb) return staticTemplates();
  // Repo-shipped launches lead the catalog until they are seeded and ordered in the admin.
  const known = new Set(fromDb.map((t) => t.slug));
  return [...staticTemplates().filter((t) => !known.has(t.slug)), ...fromDb];
}

/** Available first, coming-soon grouped at the bottom. */
export async function getCatalogTemplates(): Promise<TemplatePage[]> {
  const all = await getAllTemplates();
  return [...all.filter((t) => !t.comingSoon), ...all.filter((t) => t.comingSoon)];
}

export async function getTemplateBySlug(slug: string): Promise<TemplatePage | undefined> {
  const all = await getAllTemplates();
  return all.find((template) => template.slug === slug);
}

export async function isTemplateComingSoon(slug: string): Promise<boolean> {
  return (await getTemplateBySlug(slug))?.comingSoon === true;
}

export async function isTemplateFullscreen(slug: string): Promise<boolean> {
  return (await getTemplateBySlug(slug))?.fullscreenPreview === true;
}

/**
 * Templates that can be served live in production.
 *
 * Free templates serve from their folder as-is. Pro templates only qualify when
 * previewRoot is set, which scopes the preview to built output (out/, dist/) —
 * so a paid template's source is never reachable through the preview route.
 */
export async function canServeLivePreview(slug: string): Promise<boolean> {
  const template = await getTemplateBySlug(slug);
  if (!template || template.comingSoon || template.previewType !== 'live') return false;
  if (template.tier === 'free') return true;
  return Boolean(template.previewRoot);
}

/** Live iframe URL — generated from the slug, no manual URL needed. */
export async function getTemplateLivePreviewUrl(slug: string): Promise<string | undefined> {
  if (!(await canServeLivePreview(slug))) return undefined;
  return `/api/templates/preview/${slug}`;
}

/** Dev-only live preview URL for any non–coming-soon template. */
export async function getDevTemplatePreviewUrl(slug: string): Promise<string | undefined> {
  if (process.env.NODE_ENV !== 'development') return undefined;
  const template = await getTemplateBySlug(slug);
  if (!template || template.comingSoon) return undefined;
  return `/dev/preview/${slug}`;
}

/** Shell command to run a framework template locally. */
export async function getDevTemplateRunCommand(slug: string): Promise<string | undefined> {
  const template = await getTemplateBySlug(slug);
  if (!template || template.comingSoon) return undefined;
  if (template.stack === 'nextjs' || template.stack === 'vite') {
    return `cd private/templates/${slug} && npm install && npm run dev`;
  }
  return `cd private/templates/${slug} && npx serve .`;
}

/** Admin-side read: every template including unpublished, newest ordering intact. */
export async function getAllTemplateRows(): Promise<TemplateRow[]> {
  const db = getDb();
  if (!db) return [];
  return db
    .select()
    .from(templatesTable)
    .orderBy(asc(templatesTable.sortOrder), asc(templatesTable.createdAt));
}

export async function getTemplateRowBySlug(slug: string): Promise<TemplateRow | undefined> {
  const db = getDb();
  if (!db) return undefined;
  const [row] = await db
    .select()
    .from(templatesTable)
    .where(eq(templatesTable.slug, slug))
    .limit(1);
  return row;
}
