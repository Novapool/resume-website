# Archive

Append-only overflow from IN-PROGRESS and MILESTONES. Read on demand.

## Rotated from IN-PROGRESS (2026-10-16)

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

## M5 full spec and result (closed 2026-10-16)

### M5 — De-slopify, pass 1: template chrome + P0/P1 fixes
Keep the concept (nav computer, four planet portals, per-world identities) and
remove what makes it read as AI-generated. Source: the Impeccable audit (10/20)
and critique (18/32) run on 2026-10-16. The full critique is in
`.impeccable/critique/2026-10-16T19-33-12Z__src-components-hud-hudpage-tsx.md`.
Run the steps in order:
- ✅ `colorize`: delete or scope the legacy neon h1/h2/h3 glow and pixel font in
      `src/app/globals.css:128-150` (leaks purple/pink/green onto every planet);
      headings take `--planet` instead
- ✅ `distill`: remove the static telemetry bar from section pages (it covers
      content; move the scroll line and NEXT to the end of the content) and the
      fake readouts on `/` (VELOCITY, ◉ SYS ONLINE, // LINK ESTABLISHED); cut
      each page to about 4 nav targets
- ✅ `typeset`: labels ≥11px at .08–.14em and ≥4.5:1 contrast (currently 9px,
      .24em, 4.4:1); body 15–16px Space Grotesk, with mono kept for
      readouts/dates/tags; buttons ≥12px and 44px tall
- ✅ `harden`: hide the contact form until M4 wires it (it currently shows
      "MESSAGE RECEIVED" and drops the message); give `/` an `<h1>` and
      `<main>`; turn the `href="#"` waypoints into `<button>`s; take passed
      planets out of the tab order; make docking instant on keyboard
      activation; add `aria-live` to the form status; link `/overview` from `/`
- ✅ `polish`: move the landing's inline HUD styles onto `hud.css` classes;
      make the `.hud-field` focus ring visible; rename DOSSIER → Résumé
- ✅ added 2026-10-16 after the first re-critique (21/32): a themed
      `src/app/not-found.tsx` inside `HudPage` (H9), and the pitch +
      Résumé on the landing's rest state, sharing the card slot with the
      target card (H6)
**Gate:** `impeccable detect` scans of all six routes (on this repo's own dev
port, since :3000 belongs to another project) report 0 `dark-glow` on headings,
0 `undersized-ui-text` and 0 `low-contrast`; `/` has an `<h1>` and `<main>`; no
fixed bar overlaps content at 1280 or 390 wide; the contact form never reports
a send that didn't happen; re-runs score audit ≥14/20 and critique ≥24/32 with
H8 (minimalist design) ≥2; `npm run lint` and `npm run build` pass.
- ✅ also added: below 980px the waypoint rail becomes a strip under the
      top bar (the inline footer rail is gone); the black hole moves off
      the Experience title; brackets are hidden on phones; "Overview" is
      the single label for the no-flight exit; on `/` the header comes
      before the planets in DOM order and the hidden target card is `inert`
**Result (2026-10-16):** every Gate item passes except the critique. The
detector reads 0 heading glow, 0 undersized and 0 low-contrast at 1280 and
390. `/` and the 404 each have one `<h1>` and `<main>`. No fixed element sits
over text and nothing overflows. The form is unmounted. Audit **15/20**;
lint and build are clean. Critique **23/32** (18 → 21 → 23; two fresh runs
agreed on 23), 1 short, H8 = 3. What still costs points is M6 territory:
text-only project cards, one card pattern on every page, and a weak Contact
ending. Snapshot:
`.impeccable/critique/2026-10-16T20-44-22Z__src-components-hud-hudpage-tsx.md`.
Open: accept 23 and close M5, or carry the last point into M6.

## M6 full spec and run log (closed 2026-10-17)

### M6 — De-slopify, pass 2: worlds style their own pages
Move each planet's identity out of the shared cyan HUD chrome and into the
reading surface itself (decided 2026-10-16): rust is hard-edged, crystal is
faceted, the moon glows softly. The shared HUD shrinks to a thin frame.
Next up (M5 closed 2026-10-16). Leads with the per-world surfaces; also
owns the critique leftovers carried from M5 (project imagery, Contact ending).
- ✅ `init`: PRODUCT.md written 2026-10-16 (recruiter-first audience;
      success = project depth explored + remembered; positioning = ships
      agent systems for real; concept binding, personal sections not)
- ✅ `shape` (2026-10-16): "Descent" locked on the decision page and the
      brief confirmed. Each world page is a fall from orbit to that planet's
      surface: the world's own air down the page, an altitude rule with a
      sticky km readout, panels made of that world's material, the horizon
      as the ground, and a launch to the next world. Contract in
      `.impeccable/surfaces/src-components-hud-hudpage-tsx.md`
- ✅ **build (2026-10-16):** Descent shipped on all four world pages after
      two finish-review fix rounds (Laith chose to ship after round 2).
      DESIGN.md + `.impeccable/design.json` written by the documenter
- ✅ `quieter` (done inside the build): keep the screen corners and delete the panel corner ticks,
      the `//` kickers (33), most ▸ ◈ ◂ ◉ glyphs and the grid/vignette on
      section pages; limit `backdrop-filter` to surfaces over busy scenery;
      glow only on the planets
- ✅ `layout` (done inside the build): replace the empty 46vh hero with a real arrival view or shrink
      it; fix the full-width portrait on narrow screens
- ✅ `animate` (2026-10-16): under reduced motion, keep colour/opacity fades and drop only
      movement (card lift, docking fade on `/`)
- ✅ `optimize` (2026-10-16, emulated): scroll held 8.3ms p95 9.2ms at 390px with
      4× CPU throttle and 60fps in WebKit, CLS 0 on all routes; WebKit renders the
      facets, colour-mix and blend layers correctly; fixed the sky layer's seam.
      Still check the blur/blend layers on a mid-range phone and in Safari
- ⬜ `polish`, then re-run `/impeccable critique`
**Gate:** side-by-side screenshots of the four section pages show distinct
panel/edge/accent treatments per world, not just a different horizon;
`grep -rE '["`]// ' src/components/site` returns 0; `backdrop-filter` is used in
≤2 places; the critique re-run calls the design "authored" rather than
category-generic, with H8 ≥3 and total ≥26/32; checked on a real phone below
500px wide.

**Gate result (2026-10-16):** ✅ distinct panel/edge/accent per world (critique
confirms, not just the horizon) · ✅ `//` kickers 0 · ✅ backdrop-filter in 2
places · ✅ critique calls it "authored" · ❌ critique 22/32 (needs ≥26) and
H8 = 2 (needs ≥3) · ⬜ real phone below 500px (Laith). What costs the points:
stats repeated across pages, the touchdown end-cap (blurry limb, generic box,
empty air), cyan chrome ignoring world colour, and drifting nav vocabulary.
Snapshot: `.impeccable/critique/` (latest, post-M6).
**Gap fixes + re-check (2026-10-17):** one home per stat, touchdown rebuilt
(arrival card in the next world's material, grain + crisp horizon), chrome
tinted per world, one nav vocabulary ("Nav", "Land on …"). Critique again
**22/32**, H8 = 2. The fixed issues no longer appear (H4 2→3, the ending is now
"strong"), but new ones took their place: jargon in controls (H2 3→2), the
per-project rainbow on Projects, two altimeters disagreeing, and the landing not
naming Laith loudly. Six runs have now scored 18–23, so the score is moving
with each assessor's focus, not converging.

## Rotated from IN-PROGRESS (2026-10-17)

- **About page: Bouldering + Game Shelf sections (2026-07-27):**
  - Added two new `Section`s to `/about` after "Beyond tech": a bouldering
    video gallery (`BOULDERING_CLIPS` in `src/data/profile.ts`) and a game
    shelf grid with covers + blurbs (`GAMES` in the same file).
  - New CSS: `.hud-videos`/`.hud-video-frame` (9:16 video panels) and
    `.hud-games`/`.hud-game-cover` (2:3 cover grid) in `hud.css`.
  - Source video (`media/IMG_3562.mov`, 16.8MB H.264/portrait) transcoded to
    `public/videos/bouldering-1.mp4` (720x1280, ~1.3MB) with a poster frame at
    `public/images/bouldering-1-poster.jpg`. The system's `ffmpeg` came from an
    untrusted third-party tap and had a broken dylib chain — replaced with the
    standard `homebrew/core` ffmpeg formula to fix it.
  - 9 game covers copied to `public/images/games/`; real blurbs filled in for
    all 9 (2026-07-27). Video panel was shrunk from full-width 9:16 (which ran
    off the viewport) to a capped 220px-wide frame, `.hud-video-frame` in
    `hud.css`.
  - Verified via `npm run build` + headless Chrome screenshots (no Chrome
    extension connected this session).

## M7 run log — critique gaps (2026-10-17)

Method: each round ran 2–3 isolated design reviews (blind, plus one
re-scoring the previous snapshot) and one detector + DOM pass, on a prod build
at :3100. Snapshots are in `.impeccable/critique/` (17-31, 17-44, 17-53, 18-05).

- **Round 1 (A 22 / A2 24).**
  - Pitch-card name and proof line.
  - Plain controls (Home, Open, Next:, Show N more). worldClass is now plain
    ("Crystalline world").
  - Band marks lost their km. No corner brackets on section pages.
  - Skip link.
  - About's proof became evidence. Contact got a deck stratum.
  - Overview CTAs changed to Projects + Email. LinkedIn shows "Message me".
- **Round 2 (23 / 24).**
  - Contact signs off instead of looping to About.
  - Opaque pill bases.
  - Spec stats dropped. Featured order is the same everywhere.
  - Overview selected work shows stats under one CTA.
  - Ground mark reads "Landed on X". Eyebrows and ▼ glyphs removed.
  - Landing pitch is first in tab order. Featured cards size to their content.
  - Phone proof rows run three across. First-person teasers.
- **Round 3 (24 / 24 / 24).**
  - About lost its figure row (the 27-vs-17 repo conflict). Résumé moved above
    the hobbies.
  - Projects orbit shows outcomes.
  - Experience disclosures; the show-more toggle is gone.
  - Every touchdown links /overview. Video focus ring.
- **Round 4 (23 / 22 / 25).**
  - 93% gained "vs scripted bots".
  - Proof values top-aligned.
  - Landing `kx` keeps planets in frame and clear of the rail.
  - `scroll-padding-top`.
  - Overview work band. The full mission log returns without repeated lines.
  - PDF iframe hidden on phones. Round planet focus ring. Neutral strata base.
- **Final batch (no re-review).**
  - Contact touchdown leads with "Write to me".
  - Phone landing waypoint strip.
  - Iframe out of the tab order.
  - Named "View source" links.
  - Per-role `summary` lines on the overview.
  - One "Résumé" label.
  - One bouldering clip and a four-game shelf (`Game.line`).
- **Recurring, not fixed:**
  - mobile chrome (~120px);
  - /overview is the least authored surface;
  - the landing's last 20% of scroll has no arrival;
  - index `<summary>` names run long;
  - posting bullets are hardcoded in `experience-page.tsx`, not `src/data`.

## Rotated from IN-PROGRESS (2026-10-17, M7 close)

- **Projects page: taglines + per-project colour (2026-10-15):**
  - Each project in `src/data/projects.ts` gained a `tagline` (elevator pitch,
    the only copy shown by default), an `accent` (`r,g,b`) and an optional
    headline `stat`. The full `description` sits behind a "Full debrief"
    `<details>` toggle on the card.
  - `ProjectCard` overrides `--planet`/`--planet-rgb` inline, so the panel,
    tags and button re-tint per project; `Panel` now accepts `style`.
  - Build + lint pass; not yet eyeballed in a browser.
