'use client';

import { useState, useEffect } from 'react';
import StackedCardSlider from '@/ui/components/cards/StackedCardSlider';
import { cn } from '@/lib/utils';

const CARDS = [
  { image: '/gori.png', alt: 'Gori' },
  { image: '/crocs2.png', alt: 'Snap' },
  { image: '/crow.png', alt: 'Crowley' },
  { image: '/foxy.png', alt: 'Foxy' },
  { image: '/bear.png', alt: 'Bruno' },
  { image: '/redPanda.png', alt: 'Rusty' },
  { image: '/tiger2.png', alt: 'Blaze' },
];

const preloadImages = (sources: { image: string }[]) => {
  return Promise.all(
    sources.map(
      (c) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = c.image;
        })
    )
  );
};

const StackedCardSliderDemo = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    preloadImages(CARDS).then(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="flex items-center justify-center w-full p-4 sm:p-8 bg-[#111] rounded-lg"
      style={{ height: 'calc(100dvh - 56px)' }}
    >
      {isLoading ? (
        <div
          className={cn(
            'relative overflow-hidden rounded border border-white/10',
            'w-full max-w-[300px] sm:max-w-none'
          )}
          style={{ width: 300, aspectRatio: 2 / 3 }}
        >
          <div className="absolute inset-0 bg-white/5 animate-pulse rounded" />
        </div>
      ) : (
        <StackedCardSlider
          cards={CARDS}
          cardWidth={300}
          aspectRatio={2 / 3}
          offsetStep={20}
          wrapperClassName="w-full max-w-[300px] sm:max-w-none"
        />
      )}
    </div>
  );
};

export { StackedCardSliderDemo };
