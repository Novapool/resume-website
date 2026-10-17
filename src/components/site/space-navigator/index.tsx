// src/components/site/space-navigator/index.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Starfield from "./Starfield";
import type { StarfieldHandle } from "./Starfield";
import PlanetBody from "@/components/hud/PlanetBody";
import { Chevron } from "@/components/hud/panels";
import { PLANETS } from "@/lib/planets";
import { PROFILE } from "@/data/profile";
import { ACCENT, CAM_Z_MAX, FOCAL, FOCUS_Z } from "./constants";
import "./space-navigator.css";

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

/** Per-frame projection of one planet into screen space. */
interface Projected {
  index: number;
  sx: number;
  sy: number;
  relZ: number;
  scale: number;
  opacity: number;
}

const CORNERS = ["tl", "tr", "bl", "br"] as const;

/** Quadratic smoothing through segment midpoints. */
function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    d += ` Q ${a.x.toFixed(1)} ${a.y.toFixed(1)} ${((a.x + b.x) / 2).toFixed(1)} ${((a.y + b.y) / 2).toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  return d;
}

/**
 * Scroll-driven flythrough landing page: a fixed "flight stage" where scroll
 * dollies a virtual camera forward along z, past four planets that portal into
 * the resume sections.
 */
export default function SpaceNavigator() {
  const router = useRouter();
  const [focused, setFocused] = useState(0);
  const [portal, setPortal] = useState<number | null>(null);

  const starfieldRef = useRef<StarfieldHandle | null>(null);
  const planetRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const routeBgRef = useRef<SVGPathElement | null>(null);
  const routeFgRef = useRef<SVGPathElement | null>(null);
  const progLineRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const pitchRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const routePctRef = useRef<HTMLDivElement | null>(null);

  const focusedRef = useRef(0);
  const reducedRef = useRef(false);
  const lastYRef = useRef(0);
  const vsmRef = useRef(0);
  const tickingRef = useRef(false);
  const portalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frame = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = vw / 2;
    const cy = vh * 0.45;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - vh;
    const prog = max > 0 ? clamp(y / max, 0, 1) : 0;
    const camZ = prog * CAM_Z_MAX;
    const k = clamp(vw / 1300, 0.5, 1.12); // responsive world scale
    // horizontal spread narrows faster than size, so a planet in focus stays
    // inside the viewport on phones and clear of the rail on desktop
    const kx = clamp((vw - 560) / 1000, 0.3, 1.12);

    // smoothed scroll velocity — drives the starfield warp
    const delta = Math.abs(y - lastYRef.current);
    lastYRef.current = y;
    vsmRef.current = vsmRef.current * 0.82 + delta * 0.18;

    if (!reducedRef.current) {
      starfieldRef.current?.setWarp(Math.min(vsmRef.current * 0.0016, 0.09));
    }

    // project each planet through the perspective camera
    const projected: Projected[] = [];
    PLANETS.forEach((wp, i) => {
      const el = planetRefs.current[i];
      const relZ = wp.world.z - camZ;
      const scale = FOCAL / (FOCAL + Math.max(relZ, -(FOCAL - 130)));
      const sx = cx + wp.world.x * kx * scale;
      const sy = cy + wp.world.y * k * scale;

      let opacity: number;
      if (relZ < -70) {
        opacity = 0; // fully behind the camera
      } else {
        opacity = clamp(1 - (relZ - 500) / 4400, 0.28, 1);
        if (relZ < 260) opacity *= clamp((relZ + 70) / 330, 0, 1);
      }

      if (el) {
        // a planet behind the camera is invisible, so it leaves the tab order
        // and the a11y tree; a distant one is still seen and clickable, but
        // too small to take keyboard focus (the rail flies there instead)
        const passed = opacity < 0.02;
        const focusable = !passed && wp.size * scale * k >= 44;
        if (el.getAttribute("aria-hidden") !== String(passed)) {
          el.setAttribute("aria-hidden", String(passed));
        }
        if (el.tabIndex !== (focusable ? 0 : -1)) {
          el.tabIndex = focusable ? 0 : -1;
        }
        el.style.transform = `translate(-50%,-50%) translate(${(sx - cx).toFixed(1)}px, ${(sy - vh / 2).toFixed(1)}px) scale(${(scale * k).toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(
          Math.round(clamp((3400 - relZ) / 3400, 0, 1) * 12) + 6,
        );
      }
      projected.push({ index: i, sx, sy, relZ, scale: scale * k, opacity });
    });

    // focused waypoint = closest to focus depth among those not yet passed
    let next = 0;
    let best = Infinity;
    projected.forEach((p) => {
      if (p.relZ < -40) return;
      const d = Math.abs(p.relZ - FOCUS_Z);
      if (d < best) {
        best = d;
        next = p.index;
      }
    });

    // flight route — SVG viewBox space is 1920x1080, stretched to the viewport
    const toViewBox = (p: Projected) => ({
      x: (p.sx / vw) * 1920,
      y: (p.sy / vh) * 1080,
    });
    const nose = { x: 960, y: 972 };
    const visible = projected
      .filter((p) => p.relZ > -70)
      .sort((a, b) => a.relZ - b.relZ);
    routeBgRef.current?.setAttribute(
      "d",
      smoothPath([nose, ...visible.map(toViewBox)]),
    );
    const focusRelZ = projected[next].relZ;
    routeFgRef.current?.setAttribute(
      "d",
      smoothPath([
        nose,
        ...visible.filter((p) => p.relZ <= focusRelZ + 1).map(toViewBox),
      ]),
    );

    // targeting reticle follows the focused planet
    const fp = projected[next];
    if (reticleRef.current) {
      const size = PLANETS[next].size * fp.scale * 1.16;
      reticleRef.current.style.opacity = fp.opacity > 0.35 ? "0.9" : "0";
      reticleRef.current.style.width = `${size.toFixed(0)}px`;
      reticleRef.current.style.height = `${size.toFixed(0)}px`;
      reticleRef.current.style.transform = `translate(${(fp.sx - size / 2).toFixed(1)}px, ${(fp.sy - size / 2).toFixed(1)}px)`;
    }

    if (next !== focusedRef.current) {
      focusedRef.current = next;
      setFocused(next);
    }

    // telemetry
    if (routePctRef.current)
      routePctRef.current.textContent = `${Math.round(prog * 100)}%`;
    if (progLineRef.current)
      progLineRef.current.style.width = `${(prog * 100).toFixed(1)}%`;

    const atRest = prog < 0.015;
    if (introRef.current) introRef.current.style.opacity = atRest ? "1" : "0";
    // the pitch owns the card slot at rest; the target card takes it in flight
    if (pitchRef.current) {
      pitchRef.current.style.opacity = atRest ? "1" : "0";
      pitchRef.current.style.pointerEvents = atRest ? "auto" : "none";
      pitchRef.current.toggleAttribute("inert", !atRest);
    }
    if (targetRef.current) {
      targetRef.current.style.opacity = atRest ? "0" : "1";
      targetRef.current.style.pointerEvents = atRest ? "none" : "auto";
      // hidden at rest, so it must leave the tab order and the a11y tree too
      targetRef.current.toggleAttribute("inert", atRest);
    }
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    lastYRef.current = window.scrollY;

    // The nav computer is the intro sequence now, so portals shouldn't drop
    // the visitor into the terminal loader on the way to a section.
    try {
      sessionStorage.setItem("hasSeenLoading", "true");
    } catch {
      // sessionStorage can be unavailable (private mode); the loader is cosmetic
    }

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        tickingRef.current = false;
        frame();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame();

    // the landing is always dark, regardless of the site theme
    const html = document.documentElement;
    const previousBackground = html.style.background;
    html.style.background = "#06070e";

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      html.style.background = previousBackground;
      if (portalTimer.current) clearTimeout(portalTimer.current);
    };
  }, [frame]);

  const goTo = (index: number) => {
    const prog = clamp((PLANETS[index].world.z - FOCUS_Z) / CAM_Z_MAX, 0, 1);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: prog * max,
      behavior: reducedRef.current ? "auto" : "smooth",
    });
  };

  // `detail === 0` means the click came from the keyboard (Enter), not a
  // pointer: skip the docking animation and go straight to the section.
  const openPortal = (index: number, e?: MouseEvent) => {
    if (e && e.detail === 0) {
      router.push(PLANETS[index].href);
      return;
    }
    if (portalTimer.current) return; // docking already in progress
    setPortal(index);
    portalTimer.current = setTimeout(
      () => router.push(PLANETS[index].href),
      reducedRef.current ? 400 : 1300,
    );
  };

  const active = PLANETS[focused];
  const portalWaypoint = portal === null ? null : PLANETS[portal];

  return (
    <main className="sn-root">
      {/* ═══ HUD — first in DOM so Tab reaches the header before the planets;
          shared classes from components/hud/hud.css ═══ */}
      <div className="hud-corners" aria-hidden>
        {CORNERS.map((c) => (
          <div key={c} className={`hud-corner hud-corner-${c}`} />
        ))}
      </div>

      <header className="hud-topbar hud-topbar-clear">
        <div className="hud-ident">
          <span className="hud-diamond" aria-hidden />
          <div>
            <div className="hud-ident-name">LAITH ASSAF</div>
            <div className="hud-ident-sub">
              NAV-COMPUTER · CS / 2027 · MICHIGAN STATE
            </div>
          </div>
        </div>
        <div className="hud-topright">
          <Link href="/overview" className="hud-pill">
            OVERVIEW
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
      </header>

      {/* Pitch — who this is and the proof, before the flight starts. First
          after the header in the DOM so keyboard users reach it before the
          rail and the planets. */}
      <div ref={pitchRef} className="hud-target sn-pitch">
        <h1 className="sn-pitch-name">{PROFILE.name}</h1>
        <p className="sn-pitch-text">{PROFILE.pitch}</p>
        <ul className="sn-pitch-figures">
          {PROFILE.proof.map((p) => (
            <li key={p.label}>
              <b>{p.value}</b> {p.label}
            </li>
          ))}
        </ul>
        <Link href="/projects" className="sn-pitch-more">
          See the projects
          <Chevron />
        </Link>
        <div className="sn-pitch-hint" aria-hidden>
          Scroll to fly the route
          <Chevron className="hud-chevron-down" />
        </div>
      </div>

      {/* Waypoint nav — flies the camera, so these are buttons, not links */}
      <nav className="hud-rail sn-rail" aria-label="Waypoints">
        {PLANETS.map((wp, i) => {
          const on = i === focused;
          return (
            <button
              key={wp.name}
              type="button"
              className={`hud-pill${on ? " hud-pill-on" : ""}`}
              aria-label={`Fly to ${wp.label}`}
              aria-current={on ? "location" : undefined}
              onClick={() => goTo(i)}
            >
              <span>
                <span className="hud-pill-index">{`0${i + 1}`}&nbsp;&nbsp;</span>
                {wp.name}
              </span>
              <span className="hud-tick" />
            </button>
          );
        })}
      </nav>

      {/* ═══ FIXED FLIGHT STAGE ═══ */}
      <div className="sn-stage">
        <Starfield ref={starfieldRef} reduced={reducedRef.current} />
        <div className="sn-grid" />
        <div className="sn-vignette" />

        {/* Flight route — recomputed every frame */}
        <svg className="sn-route" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <path
            ref={routeBgRef}
            d=""
            fill="none"
            stroke="rgba(87,230,196,0.16)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={routeFgRef}
            className="sn-route-fg"
            d=""
            fill="none"
            stroke={ACCENT}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Targeting reticle */}
        <div ref={reticleRef} className="sn-reticle">
          {CORNERS.map((c) => (
            <div key={c} className={`sn-reticle-corner sn-reticle-${c}`} />
          ))}
        </div>

        {/* Planets */}
        {PLANETS.map((wp, i) => (
          <Link
            key={wp.name}
            href={wp.href}
            className="sn-planet"
            aria-label={`Open ${wp.label}`}
            onClick={(e) => {
              e.preventDefault();
              openPortal(i, e);
            }}
            ref={(el) => {
              planetRefs.current[i] = el;
            }}
            style={{ width: wp.size, height: wp.size }}
          >
            <PlanetBody planet={wp} />
          </Link>
        ))}
      </div>

      {/* Target card — focused waypoint */}
      {/* the card is about a world, so it takes that world's colour; the
          ship's own chrome around it stays cyan */}
      <div
        ref={targetRef}
        className="hud-target"
        style={
          {
            "--planet": active.color,
            "--planet-rgb": active.colorRgb,
          } as CSSProperties
        }
      >
        <div className="hud-target-title">{active.label}</div>
        <p className="hud-target-teaser">{active.teaser}</p>
        <Link
          href={active.href}
          className="hud-btn hud-btn-solid"
          onClick={(e) => {
            e.preventDefault();
            openPortal(focused, e);
          }}
        >
          OPEN {active.name}
        </Link>
      </div>

      {/* Telemetry */}
      <div className="hud-telemetry">
        <div className="hud-telemetry-bar">
          <div>
            <div className="hud-readout-label">WAYPOINT</div>
            <div className="hud-readout-value hud-accented">{`0${focused + 1} / 04`}</div>
          </div>
          <div className="hud-divider" />
          <div>
            <div className="hud-readout-label">DESTINATION</div>
            <div className="hud-readout-value hud-readout-display">{active.name}</div>
          </div>
          <div className="hud-divider" />
          <div>
            <div className="hud-readout-label">ROUTE</div>
            <div ref={routePctRef} className="hud-readout-value">
              0%
            </div>
          </div>
        </div>
        <div className="hud-scrolltrack">
          <div ref={progLineRef} className="hud-scrollfill" />
        </div>
      </div>

      {/* Intro prompt */}
      <div ref={introRef} className="sn-intro">
        <div className="sn-intro-text">SCROLL TO FLY THE ROUTE</div>
        <div className="sn-intro-chevron" aria-hidden>
          <Chevron className="hud-chevron-down" />
        </div>
      </div>

      {/* Portal overlay — docking sequence, then routes to the section */}
      <div
        className={`sn-portal${portalWaypoint ? " sn-portal-on" : ""}`}
        style={
          portalWaypoint
            ? {
                background: `radial-gradient(circle at 50% 44%, ${portalWaypoint.color}dd, ${portalWaypoint.color}22 40%, rgba(4,5,12,0.97) 72%)`,
              }
            : undefined
        }
      >
        <div>
          <div className="sn-portal-title">
            {portalWaypoint
              ? `LANDING ON ${portalWaypoint.name}`
              : "LANDING"}
          </div>
          <div className="sn-portal-sub">DOCKING</div>
        </div>
      </div>
    </main>
  );
}
