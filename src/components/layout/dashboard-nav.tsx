"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardNavProps {
  links: readonly { href: string; label: string }[];
  title: string;
}

export function DashboardNav({ links, title }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-muted/20 lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)]">
        <div className="p-6">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <ScrollArea className="h-[calc(100%-5rem)] px-3">
          <nav className="flex flex-col gap-1 pb-6">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== links[0].href &&
                  pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
