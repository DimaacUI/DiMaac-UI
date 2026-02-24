'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface PerspectiveCard {
  image: string;
  alt?: string;
}

interface PerspectiveCardStackProps {
  cards: PerspectiveCard[];
  className?: string;
  cardWidth?: number;
  cardHeight?: number;
}


const cardConfigs = [
  {
    zIndex: 3,
    stacked: 'translate(-50%, -50%)',
    fanned: 'translate(-72%, -50%) scale(0.8) rotateY(-48deg)',
  },
  {
    zIndex: 2,
    stacked: 'translate(-50%, -70%) scale(0.9)',
    fanned: 'translate(-52%, -50%) scale(0.7) rotateY(-36deg)',
  },
  {
    zIndex: 1,
    stacked: 'translate(-50%, -90%) scale(0.8)',
    fanned: 'translate(-32%, -50%) scale(0.6) rotateY(-24deg)',
  },
];

const PerspectiveCardStack: React.FC<PerspectiveCardStackProps> = ({
  cards,
  className,
  cardWidth = 360,
  cardHeight = 280,
}) => {
  const visibleCards = cards.slice(0, 3);

  return (
    <>
      <style>{`
        .perspective-stack {
          perspective: 500px;
          transform: scale(1);
          transition: transform 0.2s ease;
        }
        .perspective-stack:hover {
          transform: scale(1);
        }
        .perspective-card {
          position: absolute;
          top: 50%;
          left: 50%;
          cursor: pointer;
          transition: transform 0.4s ease, margin-top 0.4s ease;
        }
        .perspective-card:hover {
          margin-top: -40px;
        }
        ${cardConfigs
          .map(
            (config, i) => `
          .perspective-card-${i} {
            z-index: ${config.zIndex};
            transform: ${config.stacked};
          }
          .perspective-stack:hover .perspective-card-${i} {
            transform: ${config.fanned};
          }
        `
          )
          .join('')}
      `}</style>

      <div
        className={cn(
          'perspective-stack relative flex items-center justify-center w-full max-w-[680px] aspect-[4/3] min-h-[320px]',
          className
        )}
      >
        {visibleCards.map((card, index) => (
          <div
            key={index}
            className={`perspective-card perspective-card-${index} relative overflow-hidden rounded-[10px]`}
            style={{ width: cardWidth, height: cardHeight }}
          >
            <Image
              src={card.image}
              alt={card.alt ?? `Card ${index + 1}`}
              fill
              className="object-cover object-top"
              sizes={`(max-width: 640px) ${cardWidth}px, (max-width: 1024px) ${cardWidth}px, ${cardWidth}px`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PerspectiveCardStack;