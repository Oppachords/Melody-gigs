import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Browse Gigs",
  description: "Find music and creative gigs posted by clients on MelodyGigs.",
};

export default function GigsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Browse Gigs</h1>
          <p className="mt-2 text-muted-foreground">
            Find projects posted by clients looking for your skills
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/gigs/new">Post a Gig</Link>
        </Button>
      </div>

      <Card className="border-dashed">
        <CardContent className="px-6 py-16 text-center">
          <p className="text-muted-foreground">
            No gigs posted yet. Clients can post projects from their dashboard.
          </p>
          <Button className="mt-4" variant="outline" asChild>
            <Link href="/login">Sign in to Post a Gig</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
