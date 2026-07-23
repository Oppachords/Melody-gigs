import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getDb } from "@/lib/db";
import type { UserRole } from "@prisma/client";
import { authConfig } from "@/lib/auth.config";

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "kallylcolyns@gmail.com";

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

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}

async function ensureAdminAccess(userId: string, email: string | null | undefined) {
  if (email !== ADMIN_EMAIL) return;

  const proEndDate = new Date();
  proEndDate.setFullYear(proEndDate.getFullYear() + 1);

  await getDb().user.update({
    where: { id: userId },
    data: { role: "ADMIN", status: "ACTIVE" },
  });

  await getDb().subscription.upsert({
    where: { userId },
    update: {
      plan: "PROFESSIONAL",
      status: "ACTIVE",
      endDate: proEndDate,
      autoRenew: true,
    },
    create: {
      userId,
      plan: "PROFESSIONAL",
      status: "ACTIVE",
      endDate: proEndDate,
      autoRenew: true,
    },
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(getDb()),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        token.sub = user.id;
        token.id = user.id;
        const dbUser = await getDb().user.findUnique({
          where: { id: user.id! },
          select: { role: true },
        });
        token.role = dbUser?.role ?? user.role ?? "CLIENT";
      }

      const userId = (token.id ?? token.sub) as string | undefined;

      if ((trigger === "update" || !token.role) && userId) {
        const dbUser = await getDb().user.findUnique({
          where: { id: userId },
          select: { role: true },
        });
        if (dbUser) token.role = dbUser.role;
      }

      return token;
    },
    async session({ session, token }) {
      const userId = (token.id ?? token.sub) as string | undefined;
      if (session.user && userId) {
        session.user.id = userId;
        session.user.role = (token.role as UserRole) ?? "CLIENT";
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;

      const existing = await getDb().user.findUnique({
        where: { email: user.email },
        select: { id: true, status: true },
      });

      if (existing?.status === "BANNED" || existing?.status === "SUSPENDED") {
        return false;
      }

      if (existing && user.email === ADMIN_EMAIL) {
        await ensureAdminAccess(existing.id, user.email);
      }

      return true;
    },
  },
  events: {
    async createUser({ user }) {
      const isAdmin = user.email === ADMIN_EMAIL;
      const proEndDate = new Date();
      proEndDate.setFullYear(proEndDate.getFullYear() + 1);

      await getDb().profile.upsert({
        where: { userId: user.id! },
        update: {},
        create: { userId: user.id! },
      });

      await getDb().subscription.upsert({
        where: { userId: user.id! },
        update: isAdmin
          ? {
              plan: "PROFESSIONAL",
              status: "ACTIVE",
              endDate: proEndDate,
              autoRenew: true,
            }
          : {},
        create: {
          userId: user.id!,
          plan: isAdmin ? "PROFESSIONAL" : "FREE",
          status: "ACTIVE",
          endDate: isAdmin ? proEndDate : null,
          autoRenew: isAdmin,
        },
      });

      if (isAdmin) {
        await getDb().user.update({
          where: { id: user.id! },
          data: { role: "ADMIN" },
        });
      }
    },
    async linkAccount({ user }) {
      if (user.email === ADMIN_EMAIL && user.id) {
        await ensureAdminAccess(user.id, user.email);
      }
    },
  },
});
