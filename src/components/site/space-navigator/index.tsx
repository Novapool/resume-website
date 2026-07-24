// src/components/site/space-navigator/index.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Starfield from "./Starfield";
import type { StarfieldHandle } from "./Starfield";
import PlanetBody from "@/components/hud/PlanetBody";
import { PLANETS } from "@/lib/planets";
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

const display = { fontFamily: "var(--font-space-grotesk), sans-serif" };
const mono = { fontFamily: "var(--font-ibm-plex-mono), ui-monospace, monospace" };

const label: CSSProperties = {
  ...mono,
  fontWeight: 500,
  fontSize: 9,
  letterSpacing: ".24em",
  color: "rgba(150,168,190,.7)",
};

const readout: CSSProperties = {
  ...mono,
  fontWeight: 600,
  fontSize: 15,
  color: "#f2f5fc",
  marginTop: 3,
};

const divider: CSSProperties = { width: 1, background: "rgba(120,140,170,.2)" };

const reticleEdge = `2px solid ${ACCENT}`;
const RETICLE_CORNERS: CSSProperties[] = [
  { top: -2, left: -2, borderTop: reticleEdge, borderLeft: reticleEdge },
  { top: -2, right: -2, borderTop: reticleEdge, borderRight: reticleEdge },
  { bottom: -2, left: -2, borderBottom: reticleEdge, borderLeft: reticleEdge },
  { bottom: -2, right: -2, borderBottom: reticleEdge, borderRight: reticleEdge },
];

const hudEdge = "1.5px solid rgba(87,230,196,.45)";
const HUD_CORNERS: CSSProperties[] = [
  { top: 18, left: 18, borderTop: hudEdge, borderLeft: hudEdge },
  { top: 18, right: 18, borderTop: hudEdge, borderRight: hudEdge },
  { bottom: 18, left: 18, borderBottom: hudEdge, borderLeft: hudEdge },
  { bottom: 18, right: 18, borderBottom: hudEdge, borderRight: hudEdge },
];

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
  const [dossierLabel, setDossierLabel] = useState("◈ REQUEST DOSSIER");

  const starfieldRef = useRef<StarfieldHandle | null>(null);
  const planetRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const routeBgRef = useRef<SVGPathElement | null>(null);
  const routeFgRef = useRef<SVGPathElement | null>(null);
  const progLineRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const velRef = useRef<HTMLDivElement | null>(null);
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

    // smoothed scroll velocity — drives the readout and the starfield warp
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
      const sx = cx + wp.world.x * k * scale;
      const sy = cy + wp.world.y * k * scale;

      let opacity: number;
      if (relZ < -70) {
        opacity = 0; // fully behind the camera
      } else {
        opacity = clamp(1 - (relZ - 500) / 4400, 0.28, 1);
        if (relZ < 260) opacity *= clamp((relZ + 70) / 330, 0, 1);
      }

      if (el) {
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
    const velocity = Math.min(
      999,
      Math.round(180 + prog * 130 + vsmRef.current * 5),
    );
    if (velRef.current) velRef.current.textContent = `${velocity} M/S`;
    if (routePctRef.current)
      routePctRef.current.textContent = `${Math.round(prog * 100)}%`;
    if (progLineRef.current)
      progLineRef.current.style.width = `${(prog * 100).toFixed(1)}%`;

    const atRest = prog < 0.015;
    if (introRef.current) introRef.current.style.opacity = atRest ? "1" : "0";
    if (targetRef.current) {
      targetRef.current.style.opacity = atRest ? "0" : "1";
      targetRef.current.style.pointerEvents = atRest ? "none" : "auto";
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

  const openPortal = (index: number) => {
    if (portalTimer.current) return; // docking already in progress
    setPortal(index);
    portalTimer.current = setTimeout(
      () => router.push(PLANETS[index].href),
      reducedRef.current ? 400 : 1300,
    );
  };

  const flashDossier = () => {
    setDossierLabel("// LINK ESTABLISHED");
    setTimeout(() => setDossierLabel("◈ REQUEST DOSSIER"), 1600);
  };

  const active = PLANETS[focused];
  const portalWaypoint = portal === null ? null : PLANETS[portal];

  return (
    <div className="sn-root">
      {/* ═══ FIXED FLIGHT STAGE ═══ */}
      <div style={{ position: "fixed", inset: 0, zIndex: 5, overflow: "hidden" }}>
        <Starfield ref={starfieldRef} reduced={reducedRef.current} />

        {/* HUD grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(0deg, rgba(87,230,196,.022) 0 1px, transparent 1px 74px), repeating-linear-gradient(90deg, rgba(87,230,196,.022) 0 1px, transparent 1px 74px)",
          }}
        />
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(120% 95% at 50% 45%, transparent 52%, rgba(3,4,10,.9) 100%)",
          }}
        />

        {/* Flight route — recomputed every frame */}
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
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
            d=""
            fill="none"
            stroke={ACCENT}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 5px rgba(87,230,196,.8))" }}
          />
        </svg>

        {/* Targeting reticle */}
        <div
          ref={reticleRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            pointerEvents: "none",
            opacity: 0,
            willChange: "transform,opacity",
          }}
        >
          {RETICLE_CORNERS.map((corner, i) => (
            <div key={i} style={{ ...corner, position: "absolute", width: 22, height: 22 }} />
          ))}
        </div>

        {/* Planets */}
        {PLANETS.map((wp, i) => (
          <Link
            key={wp.name}
            href={wp.href}
            aria-label={`Open ${wp.name.toLowerCase()} section`}
            onClick={(e) => {
              e.preventDefault();
              openPortal(i);
            }}
            ref={(el) => {
              planetRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: wp.size,
              height: wp.size,
              transform: "translate(-50%,-50%) scale(.2)",
              opacity: 0,
              willChange: "transform,opacity",
            }}
          >
            <PlanetBody planet={wp} />
          </Link>
        ))}
      </div>

      {/* ═══ HUD ═══ */}

      {/* Corner brackets */}
      <div style={{ position: "fixed", inset: 0, zIndex: 30, pointerEvents: "none" }}>
        {HUD_CORNERS.map((corner, i) => (
          <div key={i} style={{ ...corner, position: "absolute", width: 26, height: 26 }} />
        ))}
      </div>

      {/* Top bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 40px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            pointerEvents: "auto",
          }}
        >
          <span
            style={{
              width: 13,
              height: 13,
              background: ACCENT,
              transform: "rotate(45deg)",
              boxShadow: "0 0 12px rgba(87,230,196,.7)",
            }}
          />
          <div style={{ lineHeight: 1.2 }}>
            <div
              style={{
                ...display,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: ".14em",
                color: "#f2f5fc",
              }}
            >
              LAITH ASSAF
            </div>
            <div
              className="sn-topsub"
              style={{
                ...mono,
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: ".22em",
                color: "rgba(87,230,196,.8)",
                marginTop: 2,
              }}
            >
              NAV-COMPUTER · CS / 2027 · MICHIGAN STATE
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            pointerEvents: "auto",
          }}
        >
          <span
            style={{
              ...mono,
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: ".2em",
              color: "rgba(87,230,196,.75)",
            }}
          >
            ◉ SYS ONLINE
          </span>
          <a
            className="sn-dossier"
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={flashDossier}
            style={{
              ...mono,
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: ".18em",
              color: "#ffb35c",
              border: "1px solid rgba(255,179,92,.5)",
              background: "rgba(255,179,92,.07)",
              padding: "9px 16px",
              borderRadius: 2,
              whiteSpace: "nowrap",
            }}
          >
            {dossierLabel}
          </a>
        </div>
      </div>

      {/* Waypoint nav */}
      <div
        className="sn-nav"
        style={{
          position: "fixed",
          top: "50%",
          right: 34,
          transform: "translateY(-50%)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {PLANETS.map((wp, i) => {
          const on = i === focused;
          return (
            <a
              key={wp.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                goTo(i);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 11,
                border: `1px solid ${on ? "rgba(87,230,196,.6)" : "rgba(120,140,170,.18)"}`,
                padding: "8px 12px",
                borderRadius: 2,
                background: on ? "rgba(87,230,196,.1)" : "rgba(10,14,24,.5)",
                backdropFilter: "blur(6px)",
                color: on ? ACCENT : "rgba(210,225,240,.55)",
                minWidth: 158,
              }}
            >
              <span style={{ ...mono, fontSize: 12, letterSpacing: ".06em" }}>
                <span style={{ opacity: 0.6 }}>{`0${i + 1}`}</span>
                &nbsp;&nbsp;
                {wp.name}
              </span>
              <span
                style={{
                  width: 7,
                  height: 7,
                  border: "1px solid currentColor",
                  borderRadius: "50%",
                  background: on ? ACCENT : "transparent",
                  boxShadow: on ? `0 0 12px ${ACCENT}` : "none",
                }}
              />
            </a>
          );
        })}
      </div>

      {/* Target card — focused waypoint */}
      <div
        ref={targetRef}
        className="sn-target"
        style={{
          position: "fixed",
          bottom: 104,
          left: 40,
          zIndex: 40,
          width: 330,
          background: "rgba(10,14,24,.6)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(87,230,196,.28)",
          borderRadius: 4,
          padding: "18px 20px",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .3s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: active.color,
              boxShadow: `0 0 10px ${active.color}`,
            }}
          />
          <span
            style={{
              ...mono,
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: ".3em",
              color: ACCENT,
            }}
          >
            {`WAYPOINT 0${focused + 1}`}
          </span>
        </div>
        <div
          style={{
            ...display,
            fontWeight: 600,
            fontSize: 30,
            color: "#f2f5fc",
            marginTop: 8,
            lineHeight: 1,
          }}
        >
          {active.label}
        </div>
        <div
          style={{
            ...mono,
            fontSize: 12.5,
            color: "rgba(213,224,240,.72)",
            marginTop: 10,
            lineHeight: 1.55,
          }}
        >
          {active.teaser}
        </div>
        <Link
          href={active.href}
          onClick={(e) => {
            e.preventDefault();
            openPortal(focused);
          }}
          style={{
            display: "inline-block",
            marginTop: 14,
            ...mono,
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: ".22em",
            color: "#06070e",
            background: ACCENT,
            padding: "8px 14px",
            borderRadius: 2,
          }}
        >
          OPEN PORTAL ▸
        </Link>
      </div>

      {/* Telemetry */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", padding: "0 40px 20px" }}
        >
          <div
            style={{
              display: "flex",
              gap: 34,
              background: "rgba(10,14,24,.55)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(87,230,196,.2)",
              borderRadius: 3,
              padding: "12px 26px",
            }}
          >
            <div>
              <div style={label}>WAYPOINT</div>
              <div style={{ ...readout, color: ACCENT }}>{`0${focused + 1} / 04`}</div>
            </div>
            <div style={divider} />
            <div>
              <div style={label}>DESTINATION</div>
              <div style={{ ...readout, ...display }}>{active.name}</div>
            </div>
            <div style={divider} />
            <div>
              <div style={label}>VELOCITY</div>
              <div ref={velRef} style={readout}>
                180 M/S
              </div>
            </div>
            <div style={divider} />
            <div>
              <div style={label}>ROUTE</div>
              <div ref={routePctRef} style={readout}>
                0%
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 2, background: "rgba(87,230,196,.1)" }}>
          <div
            ref={progLineRef}
            style={{
              height: "100%",
              width: "0%",
              background: ACCENT,
              boxShadow: `0 0 10px ${ACCENT}`,
            }}
          />
        </div>
      </div>

      {/* Intro prompt */}
      <div
        ref={introRef}
        style={{
          position: "fixed",
          bottom: 150,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 45,
          textAlign: "center",
          pointerEvents: "none",
          transition: "opacity .5s ease",
        }}
      >
        <div
          style={{
            ...mono,
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: ".34em",
            color: "#f2f5fc",
          }}
        >
          SCROLL TO ENGAGE FLIGHT
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 20,
            color: ACCENT,
            animation: "sn-chevron 1.6s ease-in-out infinite",
          }}
        >
          ▼
        </div>
      </div>

      {/* Portal overlay — docking sequence, then routes to the section */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: portalWaypoint ? 1 : 0,
          pointerEvents: portalWaypoint ? "auto" : "none",
          transition: "opacity .5s ease",
          background: portalWaypoint
            ? `radial-gradient(circle at 50% 44%, ${portalWaypoint.color}dd, ${portalWaypoint.color}22 40%, rgba(4,5,12,0.97) 72%)`
            : "rgba(4,5,12,.96)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              ...mono,
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: ".34em",
              color: "#fff",
            }}
          >
            {portalWaypoint
              ? `ENGAGING PORTAL // ${portalWaypoint.name} SECTOR`
              : "ENGAGING PORTAL"}
          </div>
          <div
            style={{
              marginTop: 14,
              ...mono,
              fontSize: 12,
              letterSpacing: ".26em",
              color: "rgba(255,255,255,.6)",
            }}
          >
            STANDBY · DOCKING SEQUENCE
          </div>
        </div>
      </div>
    </div>
  );
}
