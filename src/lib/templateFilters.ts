import { TemplatePage } from '@/types/templates';

export type TemplateTierFilter = 'all' | 'free' | 'pro';

export function parseTierFilter(searchParams: URLSearchParams): TemplateTierFilter {
  const tier = searchParams.get('tier');
  return tier === 'free' || tier === 'pro' ? tier : 'all';
}

export function buildTemplatesFilterUrl(tier: TemplateTierFilter): string {
  return tier === 'all' ? '/templates' : `/templates?tier=${tier}`;
}

export function filterTemplatesByTier(
  templates: TemplatePage[],
  tier: TemplateTierFilter,
): TemplatePage[] {
  if (tier === 'all') return templates;
  return templates.filter((template) => template.tier === tier);
}
