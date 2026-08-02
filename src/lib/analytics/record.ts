import 'server-only';
import { getDb } from '@/db';
import { analyticsEvents } from '@/db/schema';

/**
 * Server-side analytics writer.
 *
 * Every call is best-effort and swallows its own errors: analytics must never
 * break a page render or block a template download. No-ops entirely when the
 * database isn't configured.
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'component_view'
  | 'template_view'
  | 'download_start'
  | 'download_success'
  | 'download_denied'
  | 'pro_gate_view'
  | 'checkout_click';

export interface AnalyticsEventInput {
  type: AnalyticsEventType;
  path: string;
  slug?: string | null;
  tier?: string | null;
  referrerHost?: string | null;
  country?: string | null;
  device?: string | null;
  sessionHash?: string | null;
  meta?: Record<string, unknown> | null;
}

export function isAnalyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== '0' && Boolean(process.env.DATABASE_URL);
}

export async function recordEvent(event: AnalyticsEventInput): Promise<void> {
  if (!isAnalyticsEnabled()) return;

  const db = getDb();
  if (!db) return;

  try {
    await db.insert(analyticsEvents).values({
      type: event.type,
      path: event.path.slice(0, 512),
      slug: event.slug ?? null,
      tier: event.tier ?? null,
      referrerHost: event.referrerHost ?? null,
      country: event.country ?? null,
      device: event.device ?? null,
      sessionHash: event.sessionHash ?? null,
      meta: event.meta ?? null,
    });
  } catch (error) {
    console.error('[analytics] failed to record event:', error);
  }
}

export async function recordEvents(events: AnalyticsEventInput[]): Promise<void> {
  if (!isAnalyticsEnabled() || events.length === 0) return;

  const db = getDb();
  if (!db) return;

  try {
    await db.insert(analyticsEvents).values(
      events.map((event) => ({
        type: event.type,
        path: event.path.slice(0, 512),
        slug: event.slug ?? null,
        tier: event.tier ?? null,
        referrerHost: event.referrerHost ?? null,
        country: event.country ?? null,
        device: event.device ?? null,
        sessionHash: event.sessionHash ?? null,
        meta: event.meta ?? null,
      })),
    );
  } catch (error) {
    console.error('[analytics] failed to record events:', error);
  }
}
