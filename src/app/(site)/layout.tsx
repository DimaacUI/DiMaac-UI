import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';
import FullscreenLayoutHandler from '@/core/components/FullscreenLayoutHandler';
import AnalyticsBeacon from '@/core/components/AnalyticsBeacon';

/**
 * Chrome for the public documentation site only.
 *
 * The admin portal deliberately lives outside this group. It used to sit under
 * the root layout, which meant the docs sidebar wrapped the admin shell and you
 * got two navigations — and because the admin host rewrites "/" to "/admin",
 * a pathname check in a client component couldn't reliably tell them apart.
 * Keeping the shells in separate route groups makes that structural.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FullscreenLayoutHandler>{children}</FullscreenLayoutHandler>
      <Analytics />
      <Suspense fallback={null}>
        <AnalyticsBeacon />
      </Suspense>
    </>
  );
}
