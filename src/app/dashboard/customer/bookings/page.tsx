"use client";

import React, { useEffect, useState } from "react";
import { Booking } from "@/types";
import { api } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/customer/my-bookings");
      if (data?.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      toast.error("Failed to load your booking inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this pending booking request?")) return;

    setCancellingId(id);
    try {
      const { data } = await api.patch(`/bookings/customer/${id}/cancel`);
      if (data.success) {
        toast.success("Booking request cancelled successfully.");
        fetchBookings();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel booking request.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          My Wedding Bookings
        </h1>
        <p className="text-xs text-slate-500">
          Track all booking requests submitted to wedding professionals.
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="rounded-3xl border border-champagne-200 bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-wedding-300 transition-all"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
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
                  <span className="text-xs text-slate-400">
                    Requested on {formatDate(b.createdAt)}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {b.serviceId?.serviceName || "Wedding Service"}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-wedding-600" />
                    <span>Event Date: <strong>{b.eventDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-wedding-600" />
                    <span>Venue: {b.eventLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-wedding-600" />
                    <span>Vendor: {b.vendorId?.businessName || b.vendorId?.name || "Professional"}</span>
                  </div>
                  {b.serviceId?.price && (
                    <div className="font-semibold text-slate-800">
                      Rate: {formatPrice(b.serviceId.price)}
                    </div>
                  )}
                </div>

                {b.message && (
                  <p className="text-xs text-slate-500 italic bg-wedding-50/50 p-2.5 rounded-xl border border-champagne-100 mt-2">
                    Note: "{b.message}"
                  </p>
                )}
              </div>

              {/* Action: Cancel Pending Booking */}
              {b.status === "pending" && (
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => handleCancelBooking(b._id)}
                    disabled={cancellingId === b._id}
                    className="w-full md:w-auto rounded-xl border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {cancellingId === b._id ? "Cancelling..." : "Cancel Request"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-champagne-300 bg-white p-14 text-center space-y-3">
          <CalendarDays className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            No booking requests yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse through our verified wedding vendors and request bookings for your celebration.
          </p>
        </div>
      )}
    </div>
  );
}
