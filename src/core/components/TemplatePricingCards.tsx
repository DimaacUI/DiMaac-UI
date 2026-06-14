'use client';

import { useState } from 'react';
import { SubscriptionPlan } from '@/types/templates';

interface TemplatePricingCardsProps {
  plans: SubscriptionPlan[];
  checkoutEnabled: boolean;
}

const FEATURES = [
  'All premium pro templates',
  'Every new template the moment it drops',
  'Updates & fixes while you stay subscribed',
  'Full source zips + documentation',
  'Commercial use per license terms',
];

function CheckIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-[#DDFC3E]"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function effectiveMonthly(price: number, interval: SubscriptionPlan['interval']) {
  if (interval !== 'year') return null;
  return (price / 12).toFixed(2);
}

const TemplatePricingCards = ({ plans, checkoutEnabled }: TemplatePricingCardsProps) => {
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);
  const displayPlans = [...plans].sort((a, b) => Number(b.highlighted) - Number(a.highlighted));

  const handleCheckoutClick = (plan: SubscriptionPlan) => {
    if (checkoutEnabled && plan.checkoutUrl && plan.checkoutUrl !== '#') {
      window.open(plan.checkoutUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setPendingPlanId(plan.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 w-full items-stretch">
      {displayPlans.map((plan) => {
        const monthlyEquivalent = effectiveMonthly(plan.price, plan.interval);
        const yearlySavings = plan.interval === 'year' ? 9 * 12 - plan.price : null;
        const canCheckout = checkoutEnabled && plan.checkoutUrl && plan.checkoutUrl !== '#';
        const showComingSoonMsg = !canCheckout && pendingPlanId === plan.id;

        return (
          <article
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-colors ${
              plan.highlighted
                ? 'border-[#DDFC3E]/50 bg-[#17171A] shadow-[0_0_60px_-12px_rgba(221,252,62,0.25)] lg:-translate-y-1'
                : 'border-white/10 bg-[#17171A]/80'
            }`}
          >
            {plan.highlighted && plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider text-black bg-[#DDFC3E] px-3 py-1 rounded-full whitespace-nowrap">
                {plan.badge}
              </span>
            )}

            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-2">DiMaac Pro</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed max-w-[28ch]">{plan.description}</p>
              </div>
              {!plan.highlighted && plan.badge && (
                <span className="text-[11px] font-bold uppercase tracking-wide text-white/70 bg-white/10 px-2.5 py-1 rounded-full shrink-0">
                  {plan.badge}
                </span>
              )}
            </div>

            <div className="mb-6 pb-6 border-b border-white/10">
              <div className="flex items-end gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">${plan.price}</span>
                <span className="text-sm text-white/50 pb-1.5">/{plan.interval}</span>
              </div>
              {monthlyEquivalent && (
                <p className="text-sm text-[#DDFC3E]/90 mt-2">
                  ~${monthlyEquivalent}/mo billed annually
                  {yearlySavings != null && yearlySavings > 0 && (
                    <span className="text-white/45"> · save ${yearlySavings}/yr</span>
                  )}
                </p>
              )}
              {plan.interval === 'month' && (
                <p className="text-sm text-white/45 mt-2">Flexible — cancel anytime</p>
              )}
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => handleCheckoutClick(plan)}
              className={`inline-flex w-full items-center justify-center rounded-xl font-bold text-sm px-5 py-3.5 transition-all ${
                canCheckout
                  ? 'hover:opacity-90 cursor-pointer'
                  : 'cursor-pointer opacity-90 hover:opacity-100'
              } ${
                plan.highlighted
                  ? 'bg-[#DDFC3E] text-black'
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              {canCheckout
                ? plan.highlighted
                  ? 'Get Pro Yearly'
                  : 'Get Pro Monthly'
                : 'Coming soon'}
            </button>

            {showComingSoonMsg && (
              <p className="text-sm text-[#DDFC3E] text-center mt-3 leading-relaxed">
                Checkout opens in a few days — we&apos;re finishing payment setup. Free templates are
                live now.
              </p>
            )}

            <p className="text-[11px] text-white/35 text-center mt-3">
              {canCheckout ? 'Secure checkout via Lemon Squeezy' : 'Pro subscriptions launching soon'}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default TemplatePricingCards;

const FAQ_ITEMS = [
  {
    title: 'Components stay free',
    body: 'DiMaac UI components are unchanged — templates are a separate product on top of the library.',
  },
  {
    title: 'Free templates live now',
    body: 'Every free template has a live preview and instant zip download — no account needed.',
  },
  {
    title: 'Pro coming soon',
    body: 'Premium templates and DiMaac Pro subscriptions go live once checkout is ready — usually within a few days.',
  },
  {
    title: 'How pro downloads work',
    body: 'After subscribe, Lemon Squeezy emails your license key. Paste it on any pro template page to download the zip.',
  },
];

export function PricingFaq() {
  return (
    <section className="mt-14 sm:mt-16 space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-bold text-white">How it works</h2>
        <p className="text-sm text-white/55 max-w-xl">
          Free templates are available today. Pro checkout is almost ready.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-[#17171A]/60 p-5 space-y-2"
          >
            <h3 className="text-sm font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
