import MouseTrail from '@/ui/components/interactive/MouseTrail';

const MouseTrailDemo = () => {
  const trailImages = [
    "/gori.webp",
    "/crow.webp",
    "/crocs2.webp",
    "/foxy.webp",
    "/snake.webp",
    "/bear.webp",
    "/owl.webp",
    "/crocs.webp",
    "/tiger.webp",
    "/bulldog.webp",
    "/redPanda.webp",
    "/tiger2.webp",
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
          Meet the Crew<br />Move Your Mouse
        </h1>
      </div>
    </div>
  );
};

export { MouseTrailDemo };
