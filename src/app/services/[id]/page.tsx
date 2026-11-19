"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Service } from "@/types";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import {
  MapPin,
  Tag,
  Calendar,
  Sparkles,
  ShieldCheck,
  Send,
  Building,
  User,
  AlertCircle,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  // Booking Form State
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to sign-in per access rule
    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }

    const fetchService = async () => {
      try {
        const { data } = await api.get(`/services/${id}`);
        if (data?.service) {
          setService(data.service);
          if (data.service.images?.length > 0) {
            setSelectedImage(data.service.images[0]);
          }
        }
      } catch (err: any) {
        toast.error("Service not found or unavailable.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id, isAuthenticated, router]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      router.push("/sign-in");
      return;
    }

    if (user.role === "admin") {
      toast.error("Admins cannot submit customer booking requests.");
      return;
    }

    const vendorId =
      typeof service?.vendorId === "object"
        ? (service?.vendorId as any)._id
        : service?.vendorId;

    if (vendorId === user._id || vendorId === user.id) {
      toast.error("You cannot book your own wedding service.");
      return;
    }

    if (!eventDate || !eventLocation) {
      toast.error("Please provide both event date and event venue location.");
      return;
    }

    setSubmittingBooking(true);

    try {
      const { data } = await api.post("/bookings", {
        serviceId: service?._id,
        eventDate,
        eventLocation,
        message,
      });

      if (data.success) {
        toast.success(
          "Booking request submitted successfully! The vendor will review it shortly."
        );
        setModalOpen(false);
        setEventDate("");
        setEventLocation("");
        setMessage("");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit booking request.");
    } finally {
      setSubmittingBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-wedding-50">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
          <p className="text-xs font-medium text-slate-500">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-wedding-50 px-4">
        <div className="rounded-3xl border border-champagne-200 bg-white p-12 text-center max-w-md shadow-sm">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
          <h2 className="font-serif text-xl font-bold text-slate-900">Service Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            The requested service may have been removed, unapproved, or the link is invalid.
          </p>
          <button
            onClick={() => router.push("/services")}
            className="rounded-xl bg-wedding-500 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-wedding-600"
          >
            Browse Other Services
          </button>
        </div>
      </div>
    );
  }

  const vendor = typeof service.vendorId === "object" ? (service.vendorId as any) : null;
  const isOwner = user && (user._id === vendor?._id || user.id === vendor?._id);

  return (
    <div className="min-h-screen bg-wedding-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <span className="cursor-pointer hover:underline" onClick={() => router.push("/services")}>
            Services
          </span>
          <span>/</span>
          <span className="text-slate-700 font-medium truncate max-w-xs">{service.serviceName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery & Description */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Featured Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-champagne-200 bg-white shadow-md">
              <img
                src={selectedImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"}
                alt={service.serviceName}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-slate-900 shadow backdrop-blur">
                  <Tag className="h-3.5 w-3.5 text-wedding-500" />
                  {service.category}
                </span>
              </div>
            </div>

            {/* Multiple Images Thumbnail Gallery */}
            {service.images && service.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {service.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImage === img
                        ? "border-wedding-600 scale-95 shadow-md"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Service Details & Description */}
            <div className="rounded-3xl border border-champagne-200 bg-white p-8 shadow-sm space-y-6">
              <div>
                <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">
                  {service.serviceName}
                </h1>
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-wedding-500" />
                    {service.location}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified Listing
                  </span>
                </div>
              </div>

              <div className="border-t border-champagne-100 pt-6">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">
                  Service Description
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 rounded-3xl border border-champagne-200 bg-white p-7 shadow-lg space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                  Pricing Package
                </span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="font-serif text-3xl font-bold text-slate-900">
                    {formatPrice(service.price)}
                  </span>
                  <span className="text-xs text-slate-500">/ event</span>
                </div>
              </div>

              {/* Vendor Profile Snapshot */}
              {vendor && (
                <div className="border-t border-champagne-100 pt-5 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                    Vendor Details
                  </span>
                  <div className="flex items-center space-x-3">
                    {vendor.image ? (
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-wedding-200"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-wedding-100 flex items-center justify-center text-wedding-600 font-bold">
                        {vendor.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        {vendor.businessName || vendor.name}
                        {vendor.subscriptionPlan === "premium" && (
                          <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-500">{vendor.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking CTA Button */}
              <div className="border-t border-champagne-100 pt-5">
                {isOwner ? (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center text-xs text-amber-800 font-medium">
                    This is your own service listing. You can manage it from your vendor dashboard.
                  </div>
                ) : user?.role === "admin" ? (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center text-xs text-slate-600 font-medium">
                    Admins have read-only preview permissions for bookings.
                  </div>
                ) : (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-wedding-500 py-3.5 text-xs font-bold text-white shadow-md hover:bg-wedding-600 hover:shadow-lg transition-all active:scale-95"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Request Booking</span>
                  </button>
                )}
              </div>

              <div className="rounded-2xl bg-wedding-50/70 p-4 border border-champagne-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>WedPlan Guarantee</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Your request is sent directly to the verified vendor. No charges apply until your event date and booking are confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-champagne-200 bg-white p-7 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 space-y-1">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Request Service Booking
              </h3>
              <p className="text-xs text-slate-500">
                Service: <strong className="text-slate-800">{service.serviceName}</strong>
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Wedding / Event Date
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event Location / Venue Address
                </label>
                <input
                  type="text"
                  required
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g. The Botanical Gardens, New York"
                  className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Special Requests
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide any additional details about your ceremony or timing..."
                  className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-wedding-500 px-5 py-2 text-xs font-bold text-white shadow hover:bg-wedding-600 disabled:opacity-50"
                >
                  {submittingBooking ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Send Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
