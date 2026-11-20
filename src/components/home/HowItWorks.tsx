"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  CalendarCheck2,
  HeartHandshake,
  UserPlus,
  Store,
  CreditCard,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const coupleSteps = [
  {
    step: "01",
    title: "Discover Curated Artisans",
    description:
      "Browse certified wedding photographers, historic estates, caterers, and florists. Filter by destination, category, and transparent pricing packages.",
    icon: Search,
  },
  {
    step: "02",
    title: "Submit Personalized Inquiries",
    description:
      "Select your celebration date, input your wedding venue address, and provide custom event details with zero upfront charges.",
    icon: Send,
  },
  {
    step: "03",
    title: "Direct Vendor Confirmation",
    description:
      "The vendor reviews your date against their studio calendar and accepts or declines directly within your synchronized portal.",
    icon: CalendarCheck2,
  },
  {
    step: "04",
    title: "Celebrate Without Planning Stress",
    description:
      "Manage your confirmed creative team in one elegant dashboard. Enjoy complete peace of mind knowing your creators are admin-vetted.",
    icon: HeartHandshake,
  },
];

const vendorSteps = [
  {
    step: "01",
    title: "Register Your Studio",
    description:
      "Create your professional vendor profile with business credentials, portfolio imagery, and studio brand story.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Publish Service Packages",
    description:
      "Upload high-resolution photography, configure base pricing, and submit packages for swift administrative vetting.",
    icon: Store,
  },
  {
    step: "03",
    title: "Unlock Unlimited Premium",
    description:
      "Seamlessly publish unlimited services and obtain prominent verified status via integrated Stripe Checkout.",
    icon: CreditCard,
  },
  {
    step: "04",
    title: "Manage Inbound Bookings",
    description:
      "Receive direct date inquiries from genuine engaged couples and manage booking approvals with 1-click controls in your portal.",
    icon: TrendingUp,
  },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"couples" | "vendors">("couples");

  const steps = activeTab === "couples" ? coupleSteps : vendorSteps;

  return (
    <section className="py-24 bg-white border-t border-stone-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
            Seamless Coordination
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            How WedPlan Operates
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            A frictionless platform connecting engaged couples with esteemed wedding service professionals.
          </p>

          {/* Luxury Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-stone-100 border border-stone-200 mt-4 shadow-inner">
            <button
              onClick={() => setActiveTab("couples")}
              className={`px-6 py-2.5 text-xs font-bold rounded-full transition-all duration-300 ${activeTab === "couples"
                  ? "bg-white text-wedding-700 shadow-md ring-1 ring-stone-200/60"
                  : "text-slate-500 hover:text-slate-900"
                }`}
            >
              For Engaged Couples
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`px-6 py-2.5 text-xs font-bold rounded-full transition-all duration-300 ${activeTab === "vendors"
                  ? "bg-white text-wedding-700 shadow-md ring-1 ring-stone-200/60"
                  : "text-slate-500 hover:text-slate-900"
                }`}
            >
              For Wedding Creators
            </button>
          </div>
        </div>

        {/* 4 Steps Grid with Staggered Framer Motion Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group relative rounded-3xl border border-stone-200/90 bg-gradient-to-b from-white via-white to-stone-50/50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-wedding-400 flex flex-col justify-between overflow-hidden"
                >
                  {/* Step Number Top Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-wedding-600">
                      {item.step}
                    </span>
                    <div className="h-10 w-10 rounded-2xl bg-wedding-50 border border-wedding-200/80 flex items-center justify-center text-wedding-600 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-wedding-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Progress Accent */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Step {idx + 1} of 4</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA Footer */}
        <div className="mt-14 text-center">
          {activeTab === "couples" ? (
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-wedding-600 hover:bg-wedding-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Explore Wedding Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-full bg-wedding-600 hover:bg-wedding-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Register as a Vendor</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
