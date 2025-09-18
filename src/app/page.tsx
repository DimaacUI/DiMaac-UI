import HomeGrid from "../core/components/HomeGrid";

export default function Home() {
  const grid = [
    // Layout Components
    {
      img: "/expandablePanel.png",
      title: "Expandable Panel",
      description: "Interactive panels that expand on click with smooth animations.",
      href: "/components/expandable-panel",
      isNew: true,
    },
    // Gallery & Media
    {
      img: "/imageGallery.png",
      title: "Image Gallery",
      description: "Interactive circular gallery with drag-to-spin functionality.",
      href: "/components/image-gallery",
      isNew: true,
    },
    {
      img: "/scrollingGallery.png",
      title: "Scrolling Gallery",
      description: "Smooth scrolling gallery with parallax effects and dynamic height.",
      href: "/components/scrolling-gallery",
      isNew: true,
    },
    {
      img: "/liquidImageReveal.png",
      title: "Liquid Image Reveal",
      description: "Organic fluid reveal effect using SVG filters and GSAP animations.",
      href: "/components/liquid-image-reveal",
      isNew: true,
    },
    // Card Components
    {
      img: "/mouseTiltCard.png",
      title: "Mouse Tilt Card",
      description: "3D tilt cards with glare effects that respond to mouse movement.",
      href: "/components/mouse-tilt-card",
      isNew: true,
    },
    {
      img: "/swipeableCards.png",
      title: "Swipeable Cards",
      description: "Touch-friendly card stack with smooth swipe gestures.",
      href: "/components/swipeable-cards",
      isNew: true,
    },
    // Interactive Elements
    {
      img: "/mouseTrail.png",
      title: "Mouse Trail",
      description: "Dynamic image trail that follows your mouse cursor.",
      href: "/components/mouse-trail",
      isNew: true,
    },
    {
      img: "/contextMenu.png",
      title: "Context Menu",
      description: "Right-click context menus with GSAP animations and smart positioning.",
      href: "/components/context-menu",
      isNew: true,
    },
    // Text & Animation
    {
      img: "/textLoader.png",
      title: "Text Loader",
      description: "Animated text loader with gradient reveals and smooth transitions.",
      href: "/components/text-loader",
      isNew: true,
    },
    {
      img: "/textScrambleReveal.png",
      title: "Text Scramble Reveal",
      description: "Interactive text that scrambles on mouse proximity with custom characters.",
      href: "/components/text-scramble-reveal",
      isNew: true,
    }
  ]
  return (

      <div className="flex-1 md:mt-[1rem]">
        <HomeGrid grid={grid}></HomeGrid>
      </div>
  );
}
