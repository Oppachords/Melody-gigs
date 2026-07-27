import { requireAdmin } from "@/lib/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const stats = [
    { label: "Total Users", value: "0", icon: Users },
    { label: "Active Projects", value: "0", icon: TrendingUp },
    { label: "Revenue", value: "$0", icon: DollarSign },
    { label: "Pending Payments", value: "0", icon: CreditCard },
    { label: "Open Disputes", value: "0", icon: AlertTriangle },
    { label: "Active Chats", value: "0", icon: MessageSquare },
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
