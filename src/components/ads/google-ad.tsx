"use client";

import Script from "next/script";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function GoogleAd({
  slot,
  format = "auto",
  className = "",
}: GoogleAdProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

  if (!clientId) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 bg-muted/30 p-8 text-sm text-muted-foreground ${className}`}
      >
        Ad Space — Configure NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT
      </div>
    );
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <ins
        className={`adsbygoogle block ${className}`}
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </>
  );
}

export function AdBanner({ className }: { className?: string }) {
  return (
    <GoogleAd slot="1234567890" format="horizontal" className={className} />
  );
}

export function AdSidebar({ className }: { className?: string }) {
  return (
    <GoogleAd slot="0987654321" format="vertical" className={className} />
  );
}
