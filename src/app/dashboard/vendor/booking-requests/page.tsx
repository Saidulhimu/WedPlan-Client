"use client";

import React, { useEffect, useState } from "react";
import { Booking } from "@/types";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  CalendarDays,
  User,
  MapPin,
  MessageSquare,
  Check,
  X,
  Loader2,
} from "lucide-react";

export default function VendorBookingRequestsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get("/bookings/vendor/requests");
      if (data?.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      toast.error("Failed to load booking requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, status: "accepted" | "rejected") => {
    setProcessingId(id);
    try {
      const { data } = await api.patch(`/bookings/vendor/${id}/status`, { status });
      if (data.success) {
        toast.success(`Booking request marked as ${status}!`);
        fetchRequests();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update booking status.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Inbound Booking Inquiries
        </h1>
        <p className="text-xs text-slate-500">
          Review customer inquiries for your wedding packages. Accept or decline based on your availability.
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
              <div className="space-y-3 flex-1">
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
                    Received on {formatDate(b.createdAt)}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {b.serviceId?.serviceName || "Service"}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                    <User className="h-3.5 w-3.5 text-wedding-600" />
                    <span className="font-semibold">{b.customerId?.name}</span>
                    <span className="text-slate-400">({b.customerId?.email})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-wedding-600" />
                    <span>Requested Date: <strong>{b.eventDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-wedding-600" />
                    <span>Venue Location: {b.eventLocation}</span>
                  </div>
                </div>

                {b.message && (
                  <div className="flex items-start gap-2 bg-wedding-50/50 p-3 rounded-xl border border-champagne-100 text-xs text-slate-600">
                    <MessageSquare className="h-4 w-4 text-wedding-500 flex-shrink-0 mt-0.5" />
                    <span className="italic">"{b.message}"</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Accept / Reject only for Pending requests */}
              {b.status === "pending" ? (
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleAction(b._id, "accepted")}
                    disabled={processingId === b._id}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-all disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleAction(b._id, "rejected")}
                    disabled={processingId === b._id}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  Decision finalized
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-champagne-300 bg-white p-14 text-center space-y-3">
          <CalendarDays className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            No booking inquiries yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once couples discover your wedding services, their booking requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
