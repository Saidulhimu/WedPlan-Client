"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Service, Booking } from "@/types";
import {
  Store,
  Layers,
  Clock,
  CheckCircle2,
  BadgeCheck,
  Crown,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

export default function VendorOverviewPage() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const [servicesRes, bookingsRes] = await Promise.all([
          api.get("/services/vendor/my-services"),
          api.get("/bookings/vendor/requests"),
        ]);
        if (servicesRes.data?.services) setServices(servicesRes.data.services);
        if (bookingsRes.data?.bookings) setBookings(bookingsRes.data.bookings);
      } catch (err) {
        console.warn("Failed to fetch vendor dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  const totalServices = services.length;
  const activeServices = services.filter((s) => s.status === "approved" && s.isAvailable).length;
  const pendingRequests = bookings.filter((b) => b.status === "pending").length;
  const acceptedBookings = bookings.filter((b) => b.status === "accepted").length;
  const isPremium = user?.subscriptionPlan === "premium";

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="rounded-3xl border border-champagne-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-wedding-600">
              <span>Vendor Hub</span>
              {isPremium && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[10px] font-bold">
                  <BadgeCheck className="h-3.5 w-3.5 text-amber-600" />
                  Premium Verified
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              {user?.businessName || user?.name}
            </h1>
            <p className="text-xs text-slate-500">
              Manage your services catalog, booking requests, and membership tier.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              href="/dashboard/vendor/add-service"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-wedding-500 px-4 py-2.5 text-xs font-bold text-white shadow hover:bg-wedding-600 transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add New Service</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Free Plan Alert Banner */}
      {!isPremium && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Crown className="h-4 w-4 text-amber-600" />
              Free Tier: Limited to 3 Active Services ({activeServices}/3 Used)
            </h3>
            <p className="text-[11px] text-amber-700">
              Upgrade to Premium for unlimited service listings, featured placement, and priority badges.
            </p>
          </div>
          <Link
            href="/dashboard/vendor/subscription"
            className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 whitespace-nowrap self-start sm:self-auto"
          >
            Upgrade to Premium ($49)
          </Link>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="rounded-2xl border border-champagne-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Services</span>
            <Layers className="h-4 w-4 text-wedding-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{totalServices}</p>
        </div>

        <div className="rounded-2xl border border-champagne-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-semibold">Active Services</span>
            <Store className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{activeServices}</p>
        </div>

        <div className="rounded-2xl border border-champagne-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-semibold">Pending Requests</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{pendingRequests}</p>
        </div>

        <div className="rounded-2xl border border-champagne-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-semibold">Accepted Bookings</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{acceptedBookings}</p>
        </div>

        <div className="rounded-2xl border border-champagne-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-wedding-600 mb-2">
            <span className="text-xs font-semibold">Current Plan</span>
            <Crown className="h-4 w-4 text-amber-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-slate-900 capitalize">
            {user?.subscriptionPlan}
          </p>
        </div>
      </div>

      {/* Quick Navigation to Services & Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-champagne-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Published Services
            </h3>
            <Link
              href="/dashboard/vendor/services"
              className="text-xs font-bold text-wedding-600 hover:underline"
            >
              View All ({services.length})
            </Link>
          </div>
          <div className="space-y-2">
            {services.slice(0, 3).map((s) => (
              <div
                key={s._id}
                className="flex items-center justify-between p-3 rounded-xl border border-champagne-100 hover:bg-slate-50/50"
              >
                <div className="text-xs font-semibold text-slate-800 truncate max-w-xs">
                  {s.serviceName}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    s.status === "approved"
                      ? "bg-emerald-50 text-emerald-700"
                      : s.status === "rejected"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-champagne-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Inbound Booking Inquiries
            </h3>
            <Link
              href="/dashboard/vendor/booking-requests"
              className="text-xs font-bold text-wedding-600 hover:underline"
            >
              View Requests ({bookings.length})
            </Link>
          </div>
          <div className="space-y-2">
            {bookings.slice(0, 3).map((b) => (
              <div
                key={b._id}
                className="flex items-center justify-between p-3 rounded-xl border border-champagne-100 hover:bg-slate-50/50"
              >
                <div className="text-xs font-semibold text-slate-800 truncate max-w-xs">
                  {b.customerId?.name || "Customer"} • {b.eventDate}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    b.status === "accepted"
                      ? "bg-emerald-50 text-emerald-700"
                      : b.status === "rejected"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
