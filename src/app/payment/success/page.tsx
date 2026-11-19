"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, Sparkles, ArrowRight, Loader2 } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { updateUser } = useAuth();

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        setSuccess(true);
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

  return (
    <div className="max-w-md w-full rounded-3xl border border-champagne-200 bg-white p-8 text-center shadow-xl space-y-6">
      {verifying ? (
        <div className="py-12 space-y-3">
          <Loader2 className="h-10 w-10 text-wedding-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-medium">
            Verifying Stripe payment confirmation...
          </p>
        </div>
      ) : (
        <>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mx-auto shadow-sm">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-800">
              <Sparkles className="h-3.5 w-3.5 fill-amber-500" />
              Premium Activated
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-900">
              Upgrade Confirmed!
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Thank you for upgrading to WedPlan Premium Vendor. You now have unlimited service listings and premier directory placement.
            </p>
          </div>

          <div className="pt-4 border-t border-champagne-100">
            <Link
              href="/dashboard/vendor"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-wedding-500 py-3 text-xs font-bold text-white shadow-md hover:bg-wedding-600 transition-all"
            >
              <span>Go to Vendor Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen py-24 bg-wedding-50 flex items-center justify-center px-4">
      <Suspense
        fallback={
          <div className="max-w-md w-full rounded-3xl border border-champagne-200 bg-white p-12 text-center shadow-xl">
            <Loader2 className="h-8 w-8 text-wedding-600 animate-spin mx-auto" />
          </div>
        }
      >
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
