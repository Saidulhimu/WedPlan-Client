"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Search,
  MapPin,
  Tag,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const quickCategories = [
  "All Categories",
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const quickLocations = [
  "All Locations",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "San Francisco, CA",
  "Miami, FL",
];

export function HeroBanner() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.append("search", keyword.trim());
    if (selectedCategory !== "All Categories") params.append("category", selectedCategory);
    if (selectedLocation !== "All Locations") params.append("location", selectedLocation.split(",")[0]);
    router.push(`/services?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FAF6F0] to-white pt-12 pb-24 lg:pt-16 lg:pb-28">
      {/* Background Decorative Floral / Radiant Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-tr from-wedding-100/50 via-champagne-200/30 to-rose-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Headline & Context */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-champagne-300 bg-white/90 px-4 py-1.5 text-xs font-semibold text-wedding-800 shadow-sm backdrop-blur">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif italic text-amber-600">The Knot & Zola Standard</span>
              <span className="text-slate-300">•</span>
              <span>Curated Wedding Marketplace</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Elevate Your Celebration With{" "}
              <span className="bg-gradient-to-r from-wedding-600 via-[#881337] to-wedding-500 bg-clip-text text-transparent font-serif italic">
                Master Artisans
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              From historic grand estates to visionary cinematographers and Michelin-standard banquets—WedPlan connects discerning couples with the pinnacle of wedding craft.
            </p>

            {/* Interactive Search Console Widget */}
            <div className="pt-2">
              <form
                onSubmit={handleSearch}
                className="rounded-3xl border border-champagne-300 bg-white p-3.5 sm:p-4 shadow-xl shadow-wedding-900/5 text-left grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
              >
                {/* Keyword */}
                <div className="sm:col-span-4 relative border-b sm:border-b-0 sm:border-r border-champagne-200 pb-2 sm:pb-0 sm:pr-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Search Service
                  </label>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-wedding-500 flex-shrink-0" />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. Photography, Ballroom..."
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="sm:col-span-4 relative border-b sm:border-b-0 sm:border-r border-champagne-200 pb-2 sm:pb-0 sm:pr-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Category
                  </label>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-wedding-500 flex-shrink-0" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 focus:outline-none bg-transparent cursor-pointer"
                    >
                      {quickCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div className="sm:col-span-4 relative">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Destination
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-wedding-500 flex-shrink-0" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 focus:outline-none bg-transparent cursor-pointer"
                    >
                      {quickLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-12 pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-wedding-600 to-wedding-500 py-3 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:from-wedding-700 hover:to-wedding-600 transition-all active:scale-[0.99]"
                  >
                    <span>Discover Available Wedding Packages</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Platform Credibility & Trust Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-champagne-200/90 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                  100%
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Vetted Artistry
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                  4.98
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
                  <div className="flex text-amber-500">
                    <Star className="h-3 w-3 fill-amber-400" />
                  </div>
                  <span>Couples Choice</span>
                </div>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                  $0
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Hidden Service Fees
                </p>
              </div>
            </div>
          </motion.div>

          {/* Luxury Visual Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Luxury Hero Image with Gold Border Accent */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-wedding-900/15 ring-1 ring-champagne-300">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop"
                  alt="Luxury Wedding Celebration"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-6 left-6 right-6 text-white bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-amber-300">
                        Signature Collection
                      </p>
                      <h4 className="font-serif text-lg font-bold">
                        The Rosewood Grand Ballroom
                      </h4>
                      <p className="text-xs text-rose-100 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" /> Manhattan, New York
                      </p>
                    </div>
                    <span className="rounded-xl bg-wedding-500 px-3 py-1.5 text-xs font-bold shadow">
                      From $5,800
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -top-4 -right-4 rounded-2xl border border-champagne-300 bg-white p-3.5 shadow-xl flex items-center space-x-3 max-w-[220px]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wedding-50 text-wedding-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Admin Verified</p>
                  <p className="text-[10px] text-slate-500">Every vendor vetted</p>
                </div>
              </div>

              {/* Floating Rating Pill */}
              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-champagne-300 bg-white py-2.5 px-4 shadow-xl flex items-center space-x-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    alt="Couple"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                    alt="Couple"
                  />
                </div>
                <div className="text-[11px]">
                  <span className="font-bold text-slate-900">1,200+ Couples</span>
                  <p className="text-[10px] text-emerald-600 font-semibold">Planned in 2026</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
