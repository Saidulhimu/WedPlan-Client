import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-champagne-300 bg-white text-slate-600">
      {/* Top Pre-Footer Newsletter & Concierge Band */}
      <div className="border-b border-champagne-200 bg-wedding-50/60 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl font-bold text-slate-900">
              Receive The WedPlan Editorial Digest
            </h4>
            <p className="text-xs text-slate-500">
              Seasonal vendor trend forecasts, exclusive venue reveals, and bridal planning guides.
            </p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 rounded-2xl border border-champagne-300 py-3 px-4 text-xs focus:border-wedding-500 focus:outline-none bg-white"
            />
            <button className="rounded-2xl bg-wedding-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-wedding-600 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs leading-relaxed text-slate-500 max-w-sm pt-2">
              WedPlan is the world-class luxury wedding marketplace. Inspired by the editorial elegance of The Knot and Zola, we seamlessly connect engaged couples with the most talented wedding cinematographers, historic manor estates, florists, and catering masters.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-2xl border border-champagne-300 text-slate-600 hover:border-wedding-500 hover:text-wedding-500 hover:bg-wedding-50 transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-2xl border border-champagne-300 text-slate-600 hover:border-wedding-500 hover:text-wedding-500 hover:bg-wedding-50 transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-2xl border border-champagne-300 text-slate-600 hover:border-wedding-500 hover:text-wedding-500 hover:bg-wedding-50 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Directory Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 tracking-wider uppercase">
              Curated Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="hover:text-wedding-600 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/services?category=Photography+%26+Videography" className="hover:text-wedding-600 transition-colors">
                  Photography & Films
                </Link>
              </li>
              <li>
                <Link href="/services?category=Wedding+Venues" className="hover:text-wedding-600 transition-colors">
                  Historic Venues
                </Link>
              </li>
              <li>
                <Link href="/services?category=Decoration+%26+Florist" className="hover:text-wedding-600 transition-colors">
                  Florists & Styling
                </Link>
              </li>
              <li>
                <Link href="/services?category=Catering+Services" className="hover:text-wedding-600 transition-colors">
                  Artisanal Catering
                </Link>
              </li>
              <li>
                <Link href="/services?category=Makeup+%26+Styling" className="hover:text-wedding-600 transition-colors">
                  Bridal Hair & Makeup
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 tracking-wider uppercase">
              For Professionals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sign-up" className="hover:text-wedding-600 transition-colors">
                  Join as a Creator
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-wedding-600 transition-colors">
                  Vendor Portal Sign In
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor/subscription" className="hover:text-wedding-600 transition-colors">
                  Premium Membership ($49)
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Verified Pro Directory
                </span>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 tracking-wider uppercase">
              WedPlan Concierge
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2.5 text-slate-500">
                <MapPin className="h-4 w-4 text-wedding-500 flex-shrink-0" />
                <span>Madison Avenue, New York, NY</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-500">
                <Phone className="h-4 w-4 text-wedding-500 flex-shrink-0" />
                <span>+1 (800) 933-PLAN</span>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-500">
                <Mail className="h-4 w-4 text-wedding-500 flex-shrink-0" />
                <span>concierge@wedplan.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-champagne-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} WedPlan Luxury Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Escrow Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
