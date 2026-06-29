import { SubscriptionPlan, TemplatePage } from '@/types/templates';

/**
 * Template source lives in private/templates/{slug}/ (index.html, styles.css, main.js, README.md).
 * Zip each folder for download: private/templates/{slug}.zip
 */
export const templateData: Record<string, TemplatePage> = {
  minimal: {
    id: 'minimal',
    slug: 'minimal',
    title: 'Quiet',
    description:
      'One-column serif developer portfolio. Calm typography, staggered entrance, live clock — zero dependencies.',
    tier: 'free',
    stack: 'html',
    tags: ['Portfolio', 'Minimal', 'Serif'],
    thumbnail: '/templates/quiet.png',
    previewType: 'live',
    zipFileName: 'minimal.zip',
    isNew: true,
  },
  aurora: {
    id: 'aurora',
    slug: 'aurora',
    title: 'Aurora',
    description:
      'Clean product-engineer portfolio with CSS aurora footer and WebGL gradient glow shader.',
    tier: 'pro',
    stack: 'html',
    tags: ['Portfolio', 'WebGL', 'Minimal'],
    thumbnail: '/templates/aurora.png',
    previewType: 'live',
    comingSoon: true,
    isNew: true,
  },
  ember: {
    id: 'ember',
    slug: 'ember',
    title: 'Ember',
    description:
      'Warm cream portfolio with gradient badge, floating mesh blob, and WebGL ember shader.',
    tier: 'free',
    stack: 'html',
    tags: ['Portfolio', 'WebGL', 'Minimal'],
    thumbnail: '/templates/ember.png',
    previewType: 'live',
    zipFileName: 'ember.zip',
    isNew: true,
  },
  prism: {
    id: 'prism',
    slug: 'prism',
    title: 'Prism',
    description:
      'Dark design-engineer portfolio — rainbow hairline, prismatic hovers, spectral WebGL wash.',
    tier: 'free',
    stack: 'html',
    tags: ['Portfolio', 'WebGL', 'Dark'],
    thumbnail: '/templates/prisma.png',
    previewType: 'live',
    zipFileName: 'prism.zip',
    isNew: true,
  },
  frontend: {
    id: 'frontend',
    slug: 'frontend',
    title: 'Editorial',
    description:
      'Serif editorial frontend portfolio — scroll progress, magnetic cursor, hover project previews.',
    tier: 'pro',
    stack: 'html',
    tags: ['Portfolio', 'Editorial', 'GSAP'],
    thumbnail: '/templates/editorial.png',
    previewType: 'live',
    comingSoon: true,
    isNew: true,
  },
  backend: {
    id: 'backend',
    slug: 'backend',
    title: 'Terminal',
    description:
      'Terminal-inspired backend engineer portfolio — typed intro, API-style sections, mono aesthetic.',
    tier: 'free',
    stack: 'html',
    tags: ['Portfolio', 'Terminal', 'Backend'],
    thumbnail: '/templates/terminal.png',
    previewType: 'live',
    zipFileName: 'backend.zip',
    isNew: true,
  },
  altura: {
    id: 'altura',
    slug: 'altura',
    title: 'Altura',
    description:
      'Seven-page investment firm site — editorial white layout, GSAP scroll fills, Lenis, canvas hero, pinned strategy scroller.',
    tier: 'pro',
    stack: 'html',
    tags: ['Multi-page', 'GSAP', 'Finance', 'Editorial'],
    thumbnail: '/templates/altura.png',
    previewType: 'live',
    comingSoon: true,
    isNew: true,
  },
  musea: {
    id: 'musea',
    slug: 'musea',
    title: 'Lumen',
    description:
      'WebGL gallery exhibition — scroll-driven 3D artwork rail, case-study panels, static fallback for reduced motion.',
    tier: 'pro',
    stack: 'html',
    tags: ['WebGL', 'Gallery', 'Three.js'],
    thumbnail: '/templates/lumen.png',
    previewType: 'live',
    comingSoon: true,
    isNew: true,
  },
  overclock: {
    id: 'overclock',
    slug: 'overclock',
    title: 'Overclock',
    description:
      'Indie-hacker landing page — GSAP scroll choreography, Lenis smooth scroll, pricing tiers, zero build step.',
    tier: 'pro',
    stack: 'html',
    tags: ['Landing', 'GSAP', 'SaaS'],
    thumbnail: '/templates/overclock.png',
    previewType: 'video',
    previewVideoUrl: '/previews/overclock.mp4',
    zipFileName: 'overclock.zip',
    comingSoon: true,
    isNew: true,
  },
  'phantom-sphere': {
    id: 'phantom-sphere',
    slug: 'phantom-sphere',
    title: 'Studio',
    description:
      'Independent creative studio portfolio — interactive 3D project sphere, GSAP transitions, and case-study overlays.',
    tier: 'pro',
    stack: 'html',
    tags: ['WebGL', 'Portfolio', 'Three.js'],
    thumbnail: '/templates/studio.png',
    previewType: 'video',
    previewVideoUrl: '/previews/studio.mp4',
    zipFileName: 'phantom-sphere.zip',
    comingSoon: true,
    isNew: true,
  },
  'portfolio-landing': {
    id: 'portfolio-landing',
    slug: 'portfolio-landing',
    title: 'Mara Vance',
    description:
      'Designer portfolio landing — WebGL hero scene, GSAP preloader, scroll-linked work grid, magnetic cursor.',
    tier: 'free',
    stack: 'html',
    tags: ['Portfolio', 'WebGL', 'GSAP'],
    thumbnail: '/templates/mara-vance.png',
    previewType: 'live',
    zipFileName: 'portfolio-landing.zip',
    isNew: true,
  },
  'veldt-folio': {
    id: 'veldt-folio',
    slug: 'veldt-folio',
    title: 'Veldt',
    description:
      'Vite portfolio with 3D helix gallery, list/spiral toggle, Lenis + GSAP — includes pre-built dist/ for static deploy.',
    tier: 'pro',
    stack: 'vite',
    tags: ['Portfolio', 'WebGL', 'Vite'],
    thumbnail: '/templates/veldt.png',
    previewType: 'video',
    previewVideoUrl: '/previews/veldt.mp4',
    previewRoot: 'dist',
    zipFileName: 'veldt-folio.zip',
    comingSoon: true,
    isNew: true,
  },
  etude: {
    id: 'etude',
    slug: 'etude',
    title: 'Étude',
    description:
      'Next.js 15 + R3F portfolio — scroll-synced WebGL gallery, shader preloader, Lenis, five case-study works.',
    tier: 'pro',
    stack: 'nextjs',
    tags: ['WebGL', 'R3F', 'Gallery'],
    thumbnail: '/templates/etude.png',
    previewType: 'live',
    comingSoon: true,
    isNew: true,
  },
};

export const subscriptionPlanDefaults: Omit<SubscriptionPlan, 'checkoutUrl'>[] = [
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    price: 9,
    interval: 'month',
    description: 'All pro templates, every new drop, and updates while subscribed.',
    badge: 'Founding rate',
  },
  {
    id: 'pro-yearly',
    name: 'Pro Yearly',
    price: 99,
    interval: 'year',
    description: 'Same access as monthly — ~2 months free when billed yearly.',
    highlighted: true,
    badge: 'Best value',
  },
];

export function getSubscriptionPlans(): SubscriptionPlan[] {
  return subscriptionPlanDefaults.map((plan) => ({
    ...plan,
    checkoutUrl:
      plan.interval === 'month'
        ? (process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_MONTHLY_URL ?? '#')
        : (process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_YEARLY_URL ?? '#'),
  }));
}

export function getAllTemplates(): TemplatePage[] {
  return Object.values(templateData);
}

/** Free & available first, all coming soon grouped at the bottom. */
export function getCatalogTemplates(): TemplatePage[] {
  const all = getAllTemplates();
  const available = all.filter((t) => !t.comingSoon);
  const comingSoon = all.filter((t) => t.comingSoon);
  return [...available, ...comingSoon];
}

/** Set NEXT_PUBLIC_SUBSCRIPTION_CHECKOUT_ENABLED=false to disable checkout (e.g. staging). */
export function isSubscriptionCheckoutEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SUBSCRIPTION_CHECKOUT_ENABLED !== 'false';
}

export function getTemplateBySlug(slug: string): TemplatePage | undefined {
  return templateData[slug];
}

export function isTemplateComingSoon(slug: string): boolean {
  return templateData[slug]?.comingSoon === true;
}

export function isTemplateFullscreen(slug: string): boolean {
  return templateData[slug]?.fullscreenPreview === true;
}

/** Free, live-preview templates that can be served in production. */
export function canServeLivePreview(slug: string): boolean {
  const template = templateData[slug];
  return Boolean(
    template && !template.comingSoon && template.tier === 'free' && template.previewType === 'live',
  );
}

/** Live iframe URL for free templates (same route in dev and production). */
export function getTemplateLivePreviewUrl(slug: string): string | undefined {
  if (!canServeLivePreview(slug)) return undefined;
  return `/api/templates/preview/${slug}`;
}

/** Dev-only live preview URL for any non–coming-soon template. */
export function getDevTemplatePreviewUrl(slug: string): string | undefined {
  if (process.env.NODE_ENV !== 'development') return undefined;
  if (!templateData[slug] || templateData[slug].comingSoon) return undefined;
  return `/dev/preview/${slug}`;
}

/** Shell command to run a framework template locally */
export function getDevTemplateRunCommand(slug: string): string | undefined {
  const template = templateData[slug];
  if (!template || template.comingSoon) return undefined;
  if (template.stack === 'nextjs' || template.stack === 'vite') {
    return `cd private/templates/${slug} && npm install && npm run dev`;
  }
  return `cd private/templates/${slug} && npx serve .`;
}
