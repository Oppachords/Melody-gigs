import "dotenv/config";
import { getDb } from "../src/lib/db";

/**
 * Fixes broken auth state:
 * 1. Deletes users with no OAuth Account (seeded orphans that block Google login)
 * 2. Clears stale database sessions (JWT auth no longer uses these)
 */
async function main() {
  const db = getDb();

  console.log("Fixing auth state...\n");

  const orphans = await db.user.findMany({
    where: { accounts: { none: {} } },
    select: { id: true, email: true, role: true },
  });

  for (const user of orphans) {
    console.log(`  Deleting orphan user (no Google link): ${user.email} (${user.role})`);
    await db.user.delete({ where: { id: user.id } });
  }

  if (orphans.length === 0) {
    console.log("  No orphan users found.");
  }

  const staleSessions = await db.session.deleteMany();
  console.log(`  Cleared ${staleSessions.count} stale database sessions.`);

  const adminEmail = process.env.ADMIN_EMAIL ?? "kallylcolyns@gmail.com";
  const adminUser = await db.user.findUnique({
    where: { email: adminEmail },
    select: { id: true, role: true },
  });

  if (adminUser) {
    const proEndDate = new Date();
    proEndDate.setFullYear(proEndDate.getFullYear() + 1);

    await db.user.update({
      where: { id: adminUser.id },
      data: { role: "ADMIN", status: "ACTIVE" },
    });

    await db.subscription.upsert({
      where: { userId: adminUser.id },
      update: {
        plan: "PROFESSIONAL",
        status: "ACTIVE",
        endDate: proEndDate,
        autoRenew: true,
      },
      create: {
        userId: adminUser.id,
        plan: "PROFESSIONAL",
        status: "ACTIVE",
        endDate: proEndDate,
        autoRenew: true,
      },
    });

    console.log(`  Promoted ${adminEmail} to ADMIN with Pro subscription.`);
  }

  const users = await db.user.findMany({
    select: {
      email: true,
      role: true,
      accounts: { select: { provider: true } },
    },
  });

  console.log("\nRemaining users:");
  for (const user of users) {
    const providers = user.accounts.map((a) => a.provider).join(", ") || "none";
    console.log(`  ${user.email} (${user.role}) — providers: ${providers}`);
  }

  console.log("\nAuth fix completed.");
  console.log(
    "Admin should sign in at /login with Google using kallylcolyns@gmail.com"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await getDb().$disconnect();
  });
