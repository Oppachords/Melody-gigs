"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatorCard } from "@/components/cards/creator-card";
import { AdCard } from "@/components/cards/creator-card";

const demoCreators = [
  {
    id: "1",
    name: "Kofi Beats",
    title: "I will produce professional Afrobeat tracks",
    category: "Music Producer",
    rating: 4.9,
    reviews: 127,
    priceMin: 50,
    priceMax: 500,
    country: "Ghana",
    plan: "PROFESSIONAL",
    isVerified: true,
  },
  {
    id: "2",
    name: "Sarah Mix",
    title: "Professional mixing & mastering engineer",
    category: "Mixing Engineer",
    rating: 5.0,
    reviews: 89,
    priceMin: 75,
    priceMax: 300,
    country: "Nigeria",
    plan: "UNLIMITED",
    isVerified: true,
  },
  {
    id: "3",
    name: "Grace Vocals",
    title: "Session vocalist for any genre",
    category: "Vocalist",
    rating: 4.8,
    reviews: 64,
    priceMin: 40,
    priceMax: 200,
    country: "Kenya",
    plan: "PROFESSIONAL",
    isVerified: true,
  },
  {
    id: "4",
    name: "DJ Pulse",
    title: "Event DJ and live mixing services",
    category: "DJ",
    rating: 4.7,
    reviews: 45,
    priceMin: 100,
    priceMax: 800,
    country: "South Africa",
    plan: "FREE",
    isVerified: false,
  },
];

const demoAds = [
  {
    id: "1",
    title: "I will professionally mix and master your Afrobeat song",
    description:
      "Get radio-ready quality mixing and mastering for your Afrobeat tracks.",
    priceMin: 75,
    priceMax: 250,
    deliveryDays: 5,
    category: "Mixing Engineer",
    creatorName: "Sarah Mix",
    rating: 5.0,
    isFeatured: true,
  },
  {
    id: "2",
    title: "I will create custom beats for your next hit",
    description: "Original beats tailored to your style and vision.",
    priceMin: 50,
    priceMax: 300,
    deliveryDays: 3,
    category: "Beat Maker",
    creatorName: "Kofi Beats",
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: "3",
    title: "I will record professional vocals for your track",
    description: "Studio-quality vocal recordings with quick turnaround.",
    priceMin: 40,
    priceMax: 150,
    deliveryDays: 2,
    category: "Vocalist",
    creatorName: "Grace Vocals",
    rating: 4.8,
  },
];

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

export function FeaturedCreatorsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Featured Pro Creators"
          subtitle="Top-rated professionals with Pro and Premium plans"
          viewAllHref="/search?plan=pro"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {demoCreators.slice(0, 4).map((creator, i) => (
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
      </div>
    </section>
  );
}

export function FeaturedGigsSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Featured Services"
          subtitle="Popular services from verified creators"
          viewAllHref="/search"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoAds.map((ad, i) => (
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
      </div>
    </section>
  );
}

export function CategoriesSection() {
  const categories = [
    "Music Producer",
    "Mixing Engineer",
    "Vocalist",
    "DJ",
    "Beat Maker",
    "Live Band",
    "Video Creator",
    "Graphics Designer",
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Popular Categories"
          subtitle="Browse services by category"
          viewAllHref="/categories"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat, i) => (
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

export function StatsSection() {
  const stats = [
    { label: "Active Creators", value: "2,500+" },
    { label: "Projects Completed", value: "15,000+" },
    { label: "Countries", value: "45+" },
    { label: "Average Rating", value: "4.9/5" },
  ];

  return (
    <section className="border-y bg-gradient-to-r from-violet-600/5 to-blue-600/5 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Independent Artist",
      content:
        "MelodyGigs helped me find the perfect mixing engineer for my debut album. The escrow system gave me peace of mind.",
    },
    {
      name: "David K.",
      role: "Music Producer",
      content:
        "As a creator, I've landed consistent work through MelodyGigs. The Pro plan visibility boost is worth every penny.",
    },
    {
      name: "Grace A.",
      role: "Event Organizer",
      content:
        "Found an amazing live band for our corporate event in under 24 hours. Highly recommend!",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeader title="What Our Users Say" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <p className="text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-16 text-center text-white md:px-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Join thousands of music professionals and clients on MelodyGigs.
              Sign in with Google to get started in seconds.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/become-creator">Become a Creator</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
