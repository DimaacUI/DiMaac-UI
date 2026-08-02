import Link from 'next/link';
import { desc } from 'drizzle-orm';
import AdminShell from '@/core/admin/AdminShell';
import { getDb, isDatabaseConfigured } from '@/db';
import { components } from '@/db/schema';
import { isGitHubConfigured } from '@/lib/github/client';
import { componentData } from '@/data/componentData';

export const dynamic = 'force-dynamic';

const STATUS_STYLE: Record<string, string> = {
  deploying: 'bg-[#DDFC3E]/15 text-[#DDFC3E]',
  committed: 'bg-white/10 text-white/70',
  failed: 'bg-red-500/15 text-red-300',
  draft: 'bg-white/5 text-white/40',
};

export default async function AdminComponentsPage() {
  const db = getDb();
  const rows = db
    ? await db.select().from(components).orderBy(desc(components.updatedAt))
    : [];

  const builtInCount = Object.keys(componentData).length - rows.length;

  return (
    <AdminShell>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Components</h1>
          <p className="mt-1 text-sm text-white/50">
            {rows.length} published here · {Math.max(builtInCount, 0)} built into the repo
          </p>
        </div>
        <Link
          href="/admin/components/new"
          className="rounded-lg bg-[#DDFC3E] px-4 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
        >
          New component
        </Link>
      </header>

      <div className="mb-6 rounded-xl border border-white/10 bg-[#111114] p-5 text-sm text-white/60">
        <p className="mb-2 font-semibold text-white">How this differs from templates</p>
        <p className="max-w-2xl leading-relaxed">
          A component page renders a real, compiled React demo, so it can&apos;t be added at
          runtime the way a template can. Publishing here commits the files to your repo and
          triggers a Vercel build — live in a minute or two rather than instantly.
        </p>
        {!isGitHubConfigured() && (
          <p className="mt-3 text-[#DDFC3E]">
            Set <code>GITHUB_PAT</code> and <code>VERCEL_DEPLOY_HOOK_URL</code> to enable
            publishing.
          </p>
        )}
      </div>

      {!isDatabaseConfigured() ? (
        <p className="rounded-xl border border-white/10 bg-[#111114] p-6 text-sm text-white/60">
          Connect <code className="text-[#DDFC3E]">DATABASE_URL</code> to track published
          components.
        </p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-[#111114] p-6 text-sm text-white/60">
          Nothing published through the portal yet. Your existing components stay exactly where
          they are.
        </p>
      ) : (
        <div className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-[#111114] p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{row.title}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      STATUS_STYLE[row.deployStatus] ?? STATUS_STYLE.draft
                    }`}
                  >
                    {row.deployStatus}
                  </span>
                </div>
                <p className="truncate text-xs text-white/40">
                  /components/{row.slug} · {row.navSectionName}
                </p>
                {row.deployError && (
                  <p className="mt-1 text-xs text-red-300">{row.deployError}</p>
                )}
              </div>

              {row.deployCommitSha && (
                <a
                  href={`https://github.com/${process.env.GITHUB_OWNER ?? 'DimaacUI'}/${
                    process.env.GITHUB_REPO ?? 'DiMaac-UI'
                  }/commit/${row.deployCommitSha}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white/40 hover:text-white"
                >
                  {row.deployCommitSha.slice(0, 7)} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
