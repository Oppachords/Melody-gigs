"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CreatorCard } from "@/components/cards/creator-card";
import { AdBanner, AdSidebar } from "@/components/ads/google-ad";
import { CREATOR_CATEGORIES, SORT_OPTIONS } from "@/lib/constants";

const demoResults = [
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
  {
    id: "5",
    name: "Art Studio",
    title: "Album cover art and graphics design",
    category: "Cover Art Designer",
    rating: 4.9,
    reviews: 78,
    priceMin: 30,
    priceMax: 150,
    country: "Uganda",
    plan: "PROFESSIONAL",
    isVerified: true,
  },
  {
    id: "6",
    name: "Band Unity",
    title: "Live band for events and weddings",
    category: "Live Band",
    rating: 4.6,
    reviews: 32,
    priceMin: 500,
    priceMax: 2000,
    country: "Tanzania",
    plan: "FREE",
    isVerified: true,
  },
];

function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="space-y-6">
      <div>
        <Label>Category</Label>
        <Select>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            {CREATOR_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>
          Price Range: ${priceRange[0]} – ${priceRange[1]}
        </Label>
        <Slider
          className="mt-4"
          min={0}
          max={2000}
          step={10}
          value={priceRange}
          onValueChange={(value) =>
            setPriceRange(Array.isArray(value) ? [...value] : [value, value])
          }
        />
      </div>

      <div>
        <Label>Country</Label>
        <Input className="mt-2" placeholder="Enter country" />
      </div>

      <div>
        <Label>Minimum Rating</Label>
        <Select>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Any rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="4.5">4.5+ stars</SelectItem>
            <SelectItem value="5">5 stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="verified">Verified Creators Only</Label>
        <Switch id="verified" />
      </div>

      <div>
        <Label>Subscription Plan</Label>
        <Select>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="All plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PROFESSIONAL">Pro</SelectItem>
            <SelectItem value="UNLIMITED">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}

export function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find Creators</h1>
        <p className="mt-2 text-muted-foreground">
          Discover music professionals and creative artists
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, skill, or service..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="rating">
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger className="lg:hidden">
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="mt-8">
              <SearchFilters />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <AdBanner className="mb-8 min-h-[90px]" />

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border bg-card p-6">
            <h2 className="mb-4 font-semibold">Filters</h2>
            <SearchFilters />
          </div>
        </aside>

        <div className="flex-1">
          <p className="mb-4 text-sm text-muted-foreground">
            {demoResults.length} creators found
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {demoResults.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </div>

        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-24">
            <AdSidebar className="min-h-[600px]" />
          </div>
        </aside>
      </div>
    </div>
  );
}
