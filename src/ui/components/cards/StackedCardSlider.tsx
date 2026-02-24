'use client';

import React, { useRef, useEffect, useCallback, useId } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { cn } from '@/lib/utils';

gsap.registerPlugin(Flip);

export interface StackedCard {
  image: string;
  alt?: string;
}

interface StackedCardSliderProps {
  cards: StackedCard[];
  className?: string;
  wrapperClassName?: string;
  cardWidth?: number;
  offsetStep?: number;
  aspectRatio?: number;
}

const StackedCardSlider: React.FC<StackedCardSliderProps> = ({
  cards,
  className,
  wrapperClassName,
  cardWidth = 300,
  offsetStep = 20,
  aspectRatio = 2 / 3,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const instanceId = useId().replace(/:/g, '');

  const itemClass = `stacked-item-${instanceId}`;

  // Build the initial DOM imperatively since Flip needs direct DOM control
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || cards.length === 0) return;

    slider.innerHTML = '';

    cards.forEach((card, i) => {
      const img = document.createElement('img');
      img.className = itemClass;
      img.src = card.image;
      img.alt = card.alt ?? `Card ${i + 1}`;
      img.draggable = false;
      slider.appendChild(img);
    });
  }, [cards, itemClass]);

  const handleClick = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider || isAnimating.current) return;

    const items = slider.querySelectorAll(`.${itemClass}`);
    if (items.length < 2) return;

    isAnimating.current = true;

    const state = Flip.getState(items);

    const lastItem = items[items.length - 1];

    (lastItem as HTMLElement).style.display = 'none';

    const newItem = document.createElement('img');
    newItem.className = itemClass;
    newItem.src = (lastItem as HTMLImageElement).src;
    newItem.alt = (lastItem as HTMLImageElement).alt;
    newItem.draggable = false;
    slider.insertBefore(newItem, slider.firstChild);

    Flip.from(state, {
      targets: slider.querySelectorAll(`.${itemClass}`),
      ease: 'sine.inOut',
      duration: 0.5,
      absolute: true,
      onEnter: (elements) => {
        return gsap.from(elements, {
          yPercent: 20,
          opacity: 0,
          ease: 'expo.out',
        });
      },
      onLeave: (elements) => {
        return gsap.to(elements, {
          yPercent: 20,
          xPercent: -20,
          transformOrigin: 'bottom left',
          opacity: 0,
          ease: 'expo.out',
          onComplete() {
            elements.forEach((el) => {
              if (el.parentNode === slider) {
                slider.removeChild(el);
              }
            });
          },
        });
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, []);

  const visibleCount = Math.min(cards.length, 5);
  const totalOffset = offsetStep * (visibleCount - 1);

  const scope = `[data-stacked-id="${instanceId}"]`;

  return (
    <>
      {/* Scoped styles - useId prevents conflicts when multiple instances on same page */}
      <style>{`
        ${scope} img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        ${Array.from({ length: visibleCount })
          .map((_, i) => {
            const reverseIndex = visibleCount - 1 - i;
            return `${scope} img:nth-child(${i + 1}) {
              left: ${reverseIndex * offsetStep}px;
              top: ${-reverseIndex * offsetStep}px;
            }`;
          })
          .join('\n')}
      `}</style>

      <div
        data-stacked-id={instanceId}
        className={cn('flex justify-center items-center', wrapperClassName)}
      >
        <div
          ref={sliderRef}
          onClick={handleClick}
          className={cn('relative cursor-pointer select-none', className)}
          style={{
            width: cardWidth,
            aspectRatio,
            marginRight: totalOffset,
          }}
        />
      </div>
    </>
  );
};

export default StackedCardSlider;
