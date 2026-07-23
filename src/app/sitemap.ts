import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const routes = [
    "",
    "/search",
    "/gigs",
    "/categories",
    "/pricing",
    "/blog",
    "/faq",
    "/about",
    "/login",
    "/become-creator",
    "/terms",
    "/privacy",
    "/dispute-policy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
