"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  BadgeCheck,
  Crown,
  Award,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Loader2,
  Lock,
  Receipt,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  Clock,
  HelpCircle,
} from "lucide-react";

export default function VendorSubscriptionPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const isPremium = user?.subscriptionPlan === "premium";

  const handleUpgradeToPremium = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/payment/create-checkout-session");
      if (data?.url) {
        toast.info("Redirecting to secure Stripe Checkout...");
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to initialize Stripe Checkout session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-wedding-100/70 border border-wedding-200 px-3.5 py-1 text-[11px] font-bold text-wedding-800 uppercase tracking-wider">
          <BadgeCheck className="h-3.5 w-3.5 text-wedding-600" />
          Vendor Monetization & Pro Privileges
        </div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">
          Membership & Payment Hub
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl">
          Empower your studio with WedPlan Pro. Publish limitless luxury wedding packages, receive premier search placement, and display the verified golden trust emblem.
        </p>
      </div>

      {/* Active Membership Status Alert (When Premium) */}
      {isPremium && (
        <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-r from-amber-50/90 via-wedding-50/50 to-white p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-bold text-slate-900">
                  Active Premium Pro Membership
                </h3>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Your studio enjoys unlimited service publishing, verified gold badge prestige, and priority concierge ranking.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/payment/success"
              className="inline-flex items-center gap-1.5 rounded-xl border border-champagne-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-wedding-400 hover:text-wedding-600 shadow-sm transition-all"
            >
              <Receipt className="h-3.5 w-3.5" />
              <span>View Receipt</span>
            </Link>
            <Link
              href="/dashboard/vendor/add-service"
              className="inline-flex items-center gap-1.5 rounded-xl bg-wedding-500 px-4 py-2 text-xs font-bold text-white hover:bg-wedding-600 shadow-md transition-all"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Service</span>
            </Link>
          </div>
        </div>
      )}

      {/* Membership Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan Card */}
        <div
          className={`rounded-3xl border p-8 flex flex-col justify-between transition-all ${!isPremium
              ? "border-wedding-300 bg-white shadow-lg ring-2 ring-wedding-100"
              : "border-champagne-200 bg-white shadow-sm opacity-80"
            }`}
        >
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Standard Tier
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Free Community Plan
              </h2>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl font-bold text-slate-900">$0</span>
                <span className="text-xs text-slate-500 font-medium">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Designed for boutique creators getting started with luxury wedding inquiries.
              </p>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-600">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Maximum <strong>3 Active Wedding Services</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Standard Vendor Management Dashboard</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Customer Inquiries & Booking Actions</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <span className="h-4 w-4 flex items-center justify-center font-bold text-[10px]">✕</span>
                <span className="line-through">Verified Gold Profile Badge</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <span className="h-4 w-4 flex items-center justify-center font-bold text-[10px]">✕</span>
                <span className="line-through">Search Priority Algorithms</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            {!isPremium ? (
              <span className="block w-full py-3 text-center text-xs font-bold text-slate-600 bg-slate-100 rounded-2xl border border-slate-200">
                Current Active Plan
              </span>
            ) : (
              <span className="block w-full py-3 text-center text-xs font-medium text-slate-400">
                Included in your Pro Tier
              </span>
            )}
          </div>
        </div>

        {/* Premium Plan Card */}
        <div
          className={`relative rounded-3xl border p-8 flex flex-col justify-between transition-all ${isPremium
              ? "border-amber-400 bg-gradient-to-b from-amber-50/40 via-white to-white shadow-xl ring-2 ring-amber-300"
              : "border-wedding-500 bg-gradient-to-b from-wedding-50/80 via-champagne-50/40 to-white shadow-2xl ring-2 ring-wedding-300/50"
            }`}
        >
          <div className="absolute -top-3.5 right-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1 text-[11px] font-bold text-white shadow-md">
              <Award className="h-3.5 w-3.5 text-white" />
              Most Popular • Recommended
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Exclusive Pro Tier
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Verified Pro Vendor
              </h2>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="font-serif text-4xl font-bold text-wedding-600">$49</span>
                <span className="text-xs text-slate-500 font-medium">/ one-time lifetime test fee</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Full unlimited access to showcase your entire luxury bridal portfolio to affluent couples.
              </p>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 shrink-0" />
                <span><strong>Unlimited</strong> Active Wedding Service Listings</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 shrink-0" />
                <span>Gold <strong>Verified Premium Badge</strong> on search cards & profile</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 shrink-0" />
                <span><strong>Priority placement</strong> at the top of client search results</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 shrink-0" />
                <span>Direct client messaging & proposal requests</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 shrink-0" />
                <span>Comprehensive lead inquiry analytics & Stripe invoice receipt</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            {isPremium ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 py-3.5 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>You are an Active Premium Pro Vendor</span>
              </div>
            ) : (
              <button
                onClick={handleUpgradeToPremium}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-wedding-500 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-wedding-500/25 hover:bg-wedding-600 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Connecting to Stripe Checkout...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    <span>Upgrade to Pro with Stripe ($49)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Branded Payment Methods & Trust Banner */}
      <div className="rounded-3xl border border-champagne-300 bg-white p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-champagne-200 gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Accepted Payment Methods & Billing Security
            </h3>
            <p className="text-xs text-slate-500">
              Transactions are processed directly through Stripe's certified PCI-DSS Level 1 infrastructure.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Payment Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Visa */}
          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-wedding-400 hover:shadow-sm transition-all text-center">
            <span className="font-sans text-base font-extrabold tracking-tight text-[#1A1F71] italic">
              VISA
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">Credit & Debit</span>
          </div>

          {/* MasterCard */}
          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-wedding-400 hover:shadow-sm transition-all text-center">
            <div className="flex items-center -space-x-2">
              <div className="h-5 w-5 rounded-full bg-[#EB001B] opacity-90" />
              <div className="h-5 w-5 rounded-full bg-[#F79E1B] opacity-90" />
            </div>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">Mastercard</span>
          </div>

          {/* American Express */}
          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-wedding-400 hover:shadow-sm transition-all text-center">
            <span className="font-mono text-xs font-bold text-[#006FCF] tracking-tighter bg-blue-50 px-2 py-0.5 rounded">
              AMEX
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">American Express</span>
          </div>

          {/* Apple Pay */}
          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-wedding-400 hover:shadow-sm transition-all text-center">
            <span className="font-sans text-xs font-bold text-slate-900 flex items-center gap-1">
              Pay
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">Apple Wallet</span>
          </div>

          {/* Google Pay */}
          <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-wedding-400 hover:shadow-sm transition-all text-center col-span-2 sm:col-span-1">
            <span className="font-sans text-xs font-bold text-slate-800">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span> Pay
            </span>
            <span className="text-[10px] text-slate-400 font-semibold mt-1">Google Wallet</span>
          </div>
        </div>

        {/* 3 Trust Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-champagne-200 text-xs">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="h-5 w-5 text-wedding-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Bank-Grade Security</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Card details never touch WedPlan servers. Handled exclusively by Stripe.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-wedding-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Instant Pro Activation</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Your privileges unlock the moment Stripe returns confirmation.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Receipt className="h-5 w-5 text-wedding-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900">Transparent Pricing</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                No automatic monthly subscription renewals or hidden transaction fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
