"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Loader2, AlertOctagon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.push("/sign-in");
        return;
      }

      // Strict Role Guards: Prevent accessing another role's dashboard by altering URL
      if (pathname.startsWith("/dashboard/admin") && user.role !== "admin") {
        router.push(`/dashboard/${user.role}`);
      } else if (pathname.startsWith("/dashboard/vendor") && user.role !== "vendor") {
        router.push(`/dashboard/${user.role}`);
      } else if (pathname.startsWith("/dashboard/customer") && user.role !== "customer") {
        router.push(`/dashboard/${user.role}`);
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-wedding-50">
        <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  // Blocked user guard
  if (user.isBlocked) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-wedding-50 px-4">
        <div className="max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl space-y-4">
          <AlertOctagon className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Account Access Restricted
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your account has been temporarily blocked by administration. Please contact WedPlan platform support for assistance.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col lg:flex-row">
      <DashboardSidebar />
      <div className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">{children}</div>
    </div>
  );
}
