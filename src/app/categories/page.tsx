import type { Metadata } from "next";
import Link from "next/link";
import { CREATOR_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all music and creative service categories on MelodyGigs.",
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold">Service Categories</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore all categories of music and creative professionals on MelodyGigs
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {CREATOR_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/search?category=${encodeURIComponent(cat)}`}
            className="flex items-center justify-center rounded-xl border bg-card p-6 text-center text-sm font-medium transition-all hover:border-primary hover:shadow-md"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
