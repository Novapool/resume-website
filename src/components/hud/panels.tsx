// src/components/hud/panels.tsx
// Dossier-panel primitives shared by every section page. These are the same
// translucent, thin-bordered, mono-labelled surfaces the landing page uses for
// its target card and telemetry strip.

import type { ReactNode } from "react";
import PlanetBody from "./PlanetBody";
import { waypointNo, type Planet } from "@/lib/planets";
import "./hud.css";

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`hud-panel ${className}`.trim()}>{children}</div>;
}

/** Panel with a mono label across the top, e.g. `// WORKING STYLE`. */
export function LabeledPanel({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Panel>
      <div className="hud-panel-head">
        <span className="hud-label">{label}</span>
        {meta}
      </div>
      {children}
    </Panel>
  );
}

/** A titled content block with a hairline rule, used to break up a page. */
export function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="hud-section">
      <div className="hud-section-head">
        <span className="hud-label">{label}</span>
        <h2 className="hud-h2">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="hud-tags">
      {items.map((item) => (
        <span key={item} className="hud-tag">
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * "You have landed" header: the waypoint readout, the page title, and a small
 * rendition of the same planet the visitor just flew to.
 */
export function LandingHeader({
  planet,
  title,
  intro,
}: {
  planet: Planet;
  title: string;
  intro: ReactNode;
}) {
  return (
    <header className="hud-hero">
      <div className="hud-hero-row">
        <div className="hud-hero-planet" aria-hidden>
          <PlanetBody planet={planet} backdrop={false} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="hud-eyebrow">
            <span className="hud-dot" />
            {`WAYPOINT ${waypointNo(planet)} · ${planet.worldClass}`}
          </div>
          <h1 className="hud-hero-title">{title}</h1>
        </div>
      </div>
      <div className="hud-hero-teaser">{intro}</div>
    </header>
  );
}
