import { NextRequest } from 'next/server';
import { canServeLivePreview } from '@/data/templateData';
import { serveTemplatePreview } from '@/lib/templatePreviewServe';

const PREVIEW_PREFIX = '/api/templates/preview';

/** Production live preview — free templates only (source served from private/templates). */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const segments = (await context.params).path ?? [];
  return serveTemplatePreview(segments, PREVIEW_PREFIX, canServeLivePreview);
}
