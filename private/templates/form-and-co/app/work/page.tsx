"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import AnimatedText from "@/components/AnimatedText";
import TransitionLink from "@/components/TransitionLink";
import { pexels, work } from "@/lib/data";

export default function WorkPage() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preview follows the pointer. Stiff and overdamped: enough smoothing to
  // feel weighted, not enough to trail the cursor or overshoot when it stops.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 380, damping: 38, mass: 0.4 });
  const y = useSpring(my, { stiffness: 380, damping: 38, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <PageWrapper className="px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      {/* Page header */}
      <header className="mb-16 flex flex-col gap-6 border-b hairline border-b-ink/20 pb-10 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
        <AnimatedText
          as="h1"
          text="work"
          className="block font-display text-mega leading-[0.78] tracking-tighter lowercase"
        />
        <div className="max-w-[36ch]">
          <p className="label mb-3 text-ink/50">Index — {work.length} projects</p>
          <p className="micro-copy">
            A selection of recent engagements across brand, product, and print.
            Hover an entry to preview; select to open the case study.
          </p>
        </div>
      </header>

      {/* Interactive list */}
      <div ref={containerRef} className="relative" onMouseMove={onMove}>
        {/* Cursor-following preview image. */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="preview"
              className="pointer-events-none absolute z-10 hidden sm:block"
              style={{ x, y, left: -160, top: -200 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Shown in colour: the site keeps imagery grayscale until you hover,
                  and this preview *is* the hover. Covers crossfade rather than
                  hard-cut as the pointer moves down the list. */}
              <div className="relative h-[320px] w-[260px] overflow-hidden bg-ink/5">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.img
                    key={work[active].slug}
                    src={pexels(work[active].cover, 500, 640)}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ul>
          {work.map((p, i) => (
            <li key={p.slug} className="border-b hairline border-b-ink/20">
              <TransitionLink href={`/work/${p.slug}`} cursorMode="view" className="group block">
                <motion.div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="flex flex-col gap-3 py-5 sm:grid sm:grid-cols-12 sm:items-center sm:gap-2 sm:py-6"
                  // Opacity only — it composites. This row used to animate its
                  // padding, which forces a layout pass on every frame of the
                  // hover and is exactly the kind of thing that stutters.
                  animate={{ opacity: active === null || active === i ? 1 : 0.35 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  {/* Title line — index + name. On desktop the wrapper dissolves
                      (sm:contents) so children drop straight into the grid. */}
                  <div className="flex items-baseline gap-3 sm:contents">
                    <span
                      className={`font-mono text-sm transition-colors duration-300 sm:col-span-1 ${
                        active === i ? "text-accent" : "text-ink/40"
                      }`}
                    >
                      {p.index}
                    </span>
                    {/* The title glides right on hover — a transform, so the
                        rest of the row and the hairline underneath hold still. */}
                    <motion.span
                      animate={{ x: active === i ? 18 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display text-[8vw] leading-[1.02] tracking-tight lowercase sm:col-span-6 sm:text-[2.5vw]"
                    >
                      {p.title}
                    </motion.span>
                  </div>

                  {/* Meta line — one clean row on mobile, columns on desktop. */}
                  <div className="flex items-center justify-between pl-9 sm:contents sm:pl-0">
                    <span className="label text-ink/55 sm:col-span-2 sm:col-start-auto">
                      {p.category}
                    </span>
                    <span className="label hidden text-ink/55 sm:col-span-1 sm:block">
                      {p.services[0]}
                    </span>
                    <span className="flex items-center justify-end text-ink/55 sm:col-span-2">
                      <span className="label inline-flex items-center gap-2 transition-transform duration-500 group-hover:translate-x-1">
                        {p.year} <span className="text-accent">→</span>
                      </span>
                    </span>
                  </div>
                </motion.div>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </PageWrapper>
  );
}
