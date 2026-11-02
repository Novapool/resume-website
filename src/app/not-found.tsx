// src/app/not-found.tsx
// Any unknown route: stay inside the nav computer instead of dropping the
// visitor onto Next's default white page.
import Link from "next/link";
import HudPage from "@/components/hud/HudPage";
import LostPath from "@/components/site/lost-path";

export const metadata = {
  title: "Off the chart | Laith Assaf",
};

export default function NotFound() {
  return (
    <HudPage subLabel="OFF THE CHART · NO PAGE HERE" endcap={false}>
      <header className="hud-hero">
        <LostPath />
        <h1 className="hud-hero-title">Off the chart</h1>
        <p className="hud-hero-teaser">
          Error 404: nothing is charted at this address. The link may be old
          or mistyped. Start from the projects, or see every section on one
          page.
        </p>
        {/* Home is already in the bar, so the body offers the two places a
            stale link most likely meant */}
        <div className="hud-hero-actions">
          <Link href="/projects" className="hud-btn hud-btn-solid">
            SEE THE PROJECTS
          </Link>
          <Link href="/overview" className="hud-btn">
            EVERY SECTION ON ONE PAGE
          </Link>
        </div>
      </header>
    </HudPage>
  );
}
