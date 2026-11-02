# In Progress

## Where we are
- **Site:** `/` is the flythrough with four planet portals. Each section page
  is a Descent (orbit → the world's air → touchdown on its horizon). The
  system lives in `src/components/hud/`, worlds in `src/lib/planets.ts`, copy
  in `src/data/`.
- **Status:** M1–M7 are all closed. M4 made it shippable: per-route
  metadata and OG images, favicon, sitemap; contact is email-only. M7 ended
  the critique loop at 22–25/32 (H8 = 3). Laith reopened it once for the
  Impeccable pass (2026-11-02), which scored every route on its own:
  23–28/32, with the detector at exit 0 on every route. **No more critique
  rounds** unless content changes: what's left is content (see Next Steps).
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
- **Impeccable design pass (2026-11-02):** a per-route dual-agent critique,
  then a fix round, then a fresh blind re-critique. A second fix round
  followed on routes whose score stayed flat.
  - **Scores (/32):** / 24→25, /about 23→23, /projects 25→25,
    /experience 23→25, /contact 27→28, /overview 23→(see PR), 404 24→(see PR).
  - **Detector:** 112 primary URL findings went to 0. The remaining primaries
    are world rendering, ignored with written, route-scoped reasons in
    `.impeccable/config.json`. Static scan exit 0.
  - **A11y:** axe is still clean and Lighthouse a11y still 100 on every route.
  - **What changed:**
    - labels keep the mono voice; text wraps cleanly; reduced motion removes
      every transition except the docking fade;
    - landing: the pitch holds through the first scroll, arrival worlds are
      fully lit, tablet layout fixed, Email me at the route's end, Esc
      cancels docking;
    - Projects: the index shows kind and stack closed, disclosures are named,
      every project has an anchor;
    - Overview: leads with the work and ends on actions;
    - 404: echoes the failed path and offers Open <world> for near misses;
    - About: the personal band is a compact row;
    - every new-tab link says so.
  - **Records:** snapshots in `.impeccable/critique/`. Evidence and before and
    after screenshots in `docs/screenshots/impeccable-pass/`, with the audit
    report in its `audit/AUDIT.md`.
- **Lighthouse + axe audit (2026-11-02):** every route, desktop and mobile,
  on the prod build. A11y 100 and axe clean everywhere (landing waypoint
  names fixed; /overview endcap now 44px). Unused Geist preloads dropped,
  About's PDF preview lazy-loads, poster is WebP, image srcsets include
  phone widths. Pixel-identical before/after on every world. Left alone:
  the sky's raster cost (blur + blend layers) and hydration TBT on mobile;
  see the PR for the list.
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
1. Content decisions for Laith (from the Impeccable pass; full list in its PR):
   - About's Community leaf repeats 2nd of 300+ (home: Projects) and
     8+ workshops / 500+ attendees (home: Experience). It needs a version
     without the figures. The "Inspiration in AI" leaf is generic.
   - Experience: the three-year MSU IT role has no plate. Plate copy is
     hard-coded in the page and should move to `timeline.ts`. Decide whether
     "100+ endpoints imaged" stays a proof figure. The strata chapter titles
     ("Going Enterprise"…) are generic.
   - Projects: one-sentence debriefs for AIForge, Adaptive Combat AI, Sign
     Language Detector and LifeQuest. A public artefact for the Agentic
     Development System. Plainer orbit captions ("eval battles gate each CI
     push").
   - Contact: a permanent email before May 2027; location, relocation and
     remote preferences if wanted.
2. Typography system: snap the 13/14/15px caption sizes to the ramp, or add
   "small body 15" and "caption 14" roles to DESIGN.md (132 static detector
   advisories, see the audit).
3. Earlier content decisions:
   - review the Pokémon win-rate chart (sources pinned to commit
     `efb3be2` of pokemon-showdown-ai; update them if its logs change);
   - the About personal band. It is trimmed to one clip and four games;
     the full list stays in `GAMES`.
4. Decide whether the boot loader gets a HUD rewrite or stays retired.
