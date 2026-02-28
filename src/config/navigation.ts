export interface SidebarItem {
  name: string;
  href: string;
  isActive: boolean;
  isNew?: boolean;
}

export interface NavSection {
  name: string;
  item: SidebarItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    name: 'Getting Started',
    item: [{ name: 'Introduction', href: '/', isActive: false, isNew: false }],
  },
  {
    name: 'Layout Components',
    item: [{ name: 'Expandable Panel', href: '/components/expandable-panel', isActive: false, isNew: false }],
  },
  {
    name: 'Gallery & Media',
    item: [
      { name: 'Image Gallery', href: '/components/image-gallery', isActive: false, isNew: false },
      { name: 'Scrolling Gallery', href: '/components/scrolling-gallery', isActive: false, isNew: false },
      { name: 'Liquid Image Reveal', href: '/components/liquid-image-reveal', isActive: false, isNew: false },
    ],
  },
  {
    name: 'Card Components',
    item: [
      { name: 'Mouse Tilt Card', href: '/components/mouse-tilt-card', isActive: false, isNew: false },
      { name: 'Post Swiper', href: '/components/post-swiper', isActive: false, isNew: false },
      { name: 'Swipeable Cards', href: '/components/swipeable-cards', isActive: false, isNew: false },
      { name: 'Instagram Card', href: '/components/instagram-card', isActive: false, isNew: false },
      { name: 'Twitter Card', href: '/components/twitter-card', isActive: false, isNew: false },
      { name: 'Facebook Card', href: '/components/facebook-card', isActive: false, isNew: false },
      { name: 'Perspective Card Stack', href: '/components/perspective-card-stack', isActive: false, isNew: true },
      { name: 'Stacked Card Slider', href: '/components/stacked-card-slider', isActive: false, isNew: true },
    ],
  },
  {
    name: 'Interactive Elements',
    item: [
      { name: 'Mouse Trail', href: '/components/mouse-trail', isActive: false, isNew: false },
      { name: 'Context Menu', href: '/components/context-menu', isActive: false, isNew: false },
      { name: 'Project Hover Section', href: '/components/project-hover-section', isActive: false, isNew: true },
      { name: 'Mask Reveal on Hover', href: '/components/mask-reveal-on-hover', isActive: false, isNew: true },
    ],
  },
  {
    name: 'Scroll Animations',
    item: [
      { name: 'Pin Rotate Sections', href: '/components/pin-rotate-sections', isActive: false, isNew: true },
      { name: 'Proof Of Work', href: '/components/proof-of-work', isActive: false, isNew: true },
      { name: 'Images Flow', href: '/components/images-flow', isActive: false, isNew: true },
      { name: 'Section 3D', href: '/components/section-3d', isActive: false, isNew: true },
      { name: 'Flow Art', href: '/components/flow-art', isActive: false, isNew: true },
    ],
  },
  {
    name: 'Text & Animation',
    item: [
      { name: 'Text Loader', href: '/components/text-loader', isActive: false, isNew: false },
      { name: 'Text Scramble Reveal', href: '/components/text-scramble-reveal', isActive: false, isNew: false },
      { name: 'Text Block Effect', href: '/components/text-block-effect', isActive: false, isNew: true },
    ],
  },
];
