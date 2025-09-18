import MouseTrail from '@/ui/components/interactive/MouseTrail';

const MouseTrailDemo = () => {
  // Custom images for the demo
  const trailImages = [
    "/daisy0.png",
    "/emily0.png",
    "/lance0.png",
    "/renei0.png",
    "/linda0.png",
    "/roiin0.png",
    "/lylia0.png",
  ];

  return (
    <div className="w-full h-screen relative">
      <MouseTrail
        images={trailImages}
        imageWidth={140}
        imageHeight={200}
        stagger={0.03}
        duration={0.5}
        ease="power3.out"
      />
      
      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/20 text-center tracking-tight px-4">
          Move Your Mouse<br />To See Magic
        </h1>
      </div>
    </div>
  );
};

export { MouseTrailDemo };
