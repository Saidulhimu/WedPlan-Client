"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Service } from "@/types";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import {
  PlusCircle,
  Trash2,
  Power,
  Edit,
  Loader2,
  Store,
  Tag,
  MapPin,
} from "lucide-react";

export default function VendorServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const { data } = await api.get("/services/vendor/my-services");
      if (data?.services) {
        setServices(data.services);
      }
    } catch (err) {
      toast.error("Failed to fetch your services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleAvailability = async (id: string) => {
    try {
      const { data } = await api.patch(`/services/${id}/availability`);
      if (data.success) {
        toast.success(data.message);
        fetchServices();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update availability");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this service listing?")) return;

    try {
      const { data } = await api.delete(`/services/${id}`);
      if (data.success) {
        toast.success("Service deleted successfully.");
        fetchServices();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete service.");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            My Wedding Services
          </h1>
          <p className="text-xs text-slate-500">
            Manage your published packages, toggle availability, and track admin review statuses.
          </p>
        </div>
        <Link
          href="/dashboard/vendor/add-service"
          className="inline-flex items-center gap-1.5 rounded-2xl bg-wedding-500 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-wedding-600 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Service</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="h-8 w-8 text-wedding-600 animate-spin" />
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="rounded-3xl border border-champagne-200 bg-white p-5 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={service.images?.[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?w=600"}
                    alt={service.serviceName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize shadow ${
                        service.status === "approved"
                          ? "bg-emerald-500 text-white"
                          : service.status === "rejected"
                          ? "bg-rose-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-wedding-600">{service.category}</span>
                    <span className="font-bold text-slate-900">{formatPrice(service.price)}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-slate-900 line-clamp-1">
                    {service.serviceName}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{service.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-champagne-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleToggleAvailability(service._id)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                    service.isAvailable
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Power className="h-3.5 w-3.5" />
                  <span>{service.isAvailable ? "Available" : "Unavailable"}</span>
                </button>

                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-champagne-300 bg-white p-14 text-center space-y-3">
          <Store className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            No wedding services created yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "Add New Service" above to publish your first wedding package.
          </p>
        </div>
      )}
    </div>
  );
}
