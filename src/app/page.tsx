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
import { ArrowRight } from "lucide-react";

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

      {/* Luxury Editorial Bottom Banner CTA */}
      <section className="relative overflow-hidden min-h-[460px] flex items-center justify-center py-24 text-white">
        {/* High-Resolution Cinematic Wedding Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85&auto=format&fit=crop"
            alt="Luxury Wedding Architecture & Celebration"
            className="h-full w-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
          />
          {/* Deep Wine & Charcoal Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A0E17]/90 via-[#6B1422]/80 to-[#2D0A0F]/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        </div>

        {/* Content Container (Zero AI Icons, Pure Editorial Luxury) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 text-center space-y-7">
          <div className="inline-flex items-center rounded-full border border-amber-200/40 bg-black/30 px-6 py-2 text-xs font-semibold tracking-[0.25em] uppercase text-amber-200 backdrop-blur-md shadow-sm">
            <span>The Premier Wedding Collective</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Ready to Create an Unforgettable{" "}
            <span className="italic font-serif font-normal text-amber-100">
              Wedding Day?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed font-normal">
            Whether you are planning your once-in-a-lifetime celebration or looking to showcase your artistry to affluent couples, WedPlan provides the definitive high-trust platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-9 py-4 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-2xl hover:bg-stone-100 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Explore All Wedding Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sign-up"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 hover:border-white transition-all duration-300"
            >
              <span>Apply as a Creator</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
