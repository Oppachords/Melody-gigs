import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatDate } from "@/lib/utils-app";

export default async function AdminChatsPage() {
  await requireAdmin();

  const chats = await getDb().chat.findMany({
    include: {
      participants: {
        include: { user: { select: { name: true, email: true } } },
      },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Chats</h1>
      <p className="mb-8 text-muted-foreground">
        Platform messaging activity overview.
      </p>

      {chats.length === 0 ? (
        <DashboardEmpty message="No chats yet." />
      ) : (
        <div className="space-y-4">
          {chats.map((chat) => {
            const names = chat.participants
              .map((p) => p.user.name ?? p.user.email)
              .join(", ");

            return (
              <Card key={chat.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {chat.title ?? names}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {chat._count.messages} messages
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {chat.messages[0]?.content ?? "No messages"}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Updated {formatDate(chat.updatedAt)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
