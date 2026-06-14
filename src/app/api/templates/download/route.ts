import { readFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getTemplateBySlug, isTemplateComingSoon, isSubscriptionCheckoutEnabled } from '@/data/templateData';
import { canDownloadTemplate, validateLicenseKey } from '@/lib/lemonSqueezy';

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

  const template = getTemplateBySlug(slug);

  if (!template || isTemplateComingSoon(slug)) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  if (!template.zipFileName) {
    return NextResponse.json({ error: 'Download not configured for this template' }, { status: 503 });
  }

  if (template.tier === 'pro') {
    if (!isSubscriptionCheckoutEnabled()) {
      return NextResponse.json(
        { error: 'Pro downloads are not available yet. Check back in a few days.' },
        { status: 503 },
      );
    }

    if (!licenseKey?.trim()) {
      return NextResponse.json({ error: 'License key is required for pro templates' }, { status: 401 });
    }

    const access = await validateLicenseKey(licenseKey);

    if (!access.valid) {
      return NextResponse.json({ error: access.error ?? 'Invalid license key' }, { status: 403 });
    }

    if (!canDownloadTemplate(access)) {
      return NextResponse.json(
        {
          error: 'This license does not include pro templates. Subscribe to DiMaac Pro to download.',
        },
        { status: 403 },
      );
    }
  }

  const zipPath = path.join(process.cwd(), 'private', 'templates', template.zipFileName);

  try {
    const file = await readFile(zipPath);

    return new NextResponse(file, {
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
