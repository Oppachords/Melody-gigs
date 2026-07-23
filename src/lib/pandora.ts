const PANDORA_API_URL =
  process.env.PANDORA_API_URL ?? "https://api.pandorasystems.com/v1";

interface PandoraPaymentRequest {
  amount: number;
  currency: string;
  reference: string;
  customerEmail: string;
  customerName: string;
  callbackUrl: string;
  metadata?: Record<string, string>;
}

interface PandoraPaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  message?: string;
}

interface PandoraWebhookPayload {
  transactionId: string;
  reference: string;
  status: "success" | "failed" | "pending";
  amount: number;
  currency: string;
}

async function pandoraRequest<T>(
  endpoint: string,
  method: "GET" | "POST" = "POST",
  body?: unknown
): Promise<T> {
  const response = await fetch(`${PANDORA_API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PANDORA_API_KEY}`,
      "X-API-Secret": process.env.PANDORA_API_SECRET ?? "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Pandora API error: ${response.statusText}`);
  }

  return response.json();
}

export async function createEscrowPayment(
  data: PandoraPaymentRequest
): Promise<PandoraPaymentResponse> {
  return pandoraRequest<PandoraPaymentResponse>("/payments/escrow", "POST", {
    ...data,
    type: "escrow",
  });
}

export async function createSubscriptionPayment(
  data: PandoraPaymentRequest & { planId: string }
): Promise<PandoraPaymentResponse> {
  return pandoraRequest<PandoraPaymentResponse>(
    "/payments/subscription",
    "POST",
    { ...data, type: "subscription" }
  );
}

export async function releaseEscrowPayment(
  transactionId: string,
  amount: number
): Promise<PandoraPaymentResponse> {
  return pandoraRequest<PandoraPaymentResponse>("/payments/release", "POST", {
    transactionId,
    amount,
  });
}

export async function processWithdrawal(
  transactionId: string,
  accountInfo: Record<string, string>
): Promise<PandoraPaymentResponse> {
  return pandoraRequest<PandoraPaymentResponse>(
    "/payments/withdraw",
    "POST",
    { transactionId, accountInfo }
  );
}

import { createHmac } from "crypto";

export function verifyPandoraWebhook(
  payload: string,
  signature: string
): PandoraWebhookPayload | null {
  const expected = createHmac("sha256", process.env.PANDORA_WEBHOOK_SECRET ?? "")
    .update(payload)
    .digest("hex");

  if (signature !== expected) return null;
  return JSON.parse(payload) as PandoraWebhookPayload;
}

export function calculateCommission(
  amount: number,
  rate = Number(process.env.PLATFORM_COMMISSION_RATE ?? 5)
): { commission: number; netAmount: number } {
  const commission = (amount * rate) / 100;
  return { commission, netAmount: amount - commission };
}
