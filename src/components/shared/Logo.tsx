import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export function Logo({ className = "", size = "md", dark = false }: LogoProps) {
  const iconSizes = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      {/* Handcrafted Professional Luxury Wedding Emblem (Two Interlocking Bands & Brilliant Solitaire) */}
      <div
        className={`relative flex ${iconSizes[size]} shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#800020] via-[#9E1B32] to-[#590d22] p-2 shadow-md ring-1 ring-amber-300/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:ring-amber-400`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Subtle Outer Delicate Crest Ring */}
          <circle
            cx="18"
            cy="18"
            r="16.5"
            stroke="url(#goldGrad)"
            strokeWidth="0.75"
            strokeDasharray="2 2"
            opacity="0.45"
          />

          {/* Left Wedding Band (Polished Champagne Gold) */}
          <ellipse
            cx="14"
            cy="20"
            rx="6.5"
            ry="6.5"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />

          {/* Right Wedding Band (Pure Platinum) */}
          <ellipse
            cx="22"
            cy="20"
            rx="6.5"
            ry="6.5"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Brilliant Solitaire Diamond at Apex */}
          <path
            d="M18 6.5L20.8 11.5L18 16.5L15.2 11.5L18 6.5Z"
            fill="url(#goldGrad)"
          />
          <circle cx="18" cy="11.5" r="1.3" fill="#FFFFFF" />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGrad" x1="8" y1="6" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-tight leading-none ${textSizes[size]} ${
            dark ? "text-white" : "text-slate-900"
          } transition-colors group-hover:text-wedding-600`}
        >
          Wed<span className="text-wedding-600 italic font-serif font-semibold">Plan</span>
        </span>
        <span
          className={`text-[8.5px] uppercase tracking-[0.28em] font-bold mt-1 leading-none ${
            dark ? "text-stone-300" : "text-wedding-700/80"
          }`}
        >
          Wedding Platform
        </span>
      </div>
    </Link>
  );
}
