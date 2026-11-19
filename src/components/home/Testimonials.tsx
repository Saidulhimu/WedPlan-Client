import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Clara & Sebastian",
    event: "Manhattan Plaza Wedding",
    text: "WedPlan made booking our cinematographer and floral designer completely effortless. The quality of vendors on this platform is unmatched!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
  },
  {
    name: "Aria & Julian",
    event: "Napa Valley Vineyard Wedding",
    text: "Finding an estate venue that fit our 200 guests with transparent pricing was daunting until we used WedPlan. Truly a five-star experience.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Mia & Ethan",
    event: "Coastal Miami Celebration",
    text: "As a bride planning from out of town, knowing every vendor had verified admin reviews gave me total peace of mind. Highly recommend!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-wedding-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-wedding-600">
            Real Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Loved By Couples Everywhere
          </h2>
          <p className="text-sm text-slate-500">
            Hear from happy couples who planned their unforgettable day with WedPlan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-champagne-200 bg-white p-7 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-6 border-t border-champagne-100 flex items-center space-x-3 mt-6">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-wedding-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{r.name}</h4>
                  <p className="text-[11px] text-slate-500">{r.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
