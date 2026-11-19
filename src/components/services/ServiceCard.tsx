"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Service } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  MapPin,
  Tag,
  ArrowUpRight,
  Sparkles,
  Star,
  ShieldCheck,
  Calendar,
} from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/sign-in");
    } else {
      router.push(`/services/${service._id}`);
    }
  };

  const vendor = typeof service.vendorId === "object" ? (service.vendorId as any) : null;
  const vendorName = vendor?.businessName || vendor?.name || "Verified Creator";
  const isPremiumVendor = vendor?.subscriptionPlan === "premium";

  const displayImage =
    service.images && service.images.length > 0
      ? service.images[0]
      : "https://images.unsplash.com/photo-1519741497674-611481863552?w=800";

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-champagne-300/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-wedding-400 flex flex-col h-full"
    >
      {/* Visual Image Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={displayImage}
          alt={service.serviceName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-900 shadow-md backdrop-blur">
            <Tag className="h-3 w-3 text-wedding-600" />
            {service.category}
          </span>

          {isPremiumVendor ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-[11px] font-bold text-white shadow-lg">
              <Sparkles className="h-3 w-3 fill-white" />
              Signature Pro
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Verified
            </span>
          )}
        </div>

        {/* Bottom Overlay: Price Badge & Rating */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>4.96</span>
            <span className="text-slate-300 text-[10px]">(85+ reviews)</span>
          </div>

          <span className="rounded-xl bg-wedding-600/90 backdrop-blur-md px-3 py-1 text-xs font-extrabold text-white shadow-lg">
            {formatPrice(service.price)}
          </span>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Vendor info and location */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-wedding-700 tracking-wide truncate max-w-[170px]">
              {vendorName}
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate max-w-[110px]">{service.location}</span>
            </div>
          </div>

          {/* Service Title */}
          <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-wedding-600 transition-colors line-clamp-1 leading-snug">
            {service.serviceName}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Card Footer: Action button */}
        <div className="pt-4 border-t border-champagne-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Open for Bookings</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-wedding-600 group-hover:translate-x-1 transition-transform">
            <span>View Details</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
