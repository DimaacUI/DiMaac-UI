import Link from 'next/link';
import AdminShell from '@/core/admin/AdminShell';
import ComponentPublishForm from '@/core/admin/ComponentPublishForm';

export const dynamic = 'force-dynamic';

export default function NewComponentPage() {
  return (
    <AdminShell>
      <header className="mb-8">
        <Link href="/admin/components" className="text-sm text-white/50 hover:text-white">
          ← Components
        </Link>
        <h1 className="mt-3 text-xl font-bold">New component</h1>
      </header>
      <ComponentPublishForm />
    </AdminShell>
  );
}
