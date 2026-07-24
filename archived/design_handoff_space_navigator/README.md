# Handoff: Space Navigator — Resume Landing Page

## Overview
A resume landing page reimagined as a **spaceship nav-computer flying through a small solar system**. The page is a fixed "flight stage": four planets sit at increasing depths along a route, and scrolling dollies the camera *into the screen* — the next planet grows from a distant speck into focus and passes the camera. Each planet is a clickable portal into a resume section: **About, Projects, Experience, Contact**. A HUD (name plate, waypoint nav, telemetry strip, targeting reticle, route line) frames the flight.

This is a **landing-page mockup only** — the four section pages are stubs (clicking a planet plays a "portal docking" flash instead of navigating). The signature moment is the scroll-driven z-axis flythrough.

## About the Design Files
`Space Navigator.dc.html` in this bundle is a **design reference created in HTML** — a working prototype showing the intended look and behavior, **not production code to copy directly**. It's authored in a proprietary "Design Component" format (`.dc.html` with a `support.js` runtime), so don't lift it verbatim.

The task is to **recreate this design in your resume's existing environment** (React/Next, Vue, Astro, plain HTML/CSS/JS, etc.) using its established patterns, component structure, and libraries. If the resume has no framework yet, implement it in whatever is most appropriate. All logic below is plain DOM math (perspective projection + scroll) and ports cleanly to any stack — the core is one `requestAnimationFrame` update loop driven by scroll progress.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion model, and interactions are all specified below. Recreate the visuals and the flight behavior faithfully. Exact planet depth constants are provided so the pacing matches.

---

## Motion model (the important part)

Everything derives from a single scalar: **scroll progress `prog` ∈ [0,1]** = `scrollTop / (scrollHeight - clientHeight)`.

The document is `640vh` tall to create scroll range. **All visible content is `position:fixed`** — the scroll bar exists only to produce `prog`; nothing moves via native scrolling. A `requestAnimationFrame`-throttled loop reads `prog` and repaints the scene each frame.

### Perspective projection
Each planet has a fixed world position `{x, y, z}` (see layout). A virtual camera moves forward along z as you scroll:

```
FOCAL    = 780          // focal length (px)
FOCUS_Z  = 170          // relative-z at which a planet is centered & sharp
MAX_Z    = 4500         // furthest planet's z
camZmax  = MAX_Z - FOCUS_Z
camZ     = prog * camZmax                 // camera position along z

// per planet:
relZ   = planet.z - camZ                  // depth in front of camera
scale  = FOCAL / (FOCAL + max(relZ, -(FOCAL-130)))   // perspective shrink
k      = clamp(viewportW / 1300, 0.5, 1.12)          // responsive world scale
screenX = viewportW/2  + planet.x * k * scale         // vanishing point = center
screenY = viewportH*0.45 + planet.y * k * scale       // (0.45 = slightly high)
domScale = scale * k                                   // applied to element
```

Opacity fades a planet in from the far distance and out as it passes the camera:
```
if (relZ < -70)  opacity = 0                          // fully behind camera
else {
  opacity = clamp(1 - (relZ - 500)/4400, 0.28, 1)     // distance fade
  if (relZ < 260) opacity *= clamp((relZ + 70)/330, 0, 1)  // pass-through fade
}
z-index = round(clamp((3400 - relZ)/3400, 0, 1) * 12) + 6   // nearer = on top
```

Each planet element is anchored center-screen (`top:50%; left:50%; transform:translate(-50%,-50%)`) and the loop overrides transform to:
```
translate(-50%,-50%) translate(<screenX - viewportW/2>px, <screenY - viewportH/2>px) scale(<domScale>)
```

### Planet world layout (index → world coords)
Zigzag left/right, marching away in z:
| # | Section    | x    | y   | z    |
|---|------------|------|-----|------|
| 0 | About      | -380 | -70 | 720  |
| 1 | Projects   | 440  | 60  | 1980 |
| 2 | Experience | -460 | -40 | 3240 |
| 3 | Contact    | 400  | 90  | 4500 |

### Focused planet
The "focused" waypoint = the planet with the smallest `|relZ - FOCUS_Z|` among those not yet passed (`relZ >= -40`). Drives the nav highlight, target card, reticle, and telemetry readouts.

### Scroll driving (critical gotcha)
Because all content is `position:fixed`, the mouse wheel has **no in-flow scrollable element under the cursor**, so native wheel scrolling does nothing. The prototype drives scroll manually:
- `wheel` (passive:false, capture): `preventDefault()`, `scroller.scrollTop += deltaY` (convert `deltaMode` 1→×16, 2→×clientHeight), then run the frame.
- `keydown`: Arrows ±90px, PageUp/Down & Space ±0.9·clientHeight, Home/End to extremes.
- `touchstart`/`touchmove` (passive:false): track finger Y delta, apply to `scrollTop`.
- Also listen to `scroll` (capture) so dragging the scrollbar still works.

**In a normal codebase you likely won't need this hack** — if your section markers are real in-flow elements (a tall scroll container with spacer blocks) native scroll works and you just read `prog`. Only the all-fixed approach needs manual wheel driving. Recommended port: a tall scroll spacer + `position:sticky`/`fixed` stage reading `window.scrollY`.

### Reduced motion & performance
- Respect `prefers-reduced-motion`: disable starfield warp, planet rotation, twinkle; use `behavior:'auto'` for programmatic scrolls.
- Throttle the scroll handler with a `requestAnimationFrame` latch (one repaint per frame max).
- Star layers, planet transforms use `will-change: transform, opacity`.

---

## Screens / Views

### Landing (the only real view)
- **Purpose:** Orient the visitor, let them fly/click to any of the four resume sections.
- **Layout:** Full-viewport fixed stage. Layers back-to-front:
  1. **Starfield** — 3 fixed layers (`inset:0`), 150 / 90 / 46 stars as a single element's multi-value `box-shadow` dots (sizes 1 / 1.7 / 2.4px). Near layer adds ~16 twinkling dots. On movement the layers `scale()` up slightly (warp) proportional to smoothed scroll velocity (rate 0.35 / 0.7 / 1.2, max warp ~0.09).
  2. **HUD grid** — `repeating-linear-gradient` 74px cell lines at `rgba(87,230,196,.022)`.
  3. **Vignette** — `radial-gradient(120% 95% at 50% 45%, transparent 52%, rgba(3,4,10,.9))`.
  4. **Route SVG** — recomputed each frame (see below).
  5. **Targeting reticle** — 4 corner brackets, follows focused planet.
  6. **Planets** — 4 anchored center, transformed each frame.
- **z-index bands:** stage 5, HUD corners 30, top bar / nav / telemetry / target card 40, intro prompt 45, portal overlay 80.

---

## Components

### Planets (4)
Each is an `<a>` (portal link), base size 320–360px, containing: a blurred glow halo (`inset:-30%`, radial gradient of the planet color), and a `border-radius:50%` sphere with `overflow:hidden`. Sphere depth shading via two `inset` box-shadows: dark bottom-right `inset -30px -26px 70px rgba(0,0,0,.72)` (terminator) + light top-left `inset 20px 17px 46px rgba(<tint>,.20)`, plus outer glow `0 0 46px <color>`. Surface texture = 1–2 rotating `repeating-linear-gradient` bands (`animation: spin 80–150s linear infinite`, one reversed).

| # | Section | Base color | Halo/glow | Surface identity |
|---|---------|-----------|-----------|------------------|
| 0 | About | `#c47a45` (fill) / `#d98a52` (theme) | `rgba(217,138,82,…)` | Terracotta desert; diagonal 122° strata bands |
| 1 | Projects | `#2f9fb0` / `#39c2cf` | `rgba(57,194,207,…)` | Cyan ocean world; 38° banding, bright specular |
| 2 | Experience | `#7d5bd6` / `#9b6cf0` | `rgba(155,108,240,…)` | Violet **gas giant with a ring** — horizontal bands + a `158%×48%` elliptical ring rotated −17°, `6px solid rgba(190,165,255,.34)` |
| 3 | Contact | `#2fae7a` / `#39c98a` | `rgba(57,201,138,…)` | Jade/green world; 150° banding |

Planet copy/teaser (used in the target card):
- About — "Origin world — CS at Michigan State, Econ minor, building toward software."
- Projects — "Constructed worlds — Bonfire party platform, a rack-mounted home lab, an RL Pokémon agent."
- Experience — "Mission log — Delta Dental IT support, MSU AI Club workshops for 500+."
- Contact — "Open a channel — reach Laith to talk software, systems, or ship something."

### Route line (SVG, viewBox `0 0 1920 1080`, `preserveAspectRatio:none`)
Two stacked paths through the projected planet screen-positions (converted to viewBox space), starting from a "nose" point at `(960, 972)`:
- **bg path** — through all visible planets, `stroke rgba(87,230,196,.16)` width 1.4.
- **fg path** — only up to the focused planet, `stroke #57e6c4` width 2.4, `drop-shadow(0 0 5px rgba(87,230,196,.8))`.
Path smoothing: quadratic segments through midpoints (Catmull-ish). Recompute every frame.

### Targeting reticle
4 L-shaped corner brackets (`2px solid #57e6c4`), sized `focusedPlanetSize * 1.16`, positioned over the focused planet, opacity ~0.9 when that planet's opacity > 0.35 else 0.

### Top bar (fixed, 22px 40px)
- Left: 13px `#57e6c4` diamond (rotated square) with glow + **"LAITH ASSAF"** (Space Grotesk 700, 15px, letter-spacing .14em) over sub **"NAV-COMPUTER · CS / 2027 · MICHIGAN STATE"** (IBM Plex Mono 500, 10px, .22em, `rgba(87,230,196,.8)`; hidden on mobile).
- Right: "◉ SYS ONLINE" label + **"◈ REQUEST DOSSIER"** button — amber `#ffb35c`, `1px solid rgba(255,179,92,.5)`, bg `rgba(255,179,92,.07)`, 9px 16px, radius 2px. (Placeholder; on click flips text to "// LINK ESTABLISHED" for 1.6s. No real resume file in this mockup.)

### Waypoint nav (fixed, right:34px, vertical center; hidden < 760px)
4 stacked pills (min-width 158px), right-aligned `<a>`, e.g. `01  ABOUT` + a 7px ring "tick". Inactive: text `rgba(210,225,240,.55)`, border `rgba(120,140,170,.18)`, bg `rgba(10,14,24,.5)` + `backdrop-filter: blur(6px)`. Active (focused planet): text/border `#57e6c4`, bg `rgba(87,230,196,.1)`, tick filled `#57e6c4` with glow. Click flies the camera to that planet.

### Target card (fixed, bottom:104px, left:40px, 330px; on mobile spans with 16px insets, bottom:120px)
`bg rgba(10,14,24,.6)`, `blur(10px)`, `1px solid rgba(87,230,196,.28)`, radius 4px, padding 18/20. Contents: color dot (matches focused planet theme color) + `WAYPOINT 0N` label (#57e6c4, .3em), section name (Space Grotesk 600, 30px), teaser (IBM Plex Mono 12.5px, `rgba(213,224,240,.72)`), and **"OPEN PORTAL ▸"** button (bg `#57e6c4`, text `#06070e`, 10px .22em). Hidden at rest (`prog < 0.015`), fades in once flight begins; contents update when the focused planet changes.

### Telemetry strip (fixed, bottom center)
Blurred bar (`1px solid rgba(87,230,196,.2)`) with 4 readouts separated by 1px dividers: **WAYPOINT** `0N / 04` (#57e6c4), **DESTINATION** section name, **VELOCITY** `NNN M/S` (= `180 + prog*130 + smoothedVel*5`, capped 999), **ROUTE** `NN%`. Labels IBM Plex Mono 9px .24em `rgba(150,168,190,.7)`, values 15px. Below the bar: full-width 2px track with a `#57e6c4` progress fill (width = `prog*100%`, glow).

### Intro prompt (fixed, bottom:150px center)
"SCROLL TO ENGAGE FLIGHT" (Space Grotesk 600, 12px, .34em) + bouncing "▼" chevron (#57e6c4). Visible only at rest (`prog < 0.015`).

### Portal overlay (fixed, full screen, z 80)
On planet/OPEN PORTAL click: fades in `radial-gradient(circle at 50% 44%, <color>dd, <color>22 40%, rgba(4,5,12,.97) 72%)` with **"ENGAGING PORTAL // <SECTION> SECTOR"** + "STANDBY · DOCKING SEQUENCE", holds ~1.3s, fades out. This is the mockup stand-in for navigating to the section page — **replace with real routing to `/about`, `/projects`, etc.**

### HUD corners
4 L-brackets at viewport corners, `1.5px solid rgba(87,230,196,.45)`, 26px.

---

## Interactions & Behavior
- **Scroll = fly forward.** `prog` drives camera z; planets scale up from the distance, center at focus, fade as they pass. Manual wheel/touch/key driving as noted (only needed with the all-fixed approach).
- **Click planet / OPEN PORTAL / nav pill:** nav pill smooth-scrolls camera to that planet's focus depth (`prog = (planet.z - FOCUS_Z)/camZmax`); planet & OPEN PORTAL play the portal overlay. In production, nav should scroll/animate and the portal action should route to the section.
- **REQUEST DOSSIER:** placeholder toggle only.
- **Focused-planet tracking:** nav highlight, reticle, target card, telemetry all update live.
- **Animations:** planet spin 80–150s linear; twinkle 2.2–5s; chevron bounce 1.6s; overlay/card fades .3–.5s; velocity value uses an exponentially-smoothed scroll delta (`vsm = vsm*0.82 + |Δy|*0.18`).
- **Responsive:** `< 760px` hides the right nav and top sub-label, widens the target card to near-full-width; world scale `k` shrinks with viewport. Consider a simpler vertical version on small screens if the flythrough feels heavy.
- **Reduced motion:** kill warp/spin/twinkle, instant scrolls.

## State Management
Minimal — all transient, no persistence:
- `prog` (derived from scrollTop each frame) — the single source of truth.
- `focused` (int 0–3) — recomputed each frame; only triggers target-card DOM updates when it changes.
- `vsm` (smoothed scroll velocity) — for the velocity readout & starfield warp.
- `reduced` (boolean) — from `matchMedia('(prefers-reduced-motion: reduce)')`.
- Portal overlay open/close (timeout-driven).
No data fetching.

## Design Tokens
**Colors**
- Space background: `#06070e` (near-black `#03040a` in vignette)
- Primary HUD accent (cyan): `#57e6c4` (hover `#8ff3dc`), tints `rgba(87,230,196,*)`
- Amber accent (dossier): `#ffb35c`
- Text: `#eaf0fb` / `#f2f5fc`; muted `rgba(213,224,240,.72)`; label grey `rgba(150,168,190,.7)`
- Panel fill: `rgba(10,14,24,.5–.6)` + `backdrop-filter: blur(6–10px)`
- Planet themes: About `#d98a52`, Projects `#39c2cf`, Experience `#9b6cf0`, Contact `#39c98a`

**Typography** (Google Fonts)
- Display/headings: **Space Grotesk** (400–700)
- Mono/UI/labels: **IBM Plex Mono** (400–700)
- Letter-spacing: labels .22–.34em; name .14em

**Spacing / radius / shadow**
- HUD grid cell: 74px. Panel radius: 2–4px. Corner brackets: 26px, 1.5px.
- Planet glow: `0 0 46px <color>`; sphere terminator `inset -30px -26px 70px rgba(0,0,0,.72)`.

**Motion constants:** `FOCAL 780`, `FOCUS_Z 170`, `MAX_Z 4500`, world `k = clamp(vw/1300, 0.5, 1.12)`, doc height `640vh`, velocity smoothing `0.82/0.18`.

## Assets
None external. Everything is CSS/SVG generated: stars via `box-shadow`, planets via gradients + box-shadows, route via inline SVG, icons are unicode glyphs (◉ ◈ ▸ ▼ ◆). Fonts from Google Fonts (Space Grotesk, IBM Plex Mono). No images required — though you may swap the CSS planets for textured images/`<canvas>` if desired.

## Files
- `Space Navigator.dc.html` — the full working prototype (template markup + logic class). Read the logic class for the exact per-frame math; read the template for exact markup, inline styles, and copy. Ignore the `.dc.html`/`support.js` wrapper mechanics — they're specific to the prototyping tool, not part of the design.
