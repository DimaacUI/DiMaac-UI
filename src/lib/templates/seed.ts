import { readFile, stat } from 'fs/promises';
import path from 'path';
import { eq } from 'drizzle-orm';
import { requireDb } from '@/db';
import { templates as templatesTable, navSections, navItems } from '@/db/schema';
import { templateData } from '@/data/templateData';
import { NAV_SECTIONS } from '@/config/navigation';
import { isPrivateBlobConfigured, uploadBlob } from '@/lib/blob';

/**
 * One-way import of the static catalog into Postgres.
 *
 * Idempotent: existing rows are matched by slug and updated, so running it
 * twice is safe and never duplicates a template. Zips are pushed to Blob when
 * a token is available; otherwise rows keep their zipFileName and the download
 * route continues serving from disk.
 */

export interface SeedResult {
  templatesInserted: number;
  templatesUpdated: number;
  zipsUploaded: number;
  zipsSkipped: string[];
  navSectionsCreated: number;
  navItemsCreated: number;
}

async function uploadZipIfPresent(
  slug: string,
  zipFileName: string | undefined,
): Promise<{ url: string; size: number } | null> {
  if (!zipFileName || !isPrivateBlobConfigured()) return null;

  const zipPath = path.join(process.cwd(), 'private', 'templates', zipFileName);

  try {
    const info = await stat(zipPath);
    if (!info.isFile()) return null;

    const buffer = await readFile(zipPath);
    const uploaded = await uploadBlob('zip', `${slug}.zip`, buffer, 'application/zip');
    return { url: uploaded.url, size: info.size };
  } catch {
    // Pro zips aren't always present locally — that's expected, not an error.
    return null;
  }
}

export async function seedTemplates(options: { uploadZips?: boolean } = {}): Promise<SeedResult> {
  const db = requireDb();
  const uploadZips = options.uploadZips ?? isPrivateBlobConfigured();

  const result: SeedResult = {
    templatesInserted: 0,
    templatesUpdated: 0,
    zipsUploaded: 0,
    zipsSkipped: [],
    navSectionsCreated: 0,
    navItemsCreated: 0,
  };

  const entries = Object.values(templateData);

  for (const [index, template] of entries.entries()) {
    const existing = await db
      .select({ id: templatesTable.id, zipBlobUrl: templatesTable.zipBlobUrl })
      .from(templatesTable)
      .where(eq(templatesTable.slug, template.slug))
      .limit(1);

    let zipBlobUrl = existing[0]?.zipBlobUrl ?? null;
    let zipSizeBytes: number | null = null;

    if (uploadZips && !zipBlobUrl) {
      const uploaded = await uploadZipIfPresent(template.slug, template.zipFileName);
      if (uploaded) {
        zipBlobUrl = uploaded.url;
        zipSizeBytes = uploaded.size;
        result.zipsUploaded += 1;
      } else if (template.zipFileName) {
        result.zipsSkipped.push(template.slug);
      }
    }

    const values = {
      slug: template.slug,
      title: template.title,
      description: template.description,
      tier: template.tier,
      stack: template.stack,
      tags: template.tags,
      thumbnail: template.thumbnail,
      previewType: template.previewType,
      previewUrl: template.previewUrl ?? null,
      previewVideoUrl: template.previewVideoUrl ?? null,
      previewRoot: template.previewRoot ?? null,
      fullscreenPreview: template.fullscreenPreview ?? false,
      zipBlobUrl,
      zipFileName: template.zipFileName ?? null,
      zipSizeBytes,
      comingSoon: template.comingSoon ?? false,
      isNew: template.isNew ?? false,
      published: true,
      sortOrder: index,
      updatedAt: new Date(),
    };

    if (existing.length > 0) {
      await db.update(templatesTable).set(values).where(eq(templatesTable.id, existing[0]!.id));
      result.templatesUpdated += 1;
    } else {
      await db.insert(templatesTable).values(values);
      result.templatesInserted += 1;
    }
  }

  // Sidebar: only seed when empty, so admin reordering is never clobbered.
  const existingSections = await db.select({ id: navSections.id }).from(navSections).limit(1);

  if (existingSections.length === 0) {
    for (const [sectionIndex, section] of NAV_SECTIONS.entries()) {
      const [created] = await db
        .insert(navSections)
        .values({ name: section.name, sortOrder: sectionIndex })
        .returning({ id: navSections.id });

      result.navSectionsCreated += 1;

      for (const [itemIndex, item] of section.item.entries()) {
        await db.insert(navItems).values({
          sectionId: created!.id,
          name: item.name,
          href: item.href,
          isNew: item.isNew ?? false,
          sortOrder: itemIndex,
        });
        result.navItemsCreated += 1;
      }
    }
  }

  return result;
}
