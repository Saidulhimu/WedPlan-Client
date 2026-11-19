import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export function Logo({ className = "", size = "md", dark = false }: LogoProps) {
  const iconSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`group flex items-center space-x-3 ${className}`}>
      {/* Handcrafted Luxury Interlocking Wedding Bands Monogram */}
      <div
        className={`relative flex ${iconSizes[size]} items-center justify-center rounded-2xl bg-gradient-to-br from-[#9E2A2B] via-[#7F1D1D] to-[#541618] p-2 shadow-sm ring-1 ring-[#D4AF37]/40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* First Ring */}
          <circle
            cx="9"
            cy="12"
            r="5.5"
            stroke="#FDE68A"
            strokeWidth="1.8"
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          {/* Second Intersecting Ring */}
          <circle
            cx="15"
            cy="12"
            r="5.5"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
          {/* Diamond Solitaire Accent at intersection */}
          <path
            d="M12 5.5L13.2 7.2L12 8.9L10.8 7.2L12 5.5Z"
            fill="#FDE68A"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-tight ${textSizes[size]} ${
            dark ? "text-white" : "text-slate-900"
          } transition-colors group-hover:text-wedding-600`}
        >
          Wed<span className="text-wedding-500 font-serif italic">Plan</span>
        </span>
        <span
          className={`text-[9px] uppercase tracking-[0.25em] font-semibold -mt-1 ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Luxury Wedding Collective
        </span>
      </div>
    </Link>
  );
}
