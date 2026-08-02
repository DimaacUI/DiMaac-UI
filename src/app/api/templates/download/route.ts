import { readFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { isSubscriptionCheckoutEnabled } from '@/data/templateData';
import {
  getTemplateBySlug,
  getTemplateRowBySlug,
  isTemplateComingSoon,
} from '@/lib/templates/repository';
import { canDownloadTemplate, validateLicenseKey } from '@/lib/lemonSqueezy';
import { recordEvent } from '@/lib/analytics/record';

export async function POST(request: NextRequest) {
  let body: { slug?: string; licenseKey?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { slug, licenseKey } = body;

  if (!slug) {
    return NextResponse.json({ error: 'Template slug is required' }, { status: 400 });
  }

  const template = await getTemplateBySlug(slug);

  if (!template || (await isTemplateComingSoon(slug))) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  // Blob is preferred; zipFileName is the legacy on-disk fallback.
  const row = await getTemplateRowBySlug(slug);
  const zipBlobUrl = row?.zipBlobUrl ?? null;

  if (!zipBlobUrl && !template.zipFileName) {
    return NextResponse.json({ error: 'Download not configured for this template' }, { status: 503 });
  }

  if (template.tier === 'pro') {
    if (!isSubscriptionCheckoutEnabled()) {
      return NextResponse.json(
        { error: 'Pro downloads are not available yet. Check back in a few days.' },
        { status: 503 },
      );
    }

    const denied = async (reason: string) => {
      await recordEvent({
        type: 'download_denied',
        path: `/templates/${slug}`,
        slug,
        tier: 'pro',
        meta: { reason },
      });
    };

    if (!licenseKey?.trim()) {
      await denied('missing_license');
      return NextResponse.json({ error: 'License key is required for pro templates' }, { status: 401 });
    }

    const access = await validateLicenseKey(licenseKey);

    if (!access.valid) {
      await denied('invalid_license');
      return NextResponse.json({ error: access.error ?? 'Invalid license key' }, { status: 403 });
    }

    if (!canDownloadTemplate(access)) {
      await denied('no_pro_entitlement');
      return NextResponse.json(
        {
          error: 'This license does not include pro templates. Subscribe to DiMaac Pro to download.',
        },
        { status: 403 },
      );
    }
  }

  const downloadName = template.zipFileName ?? `${slug}.zip`;

  // 1. Blob storage — how templates uploaded through the admin portal are served.
  if (zipBlobUrl) {
    try {
      const upstream = await fetch(zipBlobUrl, { cache: 'no-store' });

      if (upstream.ok && upstream.body) {
        await recordEvent({
          type: 'download_success',
          path: `/templates/${slug}`,
          slug,
          tier: template.tier,
          meta: { source: 'blob' },
        });

        return new NextResponse(upstream.body, {
          status: 200,
          headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="${downloadName}"`,
            'Cache-Control': 'no-store',
          },
        });
      }

      console.error(`[download] blob fetch failed for ${slug}: ${upstream.status}`);
    } catch (error) {
      console.error(`[download] blob fetch threw for ${slug}:`, error);
    }
    // Fall through to disk rather than failing the download outright.
  }

  // 2. On-disk zip in private/templates — the original path, still the fallback.
  if (!template.zipFileName) {
    return NextResponse.json(
      { error: 'Zip file not found on server.' },
      { status: 404 },
    );
  }

  const zipPath = path.join(process.cwd(), 'private', 'templates', template.zipFileName);

  try {
    const file = await readFile(zipPath);

    await recordEvent({
      type: 'download_success',
      path: `/templates/${slug}`,
      slug,
      tier: template.tier,
      meta: { source: 'disk' },
    });

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${template.zipFileName}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          'Zip file not found on server. Upload the template zip to private/templates/ on your deployment.',
      },
      { status: 404 },
    );
  }
}
