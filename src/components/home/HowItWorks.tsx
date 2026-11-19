"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Send,
  CalendarCheck2,
  HeartHandshake,
  UserPlus,
  Store,
  CreditCard,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const coupleSteps = [
  {
    step: "01",
    title: "Discover & Filter Curated Artisans",
    description: "Browse certified wedding photographers, historic venues, caterers, and decorators. Filter by destination, category, and transparent pricing packages.",
    icon: Search,
  },
  {
    step: "02",
    title: "Submit Personalized Booking Inquiries",
    description: "Select your celebration date, input your wedding venue address, and provide custom details. No payment is charged until confirmed.",
    icon: Send,
  },
  {
    step: "03",
    title: "Vendor Review & Direct Confirmation",
    description: "The vendor evaluates your date against their studio calendar and accepts or declines directly within the system.",
    icon: CalendarCheck2,
  },
  {
    step: "04",
    title: "Celebrate Without Planning Stress",
    description: "Manage your confirmed team in one elegant dashboard. Enjoy peace of mind knowing your vendors are admin-vetted.",
    icon: HeartHandshake,
  },
];

const vendorSteps = [
  {
    step: "01",
    title: "Register Your Wedding Studio",
    description: "Create your professional vendor profile with business credentials, portfolio imagery, and studio brand story.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Publish Packages for Moderation",
    description: "Upload high-resolution photography, configure base pricing, and submit services for swift administrative vetting.",
    icon: Store,
  },
  {
    step: "03",
    title: "Upgrade to Unlimited Premium ($49)",
    description: "Seamlessly unlock unlimited service publishing and prominent featured badges via integrated Stripe Checkout.",
    icon: CreditCard,
  },
  {
    step: "04",
    title: "Manage Inbound Booking Inquiries",
    description: "Receive direct date inquiries from genuine engaged couples and manage approvals with 1-click controls in your portal.",
    icon: Sparkles,
  },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"couples" | "vendors">("couples");

  const steps = activeTab === "couples" ? coupleSteps : vendorSteps;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wedding-600">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Seamless Coordination</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            How WedPlan Operates
          </h2>
          <p className="text-sm text-slate-500">
            A frictionless platform connecting engaged couples with esteemed wedding service professionals.
          </p>

          {/* Interactive Toggle for Couples vs Vendors */}
          <div className="inline-flex p-1.5 rounded-2xl bg-wedding-50 border border-champagne-300 mt-4">
            <button
              onClick={() => setActiveTab("couples")}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === "couples"
                  ? "bg-white text-wedding-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
                }`}
            >
              For Engaged Couples
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === "vendors"
                  ? "bg-white text-wedding-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
                }`}
            >
              For Wedding Vendors
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative rounded-3xl border border-champagne-300/80 bg-wedding-50/40 p-7 flex flex-col justify-between hover:bg-white hover:border-wedding-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-extrabold text-wedding-300">
                      {s.step}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-wedding-600 shadow-sm border border-champagne-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={activeTab === "couples" ? "/services" : "/sign-up"}
            className="inline-flex items-center gap-2 rounded-2xl bg-wedding-500 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-wedding-600 transition-all"
          >
            <span>{activeTab === "couples" ? "Start Exploring Services" : "Join as a WedPlan Vendor"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
