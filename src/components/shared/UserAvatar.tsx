"use client";

import React, { useState, useEffect } from "react";

interface UserAvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  ring?: boolean;
}

export function UserAvatar({
  src,
  name = "User",
  size = "md",
  className = "",
  ring = true,
}: UserAvatarProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-9 w-9 text-xs",
    lg: "h-11 w-11 text-sm",
    xl: "h-16 w-16 text-lg",
  };

  const ringClass = ring ? "ring-1 ring-stone-200" : "";

  // Get initials: e.g. "Saidul Himu" -> "SH", "Saidul" -> "S"
  const getInitials = (n: string) => {
    if (!n) return "W";
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`${sizeClasses[size]} rounded-full object-cover shrink-0 ${ringClass} ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-wedding-100 to-wedding-200 text-wedding-800 flex items-center justify-center font-bold tracking-wider shrink-0 select-none ${ringClass} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
