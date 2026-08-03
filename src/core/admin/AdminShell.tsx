'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import DimaacMark from './DimaacMark';

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
      {/* Sticky so the nav stays put on long pages (templates list, analytics).
          Fixed to viewport height with its own overflow, so a long nav scrolls
          inside the sidebar rather than dragging the whole column away. */}
      <aside className="sticky top-0 hidden h-[100dvh] w-[240px] shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-[#0E0E12] p-5 md:flex">
        <div className="mb-8 flex items-center gap-2">
          <Link href="/admin" className="transition-opacity hover:opacity-80">
            <DimaacMark width={104} />
          </Link>
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

      {/* min-w-0 rather than overflow-x-hidden: the latter makes this a scroll
          container, which silently breaks position:sticky on the header below. */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-white/10 bg-[#0B0B0F]/95 px-5 py-3 backdrop-blur md:hidden">
          <Link href="/admin" className="shrink-0">
            <DimaacMark width={88} />
          </Link>
          {/* Scrolls horizontally rather than clipping — five items don't fit on
              a phone, and the last two were previously unreachable. */}
          <nav className="-mx-1 flex min-w-0 flex-1 gap-4 overflow-x-auto px-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap ${
                  isActive(item.href, item.exact) ? 'text-white' : 'text-white/50'
                }`}
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
