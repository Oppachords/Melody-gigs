import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { UserRole } from "@prisma/client";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAuth(redirectTo = "/login") {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireRole(roles: UserRole[], redirectTo = "/") {
  const user = await requireAuth();
  if (!roles.includes(user.role)) redirect(redirectTo);
  return user;
}

export async function requireAdmin() {
  return requireRole(["ADMIN"], "/");
}

export async function requireCreator() {
  const user = await requireAuth();
  if (user.role === "CLIENT") redirect("/become-creator");
  if (user.role !== "CREATOR" && user.role !== "ADMIN") redirect("/");
  return user;
}

export async function requireClient() {
  const user = await requireAuth();
  if (user.role === "CREATOR") redirect("/dashboard/creator");
  if (user.role !== "CLIENT" && user.role !== "ADMIN") redirect("/");
  return user;
}
