import React from "react";
import Link from "next/link";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { BudgetCalculator } from "@/components/home/BudgetCalculator";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Destinations } from "@/components/home/Destinations";
import { PlanningTips } from "@/components/home/PlanningTips";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { ArrowRight, Store } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <FeaturedServices />
      <CategoriesGrid />
      <WhyChooseUs />
      <BudgetCalculator />
      <HowItWorks />
      <Destinations />
      <PlanningTips />
      <Testimonials />
      <FaqSection />

      {/* VIP Bottom Banner CTA for Couples & Vendors */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#541618] via-[#7F1D1D] to-[#9E2A2B] text-white py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-white/10 px-5 py-2 text-xs font-semibold text-amber-200 backdrop-blur">
            <span>Join Over 2,400+ Wedding Professionals</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to Create an Unforgettable Wedding Day?
          </h2>

          <p className="text-sm sm:text-base text-rose-100 max-w-2xl mx-auto leading-relaxed">
            Whether you are planning your once-in-a-lifetime ceremony or looking to showcase your artistry to affluent engaged couples, WedPlan provides the definitive platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-xl hover:bg-wedding-50 transition-all active:scale-95"
            >
              <span>Explore All Wedding Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sign-up"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20 transition-all"
            >
              <Store className="h-4 w-4" />
              <span>Apply as a Creator</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
