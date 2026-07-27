import Link from "next/link";
import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { Eye, TrendingUp } from "lucide-react";

export default async function CreatorAnalyticsPage() {
  const user = await requireCreator();

  const ads = await getDb().ad.findMany({
    where: { userId: user.id },
    include: { category: { select: { name: true } } },
    orderBy: { viewCount: "desc" },
  });

  const totals = ads.reduce(
    (acc, ad) => ({
      views: acc.views + ad.viewCount,
      hires: acc.hires + ad.hireCount,
    }),
    { views: 0, hires: 0 }
  );

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Analytics</h1>
      <p className="mb-8 text-muted-foreground">
        Views and hires across your active ads.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totals.views}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Hires
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totals.hires}</p>
          </CardContent>
        </Card>
      </div>

      {ads.length === 0 ? (
        <DashboardEmpty
          message="No ads to analyze yet. Create an ad to start tracking performance."
          actionHref="/dashboard/creator/ads/new"
          actionLabel="Create an Ad"
        />
      ) : (
        <div className="space-y-4">
          {ads.map((ad) => (
            <Card key={ad.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">
                    <Link
                      href="/dashboard/creator/ads"
                      className="hover:text-primary"
                    >
                      {ad.title}
                    </Link>
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ad.category.name}
                  </p>
                </div>
                <Badge variant="outline">{ad.status}</Badge>
              </CardHeader>
              <CardContent className="flex gap-8 text-sm">
                <span>
                  <strong>{ad.viewCount}</strong> views
                </span>
                <span>
                  <strong>{ad.hireCount}</strong> hires
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
