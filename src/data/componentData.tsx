import { ComponentPage } from '@/types/components';
import { ImageGalleryDemo } from '@/examples/components/gallery/ImageGalleryDemo';
import ScrollingGalleryDemo from '@/examples/components/gallery/ScrollingGalleryDemo';
import { LiquidImageRevealDemo } from '@/examples/components/reveals/LiquidImageRevealDemo';
import { TextLoaderDemo } from '@/examples/components/loaders/TextLoaderDemo';
import { MouseTiltCardDemo } from '@/examples/components/cards/MouseTiltCardDemo';
import { TextScrambleRevealDemo } from '@/examples/components/reveals/TextScrambleRevealDemo';
import { MouseTrailDemo } from '@/examples/components/interactive/MouseTrailDemo';
import { ExpandablePanelDemo } from '@/examples/components/layout/ExpandablePanelDemo';
import { SwipeableCardsDemo } from '@/examples/components/cards/SwipeableCardsDemo';
import InstagramCardDemo from '@/examples/components/cards/InstagramCardDemo';
import TwitterCardDemo from '@/examples/components/cards/TwitterCardDemo';
import FacebookCardDemo from '@/examples/components/cards/FacebookCardDemo';
import { PostSwiperDemo } from '@/examples/components/cards/PostSwiperDemo';
import { ContextMenuDemo } from '@/examples/components/interactive/ContextMenuDemo';
import { ProjectHoverSectionDemo } from '@/examples/components/interactive/ProjectHoverSectionDemo';
import { MaskRevealOnHoverDemo } from '@/examples/components/interactive/MaskRevealOnHoverDemo';
import { PerspectiveCardStackDemo } from '@/examples/components/cards/PerspectiveCardStackDemo';
import { StackedCardSliderDemo } from '@/examples/components/cards/StackedCardSliderDemo';
import { PinRotateSectionsDemo } from '@/examples/components/scroll/PinRotateSectionsDemo';
import { ProofOfWorkDemo } from '@/examples/components/scroll/ProofOfWorkDemo';
import { ImagesFlowDemo } from '@/examples/components/scroll/ImagesFlowDemo';
import { Section3DDemo } from '@/examples/components/scroll/Section3DDemo';
import { FlowArtDemo } from '@/examples/components/scroll/FlowArtDemo';
import { TextBlockEffectDemo } from '@/examples/components/text/TextBlockEffectDemo';
import { COMPONENT_PATHS } from '@/lib/githubFetcher';

export const componentData: Record<string, ComponentPage> = {
  'image-gallery': {
    id: 'image-gallery',
    slug: 'image-gallery',
    title: 'Rotating Image Gallery',
    description: 'A rotating image gallery component that displays a set of images in a circular motion which you can spin by using the mouse or touch.',
    tags: ['React', 'Tailwind CSS', 'Gallery', 'GSAP'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: ImageGalleryDemo,
    demoSourcePath: COMPONENT_PATHS.imageGalleryDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'ImageGallery.tsx',
        githubPath: COMPONENT_PATHS.imageGallery,
        displayName: 'components/ui/ImageGallery.tsx'
      }
    ],
    props: [
      {
        title: 'ImageGallery Props',
        props: [
          {
            property: 'images',
            type: '{ src: string; alt: string; }[]',
            required: true,
            description: 'Array of image objects with src and alt properties for accessibility and display'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the gallery container for custom styling'
          },
          {
            property: 'imageQuality',
            type: 'number',
            required: false,
            defaultValue: '400',
            description: 'Width and height in pixels for the Next.js Image component optimization'
          },
          {
            property: 'circleSize',
            type: 'number',
            required: false,
            defaultValue: '400',
            description: 'Size of the circular path that images follow, affects the gallery radius'
          }
        ]
      }
    ],
    isNew: false
  },
  'scrolling-gallery': {
    id: 'scrolling-gallery',
    slug: 'scrolling-gallery',
    title: 'Scrolling Gallery',
    description: 'A smooth scrolling gallery component with parallax effects and dynamic height calculation. Features GSAP ScrollSmoother, velocity-based skewing, and alternating image positioning for an engaging scroll experience.',
    tags: ['React', 'Tailwind CSS', 'Gallery', 'GSAP', 'ScrollTrigger', 'Parallax'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: ScrollingGalleryDemo,
    demoSourcePath: COMPONENT_PATHS.scrollingGalleryDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'useGSAPResize.tsx',
        githubPath: COMPONENT_PATHS.useGSAPResize,
        displayName: 'lib/useGSAPResize.tsx'
      },
      {
        name: 'ScrollingGallery.tsx',
        githubPath: COMPONENT_PATHS.scrollingGallery,
        displayName: 'components/ui/ScrollingGallery.tsx'
      }
    ],
    props: [
      {
        title: 'ScrollingGallery Props',
        props: [
          {
            property: 'images',
            type: 'Array<{ src: string; alt: string; speed?: number; }>',
            required: true,
            description: 'Array of image objects with src, alt, and optional speed properties for parallax effects'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the gallery container for custom styling'
          },
          {
            property: 'id',
            type: 'string',
            required: false,
            defaultValue: 'wrapper',
            description: 'Unique ID for the scroll wrapper element, useful when multiple galleries exist on the same page'
          }
        ]
      }
    ],
    isNew: false
  },
  'liquid-image-reveal': {
    id: 'liquid-image-reveal',
    slug: 'liquid-image-reveal',
    title: 'Liquid Image Reveal',
    description: 'A liquid-style image reveal component that creates an organic, fluid reveal effect using SVG filters and GSAP animations. Features Safari compatibility with fallback rendering.',
    tags: ['React', 'Tailwind CSS', 'SVG', 'GSAP', 'Animation', 'Filters'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: LiquidImageRevealDemo,
    demoSourcePath: COMPONENT_PATHS.liquidImageRevealDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'LiquidImageReveal.tsx',
        githubPath: COMPONENT_PATHS.liquidImageReveal,
        displayName: 'components/ui/LiquidImageReveal.tsx'
      }
    ],
    props: [
      {
        title: 'LiquidImageReveal Props',
        props: [
          {
            property: 'src',
            type: 'string',
            required: true,
            description: 'Source URL of the image to be revealed'
          },
          {
            property: 'alt',
            type: 'string',
            required: true,
            description: 'Alternative text for the image for accessibility'
          },
          {
            property: 'width',
            type: 'number',
            required: false,
            defaultValue: '600',
            description: 'Width of the component in pixels'
          },
          {
            property: 'height',
            type: 'number',
            required: false,
            defaultValue: '400',
            description: 'Height of the component in pixels'
          },
          {
            property: 'duration',
            type: 'number',
            required: false,
            defaultValue: '2',
            description: 'Duration of the reveal animation in seconds'
          },
          {
            property: 'delay',
            type: 'number',
            required: false,
            defaultValue: '0',
            description: 'Delay before animation starts in seconds'
          },
          {
            property: 'centerX',
            type: 'number',
            required: false,
            defaultValue: 'width / 2',
            description: 'X coordinate of the reveal center point'
          },
          {
            property: 'centerY',
            type: 'number',
            required: false,
            defaultValue: 'height / 2',
            description: 'Y coordinate of the reveal center point'
          },
          {
            property: 'turbulenceFrequency',
            type: 'number',
            required: false,
            defaultValue: '0.03',
            description: 'Frequency of the liquid turbulence effect'
          },
          {
            property: 'turbulenceOctaves',
            type: 'number',
            required: false,
            defaultValue: '10',
            description: 'Number of octaves for turbulence complexity'
          },
          {
            property: 'displacementScale',
            type: 'number',
            required: false,
            defaultValue: '100',
            description: 'Scale of the displacement effect'
          },
          {
            property: 'maxRadius',
            type: 'number',
            required: false,
            defaultValue: 'Math.max(width, height) * 0.7',
            description: 'Maximum radius of the reveal circle'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container'
          }
        ]
      }
    ],
    isNew: false
  },
  'text-loader': {
    id: 'text-loader',
    slug: 'text-loader',
    title: 'Text Loader',
    description: 'An animated text loader component with gradient reveals and smooth GSAP animations. Features customizable colors, timing, and responsive design with Google Fonts integration.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Animation', 'Typography', 'Loader'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: TextLoaderDemo,
    demoSourcePath: COMPONENT_PATHS.textLoaderDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'TextLoader.tsx',
        githubPath: COMPONENT_PATHS.textLoader,
        displayName: 'components/ui/TextLoader.tsx'
      }
    ],
    props: [
      {
        title: 'TextLoader Props',
        props: [
          {
            property: 'text',
            type: 'string',
            required: false,
            defaultValue: 'DIMAAC',
            description: 'The text to be animated and displayed'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container'
          },
          {
            property: 'onComplete',
            type: '() => void',
            required: false,
            description: 'Callback function called when animation completes'
          },
          {
            property: 'gradientColors',
            type: 'string[]',
            required: false,
            defaultValue: "['#ff0000', '#ff3333', '#ff6600', '#cc0000']",
            description: 'Array of colors for the gradient effect'
          },
          {
            property: 'backgroundColor',
            type: 'string',
            required: false,
            defaultValue: '#17171A',
            description: 'Background color of the loader overlay'
          },
          {
            property: 'duration',
            type: '{ slideUp?: number; reveal?: number; slideDown?: number; }',
            required: false,
            defaultValue: '{ slideUp: 0.6, reveal: 0.8, slideDown: 0.6 }',
            description: 'Duration settings for each animation phase'
          },
          {
            property: 'delays',
            type: '{ stagger?: number; betweenAnimations?: number; beforeSlideDown?: number; }',
            required: false,
            defaultValue: '{ stagger: 0.05, betweenAnimations: 0.3, beforeSlideDown: 0.5 }',
            description: 'Delay settings for animation timing and stagger effects'
          }
        ]
      }
    ],
    isNew: false
  },
  'mouse-tilt-card': {
    id: 'mouse-tilt-card',
    slug: 'mouse-tilt-card',
    title: 'Mouse Tilt Card',
    description: 'An interactive card component that tilts and scales based on mouse movement. Features customizable 3D transforms, glare effects, border glow, and smooth animations for engaging hover interactions.',
    tags: ['React', 'Tailwind CSS', 'Animation', 'Interactive', '3D', 'Cards'],
    dependencies: ['react'],
    demoComponent: MouseTiltCardDemo,
    demoSourcePath: COMPONENT_PATHS.mouseTiltCardDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'MouseTiltCard.tsx',
        githubPath: COMPONENT_PATHS.mouseTiltCard,
        displayName: 'components/ui/MouseTiltCard.tsx'
      }
    ],
    props: [
      {
        title: 'MouseTiltCard Props',
        props: [
          {
            property: 'children',
            type: 'React.ReactNode',
            required: true,
            description: 'The content to render inside the tiltable card'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the card container'
          },
          {
            property: 'tiltIntensity',
            type: 'number',
            required: false,
            defaultValue: '15',
            description: 'Intensity of the tilt effect in degrees'
          },
          {
            property: 'perspective',
            type: 'number',
            required: false,
            defaultValue: '1000',
            description: 'CSS perspective value for 3D transforms'
          },
          {
            property: 'glareEffect',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            description: 'Whether to show the glare effect on hover'
          },
          {
            property: 'glareIntensity',
            type: 'number',
            required: false,
            defaultValue: '0.3',
            description: 'Opacity intensity of the glare effect (0-1)'
          },
          {
            property: 'scale',
            type: 'number',
            required: false,
            defaultValue: '1.05',
            description: 'Scale factor when hovered'
          },
          {
            property: 'transition',
            type: 'string',
            required: false,
            defaultValue: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            description: 'CSS transition for smooth animations'
          }
        ]
      }
    ],
    isNew: false
  },
  'text-scramble-reveal': {
    id: 'text-scramble-reveal',
    slug: 'text-scramble-reveal',
    title: 'Text Scramble Reveal',
    description: 'An interactive text component that scrambles characters on mouse proximity. Features customizable scramble characters, proximity detection, and smooth animations with pure React.',
    tags: ['React', 'Animation', 'Interactive', 'Typography'],
    dependencies: ['react'],
    demoComponent: TextScrambleRevealDemo,
    demoSourcePath: COMPONENT_PATHS.textScrambleRevealDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'TextScrambleReveal.tsx',
        githubPath: COMPONENT_PATHS.textScrambleReveal,
        displayName: 'components/ui/TextScrambleReveal.tsx'
      }
    ],
    props: [
      {
        title: 'TextScrambleReveal Props',
        props: [
          {
            property: 'children',
            type: 'React.ReactNode',
            required: true,
            description: 'The text content to be scrambled (should be a string)'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container'
          },
          {
            property: 'maxWidth',
            type: 'string',
            required: false,
            defaultValue: '800px',
            description: 'Maximum width of the text container'
          },
          {
            property: 'fontSize',
            type: 'string',
            required: false,
            defaultValue: '30px',
            description: 'Font size of the text'
          },
          {
            property: 'lineHeight',
            type: 'number',
            required: false,
            defaultValue: '1.5',
            description: 'Line height multiplier for text spacing'
          },
          {
            property: 'textColor',
            type: 'string',
            required: false,
            defaultValue: '#ffffffb4',
            description: 'Default color of the text'
          },
          {
            property: 'scrambleColor',
            type: 'string',
            required: false,
            defaultValue: 'linear-gradient(90deg, #00c8ff, #01ff99)',
            description: 'Gradient color applied to scrambling characters'
          },
          {
            property: 'scrambleChars',
            type: 'string',
            required: false,
            defaultValue: '.:', 
            description: 'Characters used for scrambling effect'
          },
          {
            property: 'proximityRadius',
            type: 'number',
            required: false,
            defaultValue: '100',
            description: 'Distance in pixels for proximity detection'
          },
          {
            property: 'backgroundColor',
            type: 'string',
            required: false,
            defaultValue: '#000',
            description: 'Background color of the component'
          },
          {
            property: 'fontFamily',
            type: 'string',
            required: false,
            defaultValue: '"Poppins", monospace',
            description: 'Font family for the text'
          }
        ]
      }
    ],
    isNew: false
  },
  'text-block-effect': {
    id: 'text-block-effect',
    slug: 'text-block-effect',
    title: 'Text Block Effect',
    description: 'Scroll-triggered line reveal animation. TextBlock wraps text that gets the effect; compose your own sections with overlays, backgrounds, etc. Uses GSAP ScrollTrigger and SplitType.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Text', 'Animation', 'SplitType'],
    dependencies: ['react', '@gsap/react', 'split-type'],
    cli: 'TextBlockEffect',
    demoComponent: TextBlockEffectDemo,
    demoSourcePath: COMPONENT_PATHS.textBlockEffectDemo,
    fullscreen: true,
    githubFiles: [
      { name: 'utils.ts', githubPath: COMPONENT_PATHS.utils, displayName: 'lib/utils.ts' },
      { name: 'TextBlockEffect.tsx', githubPath: COMPONENT_PATHS.textBlockEffect, displayName: 'components/ui/text/TextBlockEffect.tsx' },
    ],
    props: [
      {
        title: 'TextBlockEffect Props',
        props: [
          { property: 'children', type: 'React.ReactNode', required: true, description: 'Sections with TextBlock and your own overlay/background content' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
          { property: 'triggerStart', type: 'string', required: false, defaultValue: "'top 50%'", description: 'ScrollTrigger start position' },
        ]
      },
      {
        title: 'TextBlock Props',
        props: [
          { property: 'children', type: 'React.ReactNode', required: true, description: 'Text content for the line reveal' },
          { property: 'blockColor', type: 'string', required: false, defaultValue: "'#DDFC3E'", description: 'Color of the sweeping reveal block' },
          { property: 'textColor', type: 'string', required: false, defaultValue: "'#ededed'", description: 'Final text color after reveal' },
          { property: 'fontFamily', type: 'string', required: false, defaultValue: "'DM Sans', sans-serif", description: 'Font family for text' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
          { property: 'style', type: 'React.CSSProperties', required: false, description: 'Inline styles' },
        ]
      }
    ],
    isNew: true
  },
  'mouse-trail': {
    id: 'mouse-trail',
    slug: 'mouse-trail',
    title: 'Mouse Trail',
    description: 'An interactive mouse trail component that creates a stunning visual effect with images following the mouse cursor. Features customizable images, stagger timing, and smooth GSAP animations.',
    tags: ['React', 'GSAP', 'Interactive', 'Animation', 'Mouse Effects'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: MouseTrailDemo,
    demoSourcePath: COMPONENT_PATHS.mouseTrailDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'MouseTrail.tsx',
        githubPath: COMPONENT_PATHS.mouseTrail,
        displayName: 'components/ui/MouseTrail.tsx'
      }
    ],
    props: [
      {
        title: 'MouseTrail Props',
        props: [
          {
            property: 'images',
            type: 'string[]',
            required: true,
            description: 'Array of image URLs to display in the trail effect'
          },
          {
            property: 'containerClassName',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container'
          },
          {
            property: 'imageClassName',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to each trail image'
          },
          {
            property: 'imageWidth',
            type: 'number',
            required: false,
            defaultValue: '288',
            description: 'Width of each trail image in pixels'
          },
          {
            property: 'imageHeight',
            type: 'number',
            required: false,
            defaultValue: '384',
            description: 'Height of each trail image in pixels'
          },
          {
            property: 'stagger',
            type: 'number',
            required: false,
            defaultValue: '0.1',
            description: 'Stagger delay between image animations in seconds'
          },
          {
            property: 'duration',
            type: 'number',
            required: false,
            defaultValue: '0.3',
            description: 'Duration of each image animation in seconds'
          },
          {
            property: 'ease',
            type: 'string',
            required: false,
            defaultValue: '"power2.out"',
            description: 'GSAP easing function for the animations'
          }
        ]
      }
    ],
    isNew: false
  },
  'expandable-panel': {
    id: 'expandable-panel',
    slug: 'expandable-panel',
    title: 'Expandable Panel',
    description: 'An interactive expandable panel component that displays images in collapsible sections. Click on any panel to expand it while others collapse smoothly. Now supports clicking outside to collapse all panels.',
    tags: ['React', 'Layout', 'Interactive', 'Animation', 'Gallery'],
    dependencies: ['react'],
    demoComponent: ExpandablePanelDemo,
    demoSourcePath: COMPONENT_PATHS.expandablePanelDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'ExpandablePanel.tsx',
        githubPath: COMPONENT_PATHS.expandablePanel,
        displayName: 'components/ui/ExpandablePanel.tsx'
      }
    ],
    props: [
      {
        title: 'ExpandablePanel Props',
        props: [
          {
            property: 'panels',
            type: 'Panel[]',
            required: true,
            description: 'Array of panel objects with image and optional alt text'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container'
          },
          {
            property: 'panelClassName',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to each panel'
          },
          {
            property: 'expandedWidth',
            type: 'string',
            required: false,
            defaultValue: '60%',
            description: 'Width of the expanded panel'
          },
          {
            property: 'collapsedWidth',
            type: 'string',
            required: false,
            defaultValue: '10%',
            description: 'Width of collapsed panels'
          },
          {
            property: 'minWidth',
            type: 'string',
            required: false,
            defaultValue: '40px',
            description: 'Minimum width for panels to prevent them from becoming too small'
          },
          {
            property: 'height',
            type: 'string',
            required: false,
            defaultValue: '80vh',
            description: 'Height of the panel container'
          },
          {
            property: 'gap',
            type: 'string',
            required: false,
            defaultValue: '0.5rem',
            description: 'Gap between panels'
          },
          {
            property: 'borderRadius',
            type: 'string',
            required: false,
            defaultValue: '1rem',
            description: 'Border radius for panels'
          },
          {
            property: 'transitionDuration',
            type: 'string',
            required: false,
            defaultValue: '500ms',
            description: 'Duration of expand/collapse animation'
          },
          {
            property: 'defaultExpanded',
            type: 'number',
            required: false,
            defaultValue: '0',
            description: 'Index of the panel to expand by default (-1 for none expanded). Clicking outside collapses all panels.'
          }
        ]
      }
    ],
    isNew: false
  },
  'post-swiper': {
    id: 'post-swiper',
    slug: 'post-swiper',
    title: 'Post Swiper',
    description: 'A unified swipeable component for social media cards. Effortlessly create card stacks with Twitter, Instagram, Facebook posts, or any custom content with smooth swipe gestures.',
    tags: ['React', 'Swiper', 'Cards', 'Social Media', 'Touch', 'Animation'],
    dependencies: ['react', 'swiper'],
    demoComponent: PostSwiperDemo,
    demoSourcePath: COMPONENT_PATHS.postSwiperDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'PostSwiper.tsx',
        githubPath: COMPONENT_PATHS.postSwiper,
        displayName: 'components/ui/PostSwiper.tsx'
      }
    ],
    props: [
      {
        title: 'PostSwiper Props',
        props: [
          {
            property: 'slides',
            type: 'React.ReactNode[]',
            required: true,
            description: 'Array of React components or elements to display as swipeable cards'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container wrapper'
          },
          {
            property: 'swiperClassName',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the Swiper element'
          },
          {
            property: 'loop',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            description: 'Whether to enable infinite loop mode'
          },
          {
            property: 'grabCursor',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            description: 'Whether to show grab cursor on hover'
          }
        ]
      }
    ],
    isNew: false
  },
  'swipeable-cards': {
    id: 'swipeable-cards',
    slug: 'swipeable-cards',
    title: 'Swipeable Cards',
    description: 'An interactive swipeable card stack component using Swiper.js with cards effect. Features smooth touch gestures, loop functionality, and customizable navigation controls.',
    tags: ['React', 'Swiper', 'Cards', 'Touch', 'Animation'],
    dependencies: ['react', 'swiper', 'lucide-react'],
    demoComponent: SwipeableCardsDemo,
    demoSourcePath: COMPONENT_PATHS.swipeableCardsDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'SwipeableCards.tsx',
        githubPath: COMPONENT_PATHS.swipeableCards,
        displayName: 'components/ui/SwipeableCards.tsx'
      }
    ],
    props: [
      {
        title: 'SwipeableCards Props',
        props: [
          {
            property: 'images',
            type: '{ src: string; alt: string }[]',
            required: true,
            description: 'Array of image objects with src and alt properties for the card stack'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container'
          },
          {
            property: 'showPagination',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            description: 'Whether to show pagination dots at the bottom'
          },
          {
            property: 'showNavigation',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            description: 'Whether to show navigation arrows on the sides'
          },
          {
            property: 'loop',
            type: 'boolean',
            required: false,
            defaultValue: 'true',
            description: 'Whether to loop back to the first card after the last one'
          },
          {
            property: 'autoplay',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            description: 'Whether to automatically advance cards (currently unused)'
          },
          {
            property: 'spaceBetween',
            type: 'number',
            required: false,
            defaultValue: '40',
            description: 'Space between cards in pixels (currently unused)'
          }
        ]
      }
    ],
    isNew: false
  },
  'instagram-card': {
    id: 'instagram-card',
    slug: 'instagram-card',
    title: 'Instagram Card',
    description: 'A social media card component that mimics Instagram post styling with profile information, interactive like/bookmark buttons, and support for both images and custom content with GSAP animations.',
    tags: ['React', 'Tailwind CSS', 'Social Media', 'Cards', 'GSAP', 'UI'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: InstagramCardDemo,
    demoSourcePath: COMPONENT_PATHS.instagramCardDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'InstagramCard.tsx',
        githubPath: COMPONENT_PATHS.instagramCard,
        displayName: 'components/ui/InstagramCard.tsx'
      }
    ],
    props: [
      {
        title: 'InstagramCard Props',
        props: [
          {
            property: 'image',
            type: 'string',
            required: false,
            description: 'URL or path to the main post image (not needed if using customPost)'
          },
          {
            property: 'profileImage',
            type: 'string',
            required: true,
            description: 'URL or path to the user profile image'
          },
          {
            property: 'isVerified',
            type: 'boolean',
            required: true,
            description: 'Whether the user account has a verified badge'
          },
          {
            property: 'username',
            type: 'string',
            required: true,
            description: 'The username of the post author'
          },
          {
            property: 'timestamp',
            type: 'string',
            required: true,
            description: 'Time since the post was created (e.g., "2h", "1d", "3w")'
          },
          {
            property: 'customPost',
            type: 'React.ReactNode',
            required: false,
            description: 'Custom JSX content to display instead of an image for creative posts'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the card container'
          },
          {
            property: 'postClassName',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the post/image container for custom sizing'
          }
        ]
      }
    ],
    isNew: false
  },
  'twitter-card': {
    id: 'twitter-card',
    slug: 'twitter-card',
    title: 'Twitter Card',
    description: 'A social media card component that mimics Twitter/X post styling with profile information, content display, and interactive elements like likes, retweets, and bookmarks with smooth GSAP animations.',
    tags: ['React', 'Tailwind CSS', 'Social Media', 'Cards', 'GSAP', 'UI'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: TwitterCardDemo,
    demoSourcePath: COMPONENT_PATHS.twitterCardDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'TwitterCard.tsx',
        githubPath: COMPONENT_PATHS.twitterCard,
        displayName: 'components/ui/TwitterCard.tsx'
      }
    ],
    props: [
      {
        title: 'TwitterCard Props',
        props: [
          {
            property: 'image',
            type: 'string',
            required: false,
            description: 'URL or path to the media image in the tweet (only used with string content)'
          },
          {
            property: 'profileImage',
            type: 'string',
            required: true,
            description: 'URL or path to the user profile image'
          },
          {
            property: 'isVerified',
            type: 'boolean',
            required: true,
            description: 'Whether the user account has a verified badge'
          },
          {
            property: 'content',
            type: 'string | React.ReactNode',
            required: true,
            description: 'The tweet content - can be text string or custom JSX for rich media posts'
          },
          {
            property: 'username',
            type: 'string',
            required: true,
            description: 'The username handle of the tweet author (without @)'
          },
          {
            property: 'displayName',
            type: 'string',
            required: true,
            description: 'The display name of the tweet author'
          },
          {
            property: 'timestamp',
            type: 'string',
            required: true,
            description: 'Time since the tweet was posted (e.g., "2h", "1d")'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the card container (e.g., for background customization)'
          }
        ]
      }
    ],
    isNew: false
  },
  'facebook-card': {
    id: 'facebook-card',
    slug: 'facebook-card',
    title: 'Facebook Card',
    description: 'A social media card component that mimics Facebook post styling with profile information, content display, and interactive elements like likes, comments, and shares with smooth GSAP animations.',
    tags: ['React', 'Tailwind CSS', 'Social Media', 'Cards', 'GSAP', 'UI'],
    dependencies: ['react', '@gsap/react'],
    demoComponent: FacebookCardDemo,
    demoSourcePath: COMPONENT_PATHS.facebookCardDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'FacebookCard.tsx',
        githubPath: COMPONENT_PATHS.facebookCard,
        displayName: 'components/ui/FacebookCard.tsx'
      }
    ],
    props: [
      {
        title: 'FacebookCard Props',
        props: [
          {
            property: 'image',
            type: 'string',
            required: false,
            description: 'URL or path to the media image in the post (only used with string content)'
          },
          {
            property: 'profileImage',
            type: 'string',
            required: true,
            description: 'URL or path to the user profile image'
          },
          {
            property: 'content',
            type: 'string | React.ReactNode',
            required: true,
            description: 'The post content - can be text string or custom JSX for rich media posts'
          },
          {
            property: 'username',
            type: 'string',
            required: true,
            description: 'The username or display name of the post author'
          },
          {
            property: 'timestamp',
            type: 'string',
            required: true,
            description: 'Time since the post was created (e.g., "2h", "1d")'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the card container'
          }
        ]
      }
    ],
    isNew: false
  },
  'perspective-card-stack': {
    id: 'perspective-card-stack',
    slug: 'perspective-card-stack',
    title: 'Perspective Card Stack',
    description: 'A 3D card stack that fans out on hover. Displays up to 3 cards that stack vertically when idle and spread into a fanned perspective layout when hovering. Uses CSS transforms and Next.js Image for optimized rendering.',
    tags: ['React', 'Tailwind CSS', 'Cards', '3D', 'Perspective', 'Hover'],
    dependencies: ['react', 'next'],
    cli: 'PerspectiveCardStack',
    demoComponent: PerspectiveCardStackDemo,
    demoSourcePath: COMPONENT_PATHS.perspectiveCardStackDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'PerspectiveCardStack.tsx',
        githubPath: COMPONENT_PATHS.perspectiveCardStack,
        displayName: 'components/ui/cards/PerspectiveCardStack.tsx'
      }
    ],
    props: [
      {
        title: 'PerspectiveCardStack Props',
        props: [
          {
            property: 'cards',
            type: 'PerspectiveCard[]',
            required: true,
            description: 'Array of card objects with image and optional alt for accessibility'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the stack container'
          },
          {
            property: 'cardWidth',
            type: 'number',
            required: false,
            defaultValue: '360',
            description: 'Width of each card in pixels'
          },
          {
            property: 'cardHeight',
            type: 'number',
            required: false,
            defaultValue: '280',
            description: 'Height of each card in pixels'
          }
        ]
      },
      {
        title: 'PerspectiveCard Interface',
        props: [
          {
            property: 'image',
            type: 'string',
            required: true,
            description: 'URL or path to the card image'
          },
          {
            property: 'alt',
            type: 'string',
            required: false,
            description: 'Alt text for the image (defaults to "Card N")'
          }
        ]
      }
    ],
    isNew: true
  },
  'stacked-card-slider': {
    id: 'stacked-card-slider',
    slug: 'stacked-card-slider',
    title: 'Stacked Card Slider',
    description: 'A stacked cards carousel that cycles on click. Displays up to 5 visible cards with offset stacking. Uses GSAP Flip for smooth transitions—clicking moves the top card to the back. Requires at least 2 cards.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Flip', 'Cards', 'Carousel'],
    dependencies: ['react', '@gsap/react'],
    fullscreen: true,
    cli: 'StackedCardSlider',
    demoComponent: StackedCardSliderDemo,
    demoSourcePath: COMPONENT_PATHS.stackedCardSliderDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'StackedCardSlider.tsx',
        githubPath: COMPONENT_PATHS.stackedCardSlider,
        displayName: 'components/ui/cards/StackedCardSlider.tsx'
      }
    ],
    props: [
      {
        title: 'StackedCardSlider Props',
        props: [
          {
            property: 'cards',
            type: 'StackedCard[]',
            required: true,
            description: 'Array of card objects with image and optional alt (min 2 cards, displays 5)'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes for the slider inner container'
          },
          {
            property: 'wrapperClassName',
            type: 'string',
            required: false,
            description: 'CSS classes for the outer wrapper - use for responsive sizing (e.g. w-full max-w-[300px] sm:max-w-none, scale, etc.)'
          },
          {
            property: 'cardWidth',
            type: 'number',
            required: false,
            defaultValue: '300',
            description: 'Width of each card in pixels'
          },
          {
            property: 'offsetStep',
            type: 'number',
            required: false,
            defaultValue: '20',
            description: 'Pixel offset between stacked cards'
          },
          {
            property: 'aspectRatio',
            type: 'number',
            required: false,
            defaultValue: '2/3',
            description: 'Aspect ratio of each card (e.g., 2/3 for portrait)'
          }
        ]
      },
      {
        title: 'StackedCard Interface',
        props: [
          {
            property: 'image',
            type: 'string',
            required: true,
            description: 'URL or path to the card image'
          },
          {
            property: 'alt',
            type: 'string',
            required: false,
            description: 'Alt text for the image (defaults to "Card N")'
          }
        ]
      }
    ],
    isNew: true
  },
  'context-menu': {
    id: 'context-menu',
    slug: 'context-menu',
    title: 'Context Menu',
    description: 'A customizable right-click context menu component with GSAP animations, Lucide icons, and smart positioning. Features smooth stacking effects and keyboard shortcut display.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Interactive', 'Lucide Icons'],
    dependencies: ['react', '@gsap/react', 'lucide-react'],
    demoComponent: ContextMenuDemo,
    demoSourcePath: COMPONENT_PATHS.contextMenuDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'ContextMenu.tsx',
        githubPath: COMPONENT_PATHS.contextMenu,
        displayName: 'components/ui/ContextMenu.tsx'
      }
    ],
    props: [
      {
        title: 'ContextMenu Props',
        props: [
          {
            property: 'children',
            type: 'React.ReactNode',
            required: true,
            description: 'The content that will trigger the context menu on right-click'
          },
          {
            property: 'menuItems',
            type: 'MenuItem[]',
            required: true,
            description: 'Array of menu items to display in the context menu'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes for the trigger container'
          },
          {
            property: 'menuClassName',
            type: 'string',
            required: false,
            description: 'Additional CSS classes for the menu container'
          },
          {
            property: 'onItemClick',
            type: '(item: MenuItem, event: React.MouseEvent) => void',
            required: false,
            description: 'Callback function called when a menu item is clicked'
          }
        ]
      },
      {
        title: 'MenuItem Interface',
        props: [
          {
            property: 'id',
            type: 'string',
            required: true,
            description: 'Unique identifier for the menu item'
          },
          {
            property: 'label',
            type: 'string',
            required: true,
            description: 'Text label displayed for the menu item'
          },
          {
            property: 'icon',
            type: 'React.ComponentType<any>',
            required: false,
            description: 'Lucide React icon component to display'
          },
          {
            property: 'shortcut',
            type: 'string',
            required: false,
            description: 'Keyboard shortcut text to display (e.g., "Ctrl + C")'
          },
          {
            property: 'action',
            type: '(item: MenuItem, event: React.MouseEvent) => void',
            required: false,
            description: 'Function to execute when the item is clicked'
          },
          {
            property: 'separator',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            description: 'Whether to show a separator line after this item'
          },
          {
            property: 'disabled',
            type: 'boolean',
            required: false,
            defaultValue: 'false',
            description: 'Whether the menu item is disabled and non-clickable'
          }
        ]
      }
    ],
    isNew: false
  },
  'project-hover-section': {
    id: 'project-hover-section',
    slug: 'project-hover-section',
    title: 'Project Hover Section',
    description: 'A project list where hovering over each row reveals a floating thumbnail that follows your mouse. Desktop: GSAP-animated thumbnail with slider for multiple projects. Mobile: tap-to-expand accordion with inline images.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Interactive', 'Projects', 'Hover'],
    dependencies: ['react', '@gsap/react'],
    cli: 'ProjectHoverSection',
    demoComponent: ProjectHoverSectionDemo,
    demoSourcePath: COMPONENT_PATHS.projectHoverSectionDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'ProjectHoverSection.tsx',
        githubPath: COMPONENT_PATHS.projectHoverSection,
        displayName: 'components/ui/interactive/ProjectHoverSection.tsx'
      }
    ],
    props: [
      {
        title: 'ProjectHoverSection Props',
        props: [
          {
            property: 'projects',
            type: 'ProjectItem[]',
            required: true,
            description: 'Array of project objects with title, subtitle, image, and optional alt'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes to apply to the container'
          },
          {
            property: 'thumbnailWidth',
            type: 'number',
            required: false,
            defaultValue: '250',
            description: 'Width of the floating thumbnail in pixels (desktop only)'
          },
          {
            property: 'thumbnailHeight',
            type: 'number',
            required: false,
            defaultValue: '300',
            description: 'Height of the floating thumbnail in pixels (desktop only)'
          }
        ]
      },
      {
        title: 'ProjectItem Interface',
        props: [
          {
            property: 'title',
            type: 'string',
            required: true,
            description: 'Project title displayed in the row'
          },
          {
            property: 'subtitle',
            type: 'string',
            required: true,
            description: 'Project subtitle or category'
          },
          {
            property: 'image',
            type: 'string',
            required: true,
            description: 'URL or path to the project thumbnail image'
          },
          {
            property: 'alt',
            type: 'string',
            required: false,
            description: 'Alt text for the image (defaults to title)'
          }
        ]
      }
    ],
    isNew: true
  },
  'mask-reveal-on-hover': {
    id: 'mask-reveal-on-hover',
    slug: 'mask-reveal-on-hover',
    title: 'Mask Reveal on Hover',
    description: 'Reveals alternate content through a circular mask that follows your cursor. The base content is shown dimmed; hovering grows the mask to reveal the overlay content. Uses CSS mask-image and GSAP for smooth position and size animations.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Interactive', 'Mask', 'CSS'],
    dependencies: ['react', '@gsap/react'],
    cli: 'MaskRevealOnHover',
    demoComponent: MaskRevealOnHoverDemo,
    demoSourcePath: COMPONENT_PATHS.maskRevealOnHoverDemo,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'MaskRevealOnHover.tsx',
        githubPath: COMPONENT_PATHS.maskRevealOnHover,
        displayName: 'components/ui/interactive/MaskRevealOnHover.tsx'
      }
    ],
    props: [
      {
        title: 'MaskRevealOnHover Props',
        props: [
          {
            property: 'originalContent',
            type: 'React.ReactNode',
            required: true,
            description: 'The base/dimmed content shown underneath'
          },
          {
            property: 'maskContent',
            type: 'React.ReactNode',
            required: true,
            description: 'The content revealed through the circular mask on hover'
          },
          {
            property: 'maskSizeSmall',
            type: 'number',
            required: false,
            defaultValue: '20',
            description: 'Size of the mask circle in pixels when not hovering'
          },
          {
            property: 'maskSizeLarge',
            type: 'number',
            required: false,
            defaultValue: '100',
            description: 'Size of the mask circle in pixels when hovering'
          },
          {
            property: 'maskBackground',
            type: 'string',
            required: false,
            defaultValue: '"#DDFC3E"',
            description: 'Background color of the mask overlay (visible behind revealed content)'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes for the container'
          }
        ]
      }
    ],
    isNew: true
  },
  'pin-rotate-sections': {
    id: 'pin-rotate-sections',
    slug: 'pin-rotate-sections',
    title: 'Pin Rotate Sections',
    description: 'Full-page scroll experience with pinned sections that scale, rotate, and fade as you scroll. Each section pins while the next scrolls up, with 3D rotation and overlay effects. Uses GSAP ScrollTrigger.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Scroll', '3D', 'Pin'],
    dependencies: ['react', '@gsap/react'],
    cli: 'PinRotateSections',
    demoComponent: PinRotateSectionsDemo,
    demoSourcePath: COMPONENT_PATHS.pinRotateSectionsDemo,
    fullscreen: true,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'PinRotateSections.tsx',
        githubPath: COMPONENT_PATHS.pinRotateSections,
        displayName: 'components/ui/scroll/PinRotateSections.tsx'
      }
    ],
    props: [
      {
        title: 'PinRotateSections Props',
        props: [
          {
            property: 'children',
            type: 'React.ReactNode',
            required: true,
            description: 'PinRotateIntro, PinRotateSection, and PinRotateOutro components'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes for the main container'
          }
        ]
      },
      {
        title: 'PinRotateIntro Props',
        props: [
          { property: 'children', type: 'React.ReactNode', required: true, description: 'Intro content (title, description, etc.)' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
        ]
      },
      {
        title: 'PinRotateSection Props',
        props: [
          { property: 'children', type: 'React.ReactNode', required: true, description: 'Section content (images, text, etc.)' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' },
          { property: 'style', type: 'React.CSSProperties', required: false, description: 'Inline styles' }
        ]
      },
      {
        title: 'PinRotateOutro Props',
        props: [
          { property: 'children', type: 'React.ReactNode', required: true, description: 'Outro content' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
        ]
      }
    ],
    isNew: true
  },
  'proof-of-work': {
    id: 'proof-of-work',
    slug: 'proof-of-work',
    title: 'Proof Of Work',
    description: 'Grid of work cards with scroll-triggered reveal: each image animates in with rotation, y-offset, and opacity. Alternating stagger on desktop. Perfect for portfolios and project galleries.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Scroll', 'Grid', 'Portfolio'],
    dependencies: ['react', '@gsap/react'],
    cli: 'ProofOfWork',
    demoComponent: ProofOfWorkDemo,
    demoSourcePath: COMPONENT_PATHS.proofOfWorkDemo,
    fullscreen: true,
    githubFiles: [
      {
        name: 'utils.ts',
        githubPath: COMPONENT_PATHS.utils,
        displayName: 'lib/utils.ts'
      },
      {
        name: 'ProofOfWork.tsx',
        githubPath: COMPONENT_PATHS.proofOfWork,
        displayName: 'components/ui/scroll/ProofOfWork.tsx'
      }
    ],
    props: [
      {
        title: 'ProofOfWork Props',
        props: [
          {
            property: 'title',
            type: 'string',
            required: false,
            defaultValue: "'My Works'",
            description: 'Section heading'
          },
          {
            property: 'works',
            type: 'ProofOfWorkItem[]',
            required: true,
            description: 'Array of work items with image, title, subtitle'
          },
          {
            property: 'className',
            type: 'string',
            required: false,
            description: 'Additional CSS classes for the container'
          }
        ]
      },
      {
        title: 'ProofOfWorkItem Interface',
        props: [
          { property: 'image', type: 'string', required: true, description: 'Image URL' },
          { property: 'imageAlt', type: 'string', required: false, description: 'Image alt text' },
          { property: 'title', type: 'string', required: true, description: 'Work title' },
          { property: 'subtitle', type: 'string', required: true, description: 'Work subtitle/category' }
        ]
      }
    ],
    isNew: true
  },
  'images-flow': {
    id: 'images-flow',
    slug: 'images-flow',
    title: 'Images Flow',
    description: 'Pinned scroll section where images flow from center into a 3D spread. Intro, flow section with scrubbed animation, outro. Images animate from z: -1000 to positioned grid with staggered reveal.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Scroll', '3D', 'Pin'],
    dependencies: ['react', '@gsap/react'],
    cli: 'ImagesFlow',
    demoComponent: ImagesFlowDemo,
    demoSourcePath: COMPONENT_PATHS.imagesFlowDemo,
    fullscreen: true,
    githubFiles: [
      { name: 'utils.ts', githubPath: COMPONENT_PATHS.utils, displayName: 'lib/utils.ts' },
      { name: 'ImagesFlow.tsx', githubPath: COMPONENT_PATHS.imagesFlow, displayName: 'components/ui/scroll/ImagesFlow.tsx' }
    ],
    props: [
      {
        title: 'ImagesFlow Props',
        props: [
          { property: 'introTitle', type: 'string', required: true, description: 'Intro section heading' },
          { property: 'introSubtitle', type: 'string', required: false, description: 'Intro section subtitle' },
          { property: 'flowText', type: 'string', required: false, description: 'Text overlay in flow section (supports \\n for line breaks)' },
          { property: 'outroTitle', type: 'string', required: true, description: 'Outro section heading' },
          { property: 'outroSubtitle', type: 'string', required: false, description: 'Outro section subtitle' },
          { property: 'images', type: 'string[]', required: true, description: 'Array of image URLs (last image becomes full-cover with overlay)' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
        ]
      }
    ],
    isNew: true
  },
  'section-3d': {
    id: 'section-3d',
    slug: 'section-3d',
    title: 'Section 3D',
    description: 'Pinned team cards with 3D scroll: each card fades, lifts, and tilts back as the next scrolls up. Simple intro, scrubbed transform animation.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Scroll', '3D', 'Pin'],
    dependencies: ['react', '@gsap/react'],
    cli: 'Section3D',
    demoComponent: Section3DDemo,
    demoSourcePath: COMPONENT_PATHS.section3DDemo,
    fullscreen: true,
    githubFiles: [
      { name: 'utils.ts', githubPath: COMPONENT_PATHS.utils, displayName: 'lib/utils.ts' },
      { name: 'Section3D.tsx', githubPath: COMPONENT_PATHS.section3D, displayName: 'components/ui/scroll/Section3D.tsx' }
    ],
    props: [
      {
        title: 'Section3D Props',
        props: [
          { property: 'introTitle', type: 'string', required: true, description: 'Intro section heading' },
          { property: 'introDescription', type: 'string', required: false, description: 'Intro section description' },
          { property: 'cards', type: 'Section3DCard[]', required: true, description: 'Array of team cards' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
        ]
      }
    ],
    isNew: true
  },
  'flow-art': {
    id: 'flow-art',
    slug: 'flow-art',
    title: 'Flow Art',
    description: 'Colorful sections with pin-on-scroll: each container rotates in from 30° as you scroll. Bebas Neue headlines, flexible content blocks.',
    tags: ['React', 'Tailwind CSS', 'GSAP', 'ScrollTrigger', 'Scroll', 'Pin'],
    dependencies: ['react', '@gsap/react'],
    cli: 'FlowArt',
    demoComponent: FlowArtDemo,
    demoSourcePath: COMPONENT_PATHS.flowArtDemo,
    fullscreen: true,
    githubFiles: [
      { name: 'utils.ts', githubPath: COMPONENT_PATHS.utils, displayName: 'lib/utils.ts' },
      { name: 'FlowArt.tsx', githubPath: COMPONENT_PATHS.flowArt, displayName: 'components/ui/scroll/FlowArt.tsx' }
    ],
    props: [
      {
        title: 'FlowArt Props',
        props: [
          { property: 'sections', type: 'FlowArtSection[]', required: true, description: 'Array of sections with tag, headline, bgColor, content' },
          { property: 'className', type: 'string', required: false, description: 'Additional CSS classes' }
        ]
      }
    ],
    isNew: true
  },
};

// Helper function to get component data by slug
export const getComponentBySlug = (slug: string): ComponentPage | null => {
  return componentData[slug] || null;
};

// Get all component slugs
export const getAllComponentSlugs = (): string[] => {
  return Object.keys(componentData);
};

// Check if a component uses the fullscreen layout (no sidebar, demo fills viewport, drawer nav)
export const isFullscreenComponent = (slug: string): boolean => {
  return !!componentData[slug]?.fullscreen;
};
