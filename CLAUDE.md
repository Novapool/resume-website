# CLAUDE.md

Laith Assaf's portfolio: Next.js 15 / React 19 / TypeScript, themed as a
spaceship nav-computer. `/` is a scroll flythrough whose four planets open four
section pages, each a "Descent" onto that world.

## Commands
- `npm run dev -- -p 3100`: port 3000 is usually another project.
- `npm run build && npm start -- -p 3100`: use the prod build for critiques and
  timing. Stop dev first, or `.next` gets clobbered.
- `npm run lint`: keep it and the build passing.

## Docs (read when…)
- `IN-PROGRESS.md`: before starting any work (where we are, next steps).
- `MILESTONES.md`: when planning or closing a milestone (ledger + Gate lines).
- `PRODUCT.md`: before any content or design decision (audience, positioning,
  binding commitments, evidence on hand, no fabricated claims).
- `DESIGN.md`: before any UI change (tokens, world materials, control
  vocabulary, named rules). `.impeccable/design.json` is its sidecar.
- `docs/ARCHIVE.md`: only when you need an old run log.
- `.impeccable/critique/`: past critique snapshots. M7 ended the critique loop;
  don't start new rounds unless content changes.

## Layout
- `src/app/`: `page.tsx` is the landing; `(site)/` holds the four worlds and
  `/overview`. `not-found.tsx` is the themed 404.
- `src/components/hud/`: the shared system. `HudPage` (chrome, descent,
  touchdown), `panels.tsx` (`Orbit`, `Section`, `Panel`…), `PlanetBody`,
  `hud.css` (scoped under `.hud-root`).
- `src/components/site/`: one component per route, plus `space-navigator/`
  (the landing flythrough; one rAF loop writes per-frame values to DOM refs,
  and React state holds only the focused waypoint).
- `src/lib/planets.ts`: the single source of each world (colour, sphere, air,
  sky, horizon, altitude). The landing and the section pages both read it.
- `src/data/`: all copy (`profile.ts`, `projects.ts`, `timeline.ts`).
- `src/components/loaders/`, `ui/`, `theme/`: retired boot loader, plus
  shadcn/Tailwind bits for legacy pieces. HUD pages are always dark.

## Invariants
- Each stat has one home, where it happened. Per-project colour stays on
  Projects. Shared chrome takes the world's tint; cyan only on the landing,
  /overview and the 404.
- The contact form stays unmounted until M4 gives it a real endpoint.
- Every animation is off under `prefers-reduced-motion`. Controls are 44px or
  taller with the 2px tint focus ring.

## Obsidian
Companion note: `/Users/laithassaf/Documents/Obsidian/nebula/1 Projects/resume-website.md`.
On a milestone or architectural change, update its Summary / Status / Next.
