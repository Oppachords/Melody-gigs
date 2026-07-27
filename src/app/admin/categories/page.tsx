import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";

export default async function AdminCategoriesPage() {
  await requireAdmin();

  const categories = await getDb().category.findMany({
    include: {
      _count: { select: { ads: true, gigs: true, creatorCategories: true } },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Categories</h1>
      <p className="mb-8 text-muted-foreground">
        Service categories used across ads, gigs, and creator profiles.
      </p>

      {categories.length === 0 ? (
        <DashboardEmpty message="No categories yet. Categories are created when creators post ads or gigs." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">{category.name}</CardTitle>
                <Badge variant={category.isActive ? "default" : "secondary"}>
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {category._count.ads} ads · {category._count.gigs} gigs ·{" "}
                {category._count.creatorCategories} creators
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
