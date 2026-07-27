import { HeroSection } from "@/components/landing/hero-section";
import {
  FeaturedCreatorsSection,
  FeaturedGigsSection,
  CategoriesSection,
  LandingCTA,
} from "@/components/landing/home-sections";
import { AdBanner } from "@/components/ads/google-ad";
import { getFeaturedAds, getFeaturedCreators } from "@/lib/landing";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [creators, ads] = await Promise.all([
    getFeaturedCreators(),
    getFeaturedAds(),
  ]);

  return (
    <>
      <HeroSection />
      <div className="container mx-auto px-4 py-4">
        <AdBanner className="min-h-[90px]" />
      </div>
      <FeaturedCreatorsSection creators={creators} />
      <FeaturedGigsSection ads={ads} />
      <CategoriesSection />
      <LandingCTA />
    </>
  );
}
