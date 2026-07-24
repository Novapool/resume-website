// src/components/hud/HudPage.tsx
// Shared chrome for every non-landing page: the nav-computer frame (corner
// brackets, top bar, HUD grid, vignette, waypoint rail, telemetry strip) plus
// the immersive planet surface you've landed on.
//
// Pass a `planet` to land on that world; omit it for a neutral cyan HUD page.
"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { PLANETS, nextPlanet, waypointNo, type Planet } from "@/lib/planets";
import "./hud.css";

const CORNERS = ["tl", "tr", "bl", "br"] as const;

const ACCENT = { color: "#57e6c4", rgb: "87,230,196" };

function WaypointPill({
  planet,
  active,
  compact,
}: {
  planet: Planet;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={planet.href}
      className={`hud-pill${active ? " hud-pill-on" : ""}`}
      aria-current={active ? "page" : undefined}
      style={
        active
          ? ({
              "--planet": planet.color,
              "--planet-rgb": planet.colorRgb,
            } as CSSProperties)
          : undefined
      }
    >
      <span>
        <span className="hud-pill-index">{waypointNo(planet)}</span>
        &nbsp;&nbsp;
        {compact ? planet.label : planet.name}
      </span>
      <span className="hud-tick" />
    </Link>
  );
}

export interface HudPageProps {
  /** World this page has landed on. Omit for the neutral system view. */
  planet?: Planet;
  /** Overrides the top-bar sub-label (defaults to the sector readout). */
  subLabel?: string;
  children: ReactNode;
}

export default function HudPage({ planet, subLabel, children }: HudPageProps) {
  const fillRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef(false);

  // Scroll-position readout, mirroring the landing's ROUTE progress line.
  useEffect(() => {
    const paint = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const prog = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fillRef.current)
        fillRef.current.style.width = `${(prog * 100).toFixed(1)}%`;
    };
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        tickingRef.current = false;
        paint();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paint();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const theme = planet
    ? { color: planet.color, rgb: planet.colorRgb }
    : ACCENT;
  const hero = planet?.hero;
  const upNext = planet ? nextPlanet(planet) : PLANETS[0];

  const sector = planet
    ? `SECTOR ${waypointNo(planet)} · ${planet.name} · ${planet.worldClass}`
    : "SYSTEM OVERVIEW · CS / 2027 · MICHIGAN STATE";

  return (
    <div
      className="hud-root"
      style={
        {
          "--planet": theme.color,
          "--planet-rgb": theme.rgb,
        } as CSSProperties
      }
    >
      {/* ═══ SCENE — the world you've landed on ═══ */}
      <div className="hud-scene" aria-hidden>
        <div className="hud-stars" />
        {hero?.sky?.map((layer, i) => (
          <div key={i} style={{ position: "absolute", ...layer }} />
        ))}
        {hero && <div className="hud-wash" style={{ background: hero.wash }} />}

        {hero && (
          <>
            <div
              className="hud-limb"
              style={{ top: `${hero.horizon}vh`, ...hero.limb }}
            >
              {hero.limbGlow && (
                <div style={{ position: "absolute", inset: 0, ...hero.limbGlow }} />
              )}
            </div>
            <div
              className="hud-limb-rim"
              style={{ top: `${hero.horizon}vh`, ...hero.rim }}
            />
          </>
        )}

        <div className="hud-grid" />
        <div className="hud-vignette" />
      </div>

      {/* ═══ HUD ═══ */}
      <div className="hud-corners" aria-hidden>
        {CORNERS.map((c) => (
          <div key={c} className={`hud-corner hud-corner-${c}`} />
        ))}
      </div>

      <header className="hud-topbar">
        <div className="hud-ident">
          <span className="hud-diamond" aria-hidden />
          <div>
            <div className="hud-ident-name">LAITH ASSAF</div>
            <div className="hud-ident-sub">{subLabel ?? sector}</div>
          </div>
        </div>
        <div className="hud-topright">
          <Link href="/" className="hud-pill">
            ◂&nbsp;<span className="hud-return-long">RETURN TO&nbsp;</span>NAV
          </Link>
          <a
            className="hud-dossier"
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            ◈ DOSSIER
          </a>
        </div>
      </header>

      <nav className="hud-rail" aria-label="Waypoints">
        {PLANETS.map((p) => (
          <WaypointPill key={p.id} planet={p} active={p.id === planet?.id} />
        ))}
      </nav>

      <main className="hud-content">
        {children}

        <nav className="hud-rail-inline" aria-label="Waypoints">
          {PLANETS.map((p) => (
            <WaypointPill
              key={p.id}
              planet={p}
              active={p.id === planet?.id}
              compact
            />
          ))}
        </nav>
      </main>

      {/* ═══ TELEMETRY ═══ */}
      <div className="hud-bottom">
        <div className="hud-telemetry">
          <div className="hud-telemetry-bar">
            <div>
              <div className="hud-readout-label">WAYPOINT</div>
              <div className="hud-readout-value hud-accented">
                {planet ? `${waypointNo(planet)} / 04` : "— / 04"}
              </div>
            </div>
            <div className="hud-divider" />
            <div>
              <div className="hud-readout-label">STATUS</div>
              <div className="hud-readout-value">
                {planet ? "DOCKED" : "IN ORBIT"}
              </div>
            </div>
            <div className="hud-divider" />
            <div>
              <div className="hud-readout-label">NEXT</div>
              <div className="hud-readout-value">
                <Link href={upNext.href} className="hud-link">
                  {upNext.name} ▸
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hud-scrolltrack">
          <div ref={fillRef} className="hud-scrollfill" />
        </div>
      </div>
    </div>
  );
}
