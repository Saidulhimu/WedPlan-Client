import React from "react";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-wedding-50 px-4">
      <div className="max-w-md w-full rounded-3xl border border-champagne-200 bg-white p-10 text-center shadow-xl space-y-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wedding-100 text-wedding-600 mx-auto">
          <Heart className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-slate-900">404 - Page Not Found</h1>
        <p className="text-xs text-slate-500 leading-relaxed">
          The wedding page or resource you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-wedding-500 px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-wedding-600 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
