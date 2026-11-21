"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/shared/Logo";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function CallbackHandler() {
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    const token = searchParams.get("token");
    const userJson = searchParams.get("user");

    if (token && userJson) {
      processedRef.current = true;
      try {
        let user: any;
        try {
          user = JSON.parse(userJson);
        } catch {
          user = JSON.parse(decodeURIComponent(userJson));
        }

        login(token, user);
        toast.success(`Welcome to WedPlan, ${user.name}!`);

        const destination =
          user.role === "admin"
            ? "/dashboard/admin"
            : user.role === "vendor"
              ? "/dashboard/vendor"
              : "/dashboard/customer";

        window.location.replace(destination);
      } catch (err) {
        console.error("Failed to parse Google user session:", err);
        toast.error("Session verification failed. Please sign in again.");
        window.location.replace("/sign-in");
      }
    } else {
      processedRef.current = true;
      const errorMsg = searchParams.get("error");
      if (errorMsg) {
        toast.error(decodeURIComponent(errorMsg));
      }
      window.location.replace("/sign-in");
    }
  }, [searchParams, login]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-champagne-300 bg-white p-8 shadow-2xl text-center space-y-5">
        <div className="flex justify-center">
          <Logo size="md" />
        </div>
        <div className="flex justify-center py-4">
          <Loader2 className="h-10 w-10 text-wedding-500 animate-spin" />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif text-lg font-bold text-slate-900">
            Authenticating with Google
          </h2>
          <p className="text-xs text-slate-500">
            Establishing your secure WedPlan session. Redirecting to your dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GoogleAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-wedding-500 animate-spin" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
