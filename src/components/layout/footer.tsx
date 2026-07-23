import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

const footerLinks = {
  Platform: [
    { href: "/search", label: "Find Creators" },
    { href: "/gigs", label: "Browse Gigs" },
    { href: "/categories", label: "Categories" },
    { href: "/pricing", label: "Pricing" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/dispute-policy", label: "Dispute Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt={APP_NAME} width={32} height={32} />
              <span className="text-lg font-bold">
                Melody<span className="text-primary">Gigs</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The premier marketplace connecting music professionals, creative
              artists, and clients across Africa and worldwide.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Secure payments powered by Pandora Systems
          </p>
        </div>
      </div>
    </footer>
  );
}
