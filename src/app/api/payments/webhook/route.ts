import { NextResponse } from "next/server";
import { verifyPandoraWebhook } from "@/lib/pandora";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("x-pandora-signature") ?? "";

    const data = verifyPandoraWebhook(payload, signature);
    if (!data) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payment = await db.payment.findFirst({
      where: { pandoraRef: data.reference },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (data.status === "success") {
      await db.$transaction([
        db.payment.update({
          where: { id: payment.id },
          data: { status: "ESCROW_HELD" },
        }),
        db.escrow.create({
          data: {
            paymentId: payment.id,
            amount: data.amount,
          },
        }),
        db.project.update({
          where: { id: payment.projectId! },
          data: { status: "ACTIVE" },
        }),
      ]);
    } else if (data.status === "failed") {
      await db.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
