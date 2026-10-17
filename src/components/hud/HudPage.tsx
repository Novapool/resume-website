// src/components/hud/HudPage.tsx
// Shared frame for every non-landing page. On a world page it is a descent:
// the page opens in orbit, scrolls down through that world's air past an
// altitude rule, and lands on the planet's horizon, from where the visitor
// launches to the next world. Everything world-specific (air, altitude, sky,
// ground) comes from `planets.ts`.
//
// Pass a `planet` to descend onto that world; omit it for a neutral cyan page
// (the overview and the 404), which gets the frame without the descent.
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PLANETS, nextPlanet, waypointNo, type Planet } from "@/lib/planets";
import { PROFILE } from "@/data/profile";
import { Chevron } from "./panels";
import "./hud.css";

const ACCENT = { color: "#57e6c4", rgb: "87,230,196" };

/** Where a band counts as "reached": just under the fixed top bar. */
const REACH = 160;

function WaypointPill({
  planet,
  active,
}: {
  planet: Planet;
  active: boolean;
}) {
  const body = (
    <>
      <span>
        <span className="hud-pill-index">{waypointNo(planet)}&nbsp;&nbsp;</span>
        <span className="hud-pill-name">{planet.name}</span>
        <span className="hud-pill-label">{planet.label}</span>
      </span>
      <span className="hud-tick" />
    </>
  );

  // the world you're standing on is a position marker, not a nav target
  if (active)
    return (
      <span
        className="hud-pill hud-pill-on"
        aria-current="page"
        style={
          {
            "--planet": planet.color,
            "--planet-rgb": planet.colorRgb,
          } as CSSProperties
        }
      >
        {body}
      </span>
    );

  return (
    <Link href={planet.href} className="hud-pill">
      {body}
    </Link>
  );
}

export interface HudPageProps {
  /** World this page descends onto. Omit for the neutral system view. */
  planet?: Planet;
  /** Overrides the top-bar sub-label (defaults to the sector readout). */
  subLabel?: string;
  /** Show the end-of-page exit (off for the 404). */
  endcap?: boolean;
  children: ReactNode;
}

export default function HudPage({
  planet,
  subLabel,
  endcap = true,
  children,
}: HudPageProps) {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const altRef = useRef<HTMLSpanElement | null>(null);
  const zoneRef = useRef<HTMLSpanElement | null>(null);
  const readoutRef = useRef<HTMLDivElement | null>(null);
  const [launching, setLaunching] = useState(false);

  const theme = planet
    ? { color: planet.color, rgb: planet.colorRgb }
    : ACCENT;
  const hero = planet?.hero;
  const upNext = planet ? nextPlanet(planet) : PLANETS[0];
  // the last world ends the route: its touchdown signs off instead of
  // looping the visitor back to the first world
  const lastStop = planet?.index === PLANETS.length - 1;
  const altitude = planet?.descent.altitude ?? 0;

  const sector = planet
    ? `WAYPOINT ${waypointNo(planet)} / 0${PLANETS.length} · ${planet.worldClass}`
    : "SYSTEM OVERVIEW · CS / 2027 · MICHIGAN STATE";

  // The descent loop: one rAF-throttled scroll handler drives the altitude
  // readout, the current zone name, and the sky drifting up out of view.
  useEffect(() => {
    if (!planet) return;
    let bands: { el: HTMLElement; top: number; zone: string }[] = [];
    let max = 1;
    let ticking = false;

    const km = (y: number) =>
      Math.round(altitude * (1 - Math.min(1, Math.max(0, y / max))));

    // Bands are measured once (and on resize). Their marks carry only the
    // zone name: the readout is the one altitude on the page.
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      bands = Array.from(
        document.querySelectorAll<HTMLElement>("[data-zone]"),
      ).map((el) => {
        const top = el.getBoundingClientRect().top + window.scrollY - REACH;
        return { el, top, zone: el.dataset.zone ?? "" };
      });
    };

    const paint = () => {
      const y = window.scrollY;
      const prog = Math.min(1, Math.max(0, y / max));
      sceneRef.current?.style.setProperty("--descent", prog.toFixed(3));
      if (altRef.current) altRef.current.textContent = String(km(y));
      // at touchdown the ground's own "0 KM" takes over from the readout
      readoutRef.current?.toggleAttribute("data-landed", prog > 0.96);
      // a reached band's mark hands over to the readout instead of
      // sliding underneath it
      let zone = "ORBIT";
      for (const b of bands) {
        const reached = b.top <= y + 60;
        if (b.top <= y) zone = b.zone;
        if (reached !== b.el.hasAttribute("data-reached"))
          b.el.toggleAttribute("data-reached", reached);
      }
      if (zoneRef.current) zoneRef.current.textContent = zone;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        paint();
      });
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // fonts and images change the page height after first paint
    const late = window.setTimeout(onResize, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(late);
    };
  }, [planet, altitude]);

  // a fresh world never inherits the previous page's launch overlay
  useEffect(() => setLaunching(false), [planet?.id]);

  // Launch to the next world with the landing's docking fade. The fade is
  // opacity only, so it stays under reduced motion (just shorter); keyboard
  // activation (detail 0) and new-tab clicks go straight there.
  const launch = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.detail === 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (launching) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLaunching(true);
    window.setTimeout(() => router.push(upNext.href), reduced ? 380 : 650);
  };

  return (
    <div
      className="hud-root"
      data-world={planet?.id ?? "system"}
      style={
        {
          "--planet": theme.color,
          "--planet-rgb": theme.rgb,
          background: planet?.descent.air,
        } as CSSProperties
      }
    >
      {/* ═══ SKY — fixed, drifting up and away as the visitor descends ═══ */}
      <div ref={sceneRef} className="hud-scene" aria-hidden>
        <div className="hud-stars" />
        {hero && (
          <div className="hud-sky-drift">
            {hero.sky?.map((layer, i) => (
              <div
                key={i}
                className={`hud-sky hud-sky-${planet?.id}`}
                style={{ position: "absolute", ...layer }}
              />
            ))}
            <div className="hud-wash" style={{ background: hero.wash }} />
          </div>
        )}
      </div>

      <a className="hud-skip" href="#content">
        Skip to content
      </a>

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
            HOME
          </Link>
          <a
            className="hud-dossier"
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            RÉSUMÉ
          </a>
        </div>

        {/* desktop: fixed rail on the right; below 980px: a strip under the bar */}
        <nav className="hud-rail" aria-label="Waypoints">
          {PLANETS.map((p) => (
            <WaypointPill key={p.id} planet={p} active={p.id === planet?.id} />
          ))}
        </nav>
      </header>

      <main
        id="content"
        tabIndex={-1}
        className={`hud-content${planet ? " hud-descent" : ""}`}
      >
        {planet && (
          // the altitude rule every band hangs off, with a sticky readout
          <div className="hud-axis" aria-hidden>
            <div ref={readoutRef} className="hud-readout">
              <span className="hud-readout-alt">
                ALT <span ref={altRef}>{altitude}</span> KM
              </span>
              <span ref={zoneRef} className="hud-readout-zone">
                ORBIT
              </span>
            </div>
          </div>
        )}

        {children}

        {endcap && !planet && (
          <footer className="hud-endcap">
            <div className="hud-endcap-line" aria-hidden />
            <Link href={upNext.href} className="hud-endcap-next">
              <span className="hud-endcap-name">
                Open {upNext.label}
                <Chevron />
              </span>
            </Link>
          </footer>
        )}
      </main>

      {planet && hero && (
        // ═══ TOUCHDOWN — the planet's horizon is the ground the page lands on
        <section className="hud-ground" aria-label={`Touchdown on ${planet.label}`}>
          <div className="hud-limb" style={hero.limb}>
            {hero.limbGlow && (
              <div style={{ position: "absolute", inset: 0, ...hero.limbGlow }} />
            )}
          </div>
          <div className="hud-limb-rim" style={hero.rim} />
          {endcap && lastStop && (
            <div className="hud-panel hud-arrival">
              <a className="hud-launch-link" href={`mailto:${PROFILE.email}`}>
                <span className="hud-launch-name">
                  Write to me
                  <Chevron />
                </span>
              </a>
              <p className="hud-arrival-teaser">
                That&apos;s all four worlds. If any of it is useful to your
                team, {PROFILE.email} reaches me directly.
              </p>
              <div className="hud-ground-mark">
                Landed on {planet.label} · 0 km · end of route
              </div>
              <div className="hud-arrival-alts">
                <Link href="/" className="hud-arrival-alt">
                  Back to the start
                </Link>
                <Link href="/overview" className="hud-arrival-alt">
                  Every section on one page
                </Link>
              </div>
            </div>
          )}
          {endcap && !lastStop && (
            // the way on is drawn in the next world's own material, so the
            // last thing on the page is a first look at the next one
            <div
              className="hud-panel hud-arrival"
              data-world={upNext.id}
              style={
                {
                  "--planet": upNext.color,
                  "--planet-rgb": upNext.colorRgb,
                } as CSSProperties
              }
            >
              <Link href={upNext.href} className="hud-launch-link" onClick={launch}>
                <span className="hud-launch-name">
                  Next: {upNext.label}
                  <Chevron />
                </span>
              </Link>
              <p className="hud-arrival-teaser">{upNext.teaser}</p>
              <div className="hud-ground-mark">
                Landed on {planet.label} · 0 km
              </div>
              <Link href="/overview" className="hud-arrival-alt">
                Every section on one page
              </Link>
            </div>
          )}
        </section>
      )}

      {/* docking fade on launch, tinted to the destination */}
      <div
        className={`hud-launch${launching ? " hud-launch-on" : ""}`}
        style={{ "--to": upNext.color } as CSSProperties}
        aria-hidden
      />
    </div>
  );
}
