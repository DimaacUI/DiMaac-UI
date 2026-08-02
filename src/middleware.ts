import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { isAdminConfigured, isAdminRequestHost } from '@/lib/admin/config';

const { auth } = NextAuth(authConfig);

const PUBLIC_ADMIN_PATHS = ['/admin/login'];

/**
 * Handles two things:
 *   1. The original /dev/template-preview → /dev/preview redirect.
 *   2. Admin routing: admin.dimaac.com serves /admin/*, and /admin is
 *      unreachable from the public site.
 *
 * The public site takes the earliest possible exit so this adds no meaningful
 * work to normal page loads.
 */
export default auth((request) => {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host');
  const onAdminHost = isAdminRequestHost(host);

  // --- 1. Legacy preview redirect (unchanged behaviour) ---------------------
  if (pathname.startsWith('/dev/template-preview/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/dev/template-preview/', '/dev/preview/');
    return NextResponse.redirect(url, 307);
  }

  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAdminApi = pathname.startsWith('/api/admin/');

  // Locally there's no admin subdomain, so /admin on localhost is the portal.
  const devAdminAccess = process.env.NODE_ENV === 'development' && (isAdminPath || isAdminApi);

  // --- 2. Public host: /admin does not exist here ---------------------------
  if (!onAdminHost && !devAdminAccess) {
    if (isAdminPath || isAdminApi) {
      return NextResponse.rewrite(new URL('/404', request.nextUrl.origin));
    }
    return NextResponse.next();
  }

  // --- 3. Admin host --------------------------------------------------------
  // Turned off entirely until the secrets are configured.
  if (!isAdminConfigured()) {
    return new NextResponse(
      'Admin portal is not configured. Set AUTH_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD_HASH.',
      { status: 503, headers: { 'Content-Type': 'text/plain' } },
    );
  }

  // Auth.js endpoints must stay reachable for sign-in to work.
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // On the admin subdomain the root path is the dashboard.
  if (onAdminHost && !isAdminPath && !isAdminApi) {
    const url = request.nextUrl.clone();
    url.pathname = `/admin${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  const isLoggedIn = Boolean(request.auth);
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p));

  if (!isLoggedIn && !isPublicAdminPath) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // Already signed in — skip the login screen.
  if (isLoggedIn && isPublicAdminPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  // Everything except static assets and image optimisation.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|mp4|webm|ico|woff|woff2|ttf|otf)$).*)'],
};
