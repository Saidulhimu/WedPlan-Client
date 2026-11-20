import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Sun, DollarSign, Calendar } from "lucide-react";

const destinations = [
  {
    city: "New York, NY",
    desc: "Luxury rooftop terraces, historic ballrooms & Central Park romance",
    venues: "45+ Venues",
    avgCost: "Avg. $4,500 - $12,000",
    season: "Best: Apr - Nov",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    href: "/services?location=New+York",
  },
  {
    city: "Los Angeles, CA",
    desc: "Malibu coastal cliffs, Hollywood hills estates & sunlit vineyards",
    venues: "38+ Venues",
    avgCost: "Avg. $5,000 - $14,000",
    season: "Best: Year-Round",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    href: "/services?location=Los+Angeles",
  },
  {
    city: "Miami, FL",
    desc: "Waterfront Mediterranean villas, palm-fringed private beaches & gala dinners",
    venues: "29+ Venues",
    avgCost: "Avg. $3,800 - $10,500",
    season: "Best: Nov - May",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800",
    href: "/services?location=Miami",
  },
  {
    city: "Chicago, IL",
    desc: "Botanical glass conservatories, lakefront promenades & architectural lofts",
    venues: "32+ Venues",
    avgCost: "Avg. $3,500 - $9,000",
    season: "Best: May - Oct",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    href: "/services?location=Chicago",
  },
];

export function Destinations() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
              Iconic Locales
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Premier Wedding Destinations
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Explore wedding specialists and bespoke venue spaces across the nation's most sought-after wedding cities.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-wedding-600 hover:text-wedding-700 transition-colors group"
          >
            <span>View All Destinations</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <Link
              key={d.city}
              href={d.href}
              className="group relative overflow-hidden rounded-3xl border border-champagne-300 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                <img
                  src={d.image}
                  alt={d.city}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-white/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-slate-800">
                    {d.venues}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <div className="flex items-center gap-1 text-rose-300 text-[11px] font-semibold">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Destination Guide</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold leading-tight">
                    {d.city}
                  </h3>
                  <p className="text-[11px] text-slate-200 line-clamp-2 leading-relaxed">
                    {d.desc}
                  </p>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-rose-200">
                    <span>{d.season}</span>
                    <span className="font-semibold text-white">{d.avgCost}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
