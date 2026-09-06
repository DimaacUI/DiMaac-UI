import SwipeableCards from '@/ui/components/cards/SwipeableCards';

const SwipeableCardsDemo = () => {
  const images = [
    { src: "/gori.webp", alt: "Gori" },
    { src: "/crow.webp", alt: "Crowley" },
    { src: "/crocs2.webp", alt: "Snap" },
    { src: "/foxy.webp", alt: "Foxy" },
    { src: "/snake.webp", alt: "Slither" },
    { src: "/bear.webp", alt: "Bruno" },
    { src: "/owl.webp", alt: "Hoot" },
    { src: "/crocs.webp", alt: "Chompy" },
    { src: "/tiger.webp", alt: "Rajah" },
    { src: "/bulldog.webp", alt: "Tank" },
    { src: "/redPanda.webp", alt: "Rusty" },
    { src: "/tiger2.webp", alt: "Blaze" },
    { src: "/gori.webp", alt: "Gori" },
    { src: "/crow.webp", alt: "Crowley" },
    { src: "/crocs2.webp", alt: "Snap" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden py-8">
      <SwipeableCards className="" images={images} loop />
    </div>
  );
};

export { SwipeableCardsDemo };
