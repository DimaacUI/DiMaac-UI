import { NextRequest, NextResponse } from 'next/server';

/** One-time migration from old preview path (avoids stale redirect cache in browsers). */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dev/template-preview/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/dev/template-preview/', '/dev/preview/');
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dev/template-preview/:path*'],
};
