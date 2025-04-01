// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "My Resume Website",
  description: "Personal resume and portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LoadingManager>
            <Navbar />
            {children}
          </LoadingManager>
        </ThemeProvider>
      </body>
    </html>
  );
}