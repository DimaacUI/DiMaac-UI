import MouseTiltCard from '@/ui/components/cards/MouseTiltCard';

const MouseTiltCardDemo = () => {
  const cards = [
    {
      image: "/roiin.png",
      heading: "Wizard King",
      subheading: "Ruler of the Forest"
    },
    {
      image: "/daisy.png", 
      heading: "Mace Witch",
      subheading: "Beauty With Brains"
    },
    {
      image: "/emily.png",
      heading: "Princess of the Forest", 
      subheading: "The Forest's Guardian"
    }
  ];

  return (
    <div className="flex items-center justify-center w-full p-8">
      <div className="flex flex-wrap gap-8 justify-center max-w-5xl">
        {/* Original Style Cards */}
        {cards.map((card, index) => (
          <MouseTiltCard
            key={index}
            tiltIntensity={12}
            scale={1.03}
            glareIntensity={0.08}
          >
            {/* Custom Card Design - Users can create any design they want */}
            <div className="h-96 w-60 bg-black relative flex flex-col rounded-lg overflow-hidden shadow-[3px_3px_10px_rgba(0,0,0,0.5)]">
              {/* Background Image */}
              <img 
                src={card.image} 
                alt={card.heading} 
                className="h-full w-full object-cover absolute inset-0 z-0"
              />
              
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 z-10" 
                style={{
                  background: "linear-gradient(to top, #000, transparent)"
                }}
              />
              
              {/* Content */}
              <div className="relative z-20 mt-auto p-4">
                <h2 className="text-sm text-white/80 font-medium">
                  {card.heading}
                </h2>
                <p className="text-xs text-white/60 font-light mt-1">
                  {card.subheading}
                </p>
              </div>
            </div>
          </MouseTiltCard>
        ))}
      </div>
    </div>
  );
};

export { MouseTiltCardDemo };
