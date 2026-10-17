// src/lib/seo.ts
// Builds each route's <head> metadata from src/data/pages.ts. The OG image
// itself comes from the route's opengraph-image.tsx (see src/lib/og.tsx).
import type { Metadata } from "next";
import { PAGES, type PageKey } from "@/data/pages";
import { PROFILE } from "@/data/profile";

/** Production origin. Swap here if the site moves to a custom domain. */
export const SITE_URL = "https://resume-website-eight-psi.vercel.app";

export function pageMetadata(key: PageKey): Metadata {
  const page = PAGES[key];
  // Home's title is already the full brand line; the rest take the suffix.
  const fullTitle =
    key === "home" ? page.title : `${page.title} | ${PROFILE.name}`;
  return {
    title: { absolute: fullTitle },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: key === "home" ? "profile" : "website",
      siteName: PROFILE.name,
      locale: "en_US",
      url: page.path,
      title: fullTitle,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
    },
  };
}
