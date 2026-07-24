# In Progress

## Current Work
**M2 — Frontend / Visual Refresh.** Complete for the interior pages: all four
section pages now share the Space Navigator's nav-computer HUD language, and the
planets are defined once and consumed by both the landing scene and each page.

## Active Plan
No active implementation plan.

## Recently Completed
- **Section pages themed to the landing (2026-07-24):**
  - `src/lib/planets.ts` is the single source of truth for the four worlds —
    colour, sphere texture, world position, teaser, route, and the section
    page's sky/horizon. The landing scene and every page hero read from it.
  - New per-world identities (landing planets updated to match): About = lush
    moss/bark world, Projects = crystalline fractured-mineral world, Experience
    = bare rust world with a black hole burning off its shoulder, Contact =
    small bioluminescent moon.
  - New shared design system in `src/components/hud/` — `HudPage` (corner
    brackets, top bar, `◂ RETURN TO NAV`, waypoint rail, telemetry strip, HUD
    grid, vignette, planet horizon), `panels.tsx` (dossier panels), `PlanetBody`
    (renders a world at any size), `hud.css`.
  - **Experience and Contact are now real routes** (`/experience`, `/contact`)
    instead of anchors on `/about`; `about-contact.tsx` was split accordingly.
  - `/overview` restyled with the same chrome on the neutral cyan accent.
  - Page copy extracted to `src/data/` (`profile.ts`, `projects.ts`,
    `timeline.ts`) — closes most of M3's de-duplication.
  - Removed `navbar.tsx`, `home.tsx`, `projects.tsx`, `about-contact.tsx`
    (superseded); navigation is now the HUD waypoint rail.
  - **Terminal boot loader unmounted.** `src/components/loaders/` is kept in the
    repo but `LoadingManager` is no longer rendered — the green-CRT aesthetic
    clashed with the HUD and delayed every deep link by ~6s.
  - Verified: `npm run lint` clean, `npm run build` succeeds, all six routes
    return 200, and the four pages were eyeballed via headless screenshots at
    1280 and 1440.
- **Space Navigator landing (2026-07-24):** scroll-driven flythrough at `/`.
- **Content Refresh (2026-07-24):** synced the site to the updated resume (M1).

## Blockers
- **Not yet verified on a real device / small viewport.** The Chrome extension
  wasn't connected, and headless Chrome clamps its viewport to 500px wide, so
  nothing below 500px has actually been rendered. The ≤760px rules (compact top
  bar, `◂ NAV`, inline waypoint pills) are unverified.
- **Email verification:** site uses `assaflai@msu.edu`; the resume PDF text
  renders as `asaflai@msu.edu`. Confirm which is correct.

## Next Steps
1. Eyeball `/` and the four section pages on a real phone and with reduced
   motion enabled.
2. Decide whether the boot loader gets a HUD-styled rewrite or stays retired.
3. (M4) Wire the contact form to a real backend.
4. (M4) Open Graph tags, favicon, sitemap.
