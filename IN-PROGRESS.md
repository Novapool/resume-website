# In Progress

## Where we are
- **Site:** `/` is the flythrough with four planet portals. Each section page
  is a Descent (orbit → the world's air → touchdown on its horizon). The
  system lives in `src/components/hud/`, worlds in `src/lib/planets.ts`, copy
  in `src/data/`.
- **Status:** M5, M6 and M7 are closed and documented. M7 ended the critique
  loop at 22–25/32 (H8 = 3). Further rounds were measuring assessor noise, so
  **no more critique rounds** unless content changes.
- **Score movers left** (content, not chrome):
  - one real project artefact (eval curve or battle log; none exists yet,
    don't fake one);
  - the About personal band.
- **Ports:** `localhost:3000` is another project. Run this repo on 3100
  (`npm run dev -- -p 3100`). Stop dev before `npm run build`.

## Current Work
None. M7 is closed and the phone check passed; next is M4.

## Active Plan
No active implementation plan.

## Recently Completed
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
- **M5 de-slopify pass 1 (closed 2026-10-16, critique 23/32, audit 15/20):**
  - Removed the legacy pixel font and glow; 11px solid labels.
  - The contact form is unmounted until M4.
  - Themed 404, landing pitch card, mobile waypoint strip.

## Blockers
- **Device check:** Laith checked the site on a real phone (2026-10-17) and
  it looks good. A pass with reduced motion turned on is still unchecked.
- **Email spelling:** the site uses `assaflai@msu.edu`; the résumé PDF text
  renders as `asaflai@msu.edu`. Laith to confirm.

## Next Steps
1. Quick reduced-motion pass on `/` and the four worlds.
2. (M4) Open Graph tags, favicon, sitemap; confirm the email.
3. (M4) Wire the contact form to a real backend, then re-mount it
   (`contact-form.tsx` already posts to `/api/contact`).
4. Content decisions for Laith:
   - a real project artefact for the Pokémon agent;
   - the About personal band. It is trimmed to one clip and four games;
     the full list stays in `GAMES`.
5. Decide whether the boot loader gets a HUD rewrite or stays retired.
