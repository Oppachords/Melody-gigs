import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;

      const existing = await db.user.findUnique({
        where: { email: user.email },
        select: { status: true },
      });

      if (existing?.status === "BANNED" || existing?.status === "SUSPENDED") {
        return false;
      }

      return true;
    },
  },
  events: {
    async createUser({ user }) {
      await db.profile.upsert({
        where: { userId: user.id! },
        update: {},
        create: { userId: user.id! },
      });
      await db.subscription.upsert({
        where: { userId: user.id! },
        update: {},
        create: { userId: user.id!, plan: "FREE", status: "ACTIVE" },
      });
    },
  },
  session: { strategy: "database" },
});
