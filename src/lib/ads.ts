import type { SubscriptionPlan } from "@prisma/client";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";

export function getMaxAdsForPlan(plan: SubscriptionPlan): number {
  const config = SUBSCRIPTION_PLANS[plan as keyof typeof SUBSCRIPTION_PLANS];
  return config?.maxAds ?? 2;
}

export function canCreateAd(
  plan: SubscriptionPlan,
  currentAdCount: number
): boolean {
  const max = getMaxAdsForPlan(plan);
  if (max === Infinity) return true;
  return currentAdCount < max;
}
