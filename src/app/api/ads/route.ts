import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { canCreateAd } from "@/lib/ads";
import { slugify } from "@/lib/utils-app";

export const dynamic = "force-dynamic";

const createAdSchema = z.object({
  title: z.string().min(5).max(120),
  description: z.string().min(20).max(5000),
  category: z.string().min(1),
  priceMin: z.number().positive(),
  priceMax: z.number().positive(),
  deliveryDays: z.number().int().min(1).max(365),
  requirements: z.string().max(2000).optional(),
  status: z.enum(["DRAFT", "ACTIVE"]).default("ACTIVE"),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const mine = searchParams.get("mine") === "true";

    if (mine) {
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const ads = await getDb().ad.findMany({
        where: { userId: session.user.id },
        include: { category: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(ads);
    }

    const ads = await getDb().ad.findMany({
      where: { status: "ACTIVE" },
      include: {
        category: { select: { name: true } },
        user: { select: { name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(ads);
  } catch (error) {
    console.error("List ads error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getDb().user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true },
    });

    if (!user || (user.role !== "CREATOR" && user.role !== "ADMIN")) {
      return NextResponse.json({ error: "Creator access required" }, { status: 403 });
    }

    const body = createAdSchema.parse(await request.json());

    if (body.priceMax < body.priceMin) {
      return NextResponse.json(
        { error: "Maximum price must be greater than minimum price" },
        { status: 400 }
      );
    }

    const adCount = await getDb().ad.count({
      where: {
        userId: session.user.id,
        status: { in: ["ACTIVE", "DRAFT", "PAUSED"] },
      },
    });

    const plan = user.subscription?.plan ?? "FREE";
    if (!canCreateAd(plan, adCount)) {
      return NextResponse.json(
        { error: "You have reached the ad limit for your subscription plan" },
        { status: 400 }
      );
    }

    const category = await getDb().category.upsert({
      where: { slug: slugify(body.category) },
      update: {},
      create: { name: body.category, slug: slugify(body.category) },
    });

    const ad = await getDb().ad.create({
      data: {
        userId: session.user.id,
        categoryId: category.id,
        title: body.title,
        description: body.description,
        priceMin: body.priceMin,
        priceMax: body.priceMax,
        deliveryDays: body.deliveryDays,
        requirements: body.requirements,
        status: body.status,
      },
      include: { category: { select: { name: true } } },
    });

    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Create ad error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
