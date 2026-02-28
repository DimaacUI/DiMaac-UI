import SwipeableCards from '@/ui/components/cards/SwipeableCards';

const SwipeableCardsDemo = () => {
  const images = [
    { src: "/gori.png", alt: "Gori" },
    { src: "/crow.png", alt: "Crowley" },
    { src: "/crocs2.png", alt: "Snap" },
    { src: "/foxy.png", alt: "Foxy" },
    { src: "/snake.png", alt: "Slither" },
    { src: "/bear.png", alt: "Bruno" },
    { src: "/owl.png", alt: "Hoot" },
    { src: "/crocs.png", alt: "Chompy" },
    { src: "/tiger.png", alt: "Rajah" },
    { src: "/bulldog.png", alt: "Tank" },
    { src: "/redPanda.png", alt: "Rusty" },
    { src: "/tiger2.png", alt: "Blaze" },
    { src: "/gori.png", alt: "Gori" },
    { src: "/crow.png", alt: "Crowley" },
    { src: "/crocs2.png", alt: "Snap" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden py-8">
      <SwipeableCards className="" images={images} loop />
    </div>
  );
};

export { SwipeableCardsDemo };
