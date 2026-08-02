'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Records a page view on every route change.
 *
 * Fires after paint and uses sendBeacon where available, so it never competes
 * with rendering. Any failure is swallowed — analytics must not be able to
 * affect the visitor's experience.
 */
export default function AnalyticsBeacon() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === '0') return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const componentMatch = pathname.match(/^\/components\/([^/]+)$/);
    const templateMatch = pathname.match(/^\/templates\/([^/]+)$/);

    const type = componentMatch
      ? 'component_view'
      : templateMatch && templateMatch[1] !== 'pricing'
        ? 'template_view'
        : 'page_view';

    const payload = JSON.stringify({
      events: [
        {
          type,
          path: pathname,
          slug: componentMatch?.[1] ?? templateMatch?.[1] ?? null,
          referrer: document.referrer || null,
        },
      ],
    });

    const send = () => {
      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/analytics', new Blob([payload], { type: 'application/json' }));
        } else {
          void fetch('/api/analytics', {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // Never surface analytics errors.
      }
    };

    const id = window.requestIdleCallback?.(send) ?? window.setTimeout(send, 400);
    return () => {
      window.cancelIdleCallback?.(id as number);
      window.clearTimeout(id as number);
    };
  }, [pathname]);

  return null;
}
