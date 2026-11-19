"use client";

import React, { useEffect, useState } from "react";
import { Service } from "@/types";
import { api } from "@/lib/api";
import { ServiceCard } from "@/components/services/ServiceCard";
import {
  Search,
  ArrowUpDown,
  Tag,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  DollarSign,
  RotateCcw,
  ShieldCheck,
  Compass,
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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory);
      if (selectedLocation && selectedLocation !== "All") params.append("location", selectedLocation.split(",")[0]);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
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
    }, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory, selectedLocation, minPrice, maxPrice, sortOption]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLocation("All");
    setMinPrice("");
    setMaxPrice("");
    setSortOption("newest");
  };

  const isFiltered =
    searchTerm ||
    selectedCategory !== "All" ||
    selectedLocation !== "All" ||
    minPrice ||
    maxPrice ||
    sortOption !== "newest";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] via-white to-[#FAF6F0] py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-wedding-600">
            <Compass className="h-4 w-4" />
            <span>Discover Verified Wedding Creators</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Browse Wedding Services
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Filter through our hand-selected registry of wedding venues, cinematographers, florists, and catering masters.
          </p>
        </div>

        {/* Category Horizontal Quick Filters */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 text-xs font-semibold">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`rounded-full px-4 py-2 whitespace-nowrap transition-all ${selectedCategory === c
                  ? "bg-wedding-500 text-white shadow-md font-bold"
                  : "bg-white text-slate-600 border border-champagne-300 hover:border-wedding-400 hover:text-slate-900"
                }`}
            >
              {c === "All" ? "All Categories" : c}
            </button>
          ))}
        </div>

        {/* Comprehensive Filter and Search Bar */}
        <div className="rounded-3xl border border-champagne-300 bg-white p-6 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Keyword Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Service name, style or venue..."
                  className="w-full rounded-2xl border border-champagne-300 py-3 pl-10 pr-4 text-xs font-semibold focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Destination Location Select */}
            <div className="lg:col-span-3 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-2xl border border-champagne-300 py-3 pl-10 pr-8 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50 appearance-none cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Filter (Max Budget) */}
            <div className="lg:col-span-2 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Max Price ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full rounded-2xl border border-champagne-300 py-3 pl-9 pr-3 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
                />
              </div>
            </div>

            {/* Price Sorting (Asc / Desc / Newest) */}
            <div className="lg:col-span-3 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Sort Pricing
              </label>
              <div className="relative">
                <ArrowUpDown className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full rounded-2xl border border-champagne-300 py-3 pl-10 pr-8 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50 appearance-none cursor-pointer"
                >
                  <option value="newest">Sort: Newly Published</option>
                  <option value="price_asc">Price: Lowest to Highest</option>
                  <option value="price_desc">Price: Highest to Lowest</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between mb-8 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-slate-900 font-bold">{services.length}</strong> verified wedding services
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Admin Certified
            </span>
          </div>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-wedding-600 font-bold hover:underline"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Services Listing Grid or States */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-champagne-100/50 animate-pulse border border-champagne-200"
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
          <div className="rounded-3xl border border-dashed border-champagne-300 bg-white p-16 text-center space-y-4 shadow-sm">
            <SlidersHorizontal className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-slate-900">
              No matching wedding services found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any services matching your active filters. Try broadening your budget range, resetting categories, or searching with different terms.
            </p>
            <button
              onClick={handleResetFilters}
              className="rounded-2xl bg-wedding-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-wedding-600"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
