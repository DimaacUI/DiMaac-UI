import StackedCardSlider from '@/ui/components/cards/StackedCardSlider';

const StackedCardSliderDemo = () => {
  const cards = [
    { image: '/emily.png', alt: 'Card 1' },
    { image: '/daisy0.png', alt: 'Card 2' },
    { image: '/lance0.png', alt: 'Card 3' },
    { image: '/renei0.png', alt: 'Card 4' },
    { image: '/roiin0.png', alt: 'Card 5' },
  ];

  return (
    <div className="flex items-center justify-center w-full p-4 sm:p-8 bg-[#111] rounded-lg" style={{
      height: "calc(100dvh - 56px)"
    }}>
      <StackedCardSlider
        cards={cards}
        cardWidth={300}
        aspectRatio={2 / 3}
        offsetStep={20}
        wrapperClassName="w-full max-w-[300px] sm:max-w-none"
      />
    </div>
  );
};

export { StackedCardSliderDemo };
