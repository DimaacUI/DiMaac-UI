import LiquidImageReveal from '@/ui/components/reveals/image/LiquidImageReveal';

const LiquidImageRevealDemo = () => {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <div className="flex gap-5 h-fit px-4 flex-wrap justify-center items-center">
        <div className="rounded-2xl overflow-hidden w-fit h-[440px]">
        <LiquidImageReveal
          src="/gori.png"
          alt="Gori the Gorilla"
          width={300}
          height={450}
          duration={2.5}
          delay={0}
          turbulenceFrequency={0.02}
          displacementScale={80}
        />
        </div>
        
        <div className="rounded-2xl overflow-hidden w-fit h-[440px]">
        <LiquidImageReveal
          src="/crocs2.png"
          alt="Snap the Croc"
          width={300}
          height={450}
          duration={2.5}
          delay={0}
          turbulenceFrequency={0.02}
          displacementScale={80}
        />
        </div>
        
        <div className="rounded-2xl overflow-hidden w-fit h-[440px]">
        <LiquidImageReveal
          src="/snake.png"
          alt="Slither the Snake"
          width={300}
          height={450}
          duration={2.5}
          delay={0}
          turbulenceFrequency={0.02}
          displacementScale={80}
        />
        </div>
      </div>
    </div>
  );
};

export { LiquidImageRevealDemo };
