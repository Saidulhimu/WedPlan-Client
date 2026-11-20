import React from "react";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";

const articles = [
  {
    title: "The Ultimate 12-Month Wedding Planning Checklist",
    excerpt: "A calm, month-by-month timeline covering venue reservations, catering tastings, and invitation design.",
    category: "Checklist",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  },
  {
    title: "10 Crucial Questions Every Couple Must Ask Their Venue",
    excerpt: "Ensure clarity on sound curfews, liquor licensing, setup windows, and rain contingency plans.",
    category: "Venues",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
  },
  {
    title: "Natural Light vs Flash: Choosing Your Photography Style",
    excerpt: "Understand fine art film, documentary candid captures, and moody cinematic wedding film aesthetics.",
    category: "Photography",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600",
  },
];

export function PlanningTips() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-wedding-600">
              Editorial Journal
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Wedding Planning Tips & Advice
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Curated masterclasses and editorial guidance from world-renowned planners and industry veterans.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-wedding-600 hover:text-wedding-700 transition-colors group"
          >
            <span>Explore All Resources</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <article
              key={item.title}
              className="group rounded-3xl border border-champagne-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-wedding-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-wedding-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-wedding-600 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
