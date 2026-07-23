import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export const metadata: Metadata = {
  title: "Browse Gigs",
  description: "Find music and creative gigs posted by clients on MelodyGigs.",
};

const demoGigs = [
  {
    id: "1",
    title: "Need Mixing Engineer for Afrobeat EP",
    description: "Looking for an experienced mixing engineer for a 6-track Afrobeat EP.",
    budget: 500,
    deadline: new Date("2026-08-15"),
    genre: "Afrobeat",
    location: "Remote",
    category: "Mixing Engineer",
    applications: 12,
  },
  {
    id: "2",
    title: "Church Band Needed for Easter Service",
    description: "Need a full live band for our Easter Sunday worship service.",
    budget: 800,
    deadline: new Date("2026-04-20"),
    genre: "Gospel",
    location: "Lagos, Nigeria",
    category: "Live Band",
    applications: 5,
  },
  {
    id: "3",
    title: "Album Cover Art Design",
    description: "Creative cover art for upcoming hip-hop album release.",
    budget: 150,
    deadline: new Date("2026-05-01"),
    genre: "Hip-Hop",
    location: "Remote",
    category: "Cover Art Designer",
    applications: 8,
  },
];

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

      <div className="space-y-4">
        {demoGigs.map((gig) => (
          <Card key={gig.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{gig.title}</h2>
                    <Badge variant="outline">{gig.category}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {gig.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {formatCurrency(gig.budget)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Due {formatDate(gig.deadline)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {gig.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {gig.applications} proposals
                  </span>
                  <Button variant="outline" asChild>
                    <Link href={`/gigs/${gig.id}`}>View & Apply</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
