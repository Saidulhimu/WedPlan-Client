import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const destinations = [
  {
    city: "New York, NY",
    desc: "Luxury rooftop terraces & historic ballrooms",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    href: "/services?location=New+York",
  },
  {
    city: "Los Angeles, CA",
    desc: "Malibu coastal estates & Hollywood glam",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
    href: "/services?location=Los+Angeles",
  },
  {
    city: "Miami, FL",
    desc: "Tropical waterfront villas & sun-drenched romance",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600",
    href: "/services?location=Miami",
  },
  {
    city: "Chicago, IL",
    desc: "Architectural botanical conservatories",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    href: "/services?location=Chicago",
  },
];

export function Destinations() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-wedding-600">
              Romantic Escapes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Popular Wedding Destinations
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Explore wedding specialists and iconic venues across prime destination cities.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-wedding-600 hover:text-wedding-700 transition-colors group"
          >
            <span>Explore All Cities</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <Link
              key={d.city}
              href={d.href}
              className="group relative overflow-hidden rounded-2xl border border-champagne-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                <img
                  src={d.image}
                  alt={d.city}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-rose-200 text-xs font-semibold mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Destination</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold">{d.city}</h3>
                  <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">{d.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
