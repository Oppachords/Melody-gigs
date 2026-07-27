import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatDate } from "@/lib/utils-app";

export default async function AdminReviewsPage() {
  await requireAdmin();

  const reviews = await getDb().review.findMany({
    include: {
      reviewer: { select: { name: true, email: true } },
      reviewee: { select: { name: true, email: true } },
      project: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Reviews</h1>
      <p className="mb-8 text-muted-foreground">
        All reviews left on completed projects.
      </p>

      {reviews.length === 0 ? (
        <DashboardEmpty message="No reviews yet." />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {review.rating}/5 · {review.project.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {review.reviewer.name ?? review.reviewer.email} →{" "}
                  {review.reviewee.name ?? review.reviewee.email}
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
