import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isBlobConfigured } from '@/lib/blob';

export const runtime = 'nodejs';

/**
 * Disk-backed upload for local development only.
 *
 * Blob client uploads finish with a server-to-server callback that Vercel makes
 * to this app, which can never reach localhost — so uploads cannot complete in
 * local dev even with tokens set. This writes the file under public/uploads
 * instead, so the admin form is exercisable end to end without Blob.
 *
 * Refuses to run in production, or whenever Blob is properly configured.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (process.env.NODE_ENV === 'production' || isBlobConfigured()) {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // keep both parts free of separators so nothing escapes public/uploads
  const folder = String(form.get('folder') ?? 'misc').replace(/[^a-zA-Z0-9/_-]/g, '');
  const safeFolder = folder.split('/').filter((s) => s && s !== '.' && s !== '..').join('/');
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;

  const dir = path.join(process.cwd(), 'public', 'uploads', safeFolder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safeName), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({
    url: `/uploads/${safeFolder}/${safeName}`,
    pathname: `${safeFolder}/${safeName}`,
    local: true,
  });
}
