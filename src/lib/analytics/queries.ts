import 'server-only';
import { and, gte, sql, eq, desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { analyticsEvents } from '@/db/schema';

/** Aggregations backing the admin dashboard. All return empty when no DB. */

export interface DashboardStats {
  totals: {
    pageViews: number;
    uniques: number;
    templateViews: number;
    componentViews: number;
    downloads: number;
    denied: number;
  };
  daily: { day: string; views: number; downloads: number }[];
  topTemplates: { slug: string; views: number; downloads: number }[];
  topComponents: { slug: string; views: number }[];
  referrers: { host: string; count: number }[];
  devices: { device: string; count: number }[];
}

const EMPTY: DashboardStats = {
  totals: { pageViews: 0, uniques: 0, templateViews: 0, componentViews: 0, downloads: 0, denied: 0 },
  daily: [],
  topTemplates: [],
  topComponents: [],
  referrers: [],
  devices: [],
};

export async function getDashboardStats(days = 30): Promise<DashboardStats> {
  const db = getDb();
  if (!db) return EMPTY;

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const inWindow = gte(analyticsEvents.createdAt, since);

  try {
    const [totalsRow] = await db
      .select({
        pageViews: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'page_view')::int`,
        uniques: sql<number>`count(distinct ${analyticsEvents.sessionHash})::int`,
        templateViews: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'template_view')::int`,
        componentViews: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'component_view')::int`,
        downloads: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'download_success')::int`,
        denied: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'download_denied')::int`,
      })
      .from(analyticsEvents)
      .where(inWindow);

    const daily = await db
      .select({
        day: sql<string>`to_char(date_trunc('day', ${analyticsEvents.createdAt}), 'YYYY-MM-DD')`,
        views: sql<number>`count(*) filter (where ${analyticsEvents.type} in ('page_view','template_view','component_view'))::int`,
        downloads: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'download_success')::int`,
      })
      .from(analyticsEvents)
      .where(inWindow)
      .groupBy(sql`date_trunc('day', ${analyticsEvents.createdAt})`)
      .orderBy(sql`date_trunc('day', ${analyticsEvents.createdAt})`);

    const topTemplates = await db
      .select({
        slug: sql<string>`${analyticsEvents.slug}`,
        views: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'template_view')::int`,
        downloads: sql<number>`count(*) filter (where ${analyticsEvents.type} = 'download_success')::int`,
      })
      .from(analyticsEvents)
      .where(
        and(
          inWindow,
          sql`${analyticsEvents.slug} is not null`,
          sql`${analyticsEvents.type} in ('template_view','download_success')`,
        ),
      )
      .groupBy(analyticsEvents.slug)
      .orderBy(desc(sql`count(*)`))
      .limit(10);

    const topComponents = await db
      .select({
        slug: sql<string>`${analyticsEvents.slug}`,
        views: sql<number>`count(*)::int`,
      })
      .from(analyticsEvents)
      .where(and(inWindow, eq(analyticsEvents.type, 'component_view')))
      .groupBy(analyticsEvents.slug)
      .orderBy(desc(sql`count(*)`))
      .limit(10);

    const referrers = await db
      .select({
        host: sql<string>`${analyticsEvents.referrerHost}`,
        count: sql<number>`count(*)::int`,
      })
      .from(analyticsEvents)
      .where(and(inWindow, sql`${analyticsEvents.referrerHost} is not null`))
      .groupBy(analyticsEvents.referrerHost)
      .orderBy(desc(sql`count(*)`))
      .limit(8);

    const devices = await db
      .select({
        device: sql<string>`coalesce(${analyticsEvents.device}, 'unknown')`,
        count: sql<number>`count(*)::int`,
      })
      .from(analyticsEvents)
      .where(inWindow)
      .groupBy(analyticsEvents.device)
      .orderBy(desc(sql`count(*)`));

    return {
      totals: totalsRow ?? EMPTY.totals,
      daily,
      topTemplates,
      topComponents,
      referrers,
      devices,
    };
  } catch (error) {
    console.error('[analytics] dashboard query failed:', error);
    return EMPTY;
  }
}
