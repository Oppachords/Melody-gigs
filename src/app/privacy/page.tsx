import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: July 2026</p>

      <h2>Information We Collect</h2>
      <p>
        We collect information you provide through Google OAuth (name, email,
        profile picture), profile data, project communications, and payment
        information processed through Pandora Systems.
      </p>

      <h2>How We Use Your Information</h2>
      <p>
        We use your information to provide platform services, process payments,
        send notifications, improve our platform, and comply with legal
        obligations.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement encrypted sessions, server-side validation, role-based
        permissions, and audit logging to protect your data.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use Google (authentication), UploadThing (profile images), Pandora
        Systems (payments), and Google AdSense (advertising). Each service has
        its own privacy policy.
      </p>
    </div>
  );
}
