// src/app/(site)/layout.tsx
// Chrome for the section pages. Each page renders its own nav-computer HUD via
// `HudPage`, so this layout is intentionally thin — the "/" landing (Space
// Navigator) sits outside this route group entirely.
//
// The terminal boot sequence (`src/components/loaders/`) is kept in the repo
// but no longer mounted: it's a green-CRT aesthetic that clashes with the HUD,
// and it delayed every deep link by ~6s. Re-mount `LoadingManager` here to
// bring it back.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
