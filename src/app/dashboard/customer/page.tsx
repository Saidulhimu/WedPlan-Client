"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Booking } from "@/types";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings/customer/my-bookings");
        if (data?.bookings) {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.warn("Failed to fetch customer bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const accepted = bookings.filter((b) => b.status === "accepted").length;
  const rejected = bookings.filter((b) => b.status === "rejected").length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-champagne-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-wedding-600">
              Customer Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Welcome, {user?.name}
            </h1>
            <p className="text-xs text-slate-500">
              Manage your wedding inquiries, track vendor approvals, and organize your celebration.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-wedding-500 px-5 py-3 text-xs font-bold text-white shadow hover:bg-wedding-600 transition-all self-start sm:self-auto"
          >
            <span>Browse More Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Total Requests</span>
            <CalendarDays className="h-4 w-4 text-wedding-600" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{total}</p>
        </div>

        <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-semibold">Pending Review</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{pending}</p>
        </div>

        <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-semibold">Accepted Bookings</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{accepted}</p>
        </div>

        <div className="rounded-2xl border border-champagne-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-rose-600 mb-2">
            <span className="text-xs font-semibold">Declined Requests</span>
            <XCircle className="h-4 w-4 text-rose-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-900">{rejected}</p>
        </div>
      </div>

      {/* Recent Bookings Snapshot */}
      <div className="rounded-3xl border border-champagne-200 bg-white p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-slate-900">
            Recent Booking Inquiries
          </h2>
          <Link
            href="/dashboard/customer/bookings"
            className="text-xs font-bold text-wedding-600 hover:underline"
          >
            View All ({bookings.length})
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.slice(0, 3).map((b) => (
              <div
                key={b._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-champagne-100 p-4 hover:bg-slate-50/50 transition-colors gap-3"
              >
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">
                    {b.serviceId?.serviceName || "Wedding Service"}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Event Date: <strong>{b.eventDate}</strong> • Location: {b.eventLocation}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold capitalize ${
                      b.status === "accepted"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : b.status === "rejected"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : b.status === "cancelled"
                        ? "bg-slate-100 text-slate-600 border border-slate-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-6 text-center">
            You haven't submitted any booking requests yet. Discover venues & vendors to get started!
          </p>
        )}
      </div>
    </div>
  );
}
