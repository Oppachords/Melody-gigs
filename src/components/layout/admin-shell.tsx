"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ExternalLink, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-zinc-950 text-white">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="MelodyGigs" width={28} height={28} />
            <span className="font-semibold">
              MelodyGigs <span className="text-violet-400">Admin</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-zinc-400 sm:inline">
              {session?.user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-zinc-800"
              asChild
            >
              <Link href="/">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-zinc-800"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r bg-muted/20 lg:block">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Administration</h2>
          </div>
          <nav className="flex flex-col gap-1 px-3 pb-6">
            {NAV_LINKS.admin.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== NAV_LINKS.admin[0].href &&
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
        </aside>
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
