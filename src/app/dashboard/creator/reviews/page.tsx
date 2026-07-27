import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatDate } from "@/lib/utils-app";

export default async function CreatorReviewsPage() {
  const user = await requireCreator();

  const reviews = await getDb().review.findMany({
    where: { revieweeId: user.id },
    include: {
      reviewer: { select: { name: true } },
      project: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Reviews</h1>
      <p className="mb-8 text-muted-foreground">
        Feedback from clients on completed projects.
      </p>

      {reviews.length === 0 ? (
        <DashboardEmpty message="No reviews yet. Reviews appear after clients complete projects with you." />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {review.rating}/5 · {review.project.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  from {review.reviewer.name ?? "Client"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{review.comment}</p>
                {review.response && (
                  <p className="mt-3 rounded-lg bg-muted p-3 text-sm">
                    Your response: {review.response}
                  </p>
                )}
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
