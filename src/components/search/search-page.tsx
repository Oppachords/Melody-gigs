"use client";

import { useState } from "react";
import Link from "next/link";
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
import { AdBanner, AdSidebar } from "@/components/ads/google-ad";
import { CREATOR_CATEGORIES, SORT_OPTIONS } from "@/lib/constants";

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
          <p className="mb-4 text-sm text-muted-foreground">0 creators found</p>
          <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-16 text-center">
            <p className="text-muted-foreground">
              No creators found yet. Check back soon or join as a creator to be
              listed here.
            </p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/become-creator">Become a Creator</Link>
            </Button>
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
