import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export default async function CreatorEarningsPage() {
  const user = await requireCreator();

  const released = await getDb().payment.findMany({
    where: {
      userId: user.id,
      type: "ESCROW",
      status: "RELEASED",
    },
    orderBy: { createdAt: "desc" },
  });

  const total = released.reduce((sum, p) => sum + p.netAmount, 0);
  const pending = await getDb().payment.aggregate({
    where: {
      userId: user.id,
      type: "ESCROW",
      status: "ESCROW_HELD",
    },
    _sum: { netAmount: true },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Earnings</h1>
      <p className="mb-8 text-muted-foreground">
        Track released escrow payments and pending balances.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total Released
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(total)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Pending in Escrow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatCurrency(pending._sum.netAmount ?? 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {released.length === 0 ? (
        <DashboardEmpty message="No released earnings yet. Complete projects to receive payments." />
      ) : (
        <div className="space-y-4">
          {released.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="flex items-center justify-between py-4 text-sm">
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
