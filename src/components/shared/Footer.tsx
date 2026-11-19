import React from "react";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-champagne-200 bg-white text-slate-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-wedding-500 text-white shadow-sm">
                <Heart className="h-5 w-5 fill-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">
                Wed<span className="text-wedding-500">Plan</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
              WedPlan is the world-class wedding planning marketplace. We seamlessly connect couples with the most talented wedding photographers, venues, caterers, florists, and stylists.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne-200 text-slate-500 hover:border-wedding-500 hover:text-wedding-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne-200 text-slate-500 hover:border-wedding-500 hover:text-wedding-500 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-champagne-200 text-slate-500 hover:border-wedding-500 hover:text-wedding-500 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="hover:text-wedding-600 transition-colors">
                  All Wedding Services
                </Link>
              </li>
              <li>
                <Link href="/services?category=Photography+%26+Videography" className="hover:text-wedding-600 transition-colors">
                  Photography & Films
                </Link>
              </li>
              <li>
                <Link href="/services?category=Wedding+Venues" className="hover:text-wedding-600 transition-colors">
                  Wedding Venues
                </Link>
              </li>
              <li>
                <Link href="/services?category=Decoration+%26+Florist" className="hover:text-wedding-600 transition-colors">
                  Florists & Decor
                </Link>
              </li>
              <li>
                <Link href="/services?category=Catering+Services" className="hover:text-wedding-600 transition-colors">
                  Artisanal Catering
                </Link>
              </li>
            </ul>
          </div>

          {/* Vendors & Platform */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-slate-900 tracking-wider uppercase">
              For Vendors
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sign-up" className="hover:text-wedding-600 transition-colors">
                  Become a WedPlan Vendor
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-wedding-600 transition-colors">
                  Vendor Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor/subscription" className="hover:text-wedding-600 transition-colors">
                  Premium Membership
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Verified Directory
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-slate-900 tracking-wider uppercase">
              Concierge
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2.5 text-slate-500">
                <MapPin className="h-4 w-4 text-wedding-500 flex-shrink-0" />
                <span>Fifth Avenue, New York, NY 10010</span>
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
        <div className="mt-12 border-t border-champagne-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} WedPlan Platform Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Security Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
