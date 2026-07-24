# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio/resume website built with Next.js 15, React 19, TypeScript
and Tailwind CSS v4, themed end-to-end as a spaceship nav-computer: a
scroll-driven flythrough landing page whose four planets are portals into four
section pages set on those same worlds.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Application Structure

- **Next.js App Router**: route-based pages in `src/app/`
  - `src/app/page.tsx` — the **Space Navigator** landing, rendered bare
  - `src/app/(site)/` — route group for the four section pages plus `/overview`.
    Its layout is intentionally thin; each page renders its own chrome.
- **Component Organization**:
  - `src/components/hud/`: the shared nav-computer design system — `HudPage`
    (chrome + planet scene), `panels.tsx` (dossier panels), `PlanetBody`
    (renders a world at any size), `hud.css`
  - `src/components/site/`: one component per route (`about-page`,
    `projects-page`, `experience-page`, `contact-page`, `overview-page`)
  - `src/components/site/space-navigator/`: the landing-page flythrough
  - `src/components/loaders/`: terminal boot sequence — **kept but no longer
    mounted** (clashed with the HUD; re-add `LoadingManager` to `(site)/layout`
    to bring it back)
  - `src/components/ui/`, `src/components/theme/`: shadcn/ui + theme provider,
    now only used by legacy/shared bits — HUD pages are always dark
- **Data**: `src/data/` (`profile.ts`, `projects.ts`, `timeline.ts`) holds page
  copy so a content change lands in one place.
- **Styling**: the HUD pages are plain CSS (`src/components/hud/hud.css`, scoped
  under `.hud-root`); Tailwind v4 remains for the shadcn/ui primitives.

### Planets — single source of truth

`src/lib/planets.ts` defines the four worlds (colour, sphere texture, world
position, teaser, route, and the section page's sky/horizon). **Both** the
landing scene and each section page's hero read from it, so a planet's identity
can never drift between the nav view and its destination.

Per-world identity: About = lush/moss, Projects = crystalline, Experience =
bare rust world beside a black hole, Contact = small bioluminescent moon.

`sphere.bands` is authored for the ~330px orbital body; `hero.limb` is a
separate level of detail for the horizon arc on the section page (tiled in
`vmax` so the grain holds at any screen size).

### Space Navigator (landing page)

Scroll-driven flythrough at `/`, ported from
`archived/design_handoff_space_navigator/`. The page is `640vh` tall purely to
generate scroll range; all visible content is `position:fixed`. One
`requestAnimationFrame`-throttled loop reads
`prog = scrollY / (scrollHeight - innerHeight)` and repaints the scene:

- Four planets sit at fixed world `{x,y,z}` and are perspective-projected each
  frame (`FOCAL 780`, `FOCUS_Z 170`, `MAX_Z 4500` — see `constants.ts`).
- Transforms/opacity/route SVG/telemetry are written directly to DOM refs in the
  loop; React state holds only the *focused waypoint* (changes ~4× per flight).
- Each planet is a portal `<Link>`: clicking plays the docking overlay (which
  fades to that planet's colour), then routes to the section.
- Respects `prefers-reduced-motion` (no warp/spin/twinkle, instant scrolls).

### Section pages

Every page wraps its content in `<HudPage planet={...}>`, which supplies the
corner brackets, fixed top bar (name plate + `◂ RETURN TO NAV` + dossier), HUD
grid, vignette, waypoint rail, telemetry strip, scroll-progress line, and the
immersive planet horizon. Content goes in `Panel` / `LabeledPanel` / `Section`
primitives. `/overview` uses the same chrome with the neutral cyan accent and no
planet.

### Routing

- `/` — Space Navigator landing (four planet portals)
- `/about` — waypoint 01, lush world: bio, working style, beyond tech, resume
- `/projects` — waypoint 02, crystalline world: full project catalogue
- `/experience` — waypoint 03, rust world: current postings + mission log
- `/contact` — waypoint 04, moon: channels + comms form
- `/overview` — flat, no-flight view of the whole system
- There is no navbar; navigation is the waypoint rail (desktop) / inline pills
  (below 980px) plus the return-to-nav control.

## Styling Conventions

- HUD: CSS custom properties on `.hud-root` (`--planet`, `--planet-rgb`) tint
  every panel, control and readout per world.
- Typography: Space Grotesk (display) + IBM Plex Mono (labels/UI), label
  letter-spacing .22–.34em.
- Colours: space `#06070e`, HUD cyan `#57e6c4`, amber `#ffb35c`, panel fill
  `rgba(10,14,24,.55)` + `blur(10px)`.
- Motion is one-shot and cheap (`.hud-reveal`), and every animation is disabled
  under `prefers-reduced-motion`.
- Tailwind v4 (`@theme inline`, OKLCH vars) still backs `src/components/ui/`.

## Important Notes

- Next.js runs with Turbopack in development (`--turbopack` flag)
- `suppressHydrationWarning` on `<html>` for the theme system
- HUD pages force a dark background via `html:has(.hud-root)` regardless of theme
- The contact form is still simulated (see M4 in `MILESTONES.md`)

## Obsidian

Companion note: `/Users/laithassaf/Documents/Obsidian/nebula/1 Projects/resume-website.md`

When you make a large/architectural change or complete a milestone, update that
note's **Summary / Status / Next** sections to match (keep it concise). See the
"Obsidian Vault Sync" convention in `~/.claude/CLAUDE.md`.
