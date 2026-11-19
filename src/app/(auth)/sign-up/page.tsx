"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { toast } from "sonner";
import {
  Heart,
  Upload,
  User,
  Mail,
  Lock,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password validation rule: min 6 chars, 1 uppercase, 1 lowercase
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter."
      );
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        toast.info("Uploading profile image...");
        imageUrl = await uploadToImgBB(imageFile);
      }

      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
        image: imageUrl,
        businessName: role === "vendor" ? businessName : undefined,
      });

      if (data.success) {
        toast.success("Account created successfully! Welcome to WedPlan.");
        login(data.token, data.user);

        // Redirect according to role
        if (data.user.role === "vendor") {
          router.push("/dashboard/vendor");
        } else {
          router.push("/dashboard/customer");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-wedding-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-champagne-200 bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-wedding-500 text-white shadow-md">
            <Heart className="h-6 w-6 fill-white" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Join the WedPlan Platform
          </h1>
          <p className="text-xs text-slate-500">
            Create an account to discover wedding services or grow your business.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-wedding-50 rounded-2xl border border-champagne-200 mb-6">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
              role === "customer"
                ? "bg-white text-wedding-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            I am a Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
              role === "vendor"
                ? "bg-white text-wedding-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            I am a Vendor
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eleanor Vance"
                className="w-full rounded-xl border border-champagne-300 py-2.5 pl-10 pr-4 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
              />
            </div>
          </div>

          {role === "vendor" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business / Brand Name
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Vance Cinematic Wedding Films"
                  className="w-full rounded-xl border border-champagne-300 py-2.5 pl-10 pr-4 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full rounded-xl border border-champagne-300 py-2.5 pl-10 pr-4 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 chars with Uppercase & lowercase"
                className="w-full rounded-xl border border-champagne-300 py-2.5 pl-10 pr-4 text-xs focus:border-wedding-500 focus:outline-none focus:ring-1 focus:ring-wedding-500 bg-slate-50/50"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Must include at least 6 characters, 1 uppercase, and 1 lowercase letter.
            </p>
          </div>

          {/* Profile Image (Optional upload using ImgBB) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Profile Photo (Optional)
            </label>
            <div className="flex items-center space-x-3">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-wedding-300"
                />
              ) : (
                <div className="h-11 w-11 rounded-full bg-wedding-100 flex items-center justify-center text-wedding-600">
                  <User className="h-5 w-5" />
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-dashed border-champagne-300 bg-wedding-50/50 px-3 py-2 text-xs font-medium text-slate-600 hover:border-wedding-500 transition-colors">
                <Upload className="h-3.5 w-3.5" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-wedding-500 py-3 text-xs font-bold text-white shadow-md hover:bg-wedding-600 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              `Create ${role === "vendor" ? "Vendor" : "Customer"} Account`
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-wedding-600 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
