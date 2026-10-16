# Milestones

Status markers: ✅ done · 🔄 in progress · ⬜ planned

## ✅ M1 — Content Refresh (2026-07-24)
Bring the site in sync with the updated resume, new role, and new projects.
- ✅ Add Delta Dental (PC Technician Intern) to experience/timeline
- ✅ Add Bonfire & Ember Framework project
- ✅ Add Pokémon Showdown RL Agent project (links to `pokemon-showdown-ai` repo)
- ✅ Update skills (Node.js, Express, Socket.io, Railway, Vercel, Active Directory, Intune, Power Automate)
- ✅ Refresh hero tagline, bio, and specialization cards
- ✅ Swap featured project Nexus → Bonfire on home page
- ✅ Update page metadata (title/description)
- ✅ Replace embedded resume PDF with the latest version
- ✅ Fix dead `/contact` link → `/about`

## 🔄 M2 — Frontend / Visual Refresh (Phase 2)
Redesign the look and feel while keeping the content from M1.
- ✅ Define design direction — **"Space Navigator"** nav-computer flythrough
      (handoff in `archived/design_handoff_space_navigator/`)
- ✅ Build the Space Navigator landing page at `/` (scroll-driven z-axis flight,
      HUD, four planet portals into About / Projects / Experience / Contact)
- ✅ Restyle every section page to the nav-computer HUD language, with a
      per-world identity for each planet (`src/lib/planets.ts` is the single
      source of truth shared by the landing scene and the pages)
- ✅ Split Experience and Contact into their own routes
- ✅ Retire the terminal boot loader (kept in-repo, no longer mounted)
- ➡️ Animation performance and responsive/a11y work moved into M5 and M6
      (the Impeccable audit on 2026-10-16 turned them into specific findings)

## ✅ M3 — Content Architecture Cleanup (2026-07-24)
Reduce duplication so future updates touch one place.
- ✅ Extract projects/skills/timeline/social links into a central `src/data/` module
- ✅ De-duplicate featured-project content (`FEATURED_PROJECTS` in `src/data/projects.ts`)
- ✅ De-duplicate social/contact links (`PROFILE` in `src/data/profile.ts`)

## ⬜ M4 — Functional Gaps
- ⬜ Wire the contact form to a real backend/email endpoint (currently simulated)
- ⬜ Confirm the correct MSU email (site uses `assaflai@msu.edu`)
- ⬜ SEO/social: Open Graph tags, favicon, sitemap

## ⬜ M5 — De-slopify, pass 1: template chrome + P0/P1 fixes
Keep the concept (nav computer, four planet portals, per-world identities) and
remove what makes it read as AI-generated. Source: the Impeccable audit (10/20)
and critique (18/32) run on 2026-10-16. The full critique is in
`.impeccable/critique/2026-10-16T19-33-12Z__src-components-hud-hudpage-tsx.md`.
Run the steps in order:
- ⬜ `colorize`: delete or scope the legacy neon h1/h2/h3 glow and pixel font in
      `src/app/globals.css:128-150` (leaks purple/pink/green onto every planet);
      headings take `--planet` instead
- ⬜ `distill`: remove the static telemetry bar from section pages (it covers
      content; move the scroll line and NEXT to the end of the content) and the
      fake readouts on `/` (VELOCITY, ◉ SYS ONLINE, // LINK ESTABLISHED); cut
      each page to about 4 nav targets
- ⬜ `typeset`: labels ≥11px at .08–.14em and ≥4.5:1 contrast (currently 9px,
      .24em, 4.4:1); body 15–16px Space Grotesk, with mono kept for
      readouts/dates/tags; buttons ≥12px and 44px tall
- ⬜ `harden`: hide the contact form until M4 wires it (it currently shows
      "MESSAGE RECEIVED" and drops the message); give `/` an `<h1>` and
      `<main>`; turn the `href="#"` waypoints into `<button>`s; take passed
      planets out of the tab order; make docking instant on keyboard
      activation; add `aria-live` to the form status; link `/overview` from `/`
- ⬜ `polish`: move the landing's inline HUD styles onto `hud.css` classes;
      make the `.hud-field` focus ring visible; rename DOSSIER → Résumé
**Gate:** `impeccable detect` scans of all six routes (on this repo's own dev
port, since :3000 belongs to another project) report 0 `dark-glow` on headings,
0 `undersized-ui-text` and 0 `low-contrast`; `/` has an `<h1>` and `<main>`; no
fixed bar overlaps content at 1280 or 390 wide; the contact form never reports
a send that didn't happen; re-runs score audit ≥14/20 and critique ≥24/32 with
H8 (minimalist design) ≥2; `npm run lint` and `npm run build` pass.

## ⬜ M6 — De-slopify, pass 2: worlds style their own pages
Move each planet's identity out of the shared cyan HUD chrome and into the
reading surface itself (decided 2026-10-16): rust is hard-edged, crystal is
faceted, the moon glows softly. The shared HUD shrinks to a thin frame.
Starts after M5.
- ⬜ `init`: write PRODUCT.md (no product context exists yet)
- ⬜ `shape`: per-world surface direction (panels, edges, type accents, colour)
      approved before any code
- ⬜ `quieter`: keep the screen corners and delete the panel corner ticks,
      the `//` kickers (33), most ▸ ◈ ◂ ◉ glyphs and the grid/vignette on
      section pages; limit `backdrop-filter` to surfaces over busy scenery;
      glow only on the planets
- ⬜ `layout`: replace the empty 46vh hero with a real arrival view or shrink
      it; fix the full-width portrait on narrow screens
- ⬜ `animate`: under reduced motion, keep colour/opacity fades and drop only
      movement (card lift, docking fade on `/`)
- ⬜ `optimize`: check the blur/blend layers on a mid-range phone and in Safari
- ⬜ `polish`, then re-run `/impeccable critique`
**Gate:** side-by-side screenshots of the four section pages show distinct
panel/edge/accent treatments per world, not just a different horizon;
`grep -rE '["`]// ' src/components/site` returns 0; `backdrop-filter` is used in
≤2 places; the critique re-run calls the design "authored" rather than
category-generic, with H8 ≥3 and total ≥26/32; checked on a real phone below
500px wide.
