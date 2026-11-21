"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/shared/Logo";
import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
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

  // Strictly according to PDF Page 5: Home, Browse Services
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Services", href: "/services" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/90 bg-white/95 backdrop-blur-md transition-all shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Professional Luxury Logo */}
        <Logo size="sm" />

        {/* Public Routes according to PDF */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-wedding-600 ${isActive
                  ? "text-wedding-600 font-bold border-b-2 border-wedding-600 pb-1"
                  : "text-slate-600"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth State / Profile Dropdown according to PDF */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 rounded-full border border-stone-200 bg-white py-1.5 pl-2 pr-3.5 shadow-sm hover:border-wedding-400 hover:shadow transition-all focus:outline-none"
              >
                <UserAvatar src={user.image} name={user.name} size="md" />
                <div className="text-left text-xs">
                  <div className="font-bold text-slate-900 line-clamp-1">{user.name}</div>
                  <div className="text-[10px] capitalize text-wedding-600 font-semibold">
                    {user.role} {user.subscriptionPlan === "premium" && "• Pro"}
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
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-stone-200 bg-white p-2 shadow-2xl z-50 divide-y divide-stone-100">
                    <div className="px-3 py-2.5">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={getDashboardLink()}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50 hover:text-wedding-600 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href={getProfileLink()}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50 hover:text-wedding-600 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="text-xs font-bold tracking-wider uppercase text-slate-700 hover:text-wedding-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-wedding-600 px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-white shadow-sm hover:bg-wedding-700 transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-stone-200 p-2 text-slate-700 hover:bg-stone-50"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-stone-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold py-1.5 ${pathname === link.href ? "text-wedding-600" : "text-slate-700"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-stone-100 pt-3">
              {isAuthenticated && user ? (
                <div className="flex flex-col space-y-2">
                  <div className="text-xs text-slate-500 font-medium">
                    Signed in as <strong className="text-slate-900">{user.name}</strong>
                  </div>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-xs font-bold text-wedding-600"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center space-x-2 text-xs font-semibold text-rose-600 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-xs font-bold uppercase tracking-wider text-slate-800 border border-stone-300 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-xs font-bold uppercase tracking-wider text-white bg-wedding-600 rounded-xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
