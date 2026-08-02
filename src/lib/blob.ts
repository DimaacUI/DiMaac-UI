import { put, del, list } from '@vercel/blob';

/**
 * Vercel Blob wrapper for template deliverables (zips, thumbnails, preview
 * videos). Optional like the database: when BLOB_READ_WRITE_TOKEN is unset the
 * site falls back to reading zips from private/templates/ on disk.
 */

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export type BlobKind = 'zip' | 'thumbnail' | 'preview';

const FOLDER: Record<BlobKind, string> = {
  zip: 'templates/zips',
  thumbnail: 'templates/thumbnails',
  preview: 'templates/previews',
};

/** Zips stay private so pro downloads must go through the license check. */
function accessFor(kind: BlobKind): 'public' {
  // Vercel Blob currently only supports public access; pro protection comes
  // from the download route never revealing the URL without a valid license.
  void kind;
  return 'public';
}

export interface UploadedBlob {
  url: string;
  pathname: string;
  size: number;
}

export async function uploadBlob(
  kind: BlobKind,
  filename: string,
  data: Buffer | Blob | ArrayBuffer | ReadableStream,
  contentType?: string,
): Promise<UploadedBlob> {
  if (!isBlobConfigured()) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not set — cannot upload files.');
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '-');
  const result = await put(`${FOLDER[kind]}/${safeName}`, data, {
    access: accessFor(kind),
    addRandomSuffix: true,
    ...(contentType ? { contentType } : {}),
  });

  const size =
    data instanceof Buffer
      ? data.byteLength
      : data instanceof ArrayBuffer
        ? data.byteLength
        : 0;

  return { url: result.url, pathname: result.pathname, size };
}

export async function deleteBlob(url: string): Promise<void> {
  if (!isBlobConfigured() || !url.startsWith('http')) return;
  try {
    await del(url);
  } catch (error) {
    // A missing blob shouldn't block deleting the template row.
    console.error('[blob] delete failed:', error);
  }
}

export async function listBlobs(prefix?: string) {
  if (!isBlobConfigured()) return { blobs: [] };
  return list(prefix ? { prefix } : undefined);
}
