'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarProCtaProps {
  className?: string;
  onClick?: () => void;
}

const SidebarProCta = ({ className, onClick }: SidebarProCtaProps) => {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 pt-3 mt-3 mb-3 mr-2 pr-1 pb-3 border-t border-white/10 bg-black',
        className,
      )}
    >
      <Link
        href="/templates/pricing"
        onClick={onClick}
        className="flex items-center justify-between gap-2 w-full rounded-lg bg-[#DDFC3E] text-black px-3.5 py-2.5 hover:opacity-90 transition-opacity"
      >
        <span className="text-[13px] font-bold leading-tight">DiMaac Pro</span>
        <span className="text-xs font-semibold text-black/70 leading-tight">Get all templates →</span>
      </Link>
    </div>
  );
};

export default SidebarProCta;
