export type TemplateTier = 'free' | 'pro';

export type TemplateStack = 'html' | 'vite' | 'nextjs';

/** live = iframe demo (fine for free). video = no full site hosted (better for pro). */
export type TemplatePreviewType = 'live' | 'video';

export interface TemplatePage {
  id: string;
  slug: string;
  title: string;
  description: string;
  tier: TemplateTier;
  stack: TemplateStack;
  tags: string[];
  /** Card thumbnail under /public */
  thumbnail: string;
  /** Live demo URL — use for free templates or optional "open in new tab" for pro */
  previewUrl?: string;
  /** How to preview on the detail page */
  previewType: TemplatePreviewType;
  /** MP4/WebM in /public or YouTube/Vimeo embed URL — recommended for pro templates */
  previewVideoUrl?: string;
  /** Zip filename inside private/templates/ (not committed to git) */
  zipFileName?: string;
  /** Listed in catalog but no detail page, preview, or download yet */
  comingSoon?: boolean;
  isNew?: boolean;
  /** Embed preview full-screen on detail page */
  fullscreenPreview?: boolean;
  /** Subfolder served in dev preview (e.g. dist for Vite builds) */
  previewRoot?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  checkoutUrl: string;
  highlighted?: boolean;
  badge?: string;
}
