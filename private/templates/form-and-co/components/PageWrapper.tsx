"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wraps each page. Because pages remount on route change, mounting here plays
 * a staggered entrance for direct children that opt in with `data-stagger`
 * via the `stagger` variant, and fades the page body in after the wipe.
 */
export default function PageWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className={`min-h-screen ${className}`}
    >
      {children}
    </motion.main>
  );
}
