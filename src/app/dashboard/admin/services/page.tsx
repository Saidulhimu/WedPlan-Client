"use client";

import React, { useEffect, useState } from "react";
import { Service } from "@/types";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import {
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  Loader2,
  MapPin,
} from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== "all") params.append("status", statusFilter);
      if (search) params.append("search", search);

      const { data } = await api.get(`/services/admin/all?${params.toString()}`);
      if (data?.services) {
        setServices(data.services);
      }
    } catch (err) {
      toast.error("Failed to load services for moderation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 300);
    return () => clearTimeout(timer);
  }, [statusFilter, search]);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    setActionLoadingId(id);
    try {
      const { data } = await api.patch(`/services/admin/${id}/status`, { status });
      if (data.success) {
        toast.success(`Service status marked as ${status}!`);
        fetchServices();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update service status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inappropriate service?")) return;

    try {
      const { data } = await api.delete(`/services/${id}`);
      if (data.success) {
        toast.success("Service deleted permanently.");
        fetchServices();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete service.");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Service Moderation
        </h1>
        <p className="text-xs text-slate-500">
          Review, approve, or reject wedding service listings submitted by vendors before they appear on the public marketplace.
        </p>
      </div>

      {/* Filter bar */}
      <div className="rounded-2xl border border-champagne-200 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service listings by title..."
            className="w-full rounded-xl border border-champagne-300 py-2.5 pl-10 pr-4 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Moderation</option>
            <option value="approved">Approved & Active</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
          </div>
        ) : services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className="rounded-3xl border border-champagne-200 bg-white p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-wedding-300 transition-all"
            >
              <div className="flex items-start space-x-4 flex-1">
                <img
                  src={service.images?.[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?w=400"}
                  alt={service.serviceName}
                  className="h-20 w-28 rounded-2xl object-cover ring-1 ring-champagne-200 flex-shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                        service.status === "approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : service.status === "rejected"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {service.status}
                    </span>
                    <span className="text-xs font-semibold text-wedding-600">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {service.serviceName}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-bold text-slate-800">{formatPrice(service.price)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {service.location}
                    </span>
                    <span>•</span>
                    <span>Vendor: {(service.vendorId as any)?.name || "Vendor"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Approve, Reject, Delete */}
              <div className="flex items-center gap-2 self-end lg:self-center">
                {service.status !== "approved" && (
                  <button
                    onClick={() => handleUpdateStatus(service._id, "approved")}
                    disabled={actionLoadingId === service._id}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Approve</span>
                  </button>
                )}

                {service.status !== "rejected" && (
                  <button
                    onClick={() => handleUpdateStatus(service._id, "rejected")}
                    disabled={actionLoadingId === service._id}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Reject</span>
                  </button>
                )}

                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Delete Inappropriate Service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-champagne-300 bg-white p-14 text-center text-xs text-slate-400">
            No service listings found under this filter.
          </div>
        )}
      </div>
    </div>
  );
}
