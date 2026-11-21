"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { toast } from "sonner";
import { Building, Upload, Save, Loader2 } from "lucide-react";

export default function VendorProfilePage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(user?.image || "");
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let finalImageUrl = user?.image;
      if (imageFile) {
        toast.info("Uploading photo...");
        finalImageUrl = await uploadToImgBB(imageFile);
      }

      const { data } = await api.put("/users/profile", {
        name,
        businessName,
        image: finalImageUrl,
      });

      if (data.success) {
        updateUser(data.user);
        toast.success("Vendor profile updated successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update vendor profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-slate-900">
          Vendor Profile Settings
        </h1>
        <p className="text-xs text-slate-500">
          Update your public vendor storefront identity and contact information.
        </p>
      </div>

      <div className="rounded-3xl border border-champagne-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Brand / Profile Logo
            </label>
            <div className="flex items-center space-x-4">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-wedding-300"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-wedding-100 flex items-center justify-center font-bold text-wedding-700 text-lg">
                  {user?.name.charAt(0)}
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-dashed border-champagne-300 bg-wedding-50/50 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:border-wedding-500 transition-colors">
                <Upload className="h-4 w-4" />
                <span>Upload Brand Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Business / Storefront Name
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Person Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-champagne-300 py-2.5 px-3 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address (Read-Only)
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full rounded-xl border border-slate-200 py-2.5 px-3 text-xs bg-slate-100 text-slate-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-wedding-500 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-wedding-600 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
