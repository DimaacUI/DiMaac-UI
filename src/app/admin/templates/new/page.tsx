import Link from 'next/link';
import AdminShell from '@/core/admin/AdminShell';
import TemplateForm from '@/core/admin/TemplateForm';

export const dynamic = 'force-dynamic';

export default function NewTemplatePage() {
  return (
    <AdminShell>
      <header className="mb-8">
        <Link href="/admin/templates" className="text-sm text-white/50 hover:text-white">
          ← Templates
        </Link>
        <h1 className="mt-3 text-xl font-bold">New template</h1>
      </header>
      <TemplateForm />
    </AdminShell>
  );
}
