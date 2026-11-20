import React from "react";
import {
  ShieldCheck,
  CalendarCheck,
  CreditCard,
  Sparkles,
  Check,
  X,
  Award,
} from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "100% Admin-Verified Directory",
    description:
      "Unlike generic classifieds, every vendor portfolio, business license, and previous client satisfaction record is individually audited before listing.",
  },
  {
    icon: CalendarCheck,
    title: "Live Booking Pipeline",
    description:
      "Submit date-specific booking requests with custom requirements. Receive transparent approvals and status changes directly in your portal.",
  },
  {
    icon: CreditCard,
    title: "Zero Hidden Markups",
    description:
      "Couples pay exact creator rates with no platform commissions deducted from vendor craftsmanship. All subscriptions backed by Stripe.",
  },
  {
    icon: Sparkles,
    title: "Bespoke Concierge Standard",
    description:
      "Designed exclusively around the aesthetic expectations of luxury weddings, inspired by editorial leaders like The Knot and Zola.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#FAF6F0] via-white to-[#FDFBF7] border-y border-champagne-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-wedding-600">
            The WedPlan Distinction
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Why Discerning Couples Choose WedPlan
          </h2>
          <p className="text-sm text-slate-500">
            We eliminate the anxiety of wedding planning by pairing master creators with seamless technological transparency.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-16">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-champagne-300 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-wedding-400 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-wedding-50 text-wedding-600 border border-wedding-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Showcase (Traditional vs WedPlan) */}
        <div className="rounded-3xl border border-champagne-300 bg-white p-8 lg:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              The Modern Difference
            </h3>
            <p className="text-xs text-slate-500">
              How planning your wedding on WedPlan compares to traditional endless phone calls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-red-200/80 bg-red-50/30 p-6 space-y-4">
              <h4 className="font-serif text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs">✕</span>
                Traditional Wedding Hunt
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span>Hidden pricing requiring dozens of email inquiries</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span>Unvetted social media listings with no legitimacy checks</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span>No central dashboard to track responses or status</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <span>Stressful phone tag across scattered calendars</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/40 p-6 space-y-4">
              <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 text-xs">✓</span>
                The WedPlan Standard
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Transparent upfront pricing packages & package inclusions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>100% human-verified portfolio and credential reviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>One-click booking request submission with date picker</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Real-time portal tracking for couples and verified creators</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
