import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the perfect plan for your creative business on MelodyGigs.",
};

export default function PricingPage() {
  const plans = [
    { key: "FREE" as const, popular: false },
    { key: "PROFESSIONAL" as const, popular: true },
    { key: "UNLIMITED" as const, popular: false },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold">Creator Subscription Plans</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that fits your creative business. All payments processed
          securely through Pandora Systems.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
        {plans.map(({ key, popular }) => {
          const plan = SUBSCRIPTION_PLANS[key];
          return (
            <Card
              key={key}
              className={`relative ${popular ? "border-violet-500 shadow-lg scale-105" : ""}`}
            >
              {popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {key === "FREE"
                    ? "Get started for free"
                    : "Billed annually via Pandora Systems"}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/year</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/login">
                    {key === "FREE" ? "Get Started" : "Subscribe Now"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
