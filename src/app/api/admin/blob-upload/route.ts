import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@/auth';
import { isBlobConfigured } from '@/lib/blob';

export const runtime = 'nodejs';

/**
 * Issues short-lived client upload tokens.
 *
 * Files go straight from the browser to Blob storage, so template zips aren't
 * capped by the 4.5 MB serverless request body limit. The session check here is
 * what stops anyone else from getting a token.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not set on the server.' },
      { status: 503 },
    );
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const isZip = pathname.endsWith('.zip');
        return {
          allowedContentTypes: isZip
            ? ['application/zip', 'application/x-zip-compressed', 'application/octet-stream']
            : ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'video/mp4', 'video/webm'],
          maximumSizeInBytes: isZip ? 500 * 1024 * 1024 : 100 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // The admin form persists the returned URL when the template is saved.
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 400 },
    );
  }
}
