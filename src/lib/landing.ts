import { getDb } from "@/lib/db";

export async function getFeaturedCreators() {
  const users = await getDb().user.findMany({
    where: {
      role: { in: ["CREATOR", "ADMIN"] },
      subscription: {
        plan: { in: ["PROFESSIONAL", "UNLIMITED"] },
        status: "ACTIVE",
      },
    },
    include: {
      subscription: { select: { plan: true } },
      profile: {
        select: {
          country: true,
          averageRating: true,
          totalReviews: true,
          isVerified: true,
        },
      },
      ads: {
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          title: true,
          priceMin: true,
          priceMax: true,
          category: { select: { name: true } },
        },
      },
      creatorCategories: {
        take: 1,
        include: { category: { select: { name: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return users.map((user) => {
    const ads = user.ads;
    const priceMin = ads.length
      ? Math.min(...ads.map((a) => a.priceMin))
      : 50;
    const priceMax = ads.length
      ? Math.max(...ads.map((a) => a.priceMax))
      : 500;

    return {
      id: user.id,
      name: user.name ?? "Creator",
      image: user.image,
      title: ads[0]?.title ?? "Professional music services",
      category:
        ads[0]?.category.name ??
        user.creatorCategories[0]?.category.name ??
        "Music Professional",
      rating: user.profile?.averageRating ?? 0,
      reviews: user.profile?.totalReviews ?? 0,
      priceMin,
      priceMax,
      country: user.profile?.country,
      plan: user.subscription?.plan ?? "FREE",
      isVerified: user.profile?.isVerified ?? false,
    };
  });
}

export async function getFeaturedAds() {
  const ads = await getDb().ad.findMany({
    where: {
      status: "ACTIVE",
      user: {
        subscription: {
          plan: { in: ["PROFESSIONAL", "UNLIMITED"] },
          status: "ACTIVE",
        },
      },
    },
    include: {
      category: { select: { name: true } },
      user: {
        select: {
          name: true,
          image: true,
          profile: { select: { averageRating: true } },
          subscription: { select: { plan: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return ads.map((ad) => ({
    id: ad.id,
    title: ad.title,
    description: ad.description,
    priceMin: ad.priceMin,
    priceMax: ad.priceMax,
    deliveryDays: ad.deliveryDays,
    category: ad.category.name,
    creatorName: ad.user.name ?? "Creator",
    creatorImage: ad.user.image,
    rating: ad.user.profile?.averageRating ?? 0,
    isFeatured:
      ad.user.subscription?.plan === "UNLIMITED" ||
      ad.user.subscription?.plan === "PROFESSIONAL",
  }));
}
