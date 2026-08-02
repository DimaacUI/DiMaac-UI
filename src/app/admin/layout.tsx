import type { Metadata } from 'next';
import { isAdminConfigured } from '@/lib/admin/config';

export const metadata: Metadata = {
  title: 'DiMaac Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminConfigured()) {
    return (
      <div className="min-h-[100dvh] bg-[#0B0B0F] text-white flex items-center justify-center p-8">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-xl font-bold">Admin portal not configured</h1>
          <p className="text-sm text-white/60 leading-relaxed">
            Set <code className="text-[#DDFC3E]">AUTH_SECRET</code>,{' '}
            <code className="text-[#DDFC3E]">ADMIN_EMAIL</code> and{' '}
            <code className="text-[#DDFC3E]">ADMIN_PASSWORD_HASH</code> in your environment, then
            redeploy.
          </p>
        </div>
      </div>
    );
  }

  return <div className="min-h-[100dvh] bg-[#0B0B0F] text-white">{children}</div>;
}
