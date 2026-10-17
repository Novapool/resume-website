// src/components/hud/panels.tsx
// Page primitives shared by every section page. On a world page each surface
// takes that world's material (see the `[data-world]` rules in hud.css), and
// every Section is a band on the descent, hanging off the altitude rule.

import type { CSSProperties, ReactNode } from "react";
import PlanetBody from "./PlanetBody";
import type { Planet } from "@/lib/planets";
import "./hud.css";

export function Panel({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`hud-panel ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

/** Acronyms that stay in caps when a label is sentence-cased. */
const ACRONYMS = new Set(["AI", "ML", "IT", "LLM", "RL", "MSU"]);

/** Data labels are stored in caps; panel titles read in sentence case. */
export const sentence = (text: string) =>
  text
    .split(" ")
    .map((word, i) =>
      ACRONYMS.has(word)
        ? word
        : i === 0
          ? word.charAt(0) + word.slice(1).toLowerCase()
          : word.toLowerCase(),
    )
    .join(" ");

/** Panel titled by its own heading, with optional trailing meta (a date). */
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
        <h3 className="hud-h3">{label}</h3>
        {meta}
      </div>
      {children}
    </Panel>
  );
}

/** The one disclosure/direction mark: a 1.5px stroked chevron. */
export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`hud-chevron ${className}`.trim()}
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden
    >
      <path
        d="M4 2.5 7.5 6 4 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A band of the page. With a `zone` it is a stop on the descent: the zone
 * name sits on the altitude rule beside the heading. The km lives only in
 * HudPage's sticky readout, so the page never shows two altitudes at once.
 */
export function Section({
  zone,
  title,
  deck = false,
  children,
}: {
  zone?: string;
  title: string;
  /** Paint this band as a visible stratum of the world's air. */
  deck?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`hud-band${deck ? " hud-deck" : ""}`} data-zone={zone}>
      {zone && (
        <div className="hud-band-mark" aria-hidden>
          <span className="hud-band-zone">{zone}</span>
        </div>
      )}
      <div className="hud-band-body">
        <h2 className="hud-h2">{title}</h2>
        {children}
      </div>
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

/** One headline number with its caption, e.g. 93% / RL agent win rate. */
export interface Proof {
  value: string;
  label: string;
}

/**
 * Orbit: the top of the descent. The world below (a small rendition of the
 * planet the visitor just docked at), the title, one line of who, and the
 * page's headline proof.
 */
export function Orbit({
  planet,
  title,
  intro,
  proof,
  children,
}: {
  planet: Planet;
  title: string;
  intro: ReactNode;
  proof?: Proof[];
  children?: ReactNode;
}) {
  return (
    <header className="hud-orbit">
      <div className="hud-orbit-row">
        <div className="hud-orbit-planet" aria-hidden>
          <PlanetBody planet={planet} backdrop={false} />
        </div>
        <h1 className="hud-hero-title">{title}</h1>
      </div>
      <p className="hud-orbit-intro">{intro}</p>
      {proof && (
        <dl className="hud-proof">
          {proof.map((p) => (
            <div key={p.label}>
              <dt className="hud-label">{p.label}</dt>
              <dd className="hud-proof-value">{p.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </header>
  );
}
