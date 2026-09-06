"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import AnimatedText from "@/components/AnimatedText";
import RevealImage from "@/components/RevealImage";
import TransitionLink from "@/components/TransitionLink";
import { useTransition } from "@/context/TransitionContext";
import { getWork, pexels, work } from "@/lib/data";

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getWork(slug);
  const { navigateTo } = useTransition();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  if (!project) {
    return (
      <PageWrapper className="grid min-h-screen place-items-center px-5">
        <div className="text-center">
          <p className="font-display text-huge lowercase">not found</p>
          <button onClick={() => navigateTo("/work")} className="label mt-6 text-accent">
            ← Back to work
          </button>
        </div>
      </PageWrapper>
    );
  }

  const idx = work.findIndex((p) => p.slug === project.slug);
  const next = work[(idx + 1) % work.length];

  return (
    <PageWrapper>
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10">
          <img
            src={pexels(project.cover, 1600)}
            alt={project.title}
            className="img-editorial h-full w-full scale-110 object-cover"
            style={{ filter: "grayscale(1) contrast(1.1) brightness(0.92)" }}
          />
          <div className="absolute inset-0 bg-ink/30" />
        </motion.div>

        <motion.div
          style={{ y: titleY }}
          className="absolute inset-x-0 bottom-0 px-5 pb-12 text-paper sm:px-8 sm:pb-16"
        >
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-display text-3xl sm:text-5xl">{project.index}</span>
            <span className="label">{project.client}</span>
            {project.services.map((s) => (
              <span key={s} className="label opacity-70">
                {s}
              </span>
            ))}
          </div>
          <AnimatedText
            as="h1"
            text={project.title}
            className="block max-w-[14ch] font-display text-huge leading-[0.9] tracking-tight lowercase"
            delay={0.4}
          />
        </motion.div>

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block">
          <p className="label origin-center rotate-90 whitespace-nowrap text-paper/80">
            FORM&CO / {project.year}
          </p>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="border-b hairline border-b-ink/15 px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
          <p className="label text-ink/50 sm:col-span-3">Overview</p>
          <AnimatedText
            as="p"
            text={project.intro}
            className="font-display text-[6vw] leading-[1.12] tracking-tight sm:col-span-9 sm:text-[2.7vw]"
            stagger={0.02}
          />
        </div>
      </section>

      {/* ============ META ============ */}
      <section className="grid grid-cols-2 border-b hairline border-b-ink/15 sm:grid-cols-3">
        {project.meta.map((m) => (
          <div
            key={m.label}
            className="border-r hairline border-r-ink/15 px-5 py-8 last:border-r-0 sm:px-8"
          >
            <p className="label mb-3 text-ink/50">{m.label}</p>
            <p className="font-display text-lg lowercase tracking-tight sm:text-2xl">{m.value}</p>
          </div>
        ))}
      </section>

      {/* ============ EDITORIAL BODY ============ */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-20 grid gap-6 sm:grid-cols-2 sm:gap-10">
          <RevealImage
            src={pexels(project.gallery[1], 900, 1200)}
            alt={`${project.title} — figure 01`}
            className="aspect-[4/5] w-full"
            parallax
            interactive
          />
          <div className="sm:mt-32">
            <RevealImage
              src={pexels(project.gallery[2], 900, 1100)}
              alt={`${project.title} — figure 02`}
              className="aspect-[4/5] w-full"
              parallax
              interactive
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
          <p className="label text-ink/50 sm:col-span-3">The work</p>
          <div className="flex flex-col gap-6 sm:col-span-6 sm:col-start-4">
            {project.body.map((para, i) => (
              <p key={i} className="body-copy">
                {para}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <RevealImage
            src={pexels(project.gallery[3], 1600, 900)}
            alt={`${project.title} — figure 03`}
            className="aspect-[16/9] w-full"
            parallax
            parallaxAmount={60}
            interactive
          />
        </div>
      </section>

      {/* ============ NEXT PROJECT ============ */}
      <TransitionLink
        href={`/work/${next.slug}`}
        cursorMode="view"
        className="group relative block overflow-hidden border-t hairline border-t-ink/15 px-5 py-24 sm:px-8 sm:py-36"
      >
        <p className="label mb-6 text-ink/50">Next project — {next.index}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-[12vw] leading-[0.85] tracking-tight lowercase transition-transform duration-700 group-hover:translate-x-3 sm:text-[7vw]">
            {next.title}
          </span>
          <span className="text-4xl transition-transform duration-700 group-hover:translate-x-3 sm:text-6xl">
            →
          </span>
        </div>
      </TransitionLink>
    </PageWrapper>
  );
}
