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

export function CreateAdForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priceMin: "",
    priceMax: "",
    deliveryDays: "7",
    requirements: "",
    status: "ACTIVE",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          priceMin: Number(form.priceMin),
          priceMax: Number(form.priceMax),
          deliveryDays: Number(form.deliveryDays),
          requirements: form.requirements || undefined,
          status: form.status,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create ad");

      toast.success("Ad created successfully");
      router.push("/dashboard/creator/ads");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create ad");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div>
        <Label htmlFor="title">Service Title</Label>
        <Input
          id="title"
          className="mt-2"
          placeholder="I will professionally mix your Afrobeat track"
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
          placeholder="Describe what you offer, your process, and what the client receives..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="priceMin">Minimum Price ($)</Label>
          <Input
            id="priceMin"
            type="number"
            min="1"
            className="mt-2"
            value={form.priceMin}
            onChange={(e) => setForm({ ...form, priceMin: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="priceMax">Maximum Price ($)</Label>
          <Input
            id="priceMax"
            type="number"
            min="1"
            className="mt-2"
            value={form.priceMax}
            onChange={(e) => setForm({ ...form, priceMax: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="deliveryDays">Delivery Time (days)</Label>
          <Input
            id="deliveryDays"
            type="number"
            min="1"
            className="mt-2"
            value={form.deliveryDays}
            onChange={(e) => setForm({ ...form, deliveryDays: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={form.status}
            onValueChange={(value) =>
              setForm({ ...form, status: value ?? "ACTIVE" })
            }
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Publish (Active)</SelectItem>
              <SelectItem value="DRAFT">Save as Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="requirements">Requirements (optional)</Label>
        <Textarea
          id="requirements"
          className="mt-2"
          placeholder="What you need from the client before starting..."
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Ad"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard/creator/ads">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
