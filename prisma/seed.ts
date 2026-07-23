import "dotenv/config";
import { CREATOR_CATEGORIES } from "../src/lib/constants";
import { db } from "../src/lib/db";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("Seeding database...");

  for (let i = 0; i < CREATOR_CATEGORIES.length; i++) {
    const name = CREATOR_CATEGORIES[i];
    await db.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: {
        name,
        slug: slugify(name),
        sortOrder: i,
        description: `Professional ${name.toLowerCase()} services`,
      },
    });
  }

  await db.setting.upsert({
    where: { key: "commission_rate" },
    update: {},
    create: { key: "commission_rate", value: { rate: 5 } },
  });

  await db.setting.upsert({
    where: { key: "landing_page" },
    update: {},
    create: {
      key: "landing_page",
      value: {
        heroTitle: "Book a professional",
        heroSubtitle:
          "Find producers, engineers, vocalists, instrumentalists, live bands, and creative artists for your next project.",
      },
    },
  });

  const faqs = [
    {
      question: "How does escrow payment work?",
      answer:
        "When you hire a creator, your payment is held securely in escrow. Once you approve the delivery, the creator confirms completion, and after admin review, payment is released minus a 5% platform commission.",
      sortOrder: 0,
    },
    {
      question: "What happens if I'm not satisfied with the work?",
      answer:
        "You can request revisions based on your project agreement. If issues persist, you can open a dispute. Note: payments made outside the platform are not covered by our dispute policy.",
      sortOrder: 1,
    },
    {
      question: "How do subscription plans work?",
      answer:
        "Creators can choose Free, Professional ($30/year), or Unlimited ($50/year) plans. Higher tiers offer more adverts, better visibility, and premium features.",
      sortOrder: 2,
    },
  ];

  for (const faq of faqs) {
    await db.fAQ.create({ data: faq });
  }

  const ADMIN_EMAIL = "kallylcolyns@gmail.com";
  const proEndDate = new Date();
  proEndDate.setFullYear(proEndDate.getFullYear() + 1);

  const admin = await db.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
    create: {
      email: ADMIN_EMAIL,
      name: "Admin",
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });

  await db.profile.upsert({
    where: { userId: admin.id },
    update: {},
    create: { userId: admin.id },
  });

  await db.subscription.upsert({
    where: { userId: admin.id },
    update: {
      plan: "PROFESSIONAL",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: proEndDate,
      autoRenew: true,
    },
    create: {
      userId: admin.id,
      plan: "PROFESSIONAL",
      status: "ACTIVE",
      endDate: proEndDate,
      autoRenew: true,
    },
  });

  console.log(`Admin seeded: ${ADMIN_EMAIL} (role ADMIN, plan PROFESSIONAL)`);
  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
