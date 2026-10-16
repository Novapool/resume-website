---
target: resume-website HUD pages + Space Navigator
total_score: 18
max_score: 32
na_heuristics: 9,10
p0_count: 2
p1_count: 2
target_identity: "file:/Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx"
target_fingerprint: "sha256:dcd73dd4b5a4b3f19d67a52bb5d7d627a99de376e3c53ff3eb835d6d3bd6d263"
target_path: /Users/laithassaf/Documents/Programs/resume-website/src/components/hud/HudPage.tsx
timestamp: 2026-10-16T19-33-12Z
slug: src-components-hud-hudpage-tsx
---
# Critique: HUD section pages + Space Navigator (whole site)
Method: dual-agent (A: design review · B: detector+browser). Port 3000 served another project; both agents scanned this repo on its own dev port.

Heuristics: H1 2, H2 2, H3 3, H4 2, H5 3, H6 3, H7 2, H8 1, H9 n/a, H10 n/a = 18/32 (56%, Acceptable).

Specificity: world authored (planets.ts, limbs, black hole, docking colour fade, per-project card colour); frame generic (screen corners + panel ticks, grid, vignette, static telemetry, // kickers, ▸◈◂◉ glyphs, 9-10px wide-tracked labels, mono body, blur on every panel). Biggest tell is a leak: globals.css:128-150 neon purple/pink/green h1/h2/h3 text-shadow overrides planet colour.

Priority issues:
- P0 globals.css legacy heading glow leaks into HUD (detector dark-glow 17x h2 pink, 5x h1 purple)
- P0 contact form fakes success ("MESSAGE RECEIVED") while discarding the message
- P1 readability floor: 9px labels .24em at 4.4:1; 13px mono body at .72; 18 sizes <=11px, 16 trackings >=.2em
- P1 static telemetry strip occludes content on every section page; 7 nav targets per page
- P2 decoration stacking (two bracket systems, grid, vignette, dots, glyphs, 6 backdrop-filters)
- P2 46vh empty hero after docking
Persona: Jordan cannot find "Résumé" (called DOSSIER), /overview unlinked from landing; Sam: landing has no h1/main, nav uses a href="#", 1.3s dock after keyboard activation; Casey: telemetry covers text, "◂ NAV".
