// src/components/site/lost-path.tsx
// The 404's readout: the address the visitor actually asked for, so a typo
// in a forwarded link is visible at a glance.
"use client";

import { usePathname } from "next/navigation";

export default function LostPath() {
  const path = usePathname();
  if (!path) return null;
  return (
    <p className="hud-label hud-lost-path">
      No chart for <span className="hud-lost-path-url">{path}</span>
    </p>
  );
}
