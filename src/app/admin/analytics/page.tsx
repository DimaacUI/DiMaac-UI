import Link from 'next/link';
import AdminShell from '@/core/admin/AdminShell';
import StatTile from '@/core/admin/StatTile';
import TrafficChart from '@/core/admin/TrafficChart';
import { getDashboardStats } from '@/lib/analytics/queries';
import { isDatabaseConfigured } from '@/db';

export const dynamic = 'force-dynamic';

const RANGES = [7, 30, 90] as const;

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const { days } = await searchParams;
  const parsed = Number(days);
  const range = RANGES.includes(parsed as (typeof RANGES)[number]) ? parsed : 30;

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell>
        <h1 className="mb-4 text-xl font-bold">Analytics</h1>
        <p className="rounded-xl border border-white/10 bg-[#111114] p-6 text-sm text-white/60">
          Connect <code className="text-[#DDFC3E]">DATABASE_URL</code> to start collecting
          analytics from ui.dimaac.com.
        </p>
      </AdminShell>
    );
  }

  const stats = await getDashboardStats(range);
  const totalViews =
    stats.totals.pageViews + stats.totals.templateViews + stats.totals.componentViews;

  const conversion =
    stats.totals.denied + stats.totals.downloads > 0
      ? Math.round((stats.totals.downloads / (stats.totals.downloads + stats.totals.denied)) * 100)
      : null;

  return (
    <AdminShell>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-xl font-bold">Analytics</h1>
        <div className="flex gap-1 rounded-lg border border-white/10 p-1">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={`/admin/analytics?days=${r}`}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                r === range ? 'bg-white/10 font-semibold text-white' : 'text-white/50'
              }`}
            >
              {r}d
            </Link>
          ))}
        </div>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Unique visitors" value={stats.totals.uniques} />
        <StatTile label="Total views" value={totalViews} />
        <StatTile label="Downloads" value={stats.totals.downloads} />
        <StatTile
          label="Download success rate"
          value={conversion === null ? '—' : `${conversion}%`}
          hint={`${stats.totals.denied} blocked without a license`}
        />
      </div>

      <div className="mb-6">
        <TrafficChart data={stats.daily} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Templates">
          <Table
            head={['Template', 'Views', 'Downloads']}
            rows={stats.topTemplates.map((t) => [t.slug, t.views, t.downloads])}
          />
        </Panel>
        <Panel title="Components">
          <Table
            head={['Component', 'Views']}
            rows={stats.topComponents.map((c) => [c.slug, c.views])}
          />
        </Panel>
        <Panel title="Referrers">
          <Table head={['Source', 'Visits']} rows={stats.referrers.map((r) => [r.host, r.count])} />
        </Panel>
        <Panel title="Devices">
          <Table head={['Device', 'Events']} rows={stats.devices.map((d) => [d.device, d.count])} />
        </Panel>
      </div>
    </AdminShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111114] p-5">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  if (rows.length === 0) return <p className="text-sm text-white/35">Nothing yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-white/40">
            {head.map((h, i) => (
              <th key={h} className={`pb-2 font-medium ${i > 0 ? 'text-right' : ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row[0])} className="border-t border-white/5">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`py-2 ${
                    i > 0 ? 'text-right tabular-nums text-white' : 'max-w-[200px] truncate text-white/80'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
