import Link from 'next/link';
import AdminShell from '@/core/admin/AdminShell';
import TemplateList from '@/core/admin/TemplateList';
import { getAllTemplateRows } from '@/lib/templates/repository';
import { isDatabaseConfigured } from '@/db';

export const dynamic = 'force-dynamic';

export default async function AdminTemplatesPage() {
  const rows = await getAllTemplateRows();

  return (
    <AdminShell>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Templates</h1>
          <p className="mt-1 text-sm text-white/50">
            {rows.length} template{rows.length === 1 ? '' : 's'} · changes go live immediately
          </p>
        </div>
        <Link
          href="/admin/templates/new"
          className="rounded-lg bg-[#DDFC3E] px-4 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
        >
          New template
        </Link>
      </header>

      {!isDatabaseConfigured() ? (
        <div className="rounded-xl border border-white/10 bg-[#111114] p-6 text-sm text-white/60">
          <p className="mb-2 font-semibold text-white">No database connected</p>
          <p>
            Set <code className="text-[#DDFC3E]">DATABASE_URL</code> to a Neon connection string.
            Until then the public site keeps serving the templates compiled into the build.
          </p>
        </div>
      ) : (
        <TemplateList rows={rows} />
      )}
    </AdminShell>
  );
}
