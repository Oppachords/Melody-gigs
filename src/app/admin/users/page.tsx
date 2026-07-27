import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { getInitials, formatDate } from "@/lib/utils-app";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await getDb().user.findMany({
    include: {
      subscription: { select: { plan: true, status: true } },
      _count: { select: { ads: true, projectsAsCreator: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Users</h1>
      <p className="mb-8 text-muted-foreground">
        All registered users on the platform.
      </p>

      {users.length === 0 ? (
        <DashboardEmpty message="No users registered yet." />
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex flex-wrap items-center gap-4 py-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image ?? ""} />
                  <AvatarFallback>
                    {getInitials(user.name ?? user.email ?? "U")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{user.name ?? "Unnamed"}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <Badge variant="outline">{user.role}</Badge>
                <Badge variant="secondary">
                  {user.subscription?.plan ?? "FREE"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {user._count.ads} ads · {user._count.projectsAsCreator} projects
                </span>
                <span className="text-xs text-muted-foreground">
                  Joined {formatDate(user.createdAt)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
