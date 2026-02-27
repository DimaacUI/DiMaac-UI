import HomeGrid from "../core/components/HomeGrid";

export default function Home() {
  const grid = [
    // Layout Components
    {
      img: "/expandablePanel.png",
      title: "Expandable Panel",
      description: "Interactive panels that expand on click with smooth animations.",
      href: "/components/expandable-panel",
      isNew: false,
    },
    // Gallery & Media
    {
      img: "/imageGallery.png",
      title: "Image Gallery",
      description: "Interactive circular gallery with drag-to-spin functionality.",
      href: "/components/image-gallery",
      isNew: false,
    },
    {
      img: "/scrollingGallery.png",
      title: "Scrolling Gallery",
      description: "Smooth scrolling gallery with parallax effects and dynamic height.",
      href: "/components/scrolling-gallery",
      isNew: false,
    },
    {
      img: "/liquidImageReveal.png",
      title: "Liquid Image Reveal",
      description: "Organic fluid reveal effect using SVG filters and GSAP animations.",
      href: "/components/liquid-image-reveal",
      isNew: false,
    },
    // Card Components
    {
      img: "/mouseTiltCard.png",
      title: "Mouse Tilt Card",
      description: "3D tilt cards with glare effects that respond to mouse movement.",
      href: "/components/mouse-tilt-card",
      isNew: false,
    },
    {
      img: "/postSwiper.png",
      title: "Post Swiper",
      description: "Unified swipeable component for social media cards with smooth gestures.",
      href: "/components/post-swiper",
      isNew: true,
    },
    {
      img: "/swipeableCards.png",
      title: "Swipeable Cards",
      description: "Touch-friendly card stack with smooth swipe gestures.",
      href: "/components/swipeable-cards",
      isNew: false,
    },
    {
      img: "/instagramCard.png",
      title: "Instagram Post",
      description: "Instagram post card with profile image, verified badge, and username.",
      href: "/components/instagram-card",
      isNew: true,
    },
    {
      img: "/twitterCard.png",
      title: "Twitter Card",
      description: "Twitter/X post card with interactive elements, animations, and authentic styling.",
      href: "/components/twitter-card",
      isNew: true,
    },
    {
      img: "/facebookCard.png",
      title: "Facebook Card",
      description: "Facebook post card with profile, content, and interactive like/comment/share buttons.",
      href: "/components/facebook-card",
      isNew: true,
    },
    {
      img: "/mouseTiltCard.png",
      title: "Perspective Card Stack",
      description: "3D card stack that fans out on hover with perspective transforms.",
      href: "/components/perspective-card-stack",
      isNew: true,
    },
    {
      img: "/mouseTiltCard.png",
      title: "Stacked Card Slider",
      description: "Click to cycle through stacked cards with GSAP Flip - clone, hide, onEnter/onLeave.",
      href: "/components/stacked-card-slider",
      isNew: true,
    },
    {
      img: "/mouseTrail.png",
      title: "Mouse Trail",
      description: "Dynamic image trail that follows your mouse cursor.",
      href: "/components/mouse-trail",
      isNew: false,
    },
    {
      img: "/contextMenu.png",
      title: "Context Menu",
      description: "Right-click context menus with GSAP animations and smart positioning.",
      href: "/components/context-menu",
      isNew: false,
    },
    {
      img: "/imageGallery.png",
      title: "Project Hover Section",
      description: "Project list with hover-to-reveal floating thumbnails that follow your mouse. Mobile: tap-to-expand.",
      href: "/components/project-hover-section",
      isNew: true,
    },
    {
      img: "/textScrambleReveal.png",
      title: "Mask Reveal on Hover",
      description: "Circular mask follows cursor to reveal alternate content. Mask grows on hover, shrinks on leave.",
      href: "/components/mask-reveal-on-hover",
      isNew: true,
    },
    // Scroll Animations
    {
      img: "/scrollingGallery.png",
      title: "Pin Rotate Sections",
      description: "Full-page scroll: pinned sections scale, rotate in 3D, and fade as you scroll. GSAP ScrollTrigger.",
      href: "/components/pin-rotate-sections",
      isNew: true,
    },
    {
      img: "/scrollingGallery.png",
      title: "Proof Of Work",
      description: "Grid of works with scroll-triggered reveal: rotation, y-offset, opacity. Staggered on desktop.",
      href: "/components/proof-of-work",
      isNew: true,
    },
    {
      img: "/scrollingGallery.png",
      title: "Images Flow",
      description: "Pinned section: images flow from center into 3D spread. Intro, flow, outro.",
      href: "/components/images-flow",
      isNew: true,
    },
    {
      img: "/scrollingGallery.png",
      title: "Section 3D",
      description: "Pinned cards fade, lift, tilt back as you scroll. Simple intro + 3D scroll.",
      href: "/components/section-3d",
      isNew: true,
    },
    {
      img: "/scrollingGallery.png",
      title: "Flow Art",
      description: "Colorful sections pin on scroll. Containers rotate in from 30° as you scroll.",
      href: "/components/flow-art",
      isNew: true,
    },
    // Text & Animation
    {
      img: "/textLoader.png",
      title: "Text Loader",
      description: "Animated text loader with gradient reveals and smooth transitions.",
      href: "/components/text-loader",
      isNew: false,
    },
    {
      img: "/textScrambleReveal.png",
      title: "Text Scramble Reveal",
      description: "Interactive text that scrambles on mouse proximity with custom characters.",
      href: "/components/text-scramble-reveal",
      isNew: false,
    },
    {
      img: "/textScrambleReveal.png",
      title: "Text Block Effect",
      description: "Scroll-triggered line reveal. Colored block sweeps in, text appears, block sweeps out.",
      href: "/components/text-block-effect",
      isNew: true,
    }
  ]
  return (

      <div className="flex-1 md:mt-[1rem]">
        <HomeGrid grid={grid}></HomeGrid>
      </div>
  );
}
