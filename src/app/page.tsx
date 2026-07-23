import { HeroSection } from "@/components/landing/hero-section";
import {
  FeaturedCreatorsSection,
  FeaturedGigsSection,
  CategoriesSection,
  CTASection,
} from "@/components/landing/home-sections";
import { AdBanner } from "@/components/ads/google-ad";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 py-4">
        <AdBanner className="min-h-[90px]" />
      </div>
      <FeaturedCreatorsSection />
      <FeaturedGigsSection />
      <CategoriesSection />
      <CTASection />
    </>
  );
}
