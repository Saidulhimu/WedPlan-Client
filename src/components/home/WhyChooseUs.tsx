import React from "react";
import { ShieldCheck, CalendarCheck, CreditCard, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "100% Verified Vendors",
    description:
      "Every vendor and service profile is reviewed and vetted by our admin team before listing, guaranteeing genuine talent and reliability.",
  },
  {
    icon: CalendarCheck,
    title: "Streamlined Booking Requests",
    description:
      "Submit instant event date and venue requests without phone tag. Track live approval status directly from your dashboard.",
  },
  {
    icon: CreditCard,
    title: "Secure Stripe Infrastructure",
    description:
      "Industry-grade payment processing with instant confirmations, transparent subscriptions, and zero hidden markups.",
  },
  {
    icon: Sparkles,
    title: "Bespoke & Elegant Experience",
    description:
      "Designed specifically for luxury weddings with curated categories, high-resolution visual galleries, and responsive concierge support.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-wedding-50 border-y border-champagne-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-wedding-600">
            Unrivaled Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Why Choose WedPlan?
          </h2>
          <p className="text-sm text-slate-500">
            We simplify your wedding journey by blending exquisite vendor discovery with modern management tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-champagne-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-wedding-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-wedding-50 text-wedding-600 border border-wedding-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
