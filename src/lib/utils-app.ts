export type MediaPlatform =
  | "youtube"
  | "spotify"
  | "soundcloud"
  | "audiomack"
  | "apple_music"
  | "instagram"
  | "tiktok"
  | "website";

export interface ParsedMedia {
  platform: MediaPlatform;
  embedUrl?: string;
  thumbnailUrl?: string;
  originalUrl: string;
}

export function detectMediaPlatform(url: string): MediaPlatform {
  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("spotify.com")) return "spotify";
  if (lower.includes("soundcloud.com")) return "soundcloud";
  if (lower.includes("audiomack.com")) return "audiomack";
  if (lower.includes("music.apple.com")) return "apple_music";
  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("tiktok.com")) return "tiktok";
  return "website";
}

export function parseMediaUrl(url: string): ParsedMedia {
  const platform = detectMediaPlatform(url);
  const originalUrl = url;

  switch (platform) {
    case "youtube": {
      const videoId = extractYouTubeId(url);
      return {
        platform,
        originalUrl,
        embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : undefined,
        thumbnailUrl: videoId
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : undefined,
      };
    }
    case "spotify": {
      const embedUrl = url.replace(
        "open.spotify.com",
        "open.spotify.com/embed"
      );
      return { platform, originalUrl, embedUrl };
    }
    case "soundcloud": {
      return {
        platform,
        originalUrl,
        embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%234E2EF0&auto_play=false&hide_related=true`,
      };
    }
    default:
      return { platform, originalUrl };
  }
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getSubscriptionBadge(plan: string): {
  label: string;
  variant: "default" | "secondary" | "outline";
} {
  switch (plan) {
    case "UNLIMITED":
      return { label: "Premium", variant: "default" };
    case "PROFESSIONAL":
      return { label: "Pro", variant: "secondary" };
    default:
      return { label: "Free", variant: "outline" };
  }
}

export function getAdPriorityScore(
  plan: string,
  isFeatured: boolean,
  rating: number,
  createdAt: Date
): number {
  let score = 0;
  if (isFeatured) score += 1000;
  if (plan === "UNLIMITED") score += 500;
  else if (plan === "PROFESSIONAL") score += 300;
  else score += 100;
  score += rating * 10;
  score += new Date(createdAt).getTime() / 1e10;
  return score;
}
