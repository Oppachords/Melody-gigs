"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { POPULAR_CATEGORIES } from "@/lib/constants";

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

function EmptyState({
  message,
  actionHref,
  actionLabel,
}: {
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-12 text-center">
      <p className="text-muted-foreground">{message}</p>
      {actionHref && actionLabel && (
        <Button className="mt-4" variant="outline" asChild>
          <Link href={actionHref}>{actionLabel}</Link>
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
        <EmptyState
          message="No featured creators yet. Pro and Premium creators will appear here once they join."
          actionHref="/become-creator"
          actionLabel="Become a Creator"
        />
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
        <EmptyState
          message="No services listed yet. Creators can publish adverts from their dashboard."
          actionHref="/become-creator"
          actionLabel="List Your Services"
        />
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
              Join music professionals and clients on MelodyGigs. Sign in with
              Google to get started in seconds.
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
