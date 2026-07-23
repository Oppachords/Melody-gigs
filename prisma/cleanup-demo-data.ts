import "dotenv/config";
import { db } from "../src/lib/db";

const DELETE_STEPS: { label: string; run: () => ReturnType<typeof db.escrow.deleteMany> }[] = [
  { label: "Escrow", run: () => db.escrow.deleteMany() },
  { label: "Payment", run: () => db.payment.deleteMany() },
  { label: "FeaturedAd", run: () => db.featuredAd.deleteMany() },
  { label: "Delivery", run: () => db.delivery.deleteMany() },
  { label: "ProjectContract", run: () => db.projectContract.deleteMany() },
  { label: "Review", run: () => db.review.deleteMany() },
  { label: "Message", run: () => db.message.deleteMany() },
  { label: "ChatParticipant", run: () => db.chatParticipant.deleteMany() },
  { label: "Chat", run: () => db.chat.deleteMany() },
  { label: "GigApplication", run: () => db.gigApplication.deleteMany() },
  { label: "Project", run: () => db.project.deleteMany() },
  { label: "PortfolioLink", run: () => db.portfolioLink.deleteMany() },
  { label: "Ad", run: () => db.ad.deleteMany() },
  { label: "Gig", run: () => db.gig.deleteMany() },
  { label: "Withdrawal", run: () => db.withdrawal.deleteMany() },
  { label: "Notification", run: () => db.notification.deleteMany() },
  { label: "SavedCreator", run: () => db.savedCreator.deleteMany() },
  { label: "AdminLog", run: () => db.adminLog.deleteMany() },
  { label: "AuditLog", run: () => db.auditLog.deleteMany() },
  { label: "LandingStat", run: () => db.landingStat.deleteMany() },
  { label: "Testimonial", run: () => db.testimonial.deleteMany() },
  { label: "SuccessStory", run: () => db.successStory.deleteMany() },
  { label: "FAQ", run: () => db.fAQ.deleteMany() },
  { label: "BlogPost", run: () => db.blogPost.deleteMany() },
];

/**
 * Removes demo and marketplace activity data while preserving:
 * User, Account, Session, VerificationToken, Profile, Subscription,
 * Category, and Setting records.
 */
async function main() {
  console.log("Cleaning demo and activity data from database...\n");

  for (const step of DELETE_STEPS) {
    const result = await step.run();
    console.log(`  ${step.label}: ${result.count} deleted`);
  }

  const [users, accounts, sessions, profiles, subscriptions, categories, settings] =
    await Promise.all([
      db.user.count(),
      db.account.count(),
      db.session.count(),
      db.profile.count(),
      db.subscription.count(),
      db.category.count(),
      db.setting.count(),
    ]);

  console.log("\nPreserved:");
  console.log(`  Users: ${users}`);
  console.log(`  Accounts: ${accounts}`);
  console.log(`  Sessions: ${sessions}`);
  console.log(`  Profiles: ${profiles}`);
  console.log(`  Subscriptions: ${subscriptions}`);
  console.log(`  Categories: ${categories}`);
  console.log(`  Settings: ${settings}`);
  console.log("\nCleanup completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
