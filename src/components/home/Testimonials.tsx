import React from "react";
import { Star, ShieldCheck, HeartHandshake } from "lucide-react";

const reviews = [
  {
    couple: "Charlotte & Henry Montgomery",
    date: "October 2025 • Manhattan, NY",
    venue: "The Plaza Ballroom",
    photographer: "Lumiere Wedding Moments",
    text: "WedPlan completely changed our wedding experience. Being able to compare transparent packages and send date inquiries directly eliminated the endless back-and-forth emails. Our cinematographer was absolute magic!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
  },
  {
    couple: "Genevieve & Alexandre Vance",
    date: "August 2025 • Malibu, CA",
    venue: "Pacific Oceanfront Villa",
    photographer: "Cinematic Film Studio",
    text: "Knowing every vendor had been personally audited by the WedPlan admin team gave my fiancé and me complete peace of mind. Our floral installation looked like a royal editorial spread.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
  },
  {
    couple: "Seraphina & David Sterling",
    date: "June 2025 • Chicago, IL",
    venue: "Garfield Park Conservatory",
    photographer: "Botanical Memories",
    text: "The customer dashboard kept all our vendor inquiries organized in one place. We could see the exact moment our caterer approved our request. 10/10 recommend to every newly engaged couple!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#FDFBF7] via-white to-[#FAF6F0] border-t border-champagne-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
            Love Stories
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Celebrated by Real Couples
          </h2>
          <p className="text-sm text-slate-500">
            Read how couples created their dream ceremonies with verified WedPlan creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.couple}
              className="rounded-3xl border border-champagne-300 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-wedding-400 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" /> Verified Couple
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{r.text}"
                </p>

                <div className="bg-wedding-50/60 p-3 rounded-2xl border border-champagne-100 text-[11px] text-slate-500 space-y-1">
                  <p><strong>Venue:</strong> {r.venue}</p>
                  <p><strong>Photography:</strong> {r.photographer}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-champagne-100 flex items-center space-x-3.5 mt-6">
                <img
                  src={r.avatar}
                  alt={r.couple}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-champagne-300"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-900">{r.couple}</h4>
                  <p className="text-[11px] text-slate-400">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
