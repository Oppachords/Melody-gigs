import { requireClient } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export default async function ClientPaymentsPage() {
  const user = await requireClient();

  const payments = await getDb().payment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Payments</h1>
      <p className="mb-8 text-muted-foreground">
        Your payment and escrow history on MelodyGigs.
      </p>

      {payments.length === 0 ? (
        <DashboardEmpty message="No payments yet. Payments appear here when you hire creators through the platform." />
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
