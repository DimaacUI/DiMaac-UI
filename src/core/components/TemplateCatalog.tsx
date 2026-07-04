'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import TemplateGrid from '@/core/components/TemplateGrid';
import {
  buildTemplatesFilterUrl,
  filterTemplatesByTier,
  parseTierFilter,
  TemplateTierFilter,
} from '@/lib/templateFilters';
import { cn } from '@/lib/utils';
import { TemplatePage } from '@/types/templates';

interface TemplateCatalogProps {
  templates: TemplatePage[];
}

const TIER_OPTIONS: { value: TemplateTierFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Paid' },
];

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
        active
          ? 'border-[#DDFC3E] bg-[#DDFC3E]/15 text-[#DDFC3E]'
          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white',
      )}
    >
      {label}
    </button>
  );
}

const TemplateCatalog = ({ templates }: TemplateCatalogProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tier = useMemo(() => parseTierFilter(searchParams), [searchParams]);
  const filteredTemplates = useMemo(
    () => filterTemplatesByTier(templates, tier),
    [templates, tier],
  );

  const setTier = useCallback(
    (next: TemplateTierFilter) => {
      router.push(buildTemplatesFilterUrl(next), { scroll: false });
    },
    [router],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TIER_OPTIONS.map(({ value, label }) => (
          <FilterChip
            key={value}
            label={label}
            active={tier === value}
            onClick={() => setTier(value)}
          />
        ))}
      </div>

      <TemplateGrid templates={filteredTemplates} />
    </div>
  );
};

export default TemplateCatalog;
