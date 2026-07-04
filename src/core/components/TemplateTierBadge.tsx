import { cn } from '@/lib/utils';
import { TemplateTier } from '@/types/templates';

interface TemplateTierBadgeProps {
  tier: TemplateTier;
  className?: string;
}

export function TemplateTierBadge({ tier, className }: TemplateTierBadgeProps) {
  if (tier === 'free') {
    return (
      <span
        className={cn(
          'text-xs font-bold text-black bg-white px-3 py-1 rounded-full',
          className,
        )}
      >
        Free
      </span>
    );
  }

  return (
    <span
      className={cn(
        'text-xs font-bold text-white bg-violet-500 px-3 py-1 rounded-full',
        className,
      )}
    >
      Pro
    </span>
  );
}

export function TemplateNewBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'text-xs font-bold text-black bg-[#DDFC3E] px-3 py-1 rounded-full',
        className,
      )}
    >
      New
    </span>
  );
}
