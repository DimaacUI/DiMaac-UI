"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useUI } from "@/context/UIContext";

type Props = {
  children: ReactNode;
  className?: string;
  /** How strongly the element is pulled toward the cursor (0–1). */
  strength?: number;
  onClick?: () => void;
};

// Just past critical damping for this mass, so the button settles back in one
// clean move. The previous spring was underdamped and wobbled for a beat after
// every leave — the "jelly" feel.
const SPRING = { stiffness: 220, damping: 24, mass: 0.5 };

/**
 * Magnetic wrapper — the element drifts toward the pointer while hovered and
 * settles back on leave. Used for the circular arrow CTA.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const { setCursor } = useUI();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setCursor("default");
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      // A ring, not the drag arrow: the button already carries its own arrow,
      // and a second one riding the cursor over it read as a duplicate.
      onMouseEnter={() => setCursor("link")}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
