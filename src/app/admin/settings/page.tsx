import AdminShell from '@/core/admin/AdminShell';
import { isDatabaseConfigured } from '@/db';
import { isBlobConfigured } from '@/lib/blob';
import { isGitHubConfigured } from '@/lib/github/client';
import { adminHost } from '@/lib/admin/config';

export const dynamic = 'force-dynamic';

interface Check {
  label: string;
  ok: boolean;
  detail: string;
}

export default function AdminSettingsPage() {
  const checks: Check[] = [
    {
      label: 'Database (Neon)',
      ok: isDatabaseConfigured(),
      detail: isDatabaseConfigured()
        ? 'Templates are served from Postgres.'
        : 'DATABASE_URL not set — the public site is serving the catalog compiled into the build.',
    },
    {
      label: 'Blob storage',
      ok: isBlobConfigured(),
      detail: isBlobConfigured()
        ? 'Uploads go straight from your browser to Blob.'
        : 'BLOB_READ_WRITE_TOKEN not set — downloads fall back to zips on disk.',
    },
    {
      label: 'Component publishing',
      ok: isGitHubConfigured(),
      detail: isGitHubConfigured()
        ? 'Commits are pushed to DimaacUI/DiMaac-UI.'
        : 'GITHUB_PAT not set — components can only be added by editing the repo.',
    },
    {
      label: 'Deploy hook',
      ok: Boolean(process.env.VERCEL_DEPLOY_HOOK_URL),
      detail: process.env.VERCEL_DEPLOY_HOOK_URL
        ? 'Publishing a component triggers a build automatically.'
        : 'VERCEL_DEPLOY_HOOK_URL not set — you would need to redeploy manually.',
    },
    {
      label: 'Pro checkout (Lemon Squeezy)',
      ok: Boolean(
        process.env.LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID ??
          process.env.LEMONSQUEEZY_SUBSCRIPTION_VARIANT_IDS,
      ),
      detail: 'Controls which licenses unlock pro template downloads.',
    },
  ];

  return (
    <AdminShell>
      <header className="mb-8">
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-white/50">
          Portal served from <code className="text-[#DDFC3E]">{adminHost()}</code>
        </p>
      </header>

      <div className="max-w-2xl space-y-2">
        {checks.map((check) => (
          <div
            key={check.label}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#111114] p-4"
          >
            <span
              className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                check.ok ? 'bg-[#DDFC3E]' : 'bg-white/25'
              }`}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {check.label}{' '}
                <span className={check.ok ? 'text-[#DDFC3E]' : 'text-white/40'}>
                  {check.ok ? 'connected' : 'not set'}
                </span>
              </p>
              <p className="mt-1 text-sm text-white/50">{check.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-2xl rounded-xl border border-white/10 bg-[#111114] p-5 text-sm text-white/60">
        <p className="mb-2 font-semibold text-white">Changing your password</p>
        <p className="leading-relaxed">
          Run{' '}
          <code className="text-[#DDFC3E]">npm run admin:hash -- &apos;new-password&apos;</code> and
          replace <code>ADMIN_PASSWORD_HASH</code> in your Vercel environment variables. The
          plaintext password is never stored.
        </p>
      </div>
    </AdminShell>
  );
}
