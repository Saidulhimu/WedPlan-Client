"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Service } from "@/types";
import { api } from "@/lib/api";
import { ServiceCard } from "@/components/services/ServiceCard";
import {
  Search,
  Filter,
  ArrowUpDown,
  Tag,
  MapPin,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

const categories = [
  "All",
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

const locations = [
  "All",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "San Francisco, CA",
  "Miami, FL",
];

export default function BrowseServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Sorting state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortOption, setSortOption] = useState("newest"); // 'newest' | 'price_asc' | 'price_desc'

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory);
      if (selectedLocation && selectedLocation !== "All") params.append("location", selectedLocation.split(",")[0]);
      if (sortOption) params.append("sort", sortOption);

      const { data } = await api.get(`/services?${params.toString()}`);
      if (data?.services) {
        setServices(data.services);
      }
    } catch (err) {
      console.warn("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchServices();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, selectedLocation, sortOption]);

  return (
    <div className="min-h-screen bg-wedding-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wedding-600">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Discover Excellence</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Browse Wedding Services
          </h1>
          <p className="text-sm text-slate-500">
            Filter through premier wedding professionals and venues tailored for your special celebration.
          </p>
        </div>

        {/* Filter and Search Bar Control Box */}
        <div className="rounded-2xl border border-champagne-200 bg-white p-5 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services by name or description..."
                className="w-full rounded-xl border border-champagne-300 py-3 pl-10 pr-4 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3 relative">
              <Tag className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-champagne-300 py-3 pl-10 pr-8 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50 appearance-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Select */}
            <div className="md:col-span-2 relative">
              <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-xl border border-champagne-300 py-3 pl-10 pr-8 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50 appearance-none cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Sorting (Asc / Desc / Newest) */}
            <div className="md:col-span-2 relative">
              <ArrowUpDown className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full rounded-xl border border-champagne-300 py-3 pl-10 pr-8 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50 appearance-none cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{services.length}</strong> active wedding services
          </span>
          {(searchTerm || selectedCategory !== "All" || selectedLocation !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLocation("All");
                setSortOption("newest");
              }}
              className="text-wedding-600 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Services Grid or Loading / Empty States */}
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
          <div className="rounded-3xl border border-champagne-200 bg-white p-16 text-center space-y-3">
            <SlidersHorizontal className="h-10 w-10 text-slate-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-slate-900">
              No matching wedding services found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search criteria, category selection, or price sorting filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
