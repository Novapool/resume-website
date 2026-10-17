// src/app/layout.tsx
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import "../styles/animations.css"; // Import our animation styles
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PAGES } from "@/data/pages";
import { SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Space Navigator landing page typography
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Fallbacks only (the 404 uses them). Each route sets its own title,
// description, canonical and OG fields via pageMetadata() in src/lib/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGES.home.title,
  description: PAGES.home.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
