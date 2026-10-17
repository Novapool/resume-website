---
target: whole site (round 3)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
target_identity: "file:/Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx"
target_fingerprint: "sha256:ab1597e8128f9e9243f37ac7165f175d0e8dee04e189ee47e107ba6c8e1b5d92"
target_path: /Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx
timestamp: 2026-10-17T17-53-25Z
slug: src-components-hud-hudpage-tsx
---
# Critique: whole site after round 3 (About led by the person, outcome proof on Projects, Experience disclosures, route end, overview link at touchdown)
Method: dual-agent with three A runs (A1 and A1b: blind design reviews · A2: re-score of the 17-44 snapshot · B: detector+DOM+overlay), fresh agents, production build on :3100.

Heuristics (all three A runs agree): H1 3, H2 3, H3 3, H4 3, H5 3, H6 3, H7 n/a, H8 3, H9 3, H10 n/a = 24/32.
Prior: 18 → 21 → 23 → 23 → 22 → 22 → 22 → 23.

Re-score of 17-44 (A2): résumé buried FIXED; 27-vs-17 conflict FIXED (About has no proof row); Projects inventory FIXED (outcomes, weaker than the cards below); /overview route FIXED; distant planets FIXED; Experience résumé paste PARTLY; Contact triple mailto FIXED; mobile chrome STILL OPEN; long summary names STILL OPEN; video ring FIXED.

Specificity: AUTHORED (all three); /overview is the one PARTLY surface.

Detector: 66 at 1280 / 61 at 390, ~50 planet/world rendering, the rest world-tinted panel fills, the violet Contact h2 and Space Grotesk share; 0 low-contrast, 0 undersized, 0 glow on text, 0 tracking, 0 eyebrows. Overlay: /nope clean. Greps: `//` 0, backdrop-filter 2.

Priority issues (converged):
- P1 The 93% figure drops its qualifier ("against scripted baselines" on the résumé) (A1)
- P1 Mobile proof rows: values sit at different heights when captions wrap (A1)
- P1/P2 Landing flight crops planets on phones and slides one under the rail at 1280 (A1, A1b, A2)
- P1 Focus can hide under the fixed top bar: no scroll-padding-top (A1b)
- P2 /overview link says "every section" but /overview has no work history (A2)
- P2 Experience log filter drops the whole 2025/2026 entries (MHacks); "100+ endpoints" proof only backed inside a disclosure (A2)
- P2 Résumé iframe unusable on phones; résumé action has four names (A1b, A2, A1)
Minor: weak focus ring on scaled planets; overview hero run-on; "the address is just above"; About's personal tail long; posting bullets hardcoded in the page.
