"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CREATOR_CATEGORIES } from "@/lib/constants";

export function CreateGigForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    genre: "",
    location: "",
    isRemote: true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/gigs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          budget: Number(form.budget),
          deadline: form.deadline || undefined,
          genre: form.genre || undefined,
          location: form.isRemote ? undefined : form.location,
          isRemote: form.isRemote,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to post gig");

      toast.success("Gig posted successfully");
      router.push("/dashboard/client/gigs");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to post gig");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div>
        <Label htmlFor="title">Gig Title</Label>
        <Input
          id="title"
          className="mt-2"
          placeholder="Need a mixing engineer for my EP"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={form.category}
          onValueChange={(value) => setForm({ ...form, category: value ?? "" })}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select a category" />
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          className="mt-2 min-h-32"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="budget">Budget ($)</Label>
          <Input
            id="budget"
            type="number"
            min="1"
            className="mt-2"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="deadline">Deadline (optional)</Label>
          <Input
            id="deadline"
            type="date"
            className="mt-2"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="genre">Genre (optional)</Label>
          <Input
            id="genre"
            className="mt-2"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="location">Location (optional)</Label>
          <Input
            id="location"
            className="mt-2"
            placeholder="Remote"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            disabled={form.isRemote}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Gig"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard/client/gigs">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
