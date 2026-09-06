"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";
import { site } from "@/lib/data";
import TransitionLink from "./TransitionLink";

/**
 * Persistent header — lives in the layout and never unmounts between routes.
 * Minimal by design: a wordmark on the left, a live season tag, and a single
 * Menu trigger on the right that opens the full-screen <FullscreenMenu />.
 * Uses mix-blend-difference so it stays legible over any background.
 */
export default function Header() {
  const { setCursor, menuOpen, setMenuOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[80] mix-blend-difference">
      <div
        className={`flex items-center justify-between px-5 text-paper transition-[padding] duration-500 sm:px-8 ${
          scrolled ? "py-3 sm:py-4" : "py-5 sm:py-6"
        }`}
      >
        {/* Wordmark */}
        <TransitionLink
          href="/"
          className="pointer-events-auto flex items-baseline gap-1.5 font-display lowercase leading-none"
        >
          <span className="text-xl tracking-tight sm:text-2xl">{site.word}</span>
          <span className="text-accent">.</span>
          <span className="label ml-1 hidden translate-y-[-2px] text-paper/60 sm:inline">®</span>
        </TransitionLink>

        {/* Center season tag */}
        <p className="label pointer-events-auto hidden text-paper/60 md:block">
          {site.season}
        </p>

        {/* Menu trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => setCursor("link")}
          onMouseLeave={() => setCursor("default")}
          className="group label pointer-events-auto flex items-center gap-3 text-paper"
          aria-expanded={menuOpen}
          aria-label="Open menu"
        >
          <span>Menu</span>
          <span className="flex h-3 w-5 flex-col justify-between">
            <span className="h-px w-full bg-paper" />
            <span className="h-px w-full bg-paper" />
            {/* the short accent line runs out to full width on hover */}
            <span className="h-px w-3/5 bg-accent transition-[width] duration-500 ease-expo group-hover:w-full" />
          </span>
        </button>
      </div>
    </header>
  );
}
