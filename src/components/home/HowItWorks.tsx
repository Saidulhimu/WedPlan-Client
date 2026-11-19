import React from "react";
import { Search, Send, CalendarCheck2, HeartHandshake } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discover & Filter",
    description: "Search services across top wedding categories, filter by budget and venue location.",
    icon: Search,
  },
  {
    step: "02",
    title: "Send Booking Request",
    description: "Choose your wedding date, location, and send a personalized inquiry to the vendor.",
    icon: Send,
  },
  {
    step: "03",
    title: "Vendor Review & Accept",
    description: "The vendor checks availability and approves your request directly from their dashboard.",
    icon: CalendarCheck2,
  },
  {
    step: "04",
    title: "Celebrate Stress-Free",
    description: "Finalize details with your verified wedding team and enjoy your magical celebration.",
    icon: HeartHandshake,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-wedding-600">
            Effortless Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            How WedPlan Works
          </h2>
          <p className="text-sm text-slate-500">
            Four simple steps from dreaming to the altar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative rounded-2xl border border-champagne-200/80 bg-wedding-50/50 p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-wedding-300">
                      {s.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-wedding-600 shadow-sm border border-champagne-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
