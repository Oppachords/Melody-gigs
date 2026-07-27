import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export default async function AdminPaymentsPage() {
  await requireAdmin();

  const payments = await getDb().payment.findMany({
    include: {
      user: { select: { name: true, email: true } },
      project: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Payments</h1>
      <p className="mb-8 text-muted-foreground">
        Platform payment and escrow activity.
      </p>

      {payments.length === 0 ? (
        <DashboardEmpty message="No payments recorded yet." />
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base capitalize">
                    {payment.type.toLowerCase().replace("_", " ")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {payment.user.name ?? payment.user.email}
                    {payment.project && ` · ${payment.project.title}`}
                  </p>
                </div>
                <Badge variant="outline">{payment.status}</Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {formatCurrency(payment.amount)}
                </span>
                <span className="text-muted-foreground">
                  {formatDate(payment.createdAt)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
