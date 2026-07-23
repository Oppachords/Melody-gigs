import { requireCreator } from "@/lib/session";
import { DashboardNav } from "@/components/layout/dashboard-nav";
import { NAV_LINKS } from "@/lib/constants";

export default async function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireCreator();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardNav links={NAV_LINKS.creator} title="Creator Dashboard" />
      <div className="flex-1 overflow-auto p-6 md:p-8">{children}</div>
    </div>
  );
}
