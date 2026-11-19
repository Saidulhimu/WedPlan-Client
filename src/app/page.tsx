import React from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Destinations } from "@/components/home/Destinations";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <FeaturedServices />
      <CategoriesGrid />
      <WhyChooseUs />
      <HowItWorks />
      <Destinations />
      <Testimonials />
    </div>
  );
}
