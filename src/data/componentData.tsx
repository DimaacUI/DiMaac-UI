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
            defaultValue: '#111',
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
    isNew: true
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
            property: 'caption',
            type: 'string',
            required: true,
            description: 'The post caption text content displayed below the image'
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
    isNew: true
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
    isNew: true
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
};

// Helper function to get component data by slug
export const getComponentBySlug = (slug: string): ComponentPage | null => {
  return componentData[slug] || null;
};

// Get all component slugs
export const getAllComponentSlugs = (): string[] => {
  return Object.keys(componentData);
};
