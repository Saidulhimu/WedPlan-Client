"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export function HeroBanner() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.append("search", keyword.trim());
    if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory);
    router.push(`/services?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[660px] lg:min-h-[740px] flex items-center justify-center overflow-hidden">
      {/* Wedding-Themed High-Resolution Background Image with Warm Editorial Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85&auto=format&fit=crop"
          alt="Luxury Wedding Celebration"
          className="h-full w-full object-cover object-center scale-105 filter brightness-[0.78] contrast-[1.05]"
        />
        {/* Soft Vignette & Editorial Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/45 to-stone-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-wedding-950/30 via-transparent to-stone-950/40" />
      </div>

      {/* Hero Content Container - Strictly conforming to PDF Page 7 */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white max-w-5xl space-y-8">
        
        {/* Subtle Luxury Pre-Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-black/40 px-5 py-2 text-xs font-semibold tracking-widest uppercase text-amber-200 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Curated Wedding Marketplace & Directory</span>
        </motion.div>

        {/* Clear Headline Title (PDF Requirement) */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-xl"
        >
          Discover & Book Extraordinary{" "}
          <span className="italic font-serif font-normal text-amber-100 underline decoration-wedding-500/40 decoration-wavy decoration-1 underline-offset-8">
            Wedding Services
          </span>
        </motion.h1>

        {/* Short Description (PDF Requirement) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-stone-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md"
        >
          Connect with hand-vetted grand estates, master cinematographers, bespoke floral designers, and culinary artisans for your unforgettable celebration.
        </motion.p>

        {/* Primary CTA Button (Explore Wedding Services - PDF Requirement) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-wedding-600 via-wedding-500 to-rose-700 hover:from-wedding-700 hover:to-rose-800 px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ring-2 ring-white/20"
          >
            <span>Explore Wedding Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/sign-up"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-white"
          >
            <span>Join as Vendor</span>
          </Link>
        </motion.div>

        {/* Interactive Luxury Search Bar Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-4 max-w-3xl mx-auto"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="rounded-3xl border border-white/25 bg-white/15 p-2 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full bg-white/95 rounded-2xl text-slate-900">
              <Search className="h-4 w-4 text-wedding-600 shrink-0" />
              <input
                type="text"
                placeholder="Search venue, photography, florist, catering..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="w-full md:w-56 px-4 py-3 bg-white/95 rounded-2xl text-slate-900 flex items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Photography & Videography">Photography & Film</option>
                <option value="Wedding Venues">Wedding Venues</option>
                <option value="Decoration & Florist">Decoration & Florist</option>
                <option value="Catering Services">Catering Services</option>
                <option value="Makeup & Styling">Makeup & Styling</option>
                <option value="Wedding Fashion">Wedding Fashion</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-wedding-600 hover:bg-wedding-700 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shrink-0"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Editorial Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" />
              100% Admin Verified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
              Direct Vendor Booking
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-amber-300" />
              Live Availability Requests
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
