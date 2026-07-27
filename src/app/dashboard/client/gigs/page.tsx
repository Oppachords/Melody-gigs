import Link from "next/link";
import { requireClient } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { Plus } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export default async function ClientGigsPage() {
  const user = await requireClient();

  const gigs = await getDb().gig.findMany({
    where: { clientId: user.id },
    include: {
      category: { select: { name: true } },
      _count: { select: { applications: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posted Gigs</h1>
          <p className="mt-1 text-muted-foreground">
            Gigs you have posted for creators to apply to.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/gigs/new">
            <Plus className="mr-2 h-4 w-4" />
            Post a Gig
          </Link>
        </Button>
      </div>

      {gigs.length === 0 ? (
        <DashboardEmpty
          message="You have not posted any gigs yet."
          actionHref="/dashboard/client/gigs/new"
          actionLabel="Post Your First Gig"
        />
      ) : (
        <div className="space-y-4">
          {gigs.map((gig) => (
            <Card key={gig.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{gig.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {gig.category.name}
                  </p>
                </div>
                <Badge variant="outline">{gig.status}</Badge>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <span className="font-semibold">
                  {formatCurrency(gig.budget)}
                </span>
                <span className="text-muted-foreground">
                  {gig._count.applications} proposals
                </span>
                <span className="text-muted-foreground">
                  Posted {formatDate(gig.createdAt)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
