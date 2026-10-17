---
target: whole site (post landing-proof + vocabulary pass)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx"
target_fingerprint: "sha256:6e9d4f7f7fa027bcdfec55bba9a5cda27fb9c3e8183ca003be03fcada3509103"
target_path: /Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx
timestamp: 2026-10-17T17-31-12Z
slug: src-components-hud-hudpage-tsx
---
# Critique: whole site after the landing name/proof, plain-control vocabulary, single altimeter, Contact deck
Method: dual-agent with a second A (A1: blind design review · A2: design review re-scoring the 16-08 snapshot · B: detector+DOM), fresh agents, production build on :3100. Overlay injected by B on /, /projects, /nope.

Heuristics (A1 blind, recorded): H1 3, H2 2, H3 3, H4 2, H5 3, H6 3, H7 n/a, H8 3, H9 3, H10 n/a = 22/32.
A2 (re-score run): H1 3, H2 3, H3 3, H4 3, H5 3, H6 3, H8 3, H9 3 = 24/32.
Prior: 18 → 21 → 23 → 23 → 22 → 22.

Re-score of the 16-08 list (A2): landing name+proof FIXED; jargon controls FIXED; altimeters PARTLY (one km now, chrome layers remain); About proof STILL OPEN; Contact deck FIXED; overview eyebrows FIXED; overview CTA repeat FIXED (new repeat: FULL CATALOGUE ×3); in/laith-assaf- FIXED; rail tab order PARTLY (skip link added); Contact hero empty right half STILL OPEN.

Specificity: AUTHORED (both A). Copy is where it slips toward generic (timeline titles, "Inspiration in AI", spec-not-outcome index stats).

Detector: 65 findings at 1280 / 61 at 390, all planet/world rendering (dark-glow, halos, sky wash, moon violet); 0 low-contrast, 0 undersized, 0 glow on text, 0 wide-tracking. One text hit: violet h2 on /contact (world tint, by design). Overlay on /nope: hero-eyebrow-chip ("ERROR 404"). Greps: `//` 0, backdrop-filter 2. No console errors.

Priority issues (converged):
- P1 Contact ends on "Next: About", a loop instead of an ending; active rail pill washes out over the moon horizon (A1, A2)
- P1 Index stats that are specs, not outcomes ("10 mi", "0 unreviewed commands", "2–10 players") dilute the real numbers (A1; A2 minor)
- P2 /overview Selected work: different order from /projects, no stats, FULL CATALOGUE ×3, orphan third card (A1, A2)
- P2 About proof row still has a date ("May 2027") in place of evidence (A1, A2)
- P2 Theme labels compete with information: ground mark "0 km · waypoint 02 of 04" mixes this world and the next; landing "Overview" text link vs HOME pill (A1, A2, B)

Minor: landing has no skip link and its pitch link has a ~100-char accessible name and is focused last (A1, B); proof rows wrap 2+1 on phones; Agentic card dead space; mobile bar+strip ≈110–125px; arrival teasers in third person; About videos focusable with no name; timeline titles read as LinkedIn boilerplate.
