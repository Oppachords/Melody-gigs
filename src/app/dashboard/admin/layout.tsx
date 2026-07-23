import { requireAdmin } from "@/lib/session";
import { DashboardNav } from "@/components/layout/dashboard-nav";
import { NAV_LINKS } from "@/lib/constants";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardNav links={NAV_LINKS.admin} title="Admin Panel" />
      <div className="flex-1 overflow-auto p-6 md:p-8">{children}</div>
    </div>
  );
}
