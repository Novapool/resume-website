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

## ✅ M2 — Frontend / Visual Refresh (Phase 2) (closed 2026-10-17 via M5 + M6)
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

## ✅ M4 — Functional Gaps (2026-10-17)
Make the site complete as a shippable product. Decisions (Laith, 2026-10-17):
- **Domain:** `https://resume-website-eight-psi.vercel.app`. It is held in
  one constant, so a custom domain later is a one-line change.
- **Email:** `assaflai@msu.edu` is correct. The résumé PDF renders the same
  spelling; the "asaflai" note was wrong. Keep MSU until graduation, and swap
  the site and the PDF together before May 2027.
- **Contact:** email-only. The form stays unmounted by Laith's decision.

Scope (built 2026-10-17, prod build, lint clean):
- ✅ Per-route title, description, canonical, Open Graph and Twitter
  metadata from `src/data/pages.ts` via `pageMetadata()` in `src/lib/seo.ts`.
  One 1200×630 OG image per route (`src/lib/og.tsx`): the top-bar ident,
  headline and the world's limb in its tint (cyan on home and /overview).
  Fonts are committed woff files in `src/assets/fonts/` (OFL).
- ✅ Favicon set from the cyan diamond on a deep-space tile: `icon.svg`,
  `favicon.ico` (16/32/48) and `apple-icon.png` (180).
- ✅ `/sitemap.xml` (6 routes) and `/robots.txt`; the 404 is `noindex`.
- **Gate:**
  - every route has a correct title, description and OG image, checked in
    the rendered `<head>` and with an OG preview;
  - the favicon shows in a browser tab;
  - `/sitemap.xml` and `/robots.txt` resolve;
  - the email matches the résumé;
  - the form stays unmounted by Laith's decision (email-only contact).
- **Gate result (live deploy of `8fb6f37`):** ✅ `<head>` correct on all 6
  routes plus the 404, each og:image a 200 PNG · ✅ opengraph.xyz renders the
  per-route card with 0 errors (warnings: descriptions of 144–146 chars may
  truncate on mobile; "no call to action" in the image) · ✅ `/sitemap.xml`
  and `/robots.txt` resolve · ✅ email matches the PDF · ✅ form unmounted by
  decision · ✅ favicon.ico, icon.svg and apple-icon.png served with the
  right types and linked in every `<head>`. The tab icon itself is for
  Laith to eyeball, since screenshots don't capture the tab strip.

## ✅ M5 — De-slopify, pass 1: template chrome + P0/P1 fixes (2026-10-16)
Kept the concept and removed the generated-looking defaults, via colorize →
distill → typeset → harden → polish, a themed 404, the landing pitch card and
a mobile waypoint strip (full spec and run log in `docs/ARCHIVE.md`).
- The detector reads 0 heading glow, 0 undersized and 0 low-contrast across
  all six routes at 1280 and 390.
- `/` has `<h1>`, `<main>` and keyboard-safe portals.
- No fixed bar sits over content, and the fake contact form is unmounted.
- **Audit 10 → 15/20, critique 18 → 23/32** (H8 1 → 3); lint and build are
  clean.
- **Closed 1 point under the ≥24 critique Gate**, by Laith's decision. The
  remaining deductions (text-only project cards, one card pattern everywhere,
  a weak Contact ending) carry into M6.

## ✅ M6 — De-slopify, pass 2: worlds style their own pages (2026-10-17)
Each world page is now a **Descent** (chosen on the decision page): the
visitor falls from orbit through that world's air past an altitude rule with a
sticky km readout, panels are made of the world's material (leaves, faceted
crystal, rust plates, a lit moon sample), and the page lands on the horizon
with an arrival card drawn in the next world's material. PRODUCT.md and
DESIGN.md (+ `.impeccable/design.json`) were written; animate and optimize were
done (smooth at 4× CPU throttle and in WebKit, CLS 0). Full run log in
`docs/ARCHIVE.md`.
- Gate: ✅ distinct per-world panels/edges/accents · ✅ `//` kickers 0 ·
  ✅ backdrop-filter in 2 places · ✅ critique calls it "authored" ·
  ❌ critique 22/32 (H8 = 2) vs ≥26 / ≥3 · ⬜ real phone (Laith)
- **Closed under the critique Gate by Laith's decision.** Two runs scored 22
  with the deductions moving between assessors. Recorded leftovers: landing
  doesn't name Laith loudly or show proof, jargon in controls, two altimeter
  numbers read as disagreeing, About's stat row is facts not evidence, Contact
  has no deck band. Per-project colour on Projects is kept on purpose.

## ✅ M7 — Critique gaps: name and proof first, plain controls (2026-10-17)
Took M6's recorded critique leftovers through four fix-and-measure rounds,
fixing only issues two or more reviewers raised (run log in `docs/ARCHIVE.md`).
- **Gate:** critique ≥26/32 with H8 ≥3 (dual-agent, prod build).
  ❌ 26 not reached · ✅ H8 = 3 in every review from round 3 on.
- **Scores:** 22 → 22/24 → 23/24 → 24/24/24 → 23/22/25. Round 3 was the
  only round where all reviewers agreed. On the final build the scores spread
  from 22 to 25, which looks like assessor noise rather than a fixable gap.
- **What shipped:**
  - **Landing:** "Laith Assaf" is the pitch card's display h1, over the proof
    figures (93% vs scripted bots · 44 repos · 3 Delta Dental workflows).
  - **One plain control vocabulary:** Home / Open ‹world› / Next: ‹world› /
    Overview / Résumé.
  - **Altitude:** one figure per screen, from the sticky readout only. Band
    marks show the zone name. Corner brackets are gone from section pages.
  - **Proof:** About opens with the person (no figure row). Projects shows
    outcome figures. Spec stats are dropped from the index.
  - **Experience:** outcome bullets come first, the rest sit behind a
    disclosure, and the full log shows with no repeated lines.
  - **Route ending:** Contact has its own deck band and ends the route on
    "Write to me". Every touchdown links /overview.
  - **Overview:** proof row, stats on the selected work, and a work-history
    band.
  - **Phones:** a waypoint strip on the landing, a framed flight, a résumé
    link in place of the PDF iframe, and aligned proof rows.
  - **Accessibility:** skip link, `scroll-padding-top`, planets too small to
    see leave the tab order, named "View source" links.
  - **About trim:** one bouldering clip and a four-game shelf.
- Gates kept: `//` kickers 0, low-contrast 0, undersized 0, backdrop-filter in
  2 places, distinct material per world. Lint and build are clean.
- **Closed under the critique Gate by Laith's decision.** Stop critique
  rounds here. The next score movers are content, not chrome: one real project
  artefact (an eval curve or battle log) and a decision on the About personal
  band.

