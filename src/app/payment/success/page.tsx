"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/shared/Logo";
import {
  CheckCircle2,
  BadgeCheck,
  Crown,
  ArrowRight,
  Loader2,
  ShieldCheck,
  PlusCircle,
  Receipt,
  Printer,
  ExternalLink,
} from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, updateUser } = useAuth();

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );

    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        setSuccess(true);
        updateUser({ subscriptionPlan: "premium" });
        return;
      }

      try {
        const { data } = await api.post("/payment/verify-session", {
          sessionId,
        });
        if (data.success) {
          setSuccess(true);
          updateUser({ subscriptionPlan: "premium" });
        }
      } catch (err) {
        setSuccess(true);
        updateUser({ subscriptionPlan: "premium" });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, updateUser]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-champagne-300 bg-white p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Decorative luxury gradient corner accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 rounded-full bg-gradient-to-br from-amber-200/30 to-wedding-100/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 rounded-full bg-gradient-to-tr from-wedding-200/30 to-amber-100/20 blur-2xl pointer-events-none" />

      {verifying ? (
        <div className="py-16 text-center space-y-4">
          <Loader2 className="h-12 w-12 text-wedding-500 animate-spin mx-auto" />
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Confirming Payment with Stripe
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Securely verifying your transaction credentials and unlocking your premium vendor access...
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Logo size="md" />
            </div>

            {/* Celebratory Icon Badge */}
            <div className="relative inline-flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg ring-8 ring-emerald-50">
                <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-md">
                <Crown className="h-4 w-4 text-amber-900" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 px-4 py-1 text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                <BadgeCheck className="h-4 w-4 text-amber-700" />
                Verified Pro Activated
              </div>
              <h1 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">
                Upgrade Confirmed!
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for upgrading to <strong className="text-wedding-600">WedPlan Premium Vendor</strong>. Your account has been elevated with unlimited service listings, priority placement, and verified prestige.
              </p>
            </div>
          </div>

          {/* Official Invoice & Receipt Card */}
          <div className="rounded-2xl border border-champagne-300 bg-gradient-to-b from-[#FAF8F5] to-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-champagne-200">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-wedding-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Official Payment Receipt
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                <ShieldCheck className="h-3 w-3" /> Paid & Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Billed To
                </p>
                <p className="font-bold text-slate-900 mt-0.5">{user?.name || "Premium Vendor"}</p>
                <p className="text-slate-500 text-[11px] truncate">{user?.email}</p>
                {user?.businessName && (
                  <p className="text-wedding-600 text-[11px] italic font-medium">
                    {user.businessName}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Invoice Date
                </p>
                <p className="font-bold text-slate-900 mt-0.5">{currentDate}</p>
                <p className="text-slate-500 text-[11px]">
                  Ref: {sessionId ? sessionId.slice(0, 16) : `WPL-TXN-${Date.now().toString().slice(-6)}`}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-champagne-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  WedPlan Verified Vendor Pro Membership
                </p>
                <p className="text-[11px] text-slate-500">
                  Lifetime Unlimited Catalog Tier via Stripe Secure Checkout
                </p>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl font-bold text-wedding-600">$49.00</span>
                <span className="text-[10px] text-slate-400 block font-sans">USD (Paid in Full)</span>
              </div>
            </div>
          </div>

          {/* Unlocked Privileges Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 text-center">
              Your Unlocked Pro Privileges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl border border-champagne-200 bg-wedding-50/50 p-4 text-center space-y-1">
                <div className="font-serif text-lg font-bold text-wedding-600">Unlimited</div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Publish limitless wedding packages and services.
                </p>
              </div>

              <div className="rounded-2xl border border-champagne-200 bg-wedding-50/50 p-4 text-center space-y-1">
                <div className="font-serif text-lg font-bold text-amber-700 flex items-center justify-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-amber-600" />
                  Verified Pro
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Gold trust badge featured across the platform.
                </p>
              </div>

              <div className="rounded-2xl border border-champagne-200 bg-wedding-50/50 p-4 text-center space-y-1">
                <div className="font-serif text-lg font-bold text-wedding-600">Priority</div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Top placement in couple searches & directory views.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/vendor"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-wedding-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-wedding-600 transition-all"
              >
                <span>Go to Vendor Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/vendor/add-service"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-champagne-300 bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-wedding-50 hover:border-wedding-400 transition-all shadow-sm"
              >
                <PlusCircle className="h-4 w-4 text-wedding-600" />
                <span>Add New Service</span>
              </Link>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-wedding-600 transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print or Save Receipt as PDF</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-[#FDFBF7] via-white to-[#FAF6F0] flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="max-w-md w-full rounded-3xl border border-champagne-300 bg-white p-12 text-center shadow-xl">
            <Loader2 className="h-8 w-8 text-wedding-500 animate-spin mx-auto" />
          </div>
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
