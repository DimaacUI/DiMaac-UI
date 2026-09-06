"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";

const STEPS = [
  {
    no: "01",
    title: "Brief",
    body: "We listen — to your brand, your customer, your season and your ambition.",
  },
  {
    no: "02",
    title: "Concept",
    body: "Mood, palette, type and casting studies until the idea feels unmistakably yours.",
  },
  {
    no: "03",
    title: "Design",
    body: "Identity, campaign and editorial systems resolved down to the last detail.",
  },
  {
    no: "04",
    title: "Launch",
    body: "We run production and rollout with you, protecting the work to the final frame.",
  },
];

/** "How we work" — a four-stage process using the oversized faded numerals. */
export function ProcessSteps() {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="How we work"
          title="From mood board to launch"
          intro="A clear four-stage process that keeps every project calm, considered and on track."
        />

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.no}
              variants={fadeUp(24)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <span className="font-display text-7xl font-extrabold leading-none tracking-tightest text-ink/[0.09]">
                {s.no}
              </span>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-[3px] w-8 bg-green" />
                <h3 className="font-display text-xl font-bold text-ink">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
