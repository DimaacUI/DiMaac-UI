import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { recordEvents, isAnalyticsEnabled, type AnalyticsEventType } from '@/lib/analytics/record';

export const runtime = 'nodejs';

const VALID_TYPES = new Set<AnalyticsEventType>([
  'page_view',
  'component_view',
  'template_view',
  'download_start',
  'download_success',
  'download_denied',
  'pro_gate_view',
  'checkout_click',
]);

/**
 * Derives a per-visitor-per-day identifier without storing anything that
 * identifies the visitor: IP + user agent + date, hashed and immediately
 * discarded. It rotates daily, so it can count uniques but can't follow anyone.
 */
function sessionHash(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const ua = request.headers.get('user-agent') ?? 'unknown';
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.AUTH_SECRET ?? 'dimaac';
  return createHash('sha256').update(`${ip}|${ua}|${day}|${salt}`).digest('hex').slice(0, 32);
}

function referrerHost(referrer: unknown): string | null {
  if (typeof referrer !== 'string' || !referrer) return null;
  try {
    return new URL(referrer).hostname;
  } catch {
    return null;
  }
}

function deviceFrom(ua: string | null): string {
  if (!ua) return 'unknown';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
  return 'desktop';
}

export async function POST(request: NextRequest) {
  if (!isAnalyticsEnabled()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let body: { events?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const raw = Array.isArray(body.events) ? body.events : [];
  if (raw.length === 0 || raw.length > 50) {
    return NextResponse.json({ ok: true });
  }

  const hash = sessionHash(request);
  const device = deviceFrom(request.headers.get('user-agent'));
  const country = request.headers.get('x-vercel-ip-country');

  const events = raw
    .filter((e): e is Record<string, unknown> => typeof e === 'object' && e !== null)
    .filter((e) => VALID_TYPES.has(e.type as AnalyticsEventType))
    .map((e) => ({
      type: e.type as AnalyticsEventType,
      path: typeof e.path === 'string' ? e.path : '/',
      slug: typeof e.slug === 'string' ? e.slug : null,
      tier: typeof e.tier === 'string' ? e.tier : null,
      referrerHost: referrerHost(e.referrer),
      country,
      device,
      sessionHash: hash,
      meta: null,
    }));

  await recordEvents(events);

  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
