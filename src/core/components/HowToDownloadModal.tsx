'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HowToDownloadModalProps {
  open: boolean;
  onClose: () => void;
  /** Lemon Squeezy checkout for the monthly plan, when configured. */
  checkoutUrl?: string;
}

interface StepDef {
  title: string;
  body: React.ReactNode;
  image: string;
  /** Intrinsic size of the screenshot, so the frame is reserved before it loads. */
  width: number;
  height: number;
  alt: string;
}

/**
 * Walkthrough of the Pro download flow, one step per screen with Back / Next.
 * Each step shows the real screen the visitor is about to see.
 */
const HowToDownloadModal = ({ open, onClose, checkoutUrl }: HowToDownloadModalProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const hasCheckout = Boolean(checkoutUrl && checkoutUrl !== '#');

  const steps: StepDef[] = [
    {
      title: 'Pick a plan',
      body: (
        <>
          Open the{' '}
          <Link href="/templates/pricing" className="text-[#DDFC3E] hover:underline" onClick={onClose}>
            Pro pricing
          </Link>{' '}
          page and choose <span className="text-white">$9 / month</span> or{' '}
          <span className="text-white">$99 / year</span>. Both unlock every pro template and every new
          drop while you stay subscribed.
        </>
      ),
      image: '/how-to/step-1-pricing.webp',
      width: 1135,
      height: 638,
      alt: 'DiMaac Pro pricing: Pro Monthly at $9 per month and Pro Yearly at $99 per year',
    },
    {
      title: 'Subscribe on Lemon Squeezy',
      body: 'Clicking a plan opens our secure Lemon Squeezy checkout. Pay by card, PayPal or Cash App — it takes under a minute.',
      image: '/how-to/step-2-checkout.webp',
      width: 1400,
      height: 1065,
      alt: 'Lemon Squeezy checkout page for DiMaac Pro Monthly',
    },
    {
      title: 'Copy your license key',
      body: (
        <>
          Lemon Squeezy emails your receipt straight away. Your{' '}
          <span className="text-white">license key</span> is printed below the total — copy it.
          Can&apos;t see the mail? Check spam.
        </>
      ),
      image: '/how-to/step-3-receipt.webp',
      width: 662,
      height: 901,
      alt: 'Lemon Squeezy order receipt email showing the license key',
    },
    {
      title: 'Paste it and download',
      body: 'Back on any pro template page, paste the key into the license field and click Download zip. Once downloaded, that template is yours to keep — the subscription only gates new drops.',
      image: '/how-to/step-4-download.webp',
      width: 1135,
      height: 426,
      alt: 'The Get the source panel with a license key pasted and the Download zip button',
    },
  ];

  const last = steps.length - 1;
  const next = useCallback(() => setStep((s) => Math.min(s + 1, last)), [last]);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') back();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, next, back]);

  if (!open) return null;

  const current = steps[step];
  const tall = current.height > current.width;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#111114] shadow-2xl outline-none sm:max-h-[88vh] sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#DDFC3E]">
              Step {step + 1} of {steps.length}
            </p>
            <h2 id={titleId} className="mt-1 text-lg font-bold text-white sm:text-xl">
              {current.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 px-5 pt-4 sm:px-7" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className="h-1 flex-1 rounded-full transition-colors duration-300"
              style={{ background: i <= step ? '#DDFC3E' : 'rgba(255,255,255,0.12)' }}
            />
          ))}
        </div>

        {/* Body — one step at a time */}
        <div key={step} className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 animate-[fadeStep_.35s_ease-out]">
          <p className="text-sm leading-relaxed text-white/70 sm:text-[15px]">{current.body}</p>
          <div
            className={`mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d10] ${
              tall ? 'mx-auto max-w-[380px]' : ''
            }`}
          >
            <Image
              src={current.image}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="(max-width: 640px) 100vw, 640px"
              priority={step === 0}
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="whitespace-nowrap rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Back
          </button>
          <div className="flex gap-2">
            {step === last ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="whitespace-nowrap rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Got it
                </button>
                {hasCheckout ? (
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap rounded-lg bg-[#DDFC3E] px-4 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
                  >
                    Subscribe now
                  </a>
                ) : (
                  <Link
                    href="/templates/pricing"
                    onClick={onClose}
                    className="whitespace-nowrap rounded-lg bg-[#DDFC3E] px-4 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
                  >
                    See pricing
                  </Link>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={next}
                className="whitespace-nowrap rounded-lg bg-[#DDFC3E] px-5 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToDownloadModal;
