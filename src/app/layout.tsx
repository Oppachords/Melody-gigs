import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteLayout } from "@/components/layout/site-layout";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${APP_NAME} — Music & Creative Professionals Marketplace`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "music marketplace",
    "freelance musicians",
    "music producers",
    "mixing engineer",
    "Afrobeat",
    "creative services",
    "escrow payments",
  ],
  authors: [{ name: APP_NAME }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: APP_NAME,
    title: `${APP_NAME} — Music & Creative Professionals Marketplace`,
    description: APP_DESCRIPTION,
    images: [{ url: "/logo.png", width: 754, height: 754, alt: APP_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: APP_NAME,
              description: APP_DESCRIPTION,
              url: process.env.NEXT_PUBLIC_APP_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
