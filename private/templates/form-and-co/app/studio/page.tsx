"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import AnimatedText from "@/components/AnimatedText";
import RevealImage from "@/components/RevealImage";
import TransitionLink from "@/components/TransitionLink";
import { IMG, pexels, site, stats } from "@/lib/data";

const values = [
  { n: "01", t: "Clarity over noise", d: "We remove until only the essential remains, then make that essential unforgettable." },
  { n: "02", t: "Make it, don't mock it", d: "We prototype in code from the start — what we show you is real, not a picture of real." },
  { n: "03", t: "Few clients, fully", d: "A handful of partners each year, each given our whole attention from brief to launch." },
  { n: "04", t: "Craft compounds", d: "Small decisions, made well and repeated, add up to work that quietly outlasts trends." },
];

const team = [
  { name: "Elena Ross", role: "Founder, Creative Director" },
  { name: "Marco Vidal", role: "Design Lead" },
  { name: "Priya Anand", role: "Engineering Lead" },
  { name: "Sam Okonkwo", role: "Motion & 3D" },
];

export default function StudioPage() {
  return (
    <PageWrapper className="px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      {/* Manifesto headline */}
      <header className="mb-20 max-w-[22ch] sm:mb-28">
        <p className="label mb-8 flex items-center gap-3 text-ink/50">
          <span className="inline-block h-px w-8 bg-ink/30" />
          Studio — {site.brand}
        </p>
        <AnimatedText
          as="h1"
          text="a small studio, obsessed with the details that compound."
          className="block font-display text-[8.5vw] leading-[1.04] tracking-tight lowercase sm:text-[3.5vw]"
          stagger={0.03}
        />
      </header>

      {/* Lead + portrait split */}
      <section className="mb-28 grid gap-10 sm:grid-cols-12 sm:gap-6">
        <div className="order-2 sm:order-1 sm:col-span-5">
          <RevealImage
            src={pexels(IMG.moody, 900, 1200)}
            alt="FORM&CO studio portrait"
            className="aspect-[4/5] w-full"
            parallax
            interactive
          />
        </div>
        <div className="order-1 flex flex-col justify-between sm:order-2 sm:col-span-6 sm:col-start-7">
          <p className="font-display text-[5.5vw] leading-[1.18] tracking-tight sm:text-[2vw]">
            {site.brand} is an independent design studio in {site.location}, working
            at the intersection of brand, product, and craft.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <p className="body-copy">
              Founded in 2018, we partner with a small number of ambitious teams
              each year — designing and building the brands, sites, and products
              that carry them forward.
            </p>
            <p className="body-copy">
              Strategy, design, and engineering sit together under one roof, so
              nothing gets lost in translation. We make the work, and we make it
              well.
            </p>
          </div>
        </div>
      </section>

      {/* Values list */}
      <section className="border-t hairline border-t-ink/20">
        {values.map((p, i) => (
          <motion.div
            key={p.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: i * 0.05 }}
            className="grid grid-cols-12 items-baseline gap-2 border-b hairline border-b-ink/20 py-8 sm:py-12"
          >
            <span className="col-span-2 font-display text-lg text-accent sm:col-span-1 sm:text-2xl">
              {p.n}
            </span>
            <h3 className="col-span-10 font-display text-[6.5vw] leading-[1.05] tracking-tight lowercase sm:col-span-6 sm:text-[2.6vw]">
              {p.t}
            </h3>
            <p className="col-span-10 col-start-3 mt-3 body-copy !text-[14px] sm:col-span-4 sm:col-start-9 sm:mt-0">
              {p.d}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Team */}
      <section className="py-24 sm:py-28">
        <p className="label mb-10 text-ink/50">The team</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-t hairline border-t-ink/20 pt-4"
            >
              <p className="font-display text-xl lowercase tracking-tight sm:text-2xl">{m.name}</p>
              <p className="label mt-2 text-ink/50">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="grid grid-cols-2 border-y hairline border-y-ink/20 sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            className="border-r hairline border-r-ink/15 px-5 py-10 last:border-r-0 sm:px-6"
          >
            <p className="font-display text-[12vw] leading-[0.85] tracking-tighter sm:text-[4vw]">
              {s.value}
            </p>
            <p className="label mt-2 text-ink/50">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Closing statement / CTA */}
      <section className="py-28 text-center sm:py-40">
        <p className="label mb-8 text-ink/50">Let&apos;s make something</p>
        <TransitionLink href="/contact" cursorMode="view" className="group inline-block">
          <AnimatedText
            as="span"
            text="start a project"
            className="block font-display text-huge leading-[0.9] tracking-tight lowercase transition-transform duration-700 group-hover:-translate-y-1"
          />
          <span className="label mt-5 inline-flex items-center gap-2 text-accent">
            Get in touch{" "}
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </span>
        </TransitionLink>
      </section>
    </PageWrapper>
  );
}
