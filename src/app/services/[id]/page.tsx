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
  BadgeCheck,
  ShieldCheck,
  Send,
  Building,
  User,
  AlertCircle,
  Loader2,
  CheckCircle2,
  X,
  Star,
  Clock,
  Award,
  Check,
  Heart,
} from "lucide-react";

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "inclusions" | "policies">("overview");

  // Booking Form State
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [estimatedGuests, setEstimatedGuests] = useState("100-150");
  const [message, setMessage] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  useEffect(() => {
    // Access rule from PDF: Redirect unauthenticated user to Sign In
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
      toast.error("Please provide both event date and venue address.");
      return;
    }

    setSubmittingBooking(true);

    try {
      const fullMessage = message.trim()
        ? `${message.trim()} (Estimated Guests: ${estimatedGuests})`
        : `Estimated Guests: ${estimatedGuests}`;

      const { data } = await api.post("/bookings", {
        serviceId: service?._id,
        eventDate,
        eventLocation,
        message: fullMessage,
      });

      if (data.success) {
        toast.success(
          "Booking inquiry submitted successfully! The vendor will review and reply in your dashboard."
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
          <p className="text-xs font-semibold text-slate-500">Loading service portfolio...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-wedding-50 px-4">
        <div className="rounded-3xl border border-champagne-300 bg-white p-12 text-center max-w-md shadow-xl">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-slate-900">Service Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
            The service listing you requested may have been unapproved, deleted by the vendor, or the URL ID is invalid.
          </p>
          <button
            onClick={() => router.push("/services")}
            className="rounded-2xl bg-wedding-500 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-wedding-600"
          >
            Return to Browse Services
          </button>
        </div>
      </div>
    );
  }

  const vendor = typeof service.vendorId === "object" ? (service.vendorId as any) : null;
  const isOwner = user && (user._id === vendor?._id || user.id === vendor?._id);
  const images = service.images && service.images.length > 0 ? service.images : ["https://images.unsplash.com/photo-1519741497674-611481863552?w=1200"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] via-white to-[#FAF6F0] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6 font-medium">
          <span className="cursor-pointer hover:underline text-wedding-600 font-bold" onClick={() => router.push("/services")}>
            Wedding Services
          </span>
          <span>/</span>
          <span className="text-slate-500">{service.category}</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{service.serviceName}</span>
        </div>

        {/* Title & Headline Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-wedding-50 border border-wedding-200 px-3 py-1 text-xs font-bold text-wedding-700">
                <Tag className="h-3.5 w-3.5 text-wedding-500" />
                {service.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Admin Certified Pro
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {service.serviceName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-wedding-500" />
                {service.location}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>4.98</span>
                <span className="text-slate-400 font-normal">(124 verified reviews)</span>
              </div>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Package Rate
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900">
              {formatPrice(service.price)}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Transparent client rate</p>
          </div>
        </div>

        {/* 5-Photo Editorial Lightbox Gallery (Airbnb & The Knot Luxury Benchmark) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden mb-12 shadow-xl border border-champagne-300">
          <div className="md:col-span-2 aspect-[4/3] md:aspect-auto h-full overflow-hidden bg-slate-100">
            <img
              src={selectedImage || images[0]}
              alt="Main Gallery Photo"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {images.slice(0, 4).map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer ${selectedImage === img ? "ring-4 ring-wedding-500" : ""
                  }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Detailed Tabs & Vendor Credibility */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tab Navigation */}
            <div className="flex items-center gap-6 border-b border-champagne-300 pb-3 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3 -mb-3 transition-colors ${activeTab === "overview"
                    ? "border-b-2 border-wedding-600 text-wedding-700"
                    : "text-slate-400 hover:text-slate-800"
                  }`}
              >
                Service Overview
              </button>
              <button
                onClick={() => setActiveTab("inclusions")}
                className={`pb-3 -mb-3 transition-colors ${activeTab === "inclusions"
                    ? "border-b-2 border-wedding-600 text-wedding-700"
                    : "text-slate-400 hover:text-slate-800"
                  }`}
              >
                Inclusions & Deliverables
              </button>
              <button
                onClick={() => setActiveTab("policies")}
                className={`pb-3 -mb-3 transition-colors ${activeTab === "policies"
                    ? "border-b-2 border-wedding-600 text-wedding-700"
                    : "text-slate-400 hover:text-slate-800"
                  }`}
              >
                Policies & Escrow
              </button>
            </div>

            {/* Tab Content */}
            <div className="rounded-3xl border border-champagne-300 bg-white p-8 shadow-sm space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    About This Wedding Package
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {service.description}
                  </p>

                  <div className="pt-6 border-t border-champagne-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-wedding-50/50 p-3.5 rounded-2xl border border-champagne-200">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Response Time</span>
                      <strong className="text-slate-800 text-sm">Under 2 Hours</strong>
                    </div>
                    <div className="bg-wedding-50/50 p-3.5 rounded-2xl border border-champagne-200">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Service Area</span>
                      <strong className="text-slate-800 text-sm">{service.location}</strong>
                    </div>
                    <div className="bg-wedding-50/50 p-3.5 rounded-2xl border border-champagne-200">
                      <span className="text-slate-400 font-semibold block text-[10px] uppercase">Availability</span>
                      <strong className="text-emerald-700 text-sm">Now Booking 2026</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "inclusions" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    What is Included in This Package
                  </h3>
                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>Full day dedicated event coverage with lead artist and assistant team</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>Comprehensive pre-wedding planning consultation & timeline alignment</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>High-resolution digital delivery via private encrypted gallery</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>Full commercial rights and heirloom print authorization</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "policies" && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    Cancellation & Security Guarantees
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    WedPlan enforces strict customer and vendor security. If an inquiry is pending, customers may cancel free of charge at any time from their dashboard. Once a booking is finalized, bespoke milestone contracts apply.
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-semibold">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Protected by WedPlan Authentic Artist Verification</span>
                  </div>
                </div>
              )}
            </div>

            {/* Vendor Profile Spotlight Card */}
            {vendor && (
              <div className="rounded-3xl border border-champagne-300 bg-white p-7 shadow-sm space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Creator Spotlight
                </span>
                <div className="flex items-center space-x-4">
                  {vendor.image ? (
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-wedding-300"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-wedding-100 flex items-center justify-center font-bold text-wedding-700 text-xl">
                      {vendor.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>{vendor.businessName || vendor.name}</span>
                      {vendor.subscriptionPlan === "premium" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[10px] font-bold">
                          <BadgeCheck className="h-3.5 w-3.5 text-amber-700" />
                          Signature Pro
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{vendor.email}</p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                      Verified Identity • Platform Certified
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Request Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl border border-champagne-300 bg-white p-7 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Inquire & Reserve
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="font-serif text-3xl font-extrabold text-slate-900">
                    {formatPrice(service.price)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ celebration</span>
                </div>
              </div>

              {/* Booking CTA Button / Form Modal Trigger */}
              <div className="pt-2">
                {isOwner ? (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center text-xs text-amber-800 font-semibold">
                    This is your own service storefront. You can modify its contents in your Vendor Dashboard.
                  </div>
                ) : user?.role === "admin" ? (
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center text-xs text-slate-600 font-semibold">
                    Admins have moderation preview permissions on this listing.
                  </div>
                ) : (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-wedding-600 to-wedding-500 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-wedding-600/20 hover:from-wedding-700 hover:to-wedding-600 transition-all active:scale-[0.99]"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Request Booking Dates</span>
                  </button>
                )}
              </div>

              <div className="rounded-2xl bg-wedding-50/60 p-4 border border-champagne-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>The WedPlan Promise</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Submitting an inquiry reserves your date consideration. No payment is charged until terms and date are confirmed by the vendor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-champagne-300 bg-white p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-wedding-600">
                Direct Booking Inquiry
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Request Service Booking
              </h3>
              <p className="text-xs text-slate-500">
                Package: <strong className="text-slate-800">{service.serviceName}</strong> ({formatPrice(service.price)})
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Wedding / Ceremony Date *
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full rounded-2xl border border-champagne-300 py-3 px-3.5 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Venue Address / City *
                </label>
                <input
                  type="text"
                  required
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g. The Glasshouse, New York, NY"
                  className="w-full rounded-2xl border border-champagne-300 py-3 px-3.5 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Guest Count
                </label>
                <select
                  value={estimatedGuests}
                  onChange={(e) => setEstimatedGuests(e.target.value)}
                  className="w-full rounded-2xl border border-champagne-300 py-3 px-3.5 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50 cursor-pointer"
                >
                  <option value="Under 50 (Intimate)">Under 50 (Intimate)</option>
                  <option value="50-100 Guests">50-100 Guests</option>
                  <option value="100-200 Guests">100-200 Guests</option>
                  <option value="200-350+ Guests (Grand)">200-350+ Guests (Grand)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custom Inquiries or Requests (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the vendor about your timeline, special vision, or ceremony timing..."
                  className="w-full rounded-2xl border border-champagne-300 py-2.5 px-3.5 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-2xl border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingBooking}
                  className="inline-flex items-center gap-2 rounded-2xl bg-wedding-500 px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-wedding-600 disabled:opacity-50"
                >
                  {submittingBooking ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Confirm & Send Inquiry
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
