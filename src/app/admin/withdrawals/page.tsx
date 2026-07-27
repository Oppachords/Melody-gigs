import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export default async function AdminWithdrawalsPage() {
  await requireAdmin();

  const withdrawals = await getDb().withdrawal.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Withdrawals</h1>
      <p className="mb-8 text-muted-foreground">
        Creator withdrawal requests awaiting review.
      </p>

      {withdrawals.length === 0 ? (
        <DashboardEmpty message="No withdrawal requests yet." />
      ) : (
        <div className="space-y-4">
          {withdrawals.map((withdrawal) => (
            <Card key={withdrawal.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {withdrawal.user.name ?? withdrawal.user.email}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {withdrawal.method ?? "Not specified"}
                  </p>
                </div>
                <Badge variant="outline">{withdrawal.status}</Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {formatCurrency(withdrawal.amount)}
                </span>
                <span className="text-muted-foreground">
                  {formatDate(withdrawal.createdAt)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
