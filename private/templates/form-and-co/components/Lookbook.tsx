"use client";

import { useEffect, useRef } from "react";
import { useUI } from "@/context/UIContext";
import AnimatedText from "./AnimatedText";
import { gallery, pexels } from "@/lib/data";

/**
 * Horizontal lookbook rail with smooth click-and-drag scrolling + momentum.
 *
 * Drag is 1:1 (scrollLeft written directly per pointer move, so it tracks the
 * cursor with zero lag), and on release a requestAnimationFrame loop carries
 * the built-up velocity with friction for a weighted, premium flick. Touch and
 * trackpad keep their native scrolling — only the mouse is hijacked.
 */
export default function Lookbook() {
  const { setCursor } = useUI();
  const railRef = useRef<HTMLDivElement>(null);
  const s = useRef({
    dragging: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    vel: 0,
    raf: 0,
  });

  const clamp = (v: number) => {
    const el = railRef.current!;
    return Math.max(0, Math.min(v, el.scrollWidth - el.clientWidth));
  };

  // Momentum: decays velocity with friction until it settles.
  const momentum = () => {
    const el = railRef.current;
    const st = s.current;
    if (!el || st.dragging) return;
    el.scrollLeft = clamp(el.scrollLeft + st.vel);
    st.vel *= 0.92;
    const atEdge = el.scrollLeft <= 0 || el.scrollLeft >= el.scrollWidth - el.clientWidth;
    if (Math.abs(st.vel) < 0.2 || atEdge) {
      st.vel = 0;
      return;
    }
    st.raf = requestAnimationFrame(momentum);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = railRef.current;
    if (!el) return;
    cancelAnimationFrame(s.current.raf);
    s.current.dragging = true;
    s.current.pointerId = e.pointerId;
    s.current.startX = e.clientX;
    s.current.lastX = e.clientX;
    s.current.startScroll = el.scrollLeft;
    s.current.vel = 0;
    el.setPointerCapture(e.pointerId);
    setCursor("drag");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = railRef.current;
    const st = s.current;
    if (!el || !st.dragging) return;
    el.scrollLeft = clamp(st.startScroll - (e.clientX - st.startX));
    // Smoothed instantaneous velocity (px/frame) for the release flick.
    const inst = st.lastX - e.clientX;
    st.vel = st.vel * 0.6 + inst * 0.4;
    st.lastX = e.clientX;
  };

  const end = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    const el = railRef.current;
    try {
      el?.releasePointerCapture(st.pointerId);
    } catch {
      /* already released */
    }
    setCursor("default");
    st.vel *= 4; // launch the flick
    cancelAnimationFrame(st.raf);
    st.raf = requestAnimationFrame(momentum);
  };

  useEffect(() => {
    const st = s.current;
    return () => cancelAnimationFrame(st.raf);
  }, []);

  return (
    <section className="py-24 sm:py-32">
      <div className="mb-10 flex items-end justify-between px-5 sm:px-8">
        <AnimatedText
          as="h2"
          text="from the studio"
          className="block font-display text-huge leading-[0.85] tracking-tight lowercase"
        />
        <p className="label hidden text-ink/50 sm:block">Drag — Selected Frames</p>
      </div>

      <div
        ref={railRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
        onMouseEnter={() => setCursor("drag")}
        onMouseLeave={() => !s.current.dragging && setCursor("default")}
        style={{ touchAction: "pan-x" }}
        className="no-scrollbar flex cursor-grab select-none gap-4 overflow-x-auto px-5 pb-2 active:cursor-grabbing sm:gap-6 sm:px-8"
      >
        {gallery.map((shot, i) => (
          <figure
            key={shot.id + "-" + i}
            className="group relative w-[68vw] shrink-0 sm:w-[24vw]"
          >
            <div className="aspect-[3/4] w-full overflow-hidden bg-ink/5">
              {/* The zoom sits on this wrapper, not the image. `.img-editorial`
                  owns the image's `transition` (for the colour fade) and, being
                  unlayered, overrides any Tailwind transition on the same
                  element — so a scale there never animated; it snapped. */}
              <div className="h-full w-full transition-transform duration-[900ms] ease-expo group-hover:scale-[1.04]">
                <img
                  src={pexels(shot.id, 700, 940)}
                  alt={shot.cap}
                  loading="lazy"
                  draggable={false}
                  className="img-editorial pointer-events-none h-full w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-3 flex items-center justify-between">
              <span className="label text-ink/55">{shot.cap}</span>
              <span className="label text-ink/35">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
