import { requireCreator } from "@/lib/session";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DollarSign,
  Eye,
  Megaphone,
  MessageSquare,
  Plus,
  TrendingUp,
} from "lucide-react";
import { getSubscriptionBadge } from "@/lib/utils-app";

export default async function CreatorDashboardPage() {
  const user = await requireCreator();

  const subscription = await db.subscription.findUnique({
    where: { userId: user.id },
    select: { plan: true },
  });

  const planBadge = getSubscriptionBadge(subscription?.plan ?? "FREE");

  const stats = [
    { label: "Active Ads", value: "0", icon: Megaphone },
    { label: "Total Views", value: "0", icon: Eye },
    { label: "Earnings", value: "$0", icon: DollarSign },
    { label: "Messages", value: "0", icon: MessageSquare },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">
              Creator Studio
            </h1>
            <Badge variant={planBadge.variant}>{planBadge.label} Plan</Badge>
          </div>
          <p className="mt-1 text-muted-foreground">
            Welcome, {user.name?.split(" ")[0]}! Manage your services and earnings.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/creator/ads/new">
            <Plus className="mr-2 h-4 w-4" /> Create Ad
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <Card className="mt-8 border-violet-200 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-950/20 dark:to-blue-950/20 dark:border-violet-800">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-violet-600" />
            <div>
              <h3 className="font-semibold">Upgrade to Pro</h3>
              <p className="text-sm text-muted-foreground">
                Get featured placement, higher search ranking, and analytics for $30/year.
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/dashboard/creator/subscription">Upgrade Now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
