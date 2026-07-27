"use client";

import { usePathname } from "next/navigation";
import { SiteLayout } from "@/components/layout/site-layout";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return <SiteLayout>{children}</SiteLayout>;
}
