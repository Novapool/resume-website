// src/app/not-found.tsx
// Any unknown route: stay inside the nav computer instead of dropping the
// visitor onto Next's default white page.
import Link from "next/link";
import HudPage from "@/components/hud/HudPage";

export const metadata = {
  title: "Off the chart | Laith Assaf",
};

export default function NotFound() {
  return (
    <HudPage subLabel="OFF THE CHART · NO PAGE HERE" endcap={false}>
      <header className="hud-hero">
        <h1 className="hud-hero-title">Off the chart</h1>
        <div className="hud-hero-teaser">
          Error 404: nothing is charted at this address. The link may be old
          or mistyped.
          Start from home, or see every section on one page.
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          <Link href="/" className="hud-btn hud-btn-solid">
            HOME
          </Link>
          <Link href="/overview" className="hud-btn">
            SEE EVERY SECTION
          </Link>
        </div>
      </header>
    </HudPage>
  );
}
