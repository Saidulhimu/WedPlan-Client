"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, MessageSquare } from "lucide-react";

const faqs = [
  {
    num: "01",
    q: "How does WedPlan verify and moderate wedding vendors?",
    a: "Every vendor who registers on WedPlan undergoes rigorous administrative review. Our platform team evaluates their portfolio, business legitimacy, past client satisfaction, and credentials before any service package is approved for public discovery.",
  },
  {
    num: "02",
    q: "How does the booking request process work for couples?",
    a: "When you discover a service or venue you love, simply click 'Request Booking' on their service profile. Select your celebration date, venue location, and include custom notes. The vendor receives your inquiry in their dashboard and can review their calendar to accept or decline.",
  },
  {
    num: "03",
    q: "What is the difference between the Free and Premium vendor tiers?",
    a: "Standard Free vendors can publish up to 3 active services to launch their storefront. Upgrading to our Premium Tier ($49 one-time evaluation fee via Stripe) unlocks unlimited service listings, a verified Gold Pro badge, and premier placement across category search results.",
  },
  {
    num: "04",
    q: "How are financial transactions and data protected?",
    a: "WedPlan uses Stripe's encrypted payment gateway infrastructure. Secret keys remain strictly on our Express backend, and all membership upgrades are verified server-side through cryptographically signed Stripe webhooks and session validation.",
  },
  {
    num: "05",
    q: "Can a customer cancel their booking request?",
    a: "Yes! If your wedding plans change and the vendor has not yet finalized your request (status is 'Pending'), you can easily cancel your inquiry directly from your Customer Dashboard with one click.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
            Common Inquiries & Platform Guide
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Everything you need to know about navigating the WedPlan luxury wedding platform.
          </p>
        </div>

        {/* Accordion List with Animations */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.num}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "border-wedding-400 bg-white shadow-lg ring-1 ring-wedding-300/30"
                    : "border-stone-200 bg-white hover:border-stone-300 shadow-sm"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <span className="font-serif text-sm font-bold text-wedding-600 shrink-0">
                      {faq.num}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${isOpen
                        ? "bg-wedding-600 text-white border-wedding-600 rotate-180"
                        : "bg-stone-50 text-slate-400 border-stone-200"
                      }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 pl-14">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Concierge Box */}
        <div className="mt-12 rounded-3xl border border-stone-200 bg-white p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-slate-900">
              Have a Specific Wedding Inquiry?
            </h4>
            <p className="text-xs text-slate-500">
              Explore our vetted vendor catalog or register your wedding studio today.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-wedding-600 hover:bg-wedding-700 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Browse Directory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
