"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteAdButton({ adId }: { adId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this ad? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/ads/${adId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete ad");

      toast.success("Ad deleted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete ad");
    }
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
}
