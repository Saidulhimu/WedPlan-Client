"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

const faqs = [
  {
    q: "How does WedPlan verify and moderate wedding vendors?",
    a: "Every vendor who registers on WedPlan undergoes rigorous administrative review. Our concierge team evaluates their portfolio, insurance coverage, past wedding reviews, and proof of business legitimacy before any service listing is approved for public discovery.",
  },
  {
    q: "How does the booking request process work for couples?",
    a: "When you discover a service or venue you love, simply click 'Request Booking' on their service profile. Select your wedding date and venue location, and include any special requests. The vendor receives your inquiry in their dashboard and can review their calendar to accept or decline.",
  },
  {
    q: "What is the difference between the Free and Premium vendor tiers?",
    a: "Standard Free vendors can publish up to 3 active services to start their storefront. Upgrading to our Premium Tier ($49 one-time evaluation fee via Stripe) unlocks unlimited service listings, a verified Gold Pro badge, and premier placement across category search results.",
  },
  {
    q: "How are financial transactions and data protected?",
    a: "WedPlan uses Stripe's encrypted payment gateway infrastructure. Secret keys remain strictly on our Express backend, and all membership upgrades are verified server-side through cryptographically signed Stripe webhooks.",
  },
  {
    q: "Can a customer cancel their booking request?",
    a: "Yes! If your wedding plans change and the vendor has not yet finalized your request (status is 'Pending'), you can easily cancel your inquiry directly from your Customer Dashboard with one click.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-wedding-50/70 border-t border-champagne-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wedding-600">
            <HelpCircle className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500">
            Everything you need to know about the WedPlan luxury wedding platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-champagne-300 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/60"
                >
                  <span className="font-serif text-base font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-wedding-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
