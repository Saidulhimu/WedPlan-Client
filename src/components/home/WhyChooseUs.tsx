"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarCheck,
  CreditCard,
  Gem,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "100% Vetted Directory",
    subtitle: "Strict Administrative Audit",
    description:
      "Unlike generic classifieds, every vendor portfolio, business license, and previous client satisfaction record is individually audited before listing.",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Live Booking Pipeline",
    subtitle: "Direct Date Availability",
    description:
      "Submit date-specific booking requests with custom requirements. Receive transparent approvals and status changes directly in your portal.",
  },
  {
    num: "03",
    icon: CreditCard,
    title: "Zero Hidden Markups",
    subtitle: "Transparent Creator Rates",
    description:
      "Couples pay exact creator rates with no platform commissions deducted from vendor craftsmanship. All subscriptions backed by Stripe.",
  },
  {
    num: "04",
    icon: Gem,
    title: "Bespoke Concierge Standard",
    subtitle: "Editorial Luxury Aesthetic",
    description:
      "Designed exclusively around the aesthetic expectations of luxury weddings, inspired by editorial leaders like The Knot and Zola.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border-y border-stone-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
            The WedPlan Distinction
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Why Discerning Couples Choose WedPlan
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We eliminate the anxiety of wedding planning by pairing master creators with seamless technological transparency.
          </p>
        </div>

        {/* 4 Pillars Grid with Elegant Cards & Micro-Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-3xl border border-stone-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-wedding-400 flex flex-col justify-between overflow-hidden"
              >
                {/* Background Top Corner Number Watermark */}
                <span className="absolute top-4 right-5 font-serif text-3xl font-extrabold text-stone-200/70 select-none group-hover:text-wedding-200 transition-colors">
                  {item.num}
                </span>

                <div className="space-y-5 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-wedding-50 to-stone-100 text-wedding-600 border border-wedding-200/80 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-wedding-600">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-wedding-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Line */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-wedding-700">
                  <span>Verified Standard</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-wedding-600" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Modern Difference: Comparison Showcase */}
        <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 lg:p-12 shadow-xl shadow-stone-900/5">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
              Comparative Analysis
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              The Modern Difference
            </h3>
            <p className="text-xs text-slate-500">
              How planning your wedding on WedPlan compares to traditional endless phone calls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Traditional Method */}
            <div className="rounded-3xl border border-rose-200/70 bg-gradient-to-b from-rose-50/40 to-stone-50/60 p-7 space-y-5">
              <div className="flex items-center gap-3 border-b border-rose-200/60 pb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-700 font-bold text-sm">
                  <X className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Traditional Wedding Search
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Scattered directories & uncertain pricing
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✕
                  </span>
                  <span>Endless back-and-forth emails just to ask for price sheets and package PDFs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✕
                  </span>
                  <span>No independent admin verification; uncertain quality, legitimacy, or insurance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✕
                  </span>
                  <span>Scattered booking notes across spreadsheets, notebooks, and lost chat threads.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✕
                  </span>
                  <span>Hidden markups, platform commissions, and surprise add-on fees.</span>
                </li>
              </ul>
            </div>

            {/* The WedPlan Way */}
            <div className="rounded-3xl border border-wedding-300 bg-gradient-to-b from-wedding-50/50 via-white to-wedding-50/30 p-7 space-y-5 shadow-sm">
              <div className="flex items-center gap-3 border-b border-wedding-200/80 pb-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-wedding-600 text-white font-bold text-sm shadow-sm">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    The WedPlan Experience
                  </h4>
                  <p className="text-[11px] text-wedding-700 font-medium">
                    Transparent, verified, and centralized
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✓
                  </span>
                  <span>100% upfront package pricing, location coverage, and real multi-image portfolios.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✓
                  </span>
                  <span>Every vendor portfolio and identity is pre-screened and approved by administrators.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✓
                  </span>
                  <span>Submit date-specific booking inquiries and track vendor approvals in one portal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    ✓
                  </span>
                  <span>Zero commission deductions from creators; guaranteed authentic creator rates.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-wedding-600 hover:bg-wedding-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Explore The Verified Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
