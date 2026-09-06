"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";
import { useUI } from "@/context/UIContext";
import { pexels, work } from "@/lib/data";

const DURATION = 4200; // ms per slide

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * The hero showpiece — a slick auto-advancing slider through every project
 * cover. Each slide wipes in with a clip-path reveal over a slow Ken-Burns
 * zoom; an accent progress bar tracks autoplay. The arrow advances slides;
 * clicking the frame (or the name chip) opens that project through the page
 * transition. Reused by both the mobile and desktop hero layouts.
 */
export default function HeroSlider({ className = "" }: { className?: string }) {
  const { navigateTo } = useTransition();
  const { setCursor } = useUI();
  const [[index, dir], setSlide] = useState<[number, number]>([0, 1]);
  const count = work.length;

  const go = useCallback(
    (d: number) => setSlide(([i]) => [(i + d + count) % count, d]),
    [count],
  );

  // Autoplay — restarts on every slide change (manual or auto).
  useEffect(() => {
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [index, go]);

  const active = work[index];

  return (
    <div className={`group relative overflow-hidden bg-ink/5 ${className}`}>
      {/* ---- Slides ---- */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.button
          key={active.slug}
          type="button"
          aria-label={`Open ${active.title}`}
          onClick={() => navigateTo(`/work/${active.slug}`)}
          onMouseEnter={() => setCursor("view")}
          onMouseLeave={() => setCursor("default")}
          className="absolute inset-0 block h-full w-full"
          initial={{ clipPath: dir > 0 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0% 0)", transition: { duration: 0.8, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.55 } }}
        >
          <motion.img
            src={pexels(active.cover, 900, 1200)}
            alt={active.title}
            draggable={false}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1, transition: { duration: 6, ease: "linear" } }}
            className="img-editorial h-full w-full object-cover"
          />
        </motion.button>
      </AnimatePresence>

      {/* ---- Autoplay progress bar ---- */}
      <motion.div
        key={`bar-${index}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: DURATION / 1000, ease: "linear" }}
        style={{ originX: 0 }}
        className="absolute left-0 top-0 z-20 h-[3px] w-full bg-accent"
      />

      {/* ---- Counter (top-right) ---- */}
      <div className="pointer-events-none absolute right-3 top-4 z-20 mix-blend-difference">
        <p className="label text-paper">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>

      {/* ---- Project name chip (bottom-left) ---- */}
      <div className="absolute bottom-0 left-0 z-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.button
            key={active.slug}
            type="button"
            onClick={() => navigateTo(`/work/${active.slug}`)}
            onMouseEnter={() => setCursor("view")}
            onMouseLeave={() => setCursor("default")}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-baseline gap-2.5 bg-accent px-3.5 py-2.5 text-paper sm:gap-3 sm:px-4 sm:py-3"
          >
            <span className="font-mono text-[10px]">{active.index}</span>
            <span className="font-display text-base lowercase leading-none tracking-tight sm:text-lg">
              {active.title}
            </span>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* ---- Advance arrow (bottom-right) ---- */}
      <button
        type="button"
        aria-label="Next project"
        onClick={() => go(1)}
        onMouseEnter={() => setCursor("link")}
        onMouseLeave={() => setCursor("default")}
        // Its own hover group: with the slider's `group` it nudged whenever the
        // pointer was anywhere on the image, which made it feel disconnected.
        className="group/arrow absolute bottom-0 right-0 z-20 flex h-12 w-12 items-center justify-center bg-ink text-paper transition-colors duration-300 hover:bg-accent sm:h-14 sm:w-14"
      >
        <span className="text-lg leading-none transition-transform duration-500 ease-expo group-hover/arrow:translate-x-1">
          →
        </span>
      </button>
    </div>
  );
}
