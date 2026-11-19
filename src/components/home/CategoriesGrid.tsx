import React from "react";
import Link from "next/link";
import {
  Camera,
  Building2,
  Flower2,
  Utensils,
  Sparkles,
  Crown,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Photography & Videography",
    description: "Cinematic films, heirloom albums & candid memories",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600",
    href: "/services?category=Photography+%26+Videography",
  },
  {
    title: "Wedding Venues",
    description: "Historic estates, ballrooms & romantic vineyards",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
    href: "/services?category=Wedding+Venues",
  },
  {
    title: "Decoration & Florist",
    description: "Bespoke floral arches & enchanting table styling",
    icon: Flower2,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    href: "/services?category=Decoration+%26+Florist",
  },
  {
    title: "Catering Services",
    description: "Farm-to-table banquets & custom champagne bars",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
    href: "/services?category=Catering+Services",
  },
  {
    title: "Makeup & Styling",
    description: "HD airbrush bridal glam, hairstyling & preview trials",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
    href: "/services?category=Makeup+%26+Styling",
  },
  {
    title: "Wedding Fashion",
    description: "Haute couture bridal gowns, veils & luxury suits",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=600",
    href: "/services?category=Wedding+Fashion",
  },
];

export function CategoriesGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-wedding-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-wedding-600">
            Tailored Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Wedding Service Categories
          </h2>
          <p className="text-sm text-slate-500">
            Explore every essential wedding category and discover seasoned specialists dedicated to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl border border-champagne-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-wedding-300"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-wedding-700 shadow-md backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl font-bold">{cat.title}</h3>
                    <p className="text-xs text-rose-100/90 line-clamp-1 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-white flex items-center justify-between text-xs font-semibold text-wedding-600 group-hover:text-wedding-700">
                  <span>Browse {cat.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
