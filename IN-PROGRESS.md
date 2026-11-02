# In Progress

## Where we are
- **Site:** `/` is the flythrough with four planet portals. Each section page
  is a Descent (orbit → the world's air → touchdown on its horizon). The
  system lives in `src/components/hud/`, worlds in `src/lib/planets.ts`, copy
  in `src/data/`.
- **Status:** M1–M7 are all closed. M4 made it shippable: per-route
  metadata and OG images, favicon, sitemap; contact is email-only. M7 ended
  the critique loop at 22–25/32 (H8 = 3); **no more critique rounds**
  unless content changes.
- **Score movers left** (content, not chrome):
  - one real project artefact: the Pokémon agent's stage-by-stage win-rate
    chart, read from that repo's committed logs, is on Projects (pending
    review);
  - the About personal band.
- **Ports:** `localhost:3000` is another project. Run this repo on 3100
  (`npm run dev -- -p 3100`). Stop dev before `npm run build`.

## Current Work
M4 is closed; the next work is content (see Next Steps).

## Active Plan
No active implementation plan.

## Recently Completed
- **Reduced-motion pass (2026-11-02):** under `prefers-reduced-motion` the
  landing camera holds at each world and cuts between them instead of
  dollying (no scroll zoom); the About résumé preview no longer animates its
  height; the hidden docking overlay is `aria-hidden`. Normal motion is
  unchanged. Before/after sheets in `docs/reduced-motion/`.
- **M4 Functional Gaps (closed 2026-10-17, live on `8fb6f37`):**
  - Per-route titles, descriptions, canonical and OG/Twitter tags from
    `src/data/pages.ts`; one world-tinted OG image per route.
  - Cyan-diamond favicon set; `/sitemap.xml` and `/robots.txt`.
  - Email confirmed (`assaflai@msu.edu` matches the PDF). Contact is
    email-only by decision.
- **M7 critique gaps (closed 2026-10-17, critique 22–25/32, H8 = 3):**
  - Landing pitch leads with the name and three proof figures.
  - One plain control vocabulary. One altitude figure per screen.
  - About opens with the person; Projects shows outcomes; Experience
    outcomes come first.
  - Contact ends on "Write to me". /overview has proof, stats and work
    history.
  - Phone landing strip. Skip link and scroll padding.
  - Details in the MILESTONES M7 entry and the `docs/ARCHIVE.md` run log.
- **M6 Descent (closed 2026-10-17, critique 22/32):**
  - Per-world air, a drifting sky, the altitude rule and readout, world
    materials under `[data-world]`, and a horizon touchdown with the next
    world's arrival card.
  - Smooth at 4× CPU throttle and in WebKit.
  - PRODUCT.md and DESIGN.md written.

## Blockers
- **Device check:** Laith checked the site on a real phone (2026-10-17) and
  it looks good. The reduced-motion pass is done in headless Chromium
  (2026-11-02); a real-device check with the OS setting on is still open.
- **Email expiry:** `assaflai@msu.edu` (matches the PDF) expires after May
  2027; swap the site and the résumé PDF together before then.

## Next Steps
1. Content decisions for Laith:
   - review the Pokémon win-rate chart (sources pinned to commit
     `efb3be2` of pokemon-showdown-ai; update them if its logs change);
   - the About personal band. It is trimmed to one clip and four games;
     the full list stays in `GAMES`.
2. Decide whether the boot loader gets a HUD rewrite or stays retired.
