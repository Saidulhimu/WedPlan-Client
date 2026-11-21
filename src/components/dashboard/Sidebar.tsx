"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/shared/Logo";
import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  LayoutDashboard,
  CalendarDays,
  Store,
  PlusCircle,
  CreditCard,
  UserCheck,
  Users,
  Layers,
  Receipt,
  Settings,
  Sparkles,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const customerLinks = [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarDays },
    { label: "Profile Settings", href: "/dashboard/customer/profile", icon: Settings },
  ];

  const vendorLinks = [
    { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
    { label: "My Services", href: "/dashboard/vendor/services", icon: Store },
    { label: "Add Service", href: "/dashboard/vendor/add-service", icon: PlusCircle },
    { label: "Booking Requests", href: "/dashboard/vendor/booking-requests", icon: CalendarDays },
    { label: "Subscription", href: "/dashboard/vendor/subscription", icon: CreditCard },
    { label: "Profile Settings", href: "/dashboard/vendor/profile", icon: Settings },
  ];

  const adminLinks = [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Manage Services", href: "/dashboard/admin/services", icon: Layers },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
  ];

  let links = customerLinks;
  if (user.role === "vendor") links = vendorLinks;
  if (user.role === "admin") links = adminLinks;

  return (
    <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-champagne-300 bg-white p-6 flex flex-col justify-between shadow-sm">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="pb-4 border-b border-champagne-200">
          <Logo size="sm" />
        </div>

        {/* User Card */}
        <div className="rounded-2xl border border-champagne-300 bg-wedding-50/70 p-4">
          <div className="flex items-center space-x-3">
            <UserAvatar src={user.image} name={user.name} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-900 truncate">{user.name}</h3>
              <div className="flex items-center gap-1 text-[11px] text-wedding-600 font-semibold capitalize">
                <span>{user.role}</span>
                {user.subscriptionPlan === "premium" && (
                  <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full text-[9px] font-bold">
                    PRO
                  </span>
                )}
              </div>
            </div>
          </div>
          {user.isBlocked && (
            <div className="mt-2 text-[10px] text-red-600 font-bold flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> Account Restricted
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-2xl px-4 py-3 text-xs font-bold tracking-wide transition-all ${isActive
                  ? "bg-wedding-500 text-white shadow-md"
                  : "text-slate-600 hover:bg-wedding-50 hover:text-wedding-700"
                  }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-6 border-t border-champagne-200 mt-6">
        <button
          onClick={logout}
          className="flex w-full items-center space-x-2.5 rounded-2xl px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
