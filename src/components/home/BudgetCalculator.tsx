"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, SlidersHorizontal, Check } from "lucide-react";

export function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState(45000);

  const presets = [
    { label: "Intimate Affair", amount: 20000 },
    { label: "Classic Elegance", amount: 45000 },
    { label: "Grand Celebration", amount: 75000 },
    { label: "Luxury Estate", amount: 120000 },
  ];

  const allocations = [
    {
      name: "Venue & Banquet",
      share: "48%",
      percentage: 0.48,
      category: "Wedding Venues",
      desc: "Historic manor, grand ballroom, tables & chairs",
      color: "bg-wedding-600",
      href: "/services?category=Wedding+Venues",
    },
    {
      name: "Photography & Film",
      share: "12%",
      percentage: 0.12,
      category: "Photography & Videography",
      desc: "4K cinematic film, drone coverage, heirloom albums",
      color: "bg-amber-600",
      href: "/services?category=Photography+%26+Videography",
    },
    {
      name: "Floral Arch & Decor",
      share: "10%",
      percentage: 0.1,
      category: "Decoration & Florist",
      desc: "Ceremony arbor, hanging installations, tablescapes",
      color: "bg-rose-500",
      href: "/services?category=Decoration+%26+Florist",
    },
    {
      name: "Gown, Tux & Styling",
      share: "10%",
      percentage: 0.1,
      category: "Makeup & Styling",
      desc: "Bridal couture, tuxedo bespoke tailoring & glam trials",
      color: "bg-emerald-600",
      href: "/services?category=Makeup+%26+Styling",
    },
    {
      name: "Artisanal Catering & Bar",
      share: "8%",
      percentage: 0.08,
      category: "Catering Services",
      desc: "5-course menu tasting, champagne bar & tiered cake",
      color: "bg-blue-600",
      href: "/services?category=Catering+Services",
    },
    {
      name: "Favors & Contingency",
      share: "12%",
      percentage: 0.12,
      category: "All",
      desc: "Stationery suites, day-of emergency buffer & gifts",
      color: "bg-slate-500",
      href: "/services",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-stone-50/50 to-white border-t border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
            Interactive Planning Tool
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Wedding Budget Breakdown Calculator
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Discover standard luxury wedding budget allocations modeled after international bridal benchmarks from The Knot and Zola.
          </p>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setTotalBudget(preset.amount)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  totalBudget === preset.amount
                    ? "bg-wedding-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-stone-200 hover:border-wedding-400"
                }`}
              >
                {preset.label} ({formatPrice(preset.amount)})
              </button>
            ))}
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 lg:p-12 shadow-xl shadow-stone-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Slider & Budget Controller (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Total Estimated Budget
                </span>
                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-wedding-700">
                  {formatPrice(totalBudget)}
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="2500"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="w-full h-3 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-wedding-600 ring-1 ring-stone-200"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold pt-1">
                  <span>$10,000</span>
                  <span>$75,000</span>
                  <span>$150,000+</span>
                </div>
              </div>

              {/* Visual Multi-Segment Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                  <span>Portfolio Distribution</span>
                  <span>100% Total</span>
                </div>
                <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden flex">
                  {allocations.map((item) => (
                    <div
                      key={item.name}
                      className={`h-full ${item.color}`}
                      style={{ width: `${item.percentage * 100}%` }}
                      title={`${item.name}: ${item.share}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Adjust the slider to dynamically simulate fund allocations for each creative artisan before requesting live booking proposals.
              </p>

              <div>
                <Link
                  href={`/services?maxPrice=${Math.round(totalBudget * 0.48)}`}
                  className="inline-flex items-center gap-2 rounded-full bg-wedding-600 hover:bg-wedding-700 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Explore Matching Vendors</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Allocation Breakdown Cards (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allocations.map((item) => {
                const amount = totalBudget * item.percentage;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group rounded-2xl border border-stone-200 bg-stone-50/40 p-4 space-y-2.5 transition-all duration-300 hover:bg-white hover:border-wedding-400 hover:shadow-md block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-wedding-600 transition-colors">
                        {item.name}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold text-wedding-700 border border-stone-200">
                        {item.share}
                      </span>
                    </div>

                    <div className="font-serif text-lg font-bold text-slate-900">
                      {formatPrice(amount)}
                    </div>

                    <div className="w-full bg-stone-200/80 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.percentage * 100}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
