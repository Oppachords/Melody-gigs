import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardEmpty({
  message,
  actionHref,
  actionLabel,
}: {
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-12 text-center">
        <p className="text-muted-foreground">{message}</p>
        {actionHref && actionLabel && (
          <Button className="mt-4" variant="outline" asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
