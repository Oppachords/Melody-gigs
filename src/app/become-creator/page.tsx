"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CREATOR_CATEGORIES } from "@/lib/constants";
import { toast } from "sonner";

export default function BecomeCreatorPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") {
      setInitialized(true);
      return;
    }

    async function loadProfile() {
      try {
        const res = await fetch("/api/users/me");
        if (!res.ok) return;
        const data = await res.json();

        if (Array.isArray(data.categories) && data.categories.length > 0) {
          setSelectedCategories(data.categories);
        }

        if (data.role === "CREATOR") {
          router.replace("/dashboard/creator");
          return;
        }

        if (data.role === "ADMIN") {
          router.replace("/dashboard/admin");
        }
      } catch {
        // Non-fatal — user can still submit the form
      } finally {
        setInitialized(true);
      }
    }

    loadProfile();
  }, [status, router]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async () => {
    if (!session) {
      signIn("google", { callbackUrl: "/become-creator" });
      return;
    }

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users/become-creator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: selectedCategories }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update role");

      await update();
      toast.success("Welcome to MelodyGigs as a creator!");
      router.push("/dashboard/creator");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !initialized) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Become a Creator</CardTitle>
          <CardDescription>
            Select your service categories and start offering your creative
            services on MelodyGigs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-semibold">
              Select Your Categories
            </Label>
            <p className="mb-4 text-sm text-muted-foreground">
              Choose one or more categories that describe your services. Your
              selections are saved to your profile.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CREATOR_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <Checkbox
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {session ? "Save & Start Creating" : "Sign in with Google to Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
