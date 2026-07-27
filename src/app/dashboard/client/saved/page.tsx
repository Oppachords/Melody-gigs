import Link from "next/link";
import { requireClient } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { getInitials } from "@/lib/utils-app";

export default async function SavedCreatorsPage() {
  const user = await requireClient();

  const saved = await getDb().savedCreator.findMany({
    where: { clientId: user.id },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
          profile: { select: { country: true, averageRating: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Saved Creators</h1>
      <p className="mb-8 text-muted-foreground">
        Creators you have bookmarked for future projects.
      </p>

      {saved.length === 0 ? (
        <DashboardEmpty
          message="No saved creators yet. Browse creators and save your favorites."
          actionHref="/search"
          actionLabel="Browse Creators"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {saved.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center gap-4 p-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.creator.image ?? ""} />
                  <AvatarFallback>
                    {getInitials(item.creator.name ?? "C")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    href="/search"
                    className="font-semibold hover:text-primary"
                  >
                    {item.creator.name ?? "Creator"}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {item.creator.profile?.country ?? "Remote"} ·{" "}
                    {item.creator.profile?.averageRating.toFixed(1) ?? "0.0"} ★
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
