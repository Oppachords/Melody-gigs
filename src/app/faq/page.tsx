import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about MelodyGigs.",
};

const faqs = [
  {
    q: "How does escrow payment work?",
    a: "When you hire a creator, your payment is held securely in escrow. Once you approve the delivery, the creator confirms completion, and after admin review, payment is released minus a 5% platform commission.",
  },
  {
    q: "What happens if I'm not satisfied with the work?",
    a: "You can request revisions based on your project agreement. If issues persist, you can open a dispute. Note: payments made outside the platform are not covered by our dispute policy.",
  },
  {
    q: "How do subscription plans work?",
    a: "Creators can choose Free, Professional ($30/year), or Unlimited ($50/year) plans. Higher tiers offer more adverts, better visibility, and premium features.",
  },
  {
    q: "Can I hire a creator directly without posting a gig?",
    a: "Yes! Browse creators, view their profiles and portfolios, chat with them, and hire directly through the platform.",
  },
  {
    q: "What file formats are supported for deliveries?",
    a: "Deliveries are link-based only — YouTube, Google Drive, Dropbox, SoundCloud, Spotify, OneDrive, and similar services. No large file uploads on the platform.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold text-center">Frequently Asked Questions</h1>
      <p className="mt-4 text-center text-muted-foreground">
        Everything you need to know about MelodyGigs
      </p>

      <div className="mt-12">
        {faqs.map((faq, i) => (
          <details key={i} className="group border-b py-4">
            <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
              {faq.q}
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
