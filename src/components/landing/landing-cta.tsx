"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LandingCTA() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-16 text-center text-white md:px-16">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Join music professionals and clients on MelodyGigs. Sign in
                with Google to get started in seconds.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/login">Get Started Free</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/become-creator">Become a Creator</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (session.user.role === "CLIENT") {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-16 text-center text-white md:px-16">
            <div className="relative">
              <h2 className="text-3xl font-bold md:text-4xl">
                Find Your Next Collaborator
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Browse Pro and Premium creators, or post a gig for your project.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/search">Browse Creators</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  asChild
                >
                  <Link href="/dashboard/client/gigs/new">Post a Gig</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-16 text-center text-white md:px-16">
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">
              Welcome back, {session.user.name?.split(" ")[0] ?? "Creator"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Manage your services, ads, and projects from your dashboard.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link
                  href={
                    session.user.role === "ADMIN"
                      ? "/admin"
                      : "/dashboard/creator"
                  }
                >
                  Open Dashboard
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/dashboard/creator/ads/new">Create an Ad</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
