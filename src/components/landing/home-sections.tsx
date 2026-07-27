"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { POPULAR_CATEGORIES } from "@/lib/constants";
import { CreatorCard, AdCard } from "@/components/cards/creator-card";
import { FeaturedEmptyState } from "@/components/landing/featured-empty-state";
import { LandingCTA } from "@/components/landing/landing-cta";

interface SectionProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

function SectionHeader({ title, subtitle, viewAllHref }: SectionProps) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Button variant="ghost" asChild>
          <Link href={viewAllHref}>
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

type FeaturedCreator = Awaited<
  ReturnType<typeof import("@/lib/landing").getFeaturedCreators>
>[number];

type FeaturedAd = Awaited<
  ReturnType<typeof import("@/lib/landing").getFeaturedAds>
>[number];

export function FeaturedCreatorsSection({
  creators,
}: {
  creators: FeaturedCreator[];
}) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Featured Pro Creators"
          subtitle="Top-rated professionals with Pro and Premium plans"
          viewAllHref="/search?plan=pro"
        />
        {creators.length === 0 ? (
          <FeaturedEmptyState
            message="No featured creators yet. Pro and Premium creators appear here once they join."
            guestAction={{
              href: "/become-creator",
              label: "Become a Creator",
            }}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {creators.map((creator, i) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <CreatorCard {...creator} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function FeaturedGigsSection({ ads }: { ads: FeaturedAd[] }) {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Featured Services"
          subtitle="Popular services from Pro and Premium creators"
          viewAllHref="/search"
        />
        {ads.length === 0 ? (
          <FeaturedEmptyState
            message="No featured services yet. Pro and Premium creators can publish ads from their dashboard."
            guestAction={{
              href: "/become-creator",
              label: "List Your Services",
            }}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad, i) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <AdCard {...ad} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Popular Categories"
          subtitle="Browse services by category"
          viewAllHref="/categories"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {POPULAR_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/search?category=${encodeURIComponent(cat)}`}
                className="flex items-center justify-center rounded-xl border bg-card p-6 text-center text-sm font-medium transition-all hover:border-primary hover:shadow-md"
              >
                {cat}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { LandingCTA };
