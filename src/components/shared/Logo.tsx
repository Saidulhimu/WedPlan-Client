import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export function Logo({ className = "", size = "md", dark = false }: LogoProps) {
  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`group flex items-center space-x-2 ${className}`}>
      <span
        className={`font-serif font-bold tracking-tight ${textSizes[size]} ${
          dark ? "text-white" : "text-slate-900"
        } transition-colors group-hover:text-wedding-600`}
      >
        Wed<span className="text-wedding-600 font-serif italic">Plan</span>
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-wedding-600 mt-2" />
    </Link>
  );
}
