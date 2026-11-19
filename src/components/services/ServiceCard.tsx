"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Service } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { MapPin, Tag, ArrowUpRight, Sparkles } from "lucide-react";

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

  const vendorName =
    typeof service.vendorId === "object"
      ? (service.vendorId as any).businessName || (service.vendorId as any).name
      : "Verified Vendor";

  const isPremiumVendor =
    typeof service.vendorId === "object" &&
    (service.vendorId as any).subscriptionPlan === "premium";

  const displayImage =
    service.images && service.images.length > 0
      ? service.images[0]
      : "https://images.unsplash.com/photo-1519741497674-611481863552?w=800";

  return (
    <div
      onClick={handleCardClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-champagne-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-wedding-300 flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={displayImage}
          alt={service.serviceName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
            <Tag className="h-3 w-3 text-wedding-500" />
            {service.category}
          </span>
        </div>

        {/* Premium Vendor Badge */}
        {isPremiumVendor && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-md">
              <Sparkles className="h-3 w-3 fill-white" />
              Featured
            </span>
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="rounded-xl bg-slate-900/85 px-3 py-1.5 text-xs font-bold text-white shadow-md backdrop-blur">
            From {formatPrice(service.price)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Vendor info */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-wedding-600 truncate">{vendorName}</span>
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate max-w-[120px]">{service.location}</span>
            </div>
          </div>

          {/* Service Title */}
          <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-wedding-600 transition-colors line-clamp-1">
            {service.serviceName}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-champagne-100 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Availability: Open</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-wedding-600 group-hover:translate-x-0.5 transition-transform">
            View Details
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
