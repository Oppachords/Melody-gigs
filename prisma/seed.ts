import { PrismaClient } from "@prisma/client";
import { CREATOR_CATEGORIES } from "../src/lib/constants";

const prisma = new PrismaClient();

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
    await prisma.category.upsert({
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

  await prisma.setting.upsert({
    where: { key: "commission_rate" },
    update: {},
    create: { key: "commission_rate", value: { rate: 5 } },
  });

  await prisma.setting.upsert({
    where: { key: "landing_page" },
    update: {},
    create: {
      key: "landing_page",
      value: {
        heroTitle: "Connect with Top Music Professionals",
        heroSubtitle:
          "Find producers, engineers, vocalists, and creative artists for your next project.",
      },
    },
  });

  const stats = [
    { label: "Active Creators", value: "2,500+", sortOrder: 0 },
    { label: "Projects Completed", value: "15,000+", sortOrder: 1 },
    { label: "Countries", value: "45+", sortOrder: 2 },
    { label: "Average Rating", value: "4.9/5", sortOrder: 3 },
  ];

  for (const stat of stats) {
    await prisma.landingStat.create({ data: stat });
  }

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Independent Artist",
      content:
        "MelodyGigs helped me find the perfect mixing engineer for my debut album. The escrow system gave me peace of mind.",
      rating: 5,
      sortOrder: 0,
    },
    {
      name: "David K.",
      role: "Music Producer",
      content:
        "As a creator, I've landed consistent work through MelodyGigs. The Pro plan visibility boost is worth every penny.",
      rating: 5,
      sortOrder: 1,
    },
    {
      name: "Grace A.",
      role: "Event Organizer",
      content:
        "Found an amazing live band for our corporate event in under 24 hours. Highly recommend!",
      rating: 5,
      sortOrder: 2,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  const stories = [
    {
      title: "From Bedroom Producer to Chart Success",
      description:
        "How a young producer from Lagos connected with international artists through MelodyGigs.",
      clientName: "Universal Music Africa",
      creatorName: "DJ Kofi",
      sortOrder: 0,
    },
    {
      title: "Church Band Finds Their Sound",
      description:
        "A worship team hired a music director and session musicians to elevate their live performances.",
      clientName: "Grace Community Church",
      creatorName: "The Harmony Collective",
      sortOrder: 1,
    },
  ];

  for (const story of stories) {
    await prisma.successStory.create({ data: story });
  }

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
    await prisma.fAQ.create({ data: faq });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
