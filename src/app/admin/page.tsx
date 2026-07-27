import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils-app";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const db = getDb();

  const [
    userCount,
    activeProjects,
    revenue,
    pendingPayments,
    disputedProjects,
    activeChats,
  ] = await Promise.all([
    db.user.count(),
    db.project.count({
      where: { status: { in: ["ACTIVE", "DELIVERED", "REVISION"] } },
    }),
    db.payment.aggregate({
      where: { status: "RELEASED", type: "ESCROW" },
      _sum: { amount: true },
    }),
    db.payment.count({
      where: { status: { in: ["PENDING", "ESCROW_HELD"] } },
    }),
    db.project.count({ where: { status: "DISPUTED" } }),
    db.chat.count(),
  ]);

  const stats = [
    { label: "Total Users", value: String(userCount), icon: Users },
    { label: "Active Projects", value: String(activeProjects), icon: TrendingUp },
    {
      label: "Revenue",
      value: formatCurrency(revenue._sum.amount ?? 0),
      icon: DollarSign,
    },
    { label: "Pending Payments", value: String(pendingPayments), icon: CreditCard },
    { label: "Open Disputes", value: String(disputedProjects), icon: AlertTriangle },
    { label: "Active Chats", value: String(activeChats), icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
