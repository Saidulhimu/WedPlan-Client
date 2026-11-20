import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white text-slate-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* 1. Logo & Short Description (PDF Requirement) */}
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-xs leading-relaxed text-slate-500 pt-1 max-w-xs">
              WedPlan is a curated wedding planning platform connecting couples with verified wedding venues, photographers, florists, and catering artisans.
            </p>
            {/* 4. Social Media Links (PDF Requirement) */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-slate-500 hover:border-wedding-500 hover:text-wedding-600 hover:bg-wedding-50 transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-slate-500 hover:border-wedding-500 hover:text-wedding-600 hover:bg-wedding-50 transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-slate-500 hover:border-wedding-500 hover:text-wedding-600 hover:bg-wedding-50 transition-all"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 2. Important Navigation Links - Explore (PDF Requirement) */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 tracking-[0.2em] uppercase">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-wedding-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-wedding-600 transition-colors">
                  Browse All Services
                </Link>
              </li>
              <li>
                <Link href="/services?category=Wedding+Venues" className="hover:text-wedding-600 transition-colors">
                  Wedding Venues
                </Link>
              </li>
              <li>
                <Link href="/services?category=Photography+%26+Videography" className="hover:text-wedding-600 transition-colors">
                  Photography & Videography
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Important Navigation Links - Portal Links (PDF Requirement) */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 tracking-[0.2em] uppercase">
              Account & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sign-in" className="hover:text-wedding-600 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-wedding-600 transition-colors">
                  Join as Vendor
                </Link>
              </li>
              <li>
                <Link href="/dashboard/customer" className="hover:text-wedding-600 transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor" className="hover:text-wedding-600 transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Information (PDF Requirement) */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-slate-900 tracking-[0.2em] uppercase">
              Contact Information
            </h4>
            <div className="space-y-2.5 text-xs text-slate-500">
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-wedding-600 shrink-0" />
                <span>support@wedplan.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-wedding-600 shrink-0" />
                <span>+1 (800) 933-PLAN</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="h-4 w-4 text-wedding-600 shrink-0" />
                <span>Madison Avenue, New York, NY</span>
              </div>
            </div>
          </div>

        </div>

        {/* 5. Copyright Information (PDF Requirement) */}
        <div className="mt-12 border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} WedPlan. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-3 sm:mt-0">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
