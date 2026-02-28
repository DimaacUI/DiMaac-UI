import PerspectiveCardStack from '@/ui/components/cards/PerspectiveCardStack';

const PerspectiveCardStackDemo = () => {
  const cards = [
    { image: '/gori.png', alt: 'Gori' },
    { image: '/crocs.png', alt: 'Chompy' },
    { image: '/snake.png', alt: 'Slither' },
  ];

  return (
    <div className="flex items-center justify-center w-full min-h-[500px] sm:min-h-[500px] p-4 sm:p-6 md:p-8 bg-[#17171A] rounded-lg">
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
