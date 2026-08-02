import { put, del, get } from '@vercel/blob';

/**
 * Two Blob stores, deliberately split by who is allowed to read.
 *
 *   PRIVATE (BLOB_READ_WRITE_TOKEN)        — template zips. Reads require the
 *     token, so a leaked URL is useless. The download route streams these
 *     server-side only after the Lemon Squeezy licence check passes.
 *
 *   PUBLIC  (BLOB_PUBLIC_READ_WRITE_TOKEN) — thumbnails and preview videos.
 *     These are rendered by <img>/<video> straight from their URL, so they
 *     have to be world-readable. Nothing paid ever goes here.
 *
 * Both are optional: with neither token set, uploads are disabled and the
 * download route falls back to reading zips from private/templates/ on disk.
 */

export type BlobKind = 'zip' | 'thumbnail' | 'preview';

/** Zips are the only paid asset, so they're the only private one. */
export function isPrivateKind(kind: BlobKind): boolean {
  return kind === 'zip';
}

export function accessFor(kind: BlobKind): 'public' | 'private' {
  return isPrivateKind(kind) ? 'private' : 'public';
}

export function tokenFor(kind: BlobKind): string | undefined {
  return isPrivateKind(kind)
    ? process.env.BLOB_READ_WRITE_TOKEN
    : process.env.BLOB_PUBLIC_READ_WRITE_TOKEN;
}

export function isPrivateBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function isPublicBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_PUBLIC_READ_WRITE_TOKEN);
}

/** True only when both stores are available — the admin needs both to publish. */
export function isBlobConfigured(): boolean {
  return isPrivateBlobConfigured() && isPublicBlobConfigured();
}

const FOLDER: Record<BlobKind, string> = {
  zip: 'templates/zips',
  thumbnail: 'templates/thumbnails',
  preview: 'templates/previews',
};

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
  const token = tokenFor(kind);
  if (!token) {
    throw new Error(
      `Blob storage for "${kind}" is not configured. Set ${
        isPrivateKind(kind) ? 'BLOB_READ_WRITE_TOKEN' : 'BLOB_PUBLIC_READ_WRITE_TOKEN'
      }.`,
    );
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '-');

  const result = await put(`${FOLDER[kind]}/${safeName}`, data, {
    access: accessFor(kind),
    addRandomSuffix: true,
    token,
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

/**
 * Reads a private zip. Returns a stream so a large template never has to be
 * buffered in a serverless function's memory.
 */
export async function getPrivateBlobStream(
  urlOrPathname: string,
): Promise<{ stream: ReadableStream; size?: number } | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;

  const result = await get(urlOrPathname, { access: 'private', token });
  if (!result?.stream) return null;

  return { stream: result.stream, size: result.blob?.size ?? undefined };
}

export async function deleteBlob(url: string, kind: BlobKind = 'zip'): Promise<void> {
  const token = tokenFor(kind);
  if (!token || !url.startsWith('http')) return;

  try {
    await del(url, { token });
  } catch (error) {
    // A missing blob shouldn't block deleting the template row.
    console.error('[blob] delete failed:', error);
  }
}
