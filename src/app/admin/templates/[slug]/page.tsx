import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminShell from '@/core/admin/AdminShell';
import TemplateForm from '@/core/admin/TemplateForm';
import { getTemplateRowBySlug } from '@/lib/templates/repository';

export const dynamic = 'force-dynamic';

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const row = await getTemplateRowBySlug(slug);

  if (!row) notFound();

  return (
    <AdminShell>
      <header className="mb-8">
        <Link href="/admin/templates" className="text-sm text-white/50 hover:text-white">
          ← Templates
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold">{row.title}</h1>
          <a
            href={`https://ui.dimaac.com/templates/${row.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#DDFC3E] hover:underline"
          >
            View live ↗
          </a>
        </div>
      </header>
      <TemplateForm existing={row} />
    </AdminShell>
  );
}
