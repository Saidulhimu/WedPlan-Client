"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Star } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-wedding-50 via-champagne-50 to-white pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-wedding-100/60 to-champagne-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-wedding-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-wedding-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
              <span>The Premier Wedding Planning Platform</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Plan Your Dream Day With{" "}
              <span className="bg-gradient-to-r from-wedding-600 via-rose-600 to-wedding-500 bg-clip-text text-transparent">
                Exceptional Vendors
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover verified wedding venues, master photographers, bespoke floral artisans, and gourmet caterers. Seamlessly request bookings and bring your romantic vision to life.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-wedding-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-wedding-500/25 hover:bg-wedding-600 hover:shadow-xl transition-all active:scale-95"
              >
                <span>Explore Wedding Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-champagne-300 bg-white px-7 py-4 text-sm font-semibold text-slate-800 shadow-sm hover:border-wedding-400 hover:bg-wedding-50/50 transition-all"
              >
                <span>Become a Vendor</span>
              </Link>
            </div>

            {/* Platform Trust Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-champagne-200 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">Verified Services</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">4.9 / 5</p>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <span className="text-slate-500 ml-1">Client Rating</span>
                </div>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">Stripe</p>
                <p className="text-xs text-slate-500 font-medium">Secure Payments</p>
              </div>
            </div>
          </motion.div>

          {/* Luxury Imagery Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Luxury Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-wedding-900/10">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop"
                  alt="Bride and Groom romantic wedding moments"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs uppercase tracking-wider font-semibold text-rose-200">Featured Venue</p>
                  <p className="font-serif text-lg font-bold">The Grand Rosewood Estate</p>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-champagne-200 bg-white p-4 shadow-xl flex items-center space-x-3 max-w-xs">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Hand-Picked Vendors</p>
                  <p className="text-[11px] text-slate-500">Every service reviewed by administration</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
