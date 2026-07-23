import { requireClient } from "@/lib/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  CreditCard,
  MessageSquare,
  Plus,
  Star,
} from "lucide-react";

export default async function ClientDashboardPage() {
  const user = await requireClient();

  const stats = [
    { label: "Active Projects", value: "0", icon: Briefcase },
    { label: "Messages", value: "0", icon: MessageSquare },
    { label: "Total Spent", value: "$0", icon: CreditCard },
    { label: "Reviews Given", value: "0", icon: Star },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name?.split(" ")[0]}</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your projects, gigs, and payments
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/gigs/new">
            <Plus className="mr-2 h-4 w-4" /> Post a Gig
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No active projects yet. Browse creators or post a gig to get started.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/search">Find Creators</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No messages yet. Start a conversation with a creator.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
