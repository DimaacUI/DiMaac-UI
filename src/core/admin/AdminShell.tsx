'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/templates', label: 'Templates' },
  { href: '/admin/components', label: 'Components' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-[100dvh]">
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-white/10 bg-[#0E0E12] p-5 md:flex">
        <div className="mb-8 flex items-center gap-2">
          <span className="text-lg font-bold">DiMaac</span>
          <span className="rounded-full bg-[#DDFC3E] px-2 py-0.5 text-[10px] font-bold text-black">
            ADMIN
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(item.href, item.exact)
                  ? 'bg-white/10 font-semibold text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-2 border-t border-white/10 pt-4">
          <a
            href="https://ui.dimaac.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            View live site ↗
          </a>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/50 transition-colors hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-x-hidden">
        <header className="flex items-center gap-3 border-b border-white/10 px-5 py-3 md:hidden">
          <span className="font-bold">DiMaac Admin</span>
          <nav className="ml-auto flex gap-3 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href, item.exact) ? 'text-white' : 'text-white/50'}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
