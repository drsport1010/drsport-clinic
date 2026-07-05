import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin.html"],
    },
    sitemap: "https://www.drsport.co.il/sitemap.xml",
  };
}
