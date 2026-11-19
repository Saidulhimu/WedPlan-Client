"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Loader2,
  Lock,
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
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Vendor Membership Plans
        </h1>
        <p className="text-xs text-slate-500">
          Upgrade your vendor account to publish unlimited wedding services and enjoy premier visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan Card */}
        <div
          className={`rounded-3xl border p-8 flex flex-col justify-between ${
            !isPremium
              ? "border-wedding-300 bg-white shadow-md ring-2 ring-wedding-100"
              : "border-champagne-200 bg-white shadow-sm opacity-80"
          }`}
        >
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Standard Tier
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Free Plan
              </h2>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl font-bold text-slate-900">$0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>Maximum 3 Active Wedding Services</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>Standard Vendor Dashboard</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>Booking Request Management</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            {!isPremium ? (
              <span className="block w-full py-3 text-center text-xs font-bold text-slate-500 bg-slate-100 rounded-xl">
                Current Active Plan
              </span>
            ) : (
              <span className="block w-full py-3 text-center text-xs font-medium text-slate-400">
                Included in Premium
              </span>
            )}
          </div>
        </div>

        {/* Premium Plan Card */}
        <div
          className={`relative rounded-3xl border p-8 flex flex-col justify-between ${
            isPremium
              ? "border-amber-400 bg-gradient-to-b from-amber-50/50 to-white shadow-xl ring-2 ring-amber-200"
              : "border-wedding-500 bg-gradient-to-b from-wedding-50/60 via-champagne-50/40 to-white shadow-xl"
          }`}
        >
          <div className="absolute -top-3.5 right-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1 text-[11px] font-bold text-white shadow-md">
              <Sparkles className="h-3 w-3 fill-white" />
              Recommended
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Exclusive Pro Tier
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                Premium Vendor
              </h2>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl font-bold text-slate-900">$49</span>
                <span className="text-xs text-slate-500">/ one-time test fee</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 flex-shrink-0" />
                <span><strong>Unlimited</strong> Active Wedding Services</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 flex-shrink-0" />
                <span>Gold <strong>Verified Premium Badge</strong> on cards & profile</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 flex-shrink-0" />
                <span>Priority placement in search & browse results</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-wedding-600 flex-shrink-0" />
                <span>Includes all standard features</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            {isPremium ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 py-3 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>You are currently an active Premium Vendor</span>
              </div>
            ) : (
              <button
                onClick={handleUpgradeToPremium}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-wedding-500 py-3.5 text-xs font-bold text-white shadow-lg shadow-wedding-500/25 hover:bg-wedding-600 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting to Stripe...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    <span>Upgrade to Premium with Stripe</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
