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
    },
    {
      name: 'PostSwiper',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/PostSwiper.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/PostSwiperDemo.tsx`,
      dependencies: ['swiper'],
      description: 'Unified swipeable component for social media cards with smooth gestures'
    },
    {
      name: 'InstagramCard',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/InstagramCard.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/InstagramCardDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Instagram post card with profile image, verified badge, and username'
    },
    {
      name: 'TwitterCard',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/TwitterCard.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/TwitterCardDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Twitter/X post card with interactive elements, animations, and authentic styling'
    },
    {
      name: 'FacebookCard',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/FacebookCard.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/FacebookCardDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Facebook post card with profile, content, and interactive like/comment/share buttons'
    },
    {
      name: 'PerspectiveCardStack',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/PerspectiveCardStack.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/PerspectiveCardStackDemo.tsx`,
      dependencies: ['next'],
      description: '3D card stack that fans out on hover with perspective transforms'
    },
    {
      name: 'StackedCardSlider',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/cards/StackedCardSlider.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/cards/StackedCardSliderDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Looped stacked cards carousel with GSAP Flip - clone, hide, onEnter/onLeave'
    }
  ],
  interactive: [
    {
      name: 'MaskRevealOnHover',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/interactive/MaskRevealOnHover.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/interactive/MaskRevealOnHoverDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Circular mask following cursor that reveals alternate content on hover'
    },
    {
      name: 'ProjectHoverSection',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/interactive/ProjectHoverSection.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/interactive/ProjectHoverSectionDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Project showcase with hover-to-reveal floating thumbnails that follow the mouse'
    },
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
  textEffects: [
    {
      name: 'TextBlockEffect',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/text/TextBlockEffect.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/text/TextBlockEffectDemo.tsx`,
      dependencies: ['@gsap/react', 'split-type'],
      description: 'Scroll-triggered line reveal with colored block sweep animation'
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
  ],
  scrollAnimations: [
    {
      name: 'PinRotateSections',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/scroll/PinRotateSections.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/scroll/PinRotateSectionsDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Full-page pinned sections with 3D rotate, scale, and overlay on scroll'
    },
    {
      name: 'ProofOfWork',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/scroll/ProofOfWork.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/scroll/ProofOfWorkDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Grid of works with scroll-triggered rotation, y-offset, and opacity reveal'
    },
    {
      name: 'ImagesFlow',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/scroll/ImagesFlow.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/scroll/ImagesFlowDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Pinned section with images flowing from center into 3D spread'
    },
    {
      name: 'Section3D',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/scroll/Section3D.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/scroll/Section3DDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Pinned cards with 3D fade, lift, and tilt on scroll'
    },
    {
      name: 'FlowArt',
      sourceUrl: `${GITHUB_RAW_BASE}/src/ui/components/scroll/FlowArt.tsx`,
      exampleUrl: `${GITHUB_RAW_BASE}/src/examples/components/scroll/FlowArtDemo.tsx`,
      dependencies: ['@gsap/react'],
      description: 'Colorful sections with pin and rotate-in-on-scroll'
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