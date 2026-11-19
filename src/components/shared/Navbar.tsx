"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/shared/Logo";
import {
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Compass,
} from "lucide-react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return "/sign-in";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "vendor") return "/dashboard/vendor";
    return "/dashboard/customer";
  };

  const getProfileLink = () => {
    if (!user) return "/sign-in";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "vendor") return "/dashboard/vendor/profile";
    return "/dashboard/customer/profile";
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Services", href: "/services" },
    { label: "Venues", href: "/services?category=Wedding+Venues" },
    { label: "Photographers", href: "/services?category=Photography+%26+Videography" },
  ];

  return (
    <>
      {/* Top Luxury Announcement Ribbon */}
      <div className="bg-gradient-to-r from-[#541618] via-[#7F1D1D] to-[#9E2A2B] text-white py-2 px-4 text-center text-[11px] font-medium tracking-wide flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-amber-200">
          <Sparkles className="h-3 w-3 fill-amber-300" />
          <span>The 2026 WedPlan Luxury Directory is Live</span>
        </span>
        <span className="hidden sm:inline text-rose-200">•</span>
        <span className="hidden sm:inline text-rose-100">
          Over 2,400+ Hand-Vetted Photographers, Estates & Artisans
        </span>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-champagne-200/80 bg-white/95 backdrop-blur-md transition-all shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-wedding-600 ${pathname === link.href ? "text-wedding-600 font-bold border-b-2 border-wedding-500 pb-0.5" : "text-slate-600"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Actions / Profile Dropdown */}
          <div className="hidden sm:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 rounded-full border border-champagne-300 bg-white py-1.5 pl-2 pr-3.5 shadow-sm hover:border-wedding-400 hover:shadow transition-all focus:outline-none"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-champagne-300"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-wedding-100 text-wedding-700 font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left text-xs">
                    <div className="font-bold text-slate-900 line-clamp-1">{user.name}</div>
                    <div className="text-[10px] capitalize text-wedding-600 font-semibold flex items-center gap-1">
                      <span>{user.role}</span>
                      {user.subscriptionPlan === "premium" && (
                        <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full text-[9px] font-bold">
                          PRO
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-champagne-200 bg-white p-2.5 shadow-2xl z-50 transition-all divide-y divide-slate-100">
                      <div className="px-3 py-2.5">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-wedding-700 bg-wedding-50 px-2 py-0.5 rounded-full capitalize">
                          Account: {user.role}
                        </div>
                      </div>

                      <div className="py-1.5">
                        <Link
                          href={getDashboardLink()}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-wedding-50 hover:text-wedding-600 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-wedding-500" />
                          <span>Portal Dashboard</span>
                        </Link>

                        <Link
                          href={getProfileLink()}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-wedding-50 hover:text-wedding-600 transition-colors"
                        >
                          <Settings className="h-4 w-4 text-slate-400" />
                          <span>Profile Settings</span>
                        </Link>
                      </div>

                      <div className="pt-1.5">
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                          }}
                          className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/sign-in"
                  className="text-xs font-bold tracking-wider uppercase text-slate-700 hover:text-wedding-600 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-wedding-600 to-wedding-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-wedding-600/20 hover:shadow-lg hover:from-wedding-700 hover:to-wedding-600 transition-all active:scale-95"
                >
                  Join WedPlan
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border border-champagne-300 p-2 text-slate-700 hover:bg-wedding-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-champagne-200 bg-white px-6 py-6 lg:hidden shadow-xl">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold tracking-wide ${pathname === link.href ? "text-wedding-600" : "text-slate-700"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-slate-100 pt-4">
                {isAuthenticated && user ? (
                  <div className="flex flex-col space-y-3">
                    <div className="text-xs font-medium text-slate-500">
                      Signed in as <strong className="text-slate-900">{user.name}</strong> ({user.role})
                    </div>
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 text-sm font-bold text-wedding-600"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Open Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center space-x-2 text-sm font-semibold text-rose-600 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 border border-slate-300 rounded-xl"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-wedding-500 rounded-xl"
                    >
                      Join WedPlan
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
