import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/dashboard-empty";
import { formatCurrency, formatDate } from "@/lib/utils-app";

export default async function CreatorProjectsPage() {
  const user = await requireCreator();

  const projects = await getDb().project.findMany({
    where: { creatorId: user.id },
    include: { client: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Projects</h1>
      <p className="mb-8 text-muted-foreground">
        Active and completed work from clients.
      </p>

      {projects.length === 0 ? (
        <DashboardEmpty
          message="No projects yet. Clients will hire you through your ads or gig proposals."
          actionHref="/dashboard/creator/ads/new"
          actionLabel="Create an Ad"
        />
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Client: {project.client.name ?? "Client"}
                  </p>
                </div>
                <Badge variant="outline">{project.status}</Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {formatCurrency(project.price)}
                </span>
                <span className="text-muted-foreground">
                  Started {formatDate(project.createdAt)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
