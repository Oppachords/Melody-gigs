import Link from "next/link";
import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { ExternalLink } from "lucide-react";

export default async function CreatorPortfolioPage() {
  const user = await requireCreator();

  const links = await getDb().portfolioLink.findMany({
    where: { userId: user.id },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Portfolio</h1>
      <p className="mb-8 text-muted-foreground">
        Media links and samples attached to your profile and ads.
      </p>

      {links.length === 0 ? (
        <DashboardEmpty
          message="No portfolio items yet. Add links when creating or editing ads."
          actionHref="/dashboard/creator/ads/new"
          actionLabel="Create an Ad"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <Card key={link.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <CardTitle className="text-base">
                  {link.title ?? link.type.replace("_", " ")}
                </CardTitle>
                <Badge variant="outline">{link.type}</Badge>
              </CardHeader>
              <CardContent>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View media
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
