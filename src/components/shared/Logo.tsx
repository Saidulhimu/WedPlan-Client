import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export function Logo({ className = "", size = "md", dark = false }: LogoProps) {
  const textSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  return (
    <Link href="/" className={`group inline-flex flex-col ${className}`}>
      <div className="flex items-center leading-none">
        <span
          className={`font-serif font-bold tracking-tight ${textSizes[size]} ${
            dark ? "text-white" : "text-slate-900"
          } transition-colors group-hover:text-wedding-600`}
        >
          Wed<span className="text-wedding-600 italic font-serif font-normal">Plan</span>
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-wedding-600 ml-1.5 mb-1" />
      </div>
      <span
        className={`text-[8.5px] uppercase tracking-[0.28em] font-medium mt-1 leading-none ${
          dark ? "text-stone-300" : "text-slate-500"
        }`}
      >
        Wedding Platform
      </span>
    </Link>
  );
}
