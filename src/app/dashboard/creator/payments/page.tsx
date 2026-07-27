import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export default async function CreatorPaymentsPage() {
  const user = await requireCreator();

  const payments = await getDb().payment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Payments</h1>
      <p className="mb-8 text-muted-foreground">
        Escrow releases, subscriptions, and other transactions.
      </p>

      {payments.length === 0 ? (
        <DashboardEmpty message="No payments yet. Completed project payments will appear here." />
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base capitalize">
                  {payment.type.toLowerCase().replace("_", " ")}
                </CardTitle>
                <Badge variant="outline">{payment.status}</Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {formatCurrency(payment.netAmount)}
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
