"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { site } from "@/lib/data";

type TransitionState = {
  /** Intercept a navigation: play the cover wipe, push the route, then reveal. */
  navigateTo: (href: string) => void;
  isAnimating: boolean;
};

const TransitionContext = createContext<TransitionState | null>(null);

// Shared easing/timing so the wipe always feels like one choreographed move.
const COVER = { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const };
const REVEAL = { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const };

/**
 * Coordinates full-screen overlay wipes with App Router navigation.
 *
 * Sequence:
 *   1. navigateTo() slides the accent panel UP from below to fully cover.
 *   2. once covered, router.push() swaps the route underneath.
 *   3. a pathname change triggers the reveal: the panel slides further UP and
 *      off the top, uncovering the freshly-mounted page.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimationControls();
  const labelControls = useAnimationControls();
  const [isAnimating, setIsAnimating] = useState(false);
  const firstRender = useRef(true);

  const navigateTo = useCallback(
    async (href: string) => {
      if (href === pathname || isAnimating) return;
      setIsAnimating(true);
      // Reveal the wordmark as the panel rises.
      labelControls.set({ opacity: 0, y: 20 });
      labelControls.start({ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.15 } });
      await controls.start({ y: "0%", transition: COVER });
      router.push(href);
    },
    [pathname, isAnimating, router, controls, labelControls],
  );

  // React to the route actually changing → play the reveal.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    let cancelled = false;
    // Let the new page paint a frame before uncovering it.
    const t = setTimeout(async () => {
      // Reset scroll to the top of the new page while it's hidden.
      window.scrollTo(0, 0);
      labelControls.start({ opacity: 0, transition: { duration: 0.25 } });
      await controls.start({ y: "-100%", transition: REVEAL });
      if (cancelled) return;
      controls.set({ y: "100%" }); // park below the fold for next time
      setIsAnimating(false);
    }, 90);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [pathname, controls, labelControls]);

  return (
    <TransitionContext.Provider value={{ navigateTo, isAnimating }}>
      {children}

      {/* Full-screen wipe panel. Parked below the fold at y:100%. */}
      <motion.div
        aria-hidden
        initial={{ y: "100%" }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-accent"
      >
        <motion.span
          animate={labelControls}
          initial={{ opacity: 0, y: 20 }}
          className="font-display text-paper text-[clamp(3rem,12vw,9rem)] leading-none lowercase"
        >
          {site.word}
          <span className="text-paper/70">.</span>
        </motion.span>
      </motion.div>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within <TransitionProvider>");
  return ctx;
}
