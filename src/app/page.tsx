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
    }
  ]
  return (

      <div className="flex-1 md:mt-[1rem]">
        <HomeGrid grid={grid}></HomeGrid>
      </div>
  );
}
