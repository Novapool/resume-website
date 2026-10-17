import type { MetadataRoute } from "next";
import { PAGES } from "@/data/pages";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(PAGES).map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    priority: page.path === "/" ? 1 : 0.8,
  }));
}
