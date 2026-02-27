'use client';

import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from '@/contexts/LenisContext';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface LenisScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A scroll area with Lenis smooth scrolling. Use when content scrolls inside a fixed container
 * (e.g. fullscreen preview). Provides scroller via LenisContext for ScrollTrigger consumers.
 */
export default function LenisScrollArea({ children, className }: LenisScrollAreaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (wrapperRef.current && contentRef.current) setIsReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!isReady || !wrapperRef.current || !contentRef.current) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    const lenis = new Lenis({
      wrapper,
      content,
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect: () => wrapper.getBoundingClientRect(),
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.scrollerProxy(wrapper, {});
    };
  }, [isReady]);

  return (
    <LenisProvider value={{ scrollerRef: wrapperRef, isReady }}>
      <div ref={wrapperRef} className={cn('flex-1 overflow-hidden', className)}>
        <div ref={contentRef} className="min-h-full w-full flex items-start justify-center">
          {children}
        </div>
      </div>
    </LenisProvider>
  );
}
