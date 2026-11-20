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
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    title: "Photography & Videography",
    description: "4K cinematic films, fine art film stills & drone coverage",
    badge: "120+ Lead Photographers",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800",
    href: "/services?category=Photography+%26+Videography",
  },
  {
    title: "Wedding Venues",
    description: "Historic manor houses, grand ballrooms & botanical gardens",
    badge: "180+ Luxury Venues",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    href: "/services?category=Wedding+Venues",
  },
  {
    title: "Decoration & Florist",
    description: "Bespoke ceremony arches, hanging floristry & tablescapes",
    badge: "95+ Floral Artisans",
    icon: Flower2,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    href: "/services?category=Decoration+%26+Florist",
  },
  {
    title: "Catering Services",
    description: "Michelin-standard banquets, champagne towers & farm cuisine",
    badge: "65+ Executive Chefs",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
    href: "/services?category=Catering+Services",
  },
  {
    title: "Makeup & Styling",
    description: "HD waterproof airbrush glam, preview trials & bridal party styling",
    badge: "85+ Bridal Artists",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800",
    href: "/services?category=Makeup+%26+Styling",
  },
  {
    title: "Wedding Fashion",
    description: "Haute couture French lace gowns, custom veils & bespoke tuxedos",
    badge: "40+ Master Couturiers",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=800",
    href: "/services?category=Wedding+Fashion",
  },
];

export function CategoriesGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#FDFBF7] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-wedding-600">
            Comprehensive Directory
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Explore By Wedding Category
          </h2>
          <p className="text-sm text-slate-500">
            Every category curated to international luxury benchmarks. Discover specialists who align with your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative overflow-hidden rounded-3xl border border-champagne-300/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-wedding-400 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                  {/* Icon & Count Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 text-wedding-700 shadow-md backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white border border-white/20">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <h3 className="font-serif text-xl font-bold tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-rose-100/90 line-clamp-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-white flex items-center justify-between text-xs font-bold uppercase tracking-wider text-wedding-600 group-hover:text-wedding-700 border-t border-champagne-100">
                  <span>Browse Directory</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
