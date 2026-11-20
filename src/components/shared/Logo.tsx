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
      {/* Handcrafted Professional Luxury Wedding Crest Emblem */}
      <div
        className={`relative flex ${iconSizes[size]} items-center justify-center rounded-2xl bg-gradient-to-br from-wedding-700 via-wedding-600 to-rose-950 p-2 shadow-md ring-1 ring-amber-300/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:ring-amber-300/80`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Subtle Outer Arch Glow */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="url(#goldGradient)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.5"
          />

          {/* First Intertwining Gold Wedding Band */}
          <ellipse
            cx="16"
            cy="21"
            rx="7.5"
            ry="7.5"
            stroke="url(#goldGradient)"
            strokeWidth="2.2"
          />

          {/* Second Intertwining Platinum/White Band */}
          <ellipse
            cx="24"
            cy="21"
            rx="7.5"
            ry="7.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
          />

          {/* Luxury Diamond Solitaire at Top Apex */}
          <path
            d="M20 7L22.5 11.5L20 16L17.5 11.5L20 7Z"
            fill="url(#goldGradient)"
          />
          <circle cx="20" cy="11.5" r="1.2" fill="#FFFFFF" />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="10" y1="7" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-tight leading-none ${textSizes[size]} ${
            dark ? "text-white" : "text-slate-900"
          } transition-colors group-hover:text-wedding-600`}
        >
          Wed<span className="text-wedding-600 italic font-serif font-semibold">Plan</span>
        </span>
        <span
          className={`text-[9px] uppercase tracking-[0.25em] font-bold mt-1 leading-none ${
            dark ? "text-stone-300" : "text-wedding-700/80"
          }`}
        >
          Wedding Platform
        </span>
      </div>
    </Link>
  );
}
