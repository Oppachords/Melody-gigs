import { requireAdmin } from "@/lib/session";
import { getDb } from "@/lib/db";
import { PLATFORM_COMMISSION_RATE } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const commissionSetting = await getDb().setting.findUnique({
    where: { key: "platform_commission_rate" },
  });

  const commissionRate =
    typeof commissionSetting?.value === "number"
      ? commissionSetting.value
      : PLATFORM_COMMISSION_RATE;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Settings</h1>
      <p className="mb-8 text-muted-foreground">
        Platform configuration values.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform Commission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{commissionRate}%</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Applied to escrow payments on completed projects.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Admin Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              {process.env.ADMIN_EMAIL ?? "kallylcolyns@gmail.com"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Set via ADMIN_EMAIL environment variable on deploy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
