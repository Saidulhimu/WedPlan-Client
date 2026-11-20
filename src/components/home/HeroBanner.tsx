"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Wedding-Themed High-Resolution Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85&auto=format&fit=crop"
          alt="Luxury Wedding Celebration"
          className="h-full w-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
        />
        {/* Cinematic Warm Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50" />
      </div>

      {/* Content strictly adhering to PDF Page 7 without any AI-generated icons or clutter */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white max-w-4xl space-y-7">
        
        {/* Subtle Category Tagline (Pure Typography) */}
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-stone-300">
          Curated Wedding Marketplace
        </p>

        {/* Title (Clear Headline - PDF Requirement) */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12]">
          Discover & Book Extraordinary{" "}
          <span className="italic font-normal text-wedding-200">
            Wedding Services
          </span>
        </h1>

        {/* Short Description (PDF Requirement) */}
        <p className="text-base sm:text-xl text-stone-200 font-normal leading-relaxed max-w-2xl mx-auto">
          Connect with hand-vetted wedding venues, master cinematographers, bespoke floral designers, and culinary artists for your unforgettable celebration.
        </p>

        {/* CTA Button strictly according to PDF: Explore Wedding Services */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-wedding-600 hover:bg-wedding-700 px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Explore Wedding Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/sign-up"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300"
          >
            <span>Join as Vendor</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
