import TextBlockEffect, { TextBlock } from '@/ui/components/text/TextBlockEffect';

const TextBlockEffectDemo = () => (
  <TextBlockEffect>
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-8">
      <TextBlock blockColor="#DDFC3E" textColor="#ededed" fontFamily="var(--font-bricolage-grotesque), sans-serif">
        We believe in the quiet power of ideas. The ones that sit with you long after you've looked away.
      </TextBlock>
    </section>

    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-8">
      <img
        src="https://images.pexels.com/photos/34034854/pexels-photo-34034854.jpeg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ filter: 'brightness(0.55) saturate(0.8)' }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: 'rgba(11, 11, 15, 0.5)' }}
      />
      <TextBlock blockColor="#DDFC3E" textColor="#ededed" fontFamily="var(--font-bricolage-grotesque), sans-serif">
        Some things are felt before they're understood. We craft those in-between moments — still,
        sharp, and unforgettable.
      </TextBlock>
    </section>

    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-8">
      <TextBlock blockColor="#DDFC3E" textColor="#ededed" fontFamily="var(--font-bricolage-grotesque), sans-serif">
        Not louder. Not faster. Just closer to something that actually matters.
      </TextBlock>
    </section>
  </TextBlockEffect>
);

export { TextBlockEffectDemo };
