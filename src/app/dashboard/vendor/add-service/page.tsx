"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { toast } from "sonner";
import {
  Store,
  Upload,
  Loader2,
  DollarSign,
  MapPin,
  Tag,
  ArrowRight,
} from "lucide-react";

const categories = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

export default function AddServicePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(filesArray);
      setImagePreviews(filesArray.map((f) => URL.createObjectURL(f)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFiles.length) {
      toast.error("Please upload at least one service image.");
      return;
    }

    setLoading(true);

    try {
      toast.info("Uploading images...");
      const uploadedUrls: string[] = [];

      for (const file of imageFiles) {
        const url = await uploadToImgBB(file);
        uploadedUrls.push(url);
      }

      const { data } = await api.post("/services", {
        serviceName,
        category,
        description,
        price: Number(price),
        location,
        images: uploadedUrls,
      });

      if (data.success) {
        toast.success(
          "Service submitted successfully! It is now pending admin approval."
        );
        router.push("/dashboard/vendor/services");
      }
    } catch (err: any) {
      if (err.message && err.message.includes("Free plan limit reached")) {
        toast.error("Free plan limit reached (max 3 services). Upgrade to Premium!");
        router.push("/dashboard/vendor/subscription");
      } else {
        toast.error(err.message || "Failed to submit service.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Add New Wedding Service
        </h1>
        <p className="text-xs text-slate-500">
          Publish a new wedding package to the directory. New services require admin moderation before going live.
        </p>
      </div>

      <div className="rounded-3xl border border-champagne-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Service / Package Name
            </label>
            <input
              type="text"
              required
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="e.g. Master Bridal Photography & Drone Film"
              className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Base Price ($ USD)
              </label>
              <input
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2500"
                className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location / City Coverage
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. New York, NY (Tri-State Area)"
              className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Description & Package Inclusions
            </label>
            <textarea
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your services, hours of coverage, equipment, delivery timeline, etc..."
              className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
            />
          </div>

          {/* Multiple Image Uploads */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Service Photos (At least one required)
            </label>
            <label className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-champagne-300 bg-wedding-50/40 p-6 hover:border-wedding-500 transition-colors">
              <Upload className="h-8 w-8 text-wedding-600 mb-2" />
              <span className="text-xs font-semibold text-slate-800">
                Click to select photos
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                PNG, JPG or WebP (Images hosted via ImgBB)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {imagePreviews.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto pt-4">
                {imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Preview"
                    className="h-20 w-28 rounded-xl object-cover ring-1 ring-champagne-300 flex-shrink-0"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-2xl bg-wedding-500 py-3.5 text-xs font-bold text-white shadow-md hover:bg-wedding-600 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Publishing Service...
              </>
            ) : (
              "Submit Service for Admin Review"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
