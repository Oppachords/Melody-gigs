import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>Terms of Service</h1>
      <p>Last updated: July 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using MelodyGigs, you agree to be bound by these Terms
        of Service and all applicable laws and regulations.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        Accounts are created via Google OAuth. You are responsible for
        maintaining the security of your Google account. MelodyGigs supports
        Client and Creator account types.
      </p>

      <h2>3. Platform Commission</h2>
      <p>
        MelodyGigs deducts a 5% commission from all escrow payments before
        transferring the remaining balance to creators.
      </p>

      <h2>4. Payments</h2>
      <p>
        All platform payments are processed through Pandora Systems. Subscription
        plans, escrow payments, and withdrawals are subject to Pandora Systems
        terms.
      </p>

      <h2>5. Content & Conduct</h2>
      <p>
        Users must not post illegal, harmful, or infringing content. MelodyGigs
        reserves the right to suspend or ban accounts that violate these terms.
      </p>
    </div>
  );
}
