import PerspectiveCardStack from '@/ui/components/cards/PerspectiveCardStack';

const PerspectiveCardStackDemo = () => {
  const cards = [
    { image: '/emily.png', alt: 'Card 1' },
    { image: '/daisy0.png', alt: 'Card 2' },
    { image: '/lance0.png', alt: 'Card 3' },
  ];

  return (
    <div className="flex items-center justify-center w-full min-h-[500px] sm:min-h-[500px] p-4 sm:p-6 md:p-8 bg-[#111] rounded-lg">
      <div className="min-w-[300px] min-h-[500px] p-5 flex justify-center items-end">
      <PerspectiveCardStack
        cards={cards}
        cardWidth={320}
        cardHeight={320}
        className="w-full max-w-[680px]"
      />
      </div>
    </div>
  );
};

export { PerspectiveCardStackDemo };
