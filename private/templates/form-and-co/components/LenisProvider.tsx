"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

// Module-level handle so navigation code can reset scroll without prop drilling.
let lenisRef: Lenis | null = null;

/** Mounts a single Lenis smooth-scroll instance for the whole app. */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef = lenis;

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef = null;
    };
  }, []);

  // Jump to the top instantly whenever the route changes (the wipe hides it).
  useEffect(() => {
    lenisRef?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
