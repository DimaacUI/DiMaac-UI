'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { cn } from '@/lib/utils';
import { useLenisScroll, getScroller } from '@/contexts/LenisContext';

gsap.registerPlugin(ScrollTrigger);

export interface TextBlockProps {
  blockColor?: string;
  textColor?: string;
  fontFamily?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  blockColor = '#DDFC3E',
  textColor = '#ededed',
  fontFamily = "'DM Sans', sans-serif",
  className,
  style = {},
  children,
}) => (
  <div
    className={cn('relative z-[2] flex max-w-[600px] items-center justify-center text-center', className)}
    data-text-block-wrapper
  >
    <p
      data-text-block
      data-block-color={blockColor}
      className="text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-[1.6] opacity-0"
      style={{ color: textColor, fontFamily, ...style }}
    >
      {children}
    </p>
  </div>
);

interface TextBlockEffectProps {
  children: React.ReactNode;
  className?: string;
  triggerStart?: string;
}

const TextBlockEffect: React.FC<TextBlockEffectProps> = ({
  children,
  className,
  triggerStart = 'top 50%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisContext = useLenisScroll();
  const scroller = getScroller(lenisContext);
  const splitInstancesRef = useRef<SplitType[]>([]);

  useGSAP(
    () => {
      if (!lenisContext.isReady || !containerRef.current) return;

      const texts = containerRef.current.querySelectorAll<HTMLParagraphElement>(
        '[data-text-block]'
      );
      const triggers: ScrollTrigger[] = [];

      texts.forEach((textEl) => {
        try {
          const split = new SplitType(textEl, { types: 'lines', lineClass: 'line' });
          splitInstancesRef.current.push(split);

          const color = textEl.dataset.blockColor ?? '#DDFC3E';
          const lineTexts: HTMLElement[] = [];
          const lineBoxes: HTMLElement[] = [];

          if (split.lines) {
            split.lines.forEach((line) => {
              const lineText = document.createElement('div');
              lineText.className = 'line-text';
              lineText.innerHTML = line.innerHTML;

              const lineBox = document.createElement('div');
              lineBox.className = 'absolute left-[-1%] top-0 h-[102%] w-[102%]';

              line.innerHTML = '';
              line.appendChild(lineText);
              line.appendChild(lineBox);

              gsap.set(textEl, { opacity: 1 });
              gsap.set(lineText, { opacity: 0 });
              gsap.set(lineBox, {
                scaleX: 0,
                transformOrigin: 'left center',
                backgroundColor: color,
              });

              lineTexts.push(lineText);
              lineBoxes.push(lineBox);
            });

            const dur = 0.35;
            const section = textEl.closest('section');
            if (!section) return;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: triggerStart,
                scroller: scroller || undefined,
              },
            });

            tl.to(lineBoxes, {
              scaleX: 1,
              duration: dur,
              stagger: dur,
              ease: 'power2.inOut',
            });
            tl.set(lineTexts, { opacity: 1 });
            tl.to(lineBoxes, {
              scaleX: 0,
              transformOrigin: 'right center',
              duration: dur,
              stagger: dur,
              ease: 'power2.inOut',
            });

            const st = tl.scrollTrigger;
            if (st) triggers.push(st);
          }
        } catch (e) {
          console.warn('[TextBlockEffect] SplitType failed:', e);
        }
      });

      ScrollTrigger.refresh();

      return () => {
        splitInstancesRef.current.forEach((s) => s.revert());
        splitInstancesRef.current = [];
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [lenisContext.isReady, scroller, triggerStart] }
  );

  return (
    <main
      ref={containerRef}
      className={cn('min-h-screen w-full overflow-x-hidden bg-[#0B0B0F] text-[#ededed]', className)}
    >
      {children}
    </main>
  );
};

export default TextBlockEffect;
