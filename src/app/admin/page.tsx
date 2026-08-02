import Link from 'next/link';
import AdminShell from '@/core/admin/AdminShell';
import StatTile from '@/core/admin/StatTile';
import TrafficChart from '@/core/admin/TrafficChart';
import { getDashboardStats } from '@/lib/analytics/queries';
import { getAllTemplateRows } from '@/lib/templates/repository';
import { isDatabaseConfigured } from '@/db';
import { isBlobConfigured } from '@/lib/blob';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const dbReady = isDatabaseConfigured();
  const [stats, templates] = await Promise.all([
    dbReady ? getDashboardStats(30) : null,
    dbReady ? getAllTemplateRows() : [],
  ]);

  const proCount = templates.filter((t) => t.tier === 'pro').length;

  return (
    <AdminShell>
      <header className="mb-8">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-white/50">Last 30 days on ui.dimaac.com</p>
      </header>

      {!dbReady && (
        <div className="mb-8 rounded-xl border border-[#DDFC3E]/25 bg-[#DDFC3E]/5 p-5 text-sm">
          <p className="font-semibold text-[#DDFC3E]">Finish setup</p>
          <p className="mt-2 max-w-xl text-white/70">
            Add <code>DATABASE_URL</code> (Neon) and <code>BLOB_READ_WRITE_TOKEN</code> (Vercel
            Blob), then run <code className="text-[#DDFC3E]">npm run db:push</code> and import your
            existing templates. Until then the public site serves the catalog compiled into the
            build — nothing is broken.
          </p>
          <Link
            href="/admin/templates"
            className="mt-4 inline-block rounded-lg bg-[#DDFC3E] px-4 py-2 text-sm font-bold text-black"
          >
            Go to templates
          </Link>
        </div>
      )}

      {stats && (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Unique visitors" value={stats.totals.uniques} />
            <StatTile
              label="Total views"
              value={stats.totals.pageViews + stats.totals.templateViews + stats.totals.componentViews}
            />
            <StatTile label="Downloads" value={stats.totals.downloads} />
            <StatTile
              label="Blocked pro downloads"
              value={stats.totals.denied}
              hint="No valid license — these are conversion opportunities"
            />
          </div>

          <div className="mb-6">
            <TrafficChart data={stats.daily} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <RankTable
              title="Top templates"
              rows={stats.topTemplates.map((t) => ({
                label: t.slug,
                primary: t.views,
                secondary: t.downloads,
              }))}
              primaryLabel="views"
              secondaryLabel="downloads"
            />
            <RankTable
              title="Top components"
              rows={stats.topComponents.map((c) => ({ label: c.slug, primary: c.views }))}
              primaryLabel="views"
            />
            <RankTable
              title="Referrers"
              rows={stats.referrers.map((r) => ({ label: r.host, primary: r.count }))}
              primaryLabel="visits"
            />
            <RankTable
              title="Devices"
              rows={stats.devices.map((d) => ({ label: d.device, primary: d.count }))}
              primaryLabel="events"
            />
          </div>
        </>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <StatTile label="Templates" value={templates.length} hint={`${proCount} pro`} />
        <StatTile label="Database" value={dbReady ? 'Connected' : 'Not set'} />
        <StatTile label="Blob storage" value={isBlobConfigured() ? 'Connected' : 'Not set'} />
      </div>
    </AdminShell>
  );
}

function RankTable({
  title,
  rows,
  primaryLabel,
  secondaryLabel,
}: {
  title: string;
  rows: { label: string; primary: number; secondary?: number }[];
  primaryLabel: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111114] p-5">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-white/35">Nothing yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-white/40">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 text-right font-medium">{primaryLabel}</th>
                {secondaryLabel && (
                  <th className="pb-2 text-right font-medium">{secondaryLabel}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-white/5">
                  <td className="max-w-[180px] truncate py-2 text-white/80">{row.label}</td>
                  <td className="py-2 text-right tabular-nums text-white">{row.primary}</td>
                  {secondaryLabel && (
                    <td className="py-2 text-right tabular-nums text-white/60">
                      {row.secondary ?? 0}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
