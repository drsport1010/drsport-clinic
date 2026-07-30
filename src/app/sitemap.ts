import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { getServerContent } from "@/lib/serverContent";

const BASE = "https://www.drsport.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const customArticles = getServerContent().articles || [];
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/about`, priority: 0.8 },
    { url: `${BASE}/blog/weekly`, priority: 0.8 },
    { url: `${BASE}/shop`, priority: 0.7 },
    ...(() => {
      // Panel-managed articles override built-ins; drafts stay unlisted.
      const slugs = new Set(articles.map((article) => article.slug));
      for (const a of customArticles) {
        if (a.published === false) slugs.delete(a.slug);
        else slugs.add(a.slug);
      }
      return [...slugs].map((slug) => ({
        url: `${BASE}/blog/${slug}`,
        priority: 0.6,
      }));
    })(),
  ];
}
