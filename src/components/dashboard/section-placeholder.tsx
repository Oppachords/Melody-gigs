import { Card, CardContent } from "@/components/ui/card";

interface DashboardSectionPlaceholderProps {
  title: string;
  description?: string;
}

export function DashboardSectionPlaceholder({
  title,
  description,
}: DashboardSectionPlaceholderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
      <Card className="mt-8 border-dashed">
        <CardContent className="py-12 text-center text-muted-foreground">
          This section is coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
