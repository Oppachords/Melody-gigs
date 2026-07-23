import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 4MB." },
        { status: 400 }
      );
    }

    const blob = await put(
      `profiles/${session.user.id}/${Date.now()}-${file.name}`,
      file,
      {
        access: "public",
        addRandomSuffix: true,
        contentType: file.type,
      }
    );

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { image: true },
    });

    // Remove previous Vercel Blob profile photo if it exists
    if (user?.image?.includes("blob.vercel-storage.com")) {
      try {
        await del(user.image);
      } catch {
        // Non-fatal if old blob was already deleted
      }
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { image: blob.url },
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Profile upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Check BLOB_READ_WRITE_TOKEN is configured." },
      { status: 500 }
    );
  }
}
