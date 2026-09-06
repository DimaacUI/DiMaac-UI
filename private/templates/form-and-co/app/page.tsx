"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import AnimatedText from "@/components/AnimatedText";
import RevealImage from "@/components/RevealImage";
import HeroSlider from "@/components/HeroSlider";
import TransitionLink from "@/components/TransitionLink";
import Lookbook from "@/components/Lookbook";
import { useTransition } from "@/context/TransitionContext";
import { marquee, pexels, services, site, stats, work } from "@/lib/data";

export default function HomePage() {
  const { navigateTo } = useTransition();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bandX = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <PageWrapper>
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden px-5 pb-10 pt-24 sm:px-8 sm:pb-8 sm:pt-28"
      >
        {/* ---------- MOBILE HERO — clean vertical flow ---------- */}
        <div className="flex flex-col sm:hidden">
          {/* Label cluster */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mb-7"
          >
            <p className="label mb-3 flex items-center gap-2 text-ink">
              <span className="inline-block h-1.5 w-1.5 shrink-0 bg-accent" />
              {site.brand} / {site.tagline}
            </p>
            <p className="micro-copy max-w-[34ch]">{site.descriptor}</p>
          </motion.div>

          {/* Slider with the accent band peeking on the right */}
          <div className="relative mb-9">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              style={{ originX: 1 }}
              className="absolute right-0 top-10 z-0 h-[82%] w-[74%] bg-accent"
            />
            <HeroSlider className="relative z-10 aspect-[4/5] w-[84%]" />
          </div>

          {/* Wordmark */}
          <AnimatedText
            as="h1"
            text={`${site.word}.`}
            className="block font-display text-mega leading-[0.78] tracking-tighter text-ink"
            stagger={0}
            delay={0.4}
          />

          {/* Availability pill */}
          <div className="mt-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label text-ink/80">{site.availability}</span>
            </span>
          </div>
        </div>

        {/* ---------- DESKTOP HERO — editorial collage ---------- */}
        <div className="hidden sm:block">
          {/* Accent band behind the slider (parallaxed). */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            style={{ originX: 1, x: bandX }}
            className="absolute right-0 top-[42%] z-0 h-[40%] w-[56%] bg-accent"
          />

          {/* Rotated colophon. */}
          <div className="absolute right-1 top-1/2 z-20 -translate-y-1/2">
            <p className="label origin-center rotate-90 whitespace-nowrap text-ink/80">
              {site.brand} — {site.tagline} · {site.est}
            </p>
          </div>

          {/* Project slider over the band. */}
          <div className="absolute right-[10%] top-[16%] z-10 h-[74%] w-[30%]">
            <HeroSlider className="h-full w-full" />
          </div>

          {/* Label cluster. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute left-[26%] top-[21%] z-20 max-w-[300px]"
          >
            <p className="label mb-3 flex items-center gap-2 text-ink">
              <span className="inline-block h-1.5 w-1.5 shrink-0 bg-accent" />
              {site.brand} / {site.tagline}
            </p>
            <p className="micro-copy max-w-[36ch]">{site.descriptor}</p>
          </motion.div>

          {/* Availability pill. */}
          <div className="absolute bottom-9 left-8 z-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label text-ink/80">{site.availability}</span>
            </span>
          </div>

          {/* Wordmark. */}
          <div className="absolute bottom-[30%] left-7 z-20">
            <AnimatedText
              as="h1"
              text={`${site.word}.`}
              className="block font-display text-mega leading-[0.78] tracking-tighter text-ink"
              stagger={0}
              delay={0.45}
            />
          </div>

          {/* Scroll cue. */}
          <div className="absolute bottom-7 right-5 z-20 flex items-center gap-3">
            <span className="label text-ink/50">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-ink/50"
            >
              ↓
            </motion.span>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section className="border-y hairline border-y-ink/15 py-4">
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
          >
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex shrink-0">
                {marquee.map((t, i) => (
                  <span key={`${dup}-${i}`} className="flex items-center gap-10 pr-10">
                    <span className="font-display text-2xl lowercase tracking-tight">{t}</span>
                    <span className="text-accent">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= INTRO STATEMENT ================= */}
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-12">
          <p className="label flex items-center gap-3 text-ink/50 sm:col-span-3">
            <span className="inline-block h-px w-8 bg-ink/30" />
            What we do
          </p>
          <div className="sm:col-span-9">
            <AnimatedText
              as="h2"
              text="we design brands, products & spaces with clarity and craft."
              className="block max-w-[20ch] font-display text-[8vw] leading-[1.02] tracking-tight lowercase sm:text-[3.6vw]"
              stagger={0.03}
            />
            <div className="mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
              <p className="body-copy">
                {site.brand} is a small, independent studio. We partner with a
                handful of clients each year — closely, and from the first
                conversation to the last pixel.
              </p>
              <p className="body-copy">
                Strategy, identity, and engineering live in the same room, so the
                work we draw is the work that ships: considered, accessible, and
                built to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SELECTED WORK ================= */}
      <section className="px-5 pb-8 sm:px-8">
        <div className="mb-12 flex items-end justify-between border-t hairline border-t-ink/20 pt-6">
          <AnimatedText
            as="h2"
            text="selected work"
            className="block font-display text-huge leading-[0.85] tracking-tight lowercase"
          />
          <p className="label hidden text-ink/50 sm:block">[ 2021 — 2023 ]</p>
        </div>

        <div className="grid gap-x-6 gap-y-16 sm:grid-cols-2">
          {work.slice(0, 4).map((p, i) => (
            <TransitionLink
              key={p.slug}
              href={`/work/${p.slug}`}
              cursorMode="view"
              className={`group block ${i % 2 === 1 ? "sm:mt-24" : ""}`}
            >
              <div className="mb-5 aspect-[4/5] w-full overflow-hidden">
                <RevealImage
                  src={pexels(p.cover, 900, 1100)}
                  alt={p.title}
                  className="h-full w-full"
                  parallax
                  hoverZoom
                />
              </div>
              <div className="flex items-baseline justify-between border-t hairline border-t-ink/20 pt-3">
                <span className="font-display text-2xl lowercase tracking-tight">{p.title}</span>
                <span className="label text-ink/50">{p.index}</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="label text-ink/45">{p.category}</span>
                <span className="label inline-flex items-center gap-2 text-ink/45 transition-transform duration-500 group-hover:translate-x-1">
                  {p.year} <span className="text-accent">→</span>
                </span>
              </div>
            </TransitionLink>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <TransitionLink href="/work" cursorMode="link" className="label link-line text-ink/70">
            View all work — {work.length} projects →
          </TransitionLink>
        </div>
      </section>

      {/* ================= GALLERY (drag rail) ================= */}
      <Lookbook />

      {/* ================= SERVICES ================= */}
      <section className="px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 border-t hairline border-t-ink/20 pt-8 sm:grid-cols-12">
          <p className="label text-ink/50 sm:col-span-3">Services</p>
          <div className="sm:col-span-9">
            {services.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: i * 0.05 }}
                className="grid grid-cols-12 items-baseline gap-2 border-b hairline border-b-ink/15 py-7 sm:py-9"
              >
                <span className="col-span-2 font-display text-lg text-accent sm:col-span-1 sm:text-xl">
                  {c.n}
                </span>
                <h3 className="col-span-10 font-display text-[6.5vw] leading-none tracking-tight lowercase sm:col-span-6 sm:text-[2.4vw]">
                  {c.t}
                </h3>
                <p className="col-span-10 col-start-3 mt-2 text-ink/60 body-copy !text-[14px] sm:col-span-4 sm:col-start-8 sm:mt-0">
                  {c.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-2 px-5 py-20 sm:grid-cols-4 sm:px-8 sm:py-28">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            className="border-l hairline border-l-ink/15 pl-4 sm:pl-6"
          >
            <p className="font-display text-[14vw] leading-[0.85] tracking-tighter sm:text-[5vw]">
              {s.value}
            </p>
            <p className="label mt-2 text-ink/50">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <TransitionLink
        href="/contact"
        cursorMode="view"
        className="group relative block overflow-hidden border-t hairline border-t-ink/15 px-5 py-24 text-center sm:px-8 sm:py-36"
      >
        <p className="label mb-6 text-ink/50">Have a project in mind?</p>
        <AnimatedText
          as="span"
          text="let's work together"
          className="block font-display text-[12vw] leading-[0.85] tracking-tight lowercase transition-transform duration-700 group-hover:-translate-y-1 sm:text-[7vw]"
        />
        <span className="label mt-6 inline-flex items-center gap-2 text-accent">
          Start a project{" "}
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </span>
      </TransitionLink>
    </PageWrapper>
  );
}
