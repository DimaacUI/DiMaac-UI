import SwipeableCards from '@/ui/components/cards/SwipeableCards';

const SwipeableCardsDemo = () => {
  const images = [
    {
      src: "/daisy.png",
      alt: "Daisy",
    },
    {
      src: "/emily.png",
      alt: "Emily",
    },
    {
      src: "/lance.png",
      alt: "Lance",
    },
    {
      src: "/linda.png",
      alt: "Linda",
    },
    {
      src: "/renei.png",
      alt: "Renei",
    },
    {
      src: "/roiin.png",
      alt: "Roiin",
    },{
      src: "/emily.png",
      alt: "Emily",
    },
    {
      src: "/lance.png",
      alt: "Lance",
    },
    {
      src: "/linda.png",
      alt: "Linda",
    },
    {
      src: "/daisy.png",
      alt: "Daisy",
    },
    {
      src: "/renei.png",
      alt: "Renei",
    },
    {
      src: "/roiin.png",
      alt: "Roiin",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden py-8">
      <SwipeableCards className="" images={images} loop />
    </div>
  );
};

export { SwipeableCardsDemo };
