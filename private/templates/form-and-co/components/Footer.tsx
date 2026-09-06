"use client";

import { footerLinks, site, socials } from "@/lib/data";
import TransitionLink from "./TransitionLink";
import MagneticButton from "./MagneticButton";
import { useTransition } from "@/context/TransitionContext";

/** Persistent footer — editorial colophon with an oversized wordmark baseline. */
export default function Footer() {
  const { navigateTo } = useTransition();

  return (
    <footer className="border-t hairline border-t-ink/15 bg-paper px-5 pb-8 pt-20 sm:px-8">
      {/* Top: large invitation + magnetic CTA */}
      <div className="mb-20 flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
        <div>
          <p className="label mb-5 text-ink/50">Have a project in mind?</p>
          <h2 className="max-w-[14ch] font-display text-[10vw] leading-[0.9] tracking-tight lowercase sm:text-[4.5vw]">
            let&apos;s make something together.
          </h2>
        </div>
        <MagneticButton
          onClick={() => navigateTo("/contact")}
          strength={0.5}
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-ink text-ink"
        >
          <span className="text-2xl leading-none">→</span>
        </MagneticButton>
      </div>

      <div className="grid grid-cols-2 gap-y-12 border-t hairline border-t-ink/15 pt-12 sm:grid-cols-12">
        {/* Index */}
        <div className="col-span-1 sm:col-span-3">
          <p className="label mb-5 text-ink/50">Index</p>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <TransitionLink href={l.href} className="label link-line hover:text-accent">
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="col-span-1 sm:col-span-3">
          <p className="label mb-5 text-ink/50">Connect</p>
          <ul className="flex flex-col gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="label link-line text-ink/80 hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 sm:col-span-3">
          <p className="label mb-5 text-ink/50">Contact</p>
          <ul className="flex flex-col gap-2">
            <li>
              <a href={`mailto:${site.email}`} className="label link-line text-ink/80">
                {site.email}
              </a>
            </li>
            <li className="label text-ink/80">{site.phone}</li>
            <li className="label text-ink/80">{site.location}</li>
          </ul>
        </div>

        {/* Colophon */}
        <div className="col-span-2 sm:col-span-3">
          <p className="label mb-5 text-ink/50">Colophon</p>
          <p className="micro-copy max-w-[28ch]">{site.manifesto}</p>
        </div>
      </div>

      {/* Oversized wordmark baseline */}
      <div className="mt-16 flex flex-col gap-4 border-t hairline border-t-ink/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="label text-ink/50">© 2026 {site.brand} — All rights reserved</p>
        <p className="font-display text-[18vw] leading-[0.78] lowercase tracking-tighter sm:text-[13vw]">
          {site.word}
          <span className="text-accent">.</span>
        </p>
      </div>
    </footer>
  );
}
