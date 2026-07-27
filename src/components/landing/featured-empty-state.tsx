"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface FeaturedEmptyStateProps {
  message: string;
  guestAction?: { href: string; label: string };
}

export function FeaturedEmptyState({
  message,
  guestAction,
}: FeaturedEmptyStateProps) {
  const { data: session } = useSession();

  if (session?.user?.role === "CREATOR" || session?.user?.role === "ADMIN") {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-12 text-center">
        <p className="text-muted-foreground">{message}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href="/dashboard/creator">Go to Creator Dashboard</Link>
        </Button>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-12 text-center">
        <p className="text-muted-foreground">{message}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href="/search">Browse Creators</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-12 text-center">
      <p className="text-muted-foreground">{message}</p>
      {guestAction && (
        <Button className="mt-4" variant="outline" asChild>
          <Link href={guestAction.href}>{guestAction.label}</Link>
        </Button>
      )}
    </div>
  );
}
