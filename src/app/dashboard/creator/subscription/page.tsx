import Link from "next/link";
import { requireCreator } from "@/lib/session";
import { getDb } from "@/lib/db";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils-app";
import { Check } from "lucide-react";

export default async function CreatorSubscriptionPage() {
  const user = await requireCreator();

  const subscription = await getDb().subscription.findUnique({
    where: { userId: user.id },
  });

  const planKey =
    (subscription?.plan as keyof typeof SUBSCRIPTION_PLANS) ?? "FREE";
  const plan = SUBSCRIPTION_PLANS[planKey] ?? SUBSCRIPTION_PLANS.FREE;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Subscription</h1>
      <p className="mb-8 text-muted-foreground">
        Your current plan and available upgrades.
      </p>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{plan.name} Plan</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {subscription?.status ?? "ACTIVE"} ·{" "}
              {subscription?.endDate
                ? `Renews ${formatDate(subscription.endDate)}`
                : "No renewal date"}
            </p>
          </div>
          <Badge>{planKey === "FREE" ? "Free" : planKey}</Badge>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                {feature}
              </li>
            ))}
          </ul>
          {planKey !== "UNLIMITED" && (
            <Button className="mt-6" asChild>
              <Link href="/pricing">Upgrade Plan</Link>
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(SUBSCRIPTION_PLANS) as Array<keyof typeof SUBSCRIPTION_PLANS>).map(
          (key) => {
            const p = SUBSCRIPTION_PLANS[key];
            const isCurrent = key === planKey;
            return (
              <Card
                key={key}
                className={isCurrent ? "border-primary ring-1 ring-primary" : ""}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <p className="text-2xl font-bold">
                    ${p.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /mo
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  {isCurrent ? (
                    <Badge variant="secondary">Current plan</Badge>
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/pricing">View on pricing</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}
