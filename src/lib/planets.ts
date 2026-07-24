// src/lib/planets.ts
// Single source of truth for the four worlds.
//
// Both the Space Navigator landing scene and each section page's hero read
// from here, so a planet's colour/texture is defined exactly once. The landing
// renders a planet at `size` px (perspective-scaled); a section page renders
// the *same* sphere config blown up into a horizon limb, so flying to a planet
// and landing on it are visually continuous.

import type { CSSProperties } from "react";

export type PlanetId = "about" | "projects" | "experience" | "contact";

/** A texture layer painted inside the sphere, above the base fill. */
export interface PlanetBand {
  background: string;
  /** Omit for layers that must stay fixed relative to the viewer (rim light). */
  animation?: string;
  blend?: CSSProperties["mixBlendMode"];
  opacity?: number;
}

/** How a world's body is drawn, at any size. */
export interface PlanetSphere {
  fill: string;
  /** `r,g,b` of the halo/glow colour. */
  halo: string;
  haloInset: string;
  boxShadow: string;
  bands: PlanetBand[];
  /** Free-form layers painted *behind* the sphere (accretion disk, rings). */
  backdrop?: CSSProperties[];
  /** Free-form layers painted *above* the sphere (atmosphere rim, rings). */
  overlay?: CSSProperties[];
}

/**
 * Extra scene dressing for the section page — the space *around* the world,
 * plus the world's own surface seen from the ground.
 *
 * `limb` is a separate level of detail from `sphere.bands` on purpose: the
 * sphere's textures are authored for a ~330px body seen from orbit, while the
 * limb is a horizon arc many viewports wide. Its layers are tiled in `vmax`
 * so the surface keeps the same grain at any screen size.
 */
export interface PlanetHero {
  /** Wash tint layered over the page background. */
  wash: string;
  /** Fixed-position layers behind the horizon limb, in viewport coordinates. */
  sky?: CSSProperties[];
  /** Vertical offset of the limb's top arc, as a % of the viewport height. */
  horizon: number;
  /** Surface of the limb — background layers plus any atmospheric inset glow. */
  limb: CSSProperties;
  /** Animated glow painted over the limb (reduced motion disables it). */
  limbGlow?: CSSProperties;
  /** Rim of light along the limb's upper edge. */
  rim: CSSProperties;
}

export interface Planet {
  id: PlanetId;
  /** 0-based waypoint order along the flight route. */
  index: number;
  href: string;
  /** Uppercase HUD name. */
  name: string;
  /** Title-case display name. */
  label: string;
  /** Short world classification shown in HUD readouts. */
  worldClass: string;
  /** Theme colour — nav ticks, portal overlay, page accents. */
  color: string;
  /** `r,g,b` of `color`, for rgba() tints. */
  colorRgb: string;
  teaser: string;
  /** World position; increasing z = further away. */
  world: { x: number; y: number; z: number };
  /** Base element size in px on the landing, before perspective scaling. */
  size: number;
  sphere: PlanetSphere;
  hero: PlanetHero;
}

/* ── 01 · ABOUT — lush world ─────────────────────────────────────────────
   Moss, bark and soil. The only warm, living world on the route: mottled
   organic surface under a soft green haze, in contrast to the starker three. */
const about: Planet = {
  id: "about",
  index: 0,
  href: "/about",
  name: "ABOUT",
  label: "About",
  worldClass: "LUSH · CLASS M",
  color: "#a8c47f",
  colorRgb: "168,196,127",
  teaser:
    "Origin world — CS at Michigan State, Econ minor, building toward software.",
  world: { x: -380, y: -70, z: 720 },
  size: 330,
  sphere: {
    fill: "#3f4e33",
    halo: "139,168,102",
    haloInset: "-30%",
    boxShadow:
      "inset -30px -26px 70px rgba(0,0,0,.72), inset 22px 18px 48px rgba(214,232,178,.16), 0 0 46px rgba(139,168,102,.3)",
    bands: [
      {
        // landmasses — soft-edged mottling rather than clean strata
        background:
          "radial-gradient(circle at 26% 34%, rgba(96,120,64,.85) 0 11%, rgba(0,0,0,0) 17%), radial-gradient(circle at 62% 24%, rgba(78,100,52,.8) 0 9%, rgba(0,0,0,0) 15%), radial-gradient(circle at 44% 62%, rgba(110,132,72,.75) 0 13%, rgba(0,0,0,0) 20%), radial-gradient(circle at 74% 68%, rgba(86,74,46,.8) 0 10%, rgba(0,0,0,0) 16%), radial-gradient(circle at 15% 72%, rgba(102,84,52,.7) 0 8%, rgba(0,0,0,0) 14%)",
        animation: "sn-spin 130s linear infinite",
      },
      {
        // soil strata, low contrast
        background:
          "repeating-linear-gradient(108deg, rgba(74,58,34,.26) 0 16px, rgba(0,0,0,0) 16px 44px)",
        animation: "sn-spin 165s linear infinite reverse",
      },
      {
        // atmospheric haze
        background:
          "radial-gradient(circle at 34% 28%, rgba(226,240,198,.22), rgba(0,0,0,0) 48%)",
        animation: "sn-spin 200s linear infinite",
        blend: "screen",
      },
    ],
    overlay: [
      {
        inset: "-3%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0,0,0,0) 63%, rgba(150,190,110,.2) 84%, rgba(0,0,0,0) 100%)",
        boxShadow: "inset 0 0 40px rgba(178,214,138,.28)",
      },
    ],
  },
  hero: {
    wash:
      "radial-gradient(120% 80% at 50% 96%, rgba(139,168,102,.22), rgba(0,0,0,0) 62%)",
    horizon: 74,
    sky: [
      {
        inset: 0,
        background:
          "radial-gradient(60% 40% at 22% 24%, rgba(150,190,110,.1), rgba(0,0,0,0) 70%), radial-gradient(50% 34% at 78% 16%, rgba(196,214,150,.07), rgba(0,0,0,0) 70%)",
      },
    ],
    limb: {
      background:
        "radial-gradient(closest-side, rgba(96,120,64,.5), rgba(0,0,0,0)) 0 0/34vmax 26vmax repeat, radial-gradient(closest-side, rgba(86,74,46,.42), rgba(0,0,0,0)) 13vmax 9vmax/25vmax 19vmax repeat, radial-gradient(closest-side, rgba(140,170,104,.22), rgba(0,0,0,0)) 6vmax 3vmax/15vmax 11vmax repeat, linear-gradient(180deg, rgba(126,158,92,.6), rgba(22,30,18,.96) 38%)",
      boxShadow: "inset 0 26px 70px rgba(198,228,158,.22)",
    },
    rim: {
      boxShadow:
        "0 0 90px 6px rgba(150,190,110,.28), inset 0 2px 0 rgba(214,238,178,.45)",
    },
  },
};

/* ── 02 · PROJECTS — crystalline world ───────────────────────────────────
   Fractured mineral plates with light bleeding through the cracks. Angular
   and constructed, because this page is about things that were built. */
const projects: Planet = {
  id: "projects",
  index: 1,
  href: "/projects",
  name: "PROJECTS",
  label: "Projects",
  worldClass: "CRYSTALLINE · CLASS K",
  color: "#7fb6ff",
  colorRgb: "127,182,255",
  teaser:
    "Constructed worlds — Bonfire party platform, a rack-mounted home lab, an RL Pokémon agent.",
  world: { x: 440, y: 60, z: 1980 },
  size: 340,
  sphere: {
    fill: "#1b2b4d",
    halo: "127,182,255",
    haloInset: "-30%",
    boxShadow:
      "inset -30px -26px 70px rgba(0,0,0,.74), inset 18px 15px 42px rgba(200,230,255,.18), 0 0 46px rgba(127,182,255,.38)",
    bands: [
      {
        // mineral plates
        background:
          "conic-gradient(from 18deg at 44% 40%, #26406e 0 9%, #1a2c50 9% 21%, #2e4c80 21% 33%, #1e3358 33% 47%, #35578f 47% 58%, #1b2d52 58% 71%, #294574 71% 84%, #1d3059 84% 100%)",
        animation: "sn-spin 220s linear infinite",
      },
      {
        // glow bleeding through the fractures
        background:
          "repeating-linear-gradient(62deg, rgba(0,0,0,0) 0 26px, rgba(168,220,255,.85) 26px 27.5px, rgba(0,0,0,0) 27.5px 54px), repeating-linear-gradient(-34deg, rgba(0,0,0,0) 0 38px, rgba(140,205,255,.6) 38px 39.5px, rgba(0,0,0,0) 39.5px 76px)",
        animation: "sn-spin 190s linear infinite reverse",
        blend: "screen",
      },
      {
        background:
          "radial-gradient(circle at 33% 28%, rgba(220,242,255,.34), rgba(0,0,0,0) 44%)",
        animation: "sn-spin 150s linear infinite",
        blend: "screen",
      },
    ],
    overlay: [
      {
        inset: 0,
        borderRadius: "50%",
        boxShadow: "inset 0 0 0 1px rgba(168,220,255,.35)",
      },
    ],
  },
  hero: {
    wash:
      "radial-gradient(120% 80% at 50% 96%, rgba(127,182,255,.2), rgba(0,0,0,0) 62%)",
    horizon: 76,
    sky: [
      {
        inset: 0,
        // faint shard lattice hanging in the sky
        background:
          "repeating-linear-gradient(58deg, rgba(0,0,0,0) 0 118px, rgba(127,182,255,.05) 118px 119px, rgba(0,0,0,0) 119px 240px), repeating-linear-gradient(-38deg, rgba(0,0,0,0) 0 156px, rgba(168,220,255,.04) 156px 157px, rgba(0,0,0,0) 157px 320px)",
      },
    ],
    limb: {
      background:
        "repeating-linear-gradient(62deg, rgba(0,0,0,0) 0 7vmax, rgba(168,220,255,.3) 7vmax 7.14vmax, rgba(0,0,0,0) 7.14vmax 14vmax), repeating-linear-gradient(-34deg, rgba(0,0,0,0) 0 9vmax, rgba(140,205,255,.2) 9vmax 9.14vmax, rgba(0,0,0,0) 9.14vmax 18vmax), repeating-linear-gradient(4deg, rgba(0,0,0,0) 0 13vmax, rgba(200,232,255,.12) 13vmax 13.16vmax, rgba(0,0,0,0) 13.16vmax 26vmax), linear-gradient(180deg, rgba(92,140,210,.55), rgba(9,15,31,.96) 42%)",
      boxShadow: "inset 0 24px 64px rgba(168,220,255,.22)",
    },
    rim: {
      boxShadow:
        "0 0 90px 6px rgba(127,182,255,.3), inset 0 2px 0 rgba(206,234,255,.6)",
    },
  },
};

/* ── 03 · EXPERIENCE — bare rock beside a black hole ─────────────────────
   The planet is desolate rust and dust with a hard terminator; all the drama
   comes from the accretion disk burning off to one side, which rim-lights the
   surface. That light source is fixed relative to the viewer, so the rim-light
   band deliberately has no spin animation. */
const experience: Planet = {
  id: "experience",
  index: 2,
  href: "/experience",
  name: "EXPERIENCE",
  label: "Experience",
  worldClass: "BARREN · TIDALLY LOCKED",
  color: "#d9743f",
  colorRgb: "217,116,63",
  teaser:
    "Mission log — Delta Dental IT support, MSU AI Club workshops for 500+.",
  world: { x: -460, y: -40, z: 3240 },
  size: 350,
  sphere: {
    fill: "#8f4527",
    halo: "217,116,63",
    haloInset: "-24%",
    // harsh terminator, almost no atmosphere
    boxShadow:
      "inset -52px -34px 62px rgba(0,0,0,.92), inset 14px 12px 30px rgba(255,196,150,.1), 0 0 26px rgba(217,116,63,.22)",
    bands: [
      {
        background:
          "radial-gradient(circle at 30% 40%, rgba(120,58,32,.7) 0 14%, rgba(0,0,0,0) 21%), radial-gradient(circle at 68% 30%, rgba(168,92,54,.55) 0 9%, rgba(0,0,0,0) 15%), radial-gradient(circle at 58% 72%, rgba(96,46,26,.6) 0 12%, rgba(0,0,0,0) 18%), radial-gradient(circle at 20% 66%, rgba(150,80,44,.45) 0 7%, rgba(0,0,0,0) 12%), repeating-linear-gradient(96deg, rgba(70,32,18,.2) 0 18px, rgba(0,0,0,0) 18px 48px)",
        animation: "sn-spin 140s linear infinite",
      },
      {
        // craters
        background:
          "radial-gradient(circle at 46% 22%, rgba(56,24,12,.55) 0 3.5%, rgba(190,110,68,.3) 4% 5%, rgba(0,0,0,0) 6%), radial-gradient(circle at 72% 56%, rgba(56,24,12,.5) 0 2.6%, rgba(190,110,68,.28) 3% 4%, rgba(0,0,0,0) 5%), radial-gradient(circle at 34% 76%, rgba(56,24,12,.5) 0 4.4%, rgba(190,110,68,.26) 5% 6%, rgba(0,0,0,0) 7%)",
        animation: "sn-spin 175s linear infinite reverse",
      },
      {
        // rim light thrown by the accretion disk — fixed, never rotates
        background:
          "radial-gradient(circle at 84% 24%, rgba(255,178,96,.55), rgba(0,0,0,0) 44%)",
        blend: "screen",
      },
    ],
    backdrop: [
      {
        // accretion disk
        left: "94%",
        top: "18%",
        width: "150%",
        height: "50%",
        transform: "translate(-50%,-50%) rotate(-17deg)",
        borderRadius: "50%",
        background:
          "radial-gradient(closest-side, rgba(0,0,0,0) 30%, rgba(255,164,74,.5) 44%, rgba(255,96,32,.3) 62%, rgba(120,30,10,.14) 80%, rgba(0,0,0,0) 94%)",
        filter: "blur(5px)",
        mixBlendMode: "screen",
      },
      {
        // event horizon + photon ring
        left: "94%",
        top: "18%",
        width: "24%",
        height: "24%",
        transform: "translate(-50%,-50%)",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, #04050a 0 44%, rgba(255,214,150,.95) 50%, rgba(255,140,60,.45) 62%, rgba(0,0,0,0) 80%)",
        boxShadow: "0 0 46px rgba(255,150,60,.4)",
      },
    ],
  },
  hero: {
    wash:
      "radial-gradient(90% 70% at 82% 12%, rgba(255,140,60,.16), rgba(0,0,0,0) 60%), radial-gradient(120% 80% at 50% 98%, rgba(217,116,63,.16), rgba(0,0,0,0) 60%)",
    horizon: 80,
    sky: [
      {
        // the black hole, large in the sky
        left: "78%",
        top: "26%",
        width: "min(76vw, 900px)",
        height: "min(24vw, 280px)",
        transform: "translate(-50%,-50%) rotate(-14deg)",
        borderRadius: "50%",
        background:
          "radial-gradient(closest-side, rgba(0,0,0,0) 28%, rgba(255,164,74,.42) 42%, rgba(255,96,32,.24) 60%, rgba(120,30,10,.1) 80%, rgba(0,0,0,0) 94%)",
        filter: "blur(10px)",
        mixBlendMode: "screen",
      },
      {
        left: "78%",
        top: "26%",
        width: "min(15vw, 172px)",
        height: "min(15vw, 172px)",
        transform: "translate(-50%,-50%)",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, #04050a 0 42%, rgba(255,220,160,.95) 49%, rgba(255,140,60,.4) 62%, rgba(0,0,0,0) 82%)",
        boxShadow: "0 0 90px rgba(255,150,60,.35)",
      },
    ],
    limb: {
      // dust and craters, lit from the upper right where the black hole hangs
      background:
        "radial-gradient(closest-side, rgba(52,22,12,.6), rgba(0,0,0,0)) 0 0/18vmax 13vmax repeat, radial-gradient(closest-side, rgba(196,116,70,.2), rgba(0,0,0,0)) 7vmax 5vmax/12vmax 9vmax repeat, radial-gradient(closest-side, rgba(30,12,6,.5), rgba(0,0,0,0)) 3vmax 8vmax/7vmax 5vmax repeat, linear-gradient(202deg, rgba(226,132,70,.55), rgba(18,9,5,.97) 46%)",
      boxShadow: "inset 0 22px 76px rgba(255,150,70,.2)",
    },
    rim: {
      boxShadow:
        "0 0 100px 6px rgba(255,140,60,.24), inset 0 2px 0 rgba(255,196,140,.5)",
    },
  },
};

/* ── 04 · CONTACT — small bioluminescent moon ────────────────────────────
   Deliberately the smallest and calmest body on the route: dark rock lit by
   drifting patches of glow. Low stakes — just open a channel. */
const contact: Planet = {
  id: "contact",
  index: 3,
  href: "/contact",
  name: "CONTACT",
  label: "Contact",
  worldClass: "MOON · BIOLUMINESCENT",
  color: "#c79bf0",
  colorRgb: "199,155,240",
  teaser:
    "Open a channel — reach Laith to talk software, systems, or ship something.",
  world: { x: 400, y: 90, z: 4500 },
  size: 215,
  sphere: {
    fill: "#2e2544",
    halo: "199,155,240",
    haloInset: "-36%",
    boxShadow:
      "inset -22px -18px 46px rgba(0,0,0,.7), inset 14px 12px 30px rgba(226,205,255,.16), 0 0 40px rgba(199,155,240,.45)",
    bands: [
      {
        background:
          "radial-gradient(circle at 32% 36%, rgba(58,46,84,.9) 0 16%, rgba(0,0,0,0) 24%), radial-gradient(circle at 70% 62%, rgba(46,36,68,.9) 0 13%, rgba(0,0,0,0) 20%), radial-gradient(circle at 54% 18%, rgba(64,52,92,.7) 0 9%, rgba(0,0,0,0) 15%)",
        animation: "sn-spin 180s linear infinite",
      },
      {
        // glowing lichen — drifts and breathes
        background:
          "radial-gradient(circle at 40% 30%, rgba(214,168,255,.75) 0 5%, rgba(0,0,0,0) 9%), radial-gradient(circle at 60% 44%, rgba(150,240,224,.6) 0 3.5%, rgba(0,0,0,0) 7%), radial-gradient(circle at 34% 62%, rgba(198,152,255,.65) 0 4.5%, rgba(0,0,0,0) 8%), radial-gradient(circle at 66% 24%, rgba(168,236,255,.5) 0 3%, rgba(0,0,0,0) 6%), radial-gradient(circle at 52% 74%, rgba(214,168,255,.55) 0 3.5%, rgba(0,0,0,0) 7%)",
        animation:
          "sn-spin 190s linear infinite reverse, hud-bio 6.5s ease-in-out infinite",
        blend: "screen",
      },
    ],
    overlay: [
      {
        inset: "-6%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0,0,0,0) 58%, rgba(199,155,240,.16) 78%, rgba(0,0,0,0) 100%)",
      },
    ],
  },
  hero: {
    wash:
      "radial-gradient(120% 80% at 50% 96%, rgba(199,155,240,.2), rgba(0,0,0,0) 64%)",
    horizon: 82,
    sky: [
      {
        inset: 0,
        background:
          "radial-gradient(46% 34% at 30% 30%, rgba(199,155,240,.1), rgba(0,0,0,0) 72%), radial-gradient(40% 30% at 74% 22%, rgba(150,240,224,.06), rgba(0,0,0,0) 72%)",
      },
    ],
    limb: {
      background:
        "radial-gradient(closest-side, rgba(70,56,102,.6), rgba(0,0,0,0)) 0 0/22vmax 16vmax repeat, linear-gradient(180deg, rgba(126,98,168,.45), rgba(13,10,22,.96) 40%)",
      boxShadow: "inset 0 22px 60px rgba(199,155,240,.24)",
    },
    limbGlow: {
      background:
        "radial-gradient(closest-side, rgba(214,168,255,.5), rgba(0,0,0,0)) 0 0/16vmax 12vmax repeat, radial-gradient(closest-side, rgba(150,240,224,.28), rgba(0,0,0,0)) 8vmax 6vmax/11vmax 8vmax repeat",
      mixBlendMode: "screen",
      animation: "hud-bio 7s ease-in-out infinite",
    },
    rim: {
      boxShadow:
        "0 0 90px 6px rgba(199,155,240,.32), inset 0 2px 0 rgba(232,208,255,.5)",
    },
  },
};

export const PLANETS: Planet[] = [about, projects, experience, contact];

export const PLANET: Record<PlanetId, Planet> = {
  about,
  projects,
  experience,
  contact,
};

/** Waypoint number as shown in the HUD, e.g. `02`. */
export const waypointNo = (planet: Planet) => `0${planet.index + 1}`;

/** The next world along the flight route, wrapping back to the first. */
export const nextPlanet = (planet: Planet) =>
  PLANETS[(planet.index + 1) % PLANETS.length];
