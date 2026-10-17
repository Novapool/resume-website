---
target: resume-website HUD pages + Space Navigator
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx"
target_fingerprint: "sha256:c3d87bf126f87ed4b3b7313f684ef92ead890f514bcf6921246dbadc8aaa0540"
target_path: /Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx
timestamp: 2026-10-16T19-59-41Z
slug: src-components-hud-hudpage-tsx
---
# Critique: HUD section pages + Space Navigator (whole site), after M5
Method: dual-agent (A: design review · B: detector+browser). Production build on :3100; live overlay skipped (Chrome extension not connected).

Heuristics: H1 3, H2 3, H3 3, H4 3, H5 3, H6 2, H7 n/a, H8 3, H9 1, H10 n/a = 21/32 (66%, Acceptable). Prior run: 18/32.

Specificity: authored world (planets.ts drives landing + horizons; lattice limb, black hole, moon), but every section page shares one hero + bordered-panel-grid layout with mono `//` kickers — the category default under a painted planet.

Detector (both widths): 0 undersized-ui-text, 0 low-contrast, 0 script-error, 0 glow on h1/h2/h3. Remaining real UI hits: 9 text-shadow glows on .hud-project-stat-value, hud-diamond glow, 14 kicker-above-heading, 5 hero-eyebrow-chip, 18 border-accent-on-rounded (project cards), 3 tiny-text (11px .hud-eyebrow at 390). Planet-art glows/halos/violet palette = false positives (world identity).

Priority issues:
- P1 Landing hides the pitch: rest state shows name + "Scroll to engage flight"; put the one-line pitch + Résumé on the rest state (clarify)
- P1 404 is Next's default white page — world breaks, no way back; themed not-found inside HudPage (harden)
- P2 No persistent nav below 980px (pills only in the footer); black hole overlaps the Experience title at 390 (adapt)
- P2 All section pages share one layout; give each world its own reading structure (layout — M6)
- P3 Sector readout repeated 3x per page; ~450px empty hero band (distill / M6 layout)

Persona: Jordan — planets unlabeled at rest, "Full debrief" unclear, "laith-assaf-" looks like a typo; Casey — 6.4 screens to Contact, nav only at page bottom, portrait fills first viewport on About; Riley — default 404, Back restarts flight at 0%, "PRIVATE REPOSITORY" looks clickable.

Minor: wordmark not a link home; `//` labels wrap beside titles at 390; Experience card header squeezes role/date at 1280; projects planet passes under the rail mid-flight; landing Contact card dot purple, label green.

Questions: Should /overview be the front door with the flight as the reward? Why does each world get its own sky but not its own layout? What does arriving at the last moon feel like?
