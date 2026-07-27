import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { slugify } from "@/lib/utils-app";

export const dynamic = "force-dynamic";

const createGigSchema = z.object({
  title: z.string().min(5).max(120),
  description: z.string().min(20).max(5000),
  category: z.string().min(1),
  budget: z.number().positive(),
  deadline: z.string().optional(),
  genre: z.string().optional(),
  location: z.string().optional(),
  isRemote: z.boolean().default(true),
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

      const gigs = await getDb().gig.findMany({
        where: { clientId: session.user.id },
        include: {
          category: { select: { name: true } },
          _count: { select: { applications: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(gigs);
    }

    const gigs = await getDb().gig.findMany({
      where: { status: "OPEN" },
      include: {
        category: { select: { name: true } },
        client: { select: { name: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(gigs);
  } catch (error) {
    console.error("List gigs error:", error);
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

    const body = createGigSchema.parse(await request.json());

    const category = await getDb().category.upsert({
      where: { slug: slugify(body.category) },
      update: {},
      create: { name: body.category, slug: slugify(body.category) },
    });

    const gig = await getDb().gig.create({
      data: {
        clientId: session.user.id,
        categoryId: category.id,
        title: body.title,
        description: body.description,
        budget: body.budget,
        deadline: body.deadline ? new Date(body.deadline) : null,
        genre: body.genre,
        location: body.location,
        isRemote: body.isRemote,
        status: "OPEN",
      },
      include: { category: { select: { name: true } } },
    });

    return NextResponse.json(gig, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Create gig error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
