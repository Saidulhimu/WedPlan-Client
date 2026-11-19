"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen py-24 bg-wedding-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-champagne-200 bg-white p-8 text-center shadow-xl space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 mx-auto shadow-sm">
          <AlertCircle className="h-9 w-9" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Payment Cancelled
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your Stripe checkout session was cancelled. No charges were made to your account. You can upgrade anytime from your vendor dashboard.
          </p>
        </div>

        <div className="pt-4 border-t border-champagne-100 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/vendor/subscription"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-wedding-500 py-3 text-xs font-bold text-white shadow hover:bg-wedding-600"
          >
            <span>Try Again</span>
          </Link>
          <Link
            href="/dashboard/vendor"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-champagne-300 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
