"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { AdminStats } from "@/types";
import { formatPrice } from "@/lib/utils";
import {
  Users,
  Store,
  Heart,
  Layers,
  Clock,
  CreditCard,
  TrendingUp,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        if (data?.stats) {
          setStats(data.stats);
        }
      } catch (err) {
        console.warn("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-wedding-600">
          Super Admin Console
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Platform Overview & Analytics
        </h1>
        <p className="text-xs text-slate-500">
          Monitor platform users, vendor moderation pipelines, and Stripe transactions.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
        </div>
      ) : stats ? (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Total Users</span>
                <Users className="h-4 w-4 text-wedding-600" />
              </div>
              <p className="font-serif text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                {stats.totalVendors} Vendors • {stats.totalCustomers} Customers
              </p>
            </div>

            <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Total Services</span>
                <Layers className="h-4 w-4 text-wedding-600" />
              </div>
              <p className="font-serif text-3xl font-bold text-slate-900">{stats.totalServices}</p>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">
                {stats.pendingServices} Awaiting Review
              </p>
            </div>

            <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold">Transactions</span>
                <CreditCard className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="font-serif text-3xl font-bold text-slate-900">{stats.totalTransactions}</p>
              <p className="text-[11px] text-slate-400 mt-1">Stripe Checkout records</p>
            </div>

            <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-xs font-semibold">Platform Revenue</span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="font-serif text-3xl font-bold text-emerald-600">
                {formatPrice(stats.totalRevenue)}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Lifetime Premium fees</p>
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/dashboard/admin/services"
              className="group rounded-3xl border border-champagne-200 bg-white p-6 shadow-sm hover:border-wedding-400 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <Clock className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Service Moderation
              </h3>
              <p className="text-xs text-slate-500">
                Review, approve, or decline new services submitted by platform vendors.
              </p>
            </Link>

            <Link
              href="/dashboard/admin/users"
              className="group rounded-3xl border border-champagne-200 bg-white p-6 shadow-sm hover:border-wedding-400 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Users className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                User Management
              </h3>
              <p className="text-xs text-slate-500">
                Inspect registered customers and vendors, and manage account access status.
              </p>
            </Link>

            <Link
              href="/dashboard/admin/transactions"
              className="group rounded-3xl border border-champagne-200 bg-white p-6 shadow-sm hover:border-wedding-400 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <CreditCard className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Financial Transactions
              </h3>
              <p className="text-xs text-slate-500">
                Inspect Stripe subscription payments and financial audit trails.
              </p>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
