"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useCursorMode } from "@/context/UIContext";

// Matches --accent / theme.colors.accent. The old value here was the orange of
// an earlier palette, so the "view" disc never matched the rest of the site.
const ACCENT = "#2F50F2";

/**
 * Custom cursor. A small ink dot that morphs by `cursor` mode:
 *  - default → tiny dot
 *  - link    → larger ring
 *  - view    → filled accent disc with "VIEW" label (over imagery)
 *  - drag    → wide ring with an arrow
 * Rendered only on fine-pointer (non-touch) devices.
 */
export default function Cursor() {
  const cursor = useCursorMode();
  const [enabled, setEnabled] = useState(false);

  // Position tracks the pointer 1:1. It used to run through a spring, and a
  // cursor that arrives after the pointer reads as lag, not weight — the weight
  // belongs in how the shape morphs, below, not in where it is.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  // Per-mode geometry.
  const sizes: Record<string, number> = { default: 10, link: 52, view: 84, drag: 64 };
  const size = sizes[cursor] ?? 10;
  const filled = cursor === "view";

  return (
    // Difference-blending keeps the dot and ring legible over anything, but a
    // blended accent disc turns a muddy yellow over paper — so the filled mode
    // opts out and shows its true colour.
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[120] ${filled ? "" : "mix-blend-difference"}`}
      style={{ x, y }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        animate={{
          width: size,
          height: size,
          backgroundColor: filled ? ACCENT : cursor === "default" ? "#ffffff" : "rgba(255,255,255,0)",
          borderWidth: cursor === "default" || filled ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.5 }}
        style={{ borderColor: "#ffffff", translateX: "-50%", translateY: "-50%" }}
      >
        {cursor === "view" && (
          <span className="font-mono text-[9px] uppercase tracking-label text-paper">View</span>
        )}
        {cursor === "drag" && <span className="text-lg leading-none text-paper">→</span>}
      </motion.div>
    </motion.div>
  );
}
