"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Calculator, ArrowRight, DollarSign, PieChart, Sparkles } from "lucide-react";

export function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState(35000);

  const allocations = [
    { name: "Venue & Catering (48%)", percentage: 0.48, category: "Wedding+Venues", color: "bg-wedding-500" },
    { name: "Photo & Cinematic Film (12%)", percentage: 0.12, category: "Photography+%26+Videography", color: "bg-amber-500" },
    { name: "Floral Arch & Event Decor (10%)", percentage: 0.1, category: "Decoration+%26+Florist", color: "bg-rose-400" },
    { name: "Gown, Suit & Makeup (10%)", percentage: 0.1, category: "Makeup+%26+Styling", color: "bg-emerald-500" },
    { name: "Artisanal Bar & Cake (8%)", percentage: 0.08, category: "Catering+Services", color: "bg-blue-400" },
    { name: "Contingency & Favors (12%)", percentage: 0.12, category: "All", color: "bg-slate-400" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-champagne-50/40 to-wedding-50 border-t border-champagne-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wedding-600">
            <Calculator className="h-4 w-4" />
            <span>Interactive Planning Tool</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Wedding Budget Breakdown Calculator
          </h2>
          <p className="text-sm text-slate-500">
            Discover standard luxury wedding budget allocations modeled after industry benchmarks from The Knot and Zola.
          </p>
        </div>

        <div className="rounded-3xl border border-champagne-300 bg-white p-8 lg:p-12 shadow-xl shadow-wedding-900/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Slider Control */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Adjust Your Estimated Budget
              </span>
              <div className="font-serif text-4xl sm:text-5xl font-extrabold text-wedding-600">
                {formatPrice(totalBudget)}
              </div>

              <div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="w-full h-2.5 bg-champagne-200 rounded-lg appearance-none cursor-pointer accent-wedding-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-semibold">
                  <span>$10,000 (Intimate)</span>
                  <span>$75,000 (Grand)</span>
                  <span>$150,000+ (Luxury)</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Use this estimation to balance your venue bookings, photography coverage, and catering packages realistically.
              </p>

              <Link
                href={`/services?maxPrice=${Math.round(totalBudget * 0.48)}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-wedding-500 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-wedding-600 transition-all"
              >
                <span>Find Vendors Within Budget</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Allocation Breakdown Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allocations.map((item) => {
                const amount = totalBudget * item.percentage;
                return (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-champagne-200 bg-wedding-50/40 p-4 space-y-2 hover:bg-white hover:border-wedding-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">
                        {item.name}
                      </span>
                      <span className="font-serif text-base font-bold text-slate-900">
                        {formatPrice(amount)}
                      </span>
                    </div>

                    <div className="w-full bg-champagne-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.percentage * 100}%` }}
                      />
                    </div>

                    <div className="pt-1 text-right">
                      <Link
                        href={`/services?category=${item.category}`}
                        className="text-[10px] font-bold text-wedding-600 hover:underline"
                      >
                        Explore Vendors →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
