"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { AlertCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-[#FDFBF7] via-white to-[#FAF6F0] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-champagne-300 bg-white p-8 sm:p-10 text-center shadow-2xl space-y-6">
        <div className="flex justify-center">
          <Logo size="md" />
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 mx-auto ring-8 ring-amber-50/50 shadow-sm">
          <AlertCircle className="h-9 w-9 stroke-[2.2]" />
        </div>

        <div className="space-y-2">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            Checkout Incomplete
          </span>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Payment Not Completed
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            Your Stripe checkout session was stopped. No charges were billed to your card. You can resume your upgrade whenever you are ready.
          </p>
        </div>

        <div className="pt-4 border-t border-champagne-200 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/vendor/subscription"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-wedding-500 py-3.5 text-xs font-bold text-white shadow-md hover:bg-wedding-600 transition-all uppercase tracking-wider"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Try Again</span>
          </Link>
          <Link
            href="/dashboard/vendor"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-champagne-300 bg-white py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-wedding-400 transition-all shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
