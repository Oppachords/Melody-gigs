import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dispute Policy",
};

export default function DisputePolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>Dispute Policy</h1>
      <p className="lead">
        MelodyGigs is committed to fair resolution of disputes between clients
        and creators.
      </p>

      <h2>Platform Payments Only</h2>
      <p>
        <strong>Important:</strong> If payment was made outside the MelodyGigs
        platform, we provide no support, no dispute resolution, and no refunds.
        All work agreements must use platform escrow payments to be eligible for
        dispute support.
      </p>

      <h2>Dispute Process</h2>
      <ol>
        <li>Client reviews delivery and requests revisions if needed</li>
        <li>If unsatisfied after revisions, client opens a dispute</li>
        <li>Both parties submit evidence through the platform</li>
        <li>Admin reviews the case and makes a final decision</li>
        <li>Payment is released or refunded based on the decision</li>
      </ol>

      <h2>Work Agreement</h2>
      <p>
        Before every project, both parties must accept a work agreement covering
        scope, price, delivery date, revision count, deliverables, rights, terms,
        payment method, and support policy. This agreement becomes the project
        contract.
      </p>
    </div>
  );
}
