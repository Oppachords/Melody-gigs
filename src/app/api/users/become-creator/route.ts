import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils-app";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { categories } = await request.json();

    if (!Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json(
        { error: "At least one category is required" },
        { status: 400 }
      );
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { role: "CREATOR" },
    });

    for (const catName of categories) {
      const category = await db.category.upsert({
        where: { slug: slugify(catName) },
        update: {},
        create: { name: catName, slug: slugify(catName) },
      });

      await db.creatorCategory.upsert({
        where: {
          userId_categoryId: {
            userId: session.user.id,
            categoryId: category.id,
          },
        },
        update: {},
        create: {
          userId: session.user.id,
          categoryId: category.id,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Become creator error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
