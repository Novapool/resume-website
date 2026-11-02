// src/app/not-found.tsx
// Any unknown route: stay inside the nav computer instead of dropping the
// visitor onto Next's default white page.
import HudPage from "@/components/hud/HudPage";
import LostPath from "@/components/site/lost-path";

export const metadata = {
  title: "Off the chart | Laith Assaf",
};

export default function NotFound() {
  return (
    <HudPage subLabel="OFF THE CHART · NO PAGE HERE">
      <header className="hud-hero">
        <h1 className="hud-hero-title">Off the chart</h1>
        <p className="hud-hero-teaser">
          Error 404: nothing is charted at this address. The link may be old
          or mistyped.
        </p>
        {/* under the explanation, not above the heading: a readout, not a
            kicker; then the recovery, led by the world it most likely meant */}
        <LostPath />
      </header>
    </HudPage>
  );
}
