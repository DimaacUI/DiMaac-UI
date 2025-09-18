import { NextResponse } from 'next/server';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/DimaacUI/DiMaac-UI/main';

const componentRegistry = {
  reveals: [
    {
      name: 'TextScrambleReveal',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/reveals/text/TextScrambleReveal.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/reveals/TextScrambleRevealDemo.tsx`,
      dependencies: [],
      description: 'Animated text reveal with scramble effect'
    },
    {
      name: 'LiquidImageReveal',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/reveals/image/LiquidImageReveal.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/reveals/LiquidImageRevealDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Liquid morphing image reveal animation'
    }
  ],
  cards: [
    {
      name: 'MouseTiltCard',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/MouseTiltCard.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/MouseTiltCardDemo.tsx`,
      dependencies: [],
      description: 'Interactive card with mouse tilt effect'
    },
    {
      name: 'SwipeableCards',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/SwipeableCards.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/SwipeableCardsDemo.tsx`,
      dependencies: ['swiper', 'lucide-react'],
      description: 'Swipeable card stack component'
    }
  ],
  interactive: [
    {
      name: 'MouseTrail',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/interactive/MouseTrail.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/interactive/MouseTrailDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Animated mouse cursor trail effect'
    },
    {
      name: 'ContextMenu',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/interactive/ContextMenu.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/interactive/ContextMenuDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Right-click context menu component'
    }
  ],
  gallery: [
    {
      name: 'ScrollingGallery',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/gallery/ScrollingGallery.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/gallery/ScrollingGalleryDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Horizontal scrolling image gallery'
    },
    {
      name: 'ImageGallery',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/gallery/ImageGallery.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/gallery/ImageGalleryDemo.tsx`,
      dependencies: [],
      description: 'Grid-based image gallery with lightbox'
    }
  ],
  loaders: [
    {
      name: 'TextLoader',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/loaders/TextLoader.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/loaders/TextLoaderDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Animated text loading component'
    }
  ],
  layout: [
    {
      name: 'ExpandablePanel',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/layout/ExpandablePanel.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/layout/ExpandablePanelDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Collapsible panel with smooth animations'
    }
  ]
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      components: componentRegistry
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch components' },
      { status: 500 }
    );
  }
}