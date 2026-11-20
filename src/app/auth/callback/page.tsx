"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/shared/Logo";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userJson = searchParams.get("user");

    if (token && userJson) {
      try {
        const user = JSON.parse(decodeURIComponent(userJson));
        login(token, user);
        toast.success(`Welcome to WedPlan, ${user.name}!`);

        if (user.role === "admin") {
          router.replace("/dashboard/admin");
        } else if (user.role === "vendor") {
          router.replace("/dashboard/vendor");
        } else {
          router.replace("/dashboard/customer");
        }
      } catch (err) {
        console.error("Failed to parse Google user session:", err);
        toast.error("Session verification failed. Please sign in again.");
        router.replace("/sign-in");
      }
    } else {
      const errorMsg = searchParams.get("error");
      if (errorMsg) {
        toast.error(decodeURIComponent(errorMsg));
      }
      router.replace("/sign-in");
    }
  }, [searchParams, login, router]);

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
