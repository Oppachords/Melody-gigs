"use client";

import { SessionProvider } from "next-auth/react";
import { Header } from "./header";
import { Footer } from "./footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
