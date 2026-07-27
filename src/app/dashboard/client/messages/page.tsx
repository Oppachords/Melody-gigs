import { requireClient } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatDate } from "@/lib/utils-app";

export default async function ClientMessagesPage() {
  const user = await requireClient();

  const chats = await getDb().chat.findMany({
    where: {
      participants: { some: { userId: user.id } },
    },
    include: {
      participants: {
        include: { user: { select: { name: true, email: true } } },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Messages</h1>
      <p className="mb-8 text-muted-foreground">
        Conversations with creators about your projects.
      </p>

      {chats.length === 0 ? (
        <DashboardEmpty
          message="No messages yet. Start a conversation when you hire a creator."
          actionHref="/search"
          actionLabel="Find Creators"
        />
      ) : (
        <div className="space-y-4">
          {chats.map((chat) => {
            const others = chat.participants
              .filter((p) => p.userId !== user.id)
              .map((p) => p.user.name ?? p.user.email)
              .join(", ");

            return (
              <Card key={chat.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {chat.title ?? `Chat with ${others}`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {chat.messages[0]?.content ?? "No messages yet"}
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
