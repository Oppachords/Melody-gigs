import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createEscrowPayment, calculateCommission } from "@/lib/pandora";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, amount } = await request.json();

    if (!projectId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
      include: { contract: true },
    });

    if (!project || project.clientId !== session.user.id) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (!project.contract?.clientAccepted || !project.contract?.creatorAccepted) {
      return NextResponse.json(
        { error: "Both parties must accept the work agreement first" },
        { status: 400 }
      );
    }

    const { commission, netAmount } = calculateCommission(amount);
    const reference = `escrow_${projectId}_${Date.now()}`;

    const pandoraResponse = await createEscrowPayment({
      amount,
      currency: "USD",
      reference,
      customerEmail: session.user.email!,
      customerName: session.user.name ?? "Client",
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/client/payments`,
      metadata: { projectId, type: "escrow" },
    });

    const payment = await db.payment.create({
      data: {
        userId: session.user.id,
        projectId,
        type: "ESCROW",
        amount,
        commission,
        netAmount,
        status: "PENDING",
        pandoraRef: reference,
        pandoraResponse: pandoraResponse as object,
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      paymentUrl: pandoraResponse.paymentUrl,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}
