"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import AnimatedText from "@/components/AnimatedText";
import { budgets, faqs, offices, projectTypes, site, socials } from "@/lib/data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Contact form -----------------------------------------------------------
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [types, setTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleType = (t: string) =>
    setTypes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Required";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email";
    if (form.message.trim().length < 10) next.message = "Tell us a little more";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    // No backend in the template — simulate a send.
    setTimeout(() => setStatus("sent"), 1200);
  };

  const field =
    "w-full cursor-text border-b border-ink/25 bg-transparent pb-3 pt-2 font-display text-lg lowercase tracking-tight placeholder:text-ink/30 transition-colors focus:border-accent focus:outline-none";

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[460px] flex-col justify-center"
        >
          <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-paper">
            ✓
          </span>
          <h3 className="max-w-[16ch] font-display text-[8vw] leading-[1] tracking-tight lowercase sm:text-[3vw]">
            thanks, {form.name.split(" ")[0] || "friend"}.
          </h3>
          <p className="body-copy mt-5 max-w-[42ch]">
            Your message is on its way. We read everything ourselves and usually
            reply within two working days.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", email: "", company: "", message: "" });
              setTypes([]);
              setBudget("");
              setStatus("idle");
            }}
            className="label link-line mt-10 self-start text-accent"
          >
            Send another →
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-10"
          noValidate
        >
          {/* Name + email */}
          <div className="grid gap-10 sm:grid-cols-2">
            <label className="block">
              <span className="label flex items-center justify-between text-ink/50">
                Your name {errors.name && <span className="text-accent">{errors.name}</span>}
              </span>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="jane appleseed"
                className={`mt-3 ${field}`}
              />
            </label>
            <label className="block">
              <span className="label flex items-center justify-between text-ink/50">
                Email {errors.email && <span className="text-accent">{errors.email}</span>}
              </span>
              <input
                value={form.email}
                onChange={set("email")}
                placeholder="jane@studio.com"
                className={`mt-3 ${field}`}
              />
            </label>
          </div>

          {/* Company */}
          <label className="block">
            <span className="label text-ink/50">Company — optional</span>
            <input
              value={form.company}
              onChange={set("company")}
              placeholder="acme inc."
              className={`mt-3 ${field}`}
            />
          </label>

          {/* Project type */}
          <div>
            <span className="label text-ink/50">What do you need?</span>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {projectTypes.map((t) => {
                const on = types.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleType(t)}
                    className={`label rounded-full border px-4 py-2.5 transition-colors ${
                      on
                        ? "border-accent bg-accent text-paper"
                        : "border-ink/25 text-ink/70 hover:border-ink/60"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget */}
          <div>
            <span className="label text-ink/50">Budget</span>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {budgets.map((b) => {
                const on = budget === b;
                return (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(on ? "" : b)}
                    className={`label rounded-full border px-4 py-2.5 transition-colors ${
                      on
                        ? "border-accent bg-accent text-paper"
                        : "border-ink/25 text-ink/70 hover:border-ink/60"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <label className="block">
            <span className="label flex items-center justify-between text-ink/50">
              Tell us about the project{" "}
              {errors.message && <span className="text-accent">{errors.message}</span>}
            </span>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={3}
              placeholder="we're building…"
              className={`mt-3 resize-none ${field}`}
            />
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="group mt-2 flex items-center justify-between gap-4 bg-ink px-7 py-5 text-paper transition-colors hover:bg-accent disabled:opacity-70"
          >
            <span className="font-display text-xl lowercase tracking-tight sm:text-2xl">
              {status === "sending" ? "sending…" : "send enquiry"}
            </span>
            <span className="text-2xl transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// --- FAQ accordion ----------------------------------------------------------
function Faqs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t hairline border-t-ink/20">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b hairline border-b-ink/20">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="font-display text-lg lowercase tracking-tight sm:text-2xl">
                {f.q}
              </span>
              <span
                className={`text-2xl text-accent transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <p className="body-copy max-w-[60ch] pb-7">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ContactPage() {
  return (
    <PageWrapper className="px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      {/* Header */}
      <header className="mb-16 flex flex-col gap-8 border-b hairline border-b-ink/20 pb-12 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label mb-6 flex items-center gap-3 text-ink/50">
            <span className="inline-block h-px w-8 bg-ink/30" />
            Contact — Start a project
          </p>
          <AnimatedText
            as="h1"
            text="let's talk."
            className="block font-display text-mega leading-[0.78] tracking-tighter lowercase"
          />
        </div>
        <p className="max-w-[34ch] body-copy">
          Tell us what you&apos;re building. Whether it&apos;s a full rebrand or a
          single landing page, we&apos;d love to hear about it.
        </p>
      </header>

      {/* Form + details */}
      <section className="grid gap-x-6 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Sidebar details */}
        <aside className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="label mb-4 text-ink/50">Direct</p>
            <a
              href={`mailto:${site.email}`}
              className="link-line block font-display text-lg lowercase tracking-tight [overflow-wrap:anywhere] lg:text-2xl"
            >
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-2 block body-copy">
              {site.phone}
            </a>
            <p className="mt-4 inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label text-ink/60">{site.availability}</span>
            </p>
          </div>

          <div>
            <p className="label mb-4 text-ink/50">Studios</p>
            <div className="flex flex-col gap-6">
              {offices.map((o) => (
                <div key={o.city}>
                  <p className="font-display text-lg lowercase tracking-tight">{o.city}</p>
                  {o.lines.map((l) => (
                    <p key={l} className="micro-copy">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-4 text-ink/50">Follow</p>
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
        </aside>
      </section>

      {/* FAQ */}
      <section className="mt-28 sm:mt-36">
        <div className="mb-10 flex items-end justify-between">
          <AnimatedText
            as="h2"
            text="questions"
            className="block font-display text-huge leading-[0.85] tracking-tight lowercase"
          />
          <p className="label hidden text-ink/50 sm:block">Before you ask</p>
        </div>
        <Faqs />
      </section>
    </PageWrapper>
  );
}
