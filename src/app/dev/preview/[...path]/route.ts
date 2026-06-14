import { NextRequest, NextResponse } from 'next/server';
import { getTemplateBySlug, isTemplateComingSoon } from '@/data/templateData';
import { serveTemplatePreview } from '@/lib/templatePreviewServe';

const PREVIEW_PREFIX = '/dev/preview';

function allowDevPreview(slug: string): boolean {
  const template = getTemplateBySlug(slug);
  return Boolean(template && !isTemplateComingSoon(slug));
}

/** Dev-only: serve any non–coming-soon template from private/templates. */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const segments = (await context.params).path ?? [];
  if (segments.length === 0) {
    return NextResponse.redirect(new URL('/dev/templates', _request.url));
  }

  return serveTemplatePreview(segments, PREVIEW_PREFIX, allowDevPreview);
}
