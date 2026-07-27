import Link from "next/link";
import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils-app";
import { DeleteAdButton } from "@/components/ads/delete-ad-button";

export default async function CreatorAdsPage() {
  const user = await requireCreator();

  const ads = await getDb().ad.findMany({
    where: { userId: user.id },
    include: { category: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Active Ads</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your service listings on MelodyGigs
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/creator/ads/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Ad
          </Link>
        </Button>
      </div>

      {ads.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              You have not created any ads yet.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/dashboard/creator/ads/new">Create your first ad</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {ads.map((ad) => (
            <Card key={ad.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{ad.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ad.category.name} · {ad.deliveryDays} day delivery
                  </p>
                </div>
                <Badge variant={ad.status === "ACTIVE" ? "default" : "secondary"}>
                  {ad.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {ad.description}
                </p>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold">
                    {formatCurrency(ad.priceMin)} – {formatCurrency(ad.priceMax)}
                  </span>
                  <DeleteAdButton adId={ad.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
