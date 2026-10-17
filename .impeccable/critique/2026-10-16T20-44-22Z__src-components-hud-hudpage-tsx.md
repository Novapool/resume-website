---
target: resume-website whole site
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx"
target_fingerprint: "sha256:981edc5254dd7a2ca5f83c66d47e0b3f0497a6a4474ae08b12fd56a1923a5105"
target_path: /Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx
timestamp: 2026-10-16T20-44-22Z
slug: src-components-hud-hudpage-tsx
---
# Critique: whole site after M5 + 404 + landing pitch + mobile waypoint strip
Method: dual-agent (A: design review · B: detector+browser), fresh agents, production build on :3100. Live overlay skipped (Chrome extension not connected).

Heuristics: H1 3, H2 3, H3 3, H4 2, H5 3, H6 3, H7 n/a, H8 3, H9 3, H10 n/a = 23/32 (72%, Good). Prior: 18 → 21 → 23 (an intermediate run also scored 23).

Specificity: high in the chrome (planets.ts worlds, horizons, docking colour, in-voice 404); generic inside the panels — every card is `// LABEL`, title, big stat, tags, button.

Detector (1280 and 390): 0 undersized-ui-text, 0 low-contrast, 0 script-error, 0 glow on headings. Real UI/text hits remaining: 9 text-shadow glows on .hud-project-stat-value; 11px .hud-eyebrow tiny-text (4); kicker-above-heading 14; hero-eyebrow-chip 5; border-accent-on-rounded 18; overused-font 1. Planet-art glows/halos/violet palette are false positives. No fixed element over text; no horizontal overflow; mobile strip 4×44px unclipped.

Priority issues:
- P1 The work has no imagery: 18 text-only project cards; featured projects need screenshots/diagrams in a larger slot, the rest a compact list (layout, distill — M6)
- P1 Invisible OPEN PORTAL took keyboard focus at rest — FIXED after this run (target card now inert at rest)
- P2 Landing rest state has no fast way in beyond the small Overview link; planets don't read as doors (onboard)
- P2 Experience grouping: AI Club role sits under the "Delta Dental · PC Technician Intern" heading (clarify)
- P2 Contact is an anticlimax: no copy-email, availability line or résumé; msu.edu address will expire (bolder / layout)

Persona: Jordan — nothing actionable at rest beyond "scroll"; Sam — (fixed) hidden focus stop, 8 nav stops before content on `/`; Casey — header + strip ≈130px of 844, About photo fills first screen.

Minor: straight quotes in profile.ts:35; route line crosses the scroll prompt; top-bar sector line stays cyan; "RETURN TO  NAV" double space; empty band above Contact cards; same rail scrolls on `/` but navigates elsewhere.
