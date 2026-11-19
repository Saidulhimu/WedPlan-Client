"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Heart,
  Menu,
  X,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
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
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-champagne-200/80 bg-wedding-50/95 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center space-x-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-wedding-600 to-rose-400 text-white shadow-sm ring-2 ring-champagne-200 transition-transform group-hover:scale-105">
            <Heart className="h-5 w-5 fill-white text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 group-hover:text-wedding-600 transition-colors">
              Wed<span className="text-wedding-500">Plan</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium -mt-1">
              Luxury Wedding Planning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-wedding-600 ${
                pathname === link.href ? "text-wedding-600 font-semibold" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Actions / Profile Dropdown */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 rounded-full border border-champagne-200 bg-white py-1.5 pl-2 pr-3.5 shadow-sm hover:border-wedding-300 transition-all focus:outline-none"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-wedding-300"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-wedding-100 text-wedding-700 font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left text-xs">
                  <div className="font-semibold text-slate-800 line-clamp-1">{user.name}</div>
                  <div className="text-[10px] capitalize text-wedding-600 font-medium flex items-center gap-1">
                    {user.role}
                    {user.subscriptionPlan === "premium" && (
                      <Sparkles className="h-3 w-3 text-amber-500 fill-amber-400" />
                    )}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-champagne-200 bg-white p-2 shadow-xl z-50 transition-all">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={getDashboardLink()}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-wedding-50 hover:text-wedding-600 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href={getProfileLink()}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-wedding-50 hover:text-wedding-600 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Log Out</span>
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
                className="text-xs font-semibold text-slate-700 hover:text-wedding-600 px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-wedding-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-wedding-600 hover:shadow-md transition-all active:scale-95"
              >
                Join WedPlan
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-wedding-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-champagne-200 bg-white px-4 py-5 md:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 ${
                  pathname === link.href ? "text-wedding-600 font-semibold" : "text-slate-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-slate-100 pt-3">
              {isAuthenticated && user ? (
                <div className="flex flex-col space-y-2">
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    Signed in as <span className="font-semibold text-slate-800">{user.name}</span>
                  </div>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-sm font-medium text-slate-700 py-1.5"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href={getProfileLink()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-sm font-medium text-slate-700 py-1.5"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center space-x-2 text-sm font-medium text-red-600 py-1.5 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-sm font-semibold text-slate-800 border border-slate-200 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-sm font-semibold text-white bg-wedding-500 rounded-xl"
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
  );
}
