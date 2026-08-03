import Link from 'next/link';
import TemplatePricingCards, { PricingFaq } from '@/core/components/TemplatePricingCards';
import { getSubscriptionPlans, isSubscriptionCheckoutEnabled } from '@/data/templateData';

export default function TemplatePricingPage() {
  const subscriptionPlans = getSubscriptionPlans();
  const checkoutEnabled = isSubscriptionCheckoutEnabled();

  return (
    <div className="w-full md:max-w-[calc(100%-300px)] md:mt-[1rem] pb-16 sm:pb-20 md:pb-24">
      <header className="mb-10 sm:mb-12 flex flex-col gap-8">
        <Link
          href="/templates"
          className="inline-block text-sm text-white/60 hover:text-white transition-colors w-fit"
        >
          ← All templates
        </Link>

        <div className="relative space-y-5 max-w-3xl">
          <div
            className="pointer-events-none absolute -top-24 -left-20 w-64 h-64 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(221,252,62,0.35) 0%, transparent 70%)' }}
            aria-hidden
          />
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#DDFC3E]/80 font-semibold">
            DiMaac Pro
          </p>
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-[1.15] tracking-tight">
            Every template.
            <br />
            <span className="text-white/55">Every drop. One subscription.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-2xl">
            Subscribe for all premium templates — plus every release while you&apos;re on Pro.
            Founding rates go up as the library grows.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {!checkoutEnabled && (
            <span className="text-xs font-medium text-[#DDFC3E] bg-[#DDFC3E]/10 border border-[#DDFC3E]/30 px-3 py-1.5 rounded-full">
              Checkout coming soon — a few days
            </span>
          )}
          <span className="text-xs font-medium text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            Every new drop included
          </span>
        </div>
      </header>

      <TemplatePricingCards plans={subscriptionPlans} checkoutEnabled={checkoutEnabled} />

      <PricingFaq />
    </div>
  );
}
