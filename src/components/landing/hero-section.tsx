"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Music, Shield, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-blue-600/10" />
      <div className="absolute -left-40 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/60 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Music className="h-4 w-4 text-violet-600" />
            <span>Music & Creative Professionals Marketplace</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Connect with Top{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Music Professionals
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Find producers, engineers, vocalists, and creative artists for your
            next project. Secure escrow payments, verified portfolios, and
            seamless collaboration.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Search creators, services, or gigs..."
              className="h-12 rounded-xl bg-background/80 backdrop-blur-sm"
            />
            <Button size="lg" className="h-12 rounded-xl px-8" asChild>
              <Link href="/search">
                Search <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              Secure Escrow Payments
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Verified Creators
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-violet-600" />
              Instant Messaging
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
