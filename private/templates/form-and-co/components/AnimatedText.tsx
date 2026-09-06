"use client";

import { motion, useInView } from "framer-motion";
import { ElementType, useRef } from "react";

type Props = {
  text: string;
  /** Rendered wrapper element (h1, h2, p…). */
  as?: ElementType;
  className?: string;
  /** Per-word stagger in seconds. */
  stagger?: number;
  delay?: number;
  /** Animate once on scroll-in (default) or every time it enters view. */
  once?: boolean;
};

/**
 * Word-by-word reveal: each word sits in a clip mask and rises into place,
 * staggered. Triggers when scrolled into view. Pure CSS transforms → 60fps.
 */
export default function AnimatedText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.045,
  delay = 0,
  once = true,
}: Props) {
  const words = text.split(" ");

  // Observe the OUTER (un-clipped) heading element, not the translated word
  // spans. Each word starts at y:110% inside an overflow-hidden mask, so it is
  // clipped to zero area — attaching whileInView there deadlocks the observer
  // (it never registers as intersecting, so the reveal never fires). The Tag
  // itself is always in normal flow, so its in-view state is reliable.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  // Each word sits in an `inline-flex overflow-hidden` mask. We use those
  // layered Tailwind utilities rather than the unlayered `.reveal-mask` class:
  // `.reveal-mask` sets display:block and, being unlayered, overrides the
  // inline-flex utility — forcing every word to full container width and
  // clipping long ones. Inline-flex masks size to their word, so nothing clips.
  return (
    <Tag ref={ref as any} className={className}>
      {words.map((word, i) => (
        // The mask clips the word during its rise. Tight display leading means
        // the line box is shorter than the glyphs, so a plain overflow-hidden
        // mask shears ascenders/descenders (the tails of j/p/g/y). The inner
        // span carries vertical padding to give the ink room inside the clip,
        // and the mask cancels it with equal negative margins so the line
        // rhythm stays exactly as tight as before.
        <span key={i} className="inline-flex overflow-hidden -mt-[0.38em] -mb-[0.34em]">
          <motion.span
            className="inline-block will-change-transform pt-[0.38em] pb-[0.34em]"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.7,
              ease: [0.33, 1, 0.68, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
            {/* Preserve inter-word spacing inside the inline-flex masks. */}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
