// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import "../styles/animations.css"; // Import our animation styles
import Navbar from "@/components/site/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
// Import from the index file instead of directly
import { LoadingManager } from "@/components/loaders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laith Assaf | AI/ML Software Engineer",
  description: "Portfolio of Laith Assaf — AI/ML Computer Science student at Michigan State University, MHacks 2025 winner, and builder of real-time AI systems and open-source developer tooling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Starfield background */}
          <div className="starfield">
            <div className="stars-small" />
            <div className="stars-medium" />
            <div className="stars-large" />
          </div>
          <LoadingManager>
            <Navbar />
            {children}
          </LoadingManager>
        </ThemeProvider>
      </body>
    </html>
  );
}