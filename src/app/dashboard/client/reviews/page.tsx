import { requireClient } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatDate } from "@/lib/utils-app";

export default async function ClientReviewsPage() {
  const user = await requireClient();

  const reviews = await getDb().review.findMany({
    where: { reviewerId: user.id },
    include: {
      reviewee: { select: { name: true } },
      project: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Reviews</h1>
      <p className="mb-8 text-muted-foreground">
        Reviews you have left for creators.
      </p>

      {reviews.length === 0 ? (
        <DashboardEmpty message="You have not written any reviews yet. Reviews appear after completed projects." />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {review.project.title} · {review.rating}/5
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  for {review.reviewee.name ?? "Creator"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{review.comment}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatDate(review.createdAt)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
