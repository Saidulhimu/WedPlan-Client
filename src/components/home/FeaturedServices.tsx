"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Service } from "@/types";
import { api } from "@/lib/api";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ArrowRight, Award } from "lucide-react";

export function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/services/featured");
        if (data?.services) {
          setServices(data.services);
        }
      } catch (err) {
        console.warn("Failed to fetch featured services from server:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const displayedServices =
    filter === "All"
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-wedding-600">
              Curated Excellence
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Featured Wedding Services
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Strictly approved and certified listings from verified artists, historic estates, and premier banquet creators.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-wedding-600 hover:text-wedding-700 transition-colors group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold">
          {["All", "Venues", "Photography", "Florist", "Catering", "Styling", "Fashion"].map((pill) => (
            <button
              key={pill}
              onClick={() => setFilter(pill)}
              className={`rounded-full px-4 py-2 transition-all ${filter === pill
                ? "bg-wedding-500 text-white shadow-sm"
                : "bg-wedding-50 text-slate-600 border border-champagne-300 hover:border-wedding-400 hover:text-slate-900"
                }`}
            >
              {pill === "All" ? "All Featured Services" : pill}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-champagne-100/60 animate-pulse border border-champagne-200"
              />
            ))}
          </div>
        ) : displayedServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-champagne-300 bg-wedding-50/40 p-16 text-center space-y-3">
            <p className="text-slate-500 text-sm">
              No services found for this filter. Run the database seed script to populate live demo services!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
