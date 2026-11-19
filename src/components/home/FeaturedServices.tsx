"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Service } from "@/types";
import { api } from "@/lib/api";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wedding-600">
              <Sparkles className="h-4 w-4" />
              <span>Curated Excellence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Featured Wedding Services
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Explore our hand-selected, verified wedding professionals ready to make your celebration extraordinary.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-wedding-600 hover:text-wedding-700 transition-colors group"
          >
            <span>View All Services</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-champagne-100/50 animate-pulse border border-champagne-200"
              />
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-champagne-300 p-12 text-center">
            <p className="text-slate-500 text-sm">
              Services are currently being curated. Run the server seeder or add new services to preview!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
