import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { getServerContent } from "@/lib/serverContent";

const BASE = "https://www.drsport.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const customArticles = getServerContent().articles || [];
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/about`, priority: 0.8 },
    { url: `${BASE}/shop`, priority: 0.7 },
    ...articles.map((article) => ({
      url: `${BASE}/blog/${article.slug}`,
      priority: 0.6,
    })),
    ...customArticles.map((article) => ({
      url: `${BASE}/blog/${article.slug}`,
      priority: 0.6,
    })),
  ];
}
