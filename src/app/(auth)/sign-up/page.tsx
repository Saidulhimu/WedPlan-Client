"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { uploadToImgBB } from "@/lib/imgbb";
import { Logo } from "@/components/shared/Logo";
import { toast } from "sonner";
import {
  Upload,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  Loader2,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();

  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !isLoading) {
      if (user.role === "admin") router.replace("/dashboard/admin");
      else if (user.role === "vendor") router.replace("/dashboard/vendor");
      else router.replace("/dashboard/customer");
    }
  }, [user, isLoading, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password validation rule from PDF: min 6 chars, 1 uppercase, 1 lowercase
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters long with at least one uppercase and one lowercase letter."
      );
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        toast.info("Uploading profile photo...");
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

  const handleGoogleSignUp = () => {
    try {
      setLoading(true);
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
      const redirectUri = `${window.location.origin}/api/auth/callback/google`;
      const scope = encodeURIComponent("openid email profile");
      const state = role; // "customer" or "vendor"
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=${scope}&state=${state}&prompt=select_account`;
      window.location.href = googleAuthUrl;
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate Google sign up");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-[#FDFBF7] via-white to-[#FAF6F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-champagne-300 bg-white p-8 sm:p-10 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Create Your WedPlan Account
          </h1>
          <p className="text-xs text-slate-500">
            Join our curated community of couples and elite wedding creators.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-wedding-50 rounded-2xl border border-champagne-300">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${role === "customer"
              ? "bg-white text-wedding-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            I am a Couple / Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all ${role === "vendor"
              ? "bg-white text-wedding-600 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
              }`}
          >
            I am a Wedding Vendor
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eleanor Vance"
                className="w-full rounded-2xl border border-champagne-300 py-3 pl-10 pr-4 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
              />
            </div>
          </div>

          {role === "vendor" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Studio / Business Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Vance Cinematic Wedding Films"
                  className="w-full rounded-2xl border border-champagne-300 py-3 pl-10 pr-4 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@example.com"
                className="w-full rounded-2xl border border-champagne-300 py-3 pl-10 pr-4 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 chars (Uppercase & lowercase)"
                className="w-full rounded-2xl border border-champagne-300 py-3 pl-10 pr-11 text-xs font-semibold focus:border-wedding-500 focus:outline-none bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Rule: At least 6 characters with one uppercase & one lowercase letter.
            </p>
          </div>

          {/* Profile Image (Optional upload using ImgBB) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Profile Photo (Optional)
            </label>
            <div className="flex items-center space-x-3">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-champagne-300"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-wedding-100 flex items-center justify-center text-wedding-600 font-bold text-sm">
                  {name ? name.charAt(0) : "W"}
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-2xl border border-dashed border-champagne-300 bg-wedding-50/50 px-4 py-2.5 text-xs font-bold text-slate-600 hover:border-wedding-500 transition-colors">
                <Upload className="h-4 w-4 text-wedding-600" />
                <span>Upload Photo</span>
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
            className="w-full inline-flex items-center justify-center rounded-2xl bg-wedding-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:bg-wedding-600 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              `Register as ${role === "vendor" ? "Wedding Vendor" : "Couple"}`
            )}
          </button>
        </form>

        {/* Google sign-up */}
        <div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              <span className="bg-white px-2">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-champagne-300 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google as {role === "vendor" ? "Wedding Vendor" : "Couple"}</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-bold text-wedding-600 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
