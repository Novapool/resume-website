---
target: /overview (impeccable pass)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:/home/user/resume-website/src/components/site/overview-page.tsx"
target_fingerprint: "sha256:fbeed2401ef921270ac897bf977d07435b1ba96eff804236428bb5396ee64169"
target_path: /home/user/resume-website/src/components/site/overview-page.tsx
timestamp: 2026-11-02T19-43-05Z
slug: src-components-site-overview-page-tsx
---
# Critique: /overview (flat system view), Impeccable pass 2026-11-02
Method: dual-agent (A: blind design review sub-agent · B: detector + DOM + overlay sub-agent). Production build on :3100.

## Design Health Score (H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Sub-label says SYSTEM OVERVIEW; section headings are the only waypoints on a long page |
| 2 | Match system / real world | 3 | Plain section titles |
| 3 | User control and freedom | 3 | Many exits |
| 4 | Consistency and standards | 3 | Tagline `.hud-label` renders in Space Grotesk (label sets no font-family), breaking the Instrument Voice Rule |
| 5 | Error prevention | 3 | |
| 6 | Recognition rather than recall | 3 | Selected work cards are not links; /projects has no per-project anchors |
| 7 | Flexibility and efficiency | n/a | |
| 8 | Aesthetic and minimalist design | 3 | 93% and 44 appear twice on the page (hero proof + Selected work stats) |
| 9 | Error recovery | 2 | The email address is never shown as text: a mailto-only button is a dead click without a mail handler |
| 10 | Help and documentation | n/a | |
| **Total** | | **23/32** | Good (72%) |

## Design Specificity Verdict
Authored at the edges (chrome, the four-worlds cards with real planet renders, cyan strata); the body below the fold is the standard dark-portfolio stack (three prose boxes, three cards, timeline, chip grid).

**Deterministic scan** (`impeccable detect`, URL, baseline): 1280: 9 primary / 1 advisory (dark-glow 5, ai-color-palette 3, radial-halo 1). 390: 9 / 3 (straggler 2a TP). All primary hits are the four PlanetBody renders on the world cards (FP). Static scan of src/: exit 0 (133 advisory design-system drift: off-ramp 13/14/15/18/22/30px sizes, a few undocumented colours, one 3px radius).

## Priority Issues
- [P1] The proof row breaks 2+1 at 1440: three captions + gaps measure 880px in an 810px column, orphaning "3 / Delta Dental workflows". Fix: cap caption width in `.hud-proof`. → layout
- [P2] Each headline stat shows twice on one page (hero + Selected work). Fix: drop the stat block from Selected work cards on /overview. → distill
- [P2] Selected work is a dead end: cards are not links; /projects has no anchors. Fix: ids on project articles, cards link to /projects#id. → clarify
- [P2] EMAIL ME with no visible address. Fix: print PROFILE.email beside the CTAs. → harden
- [P3] Tagline in the wrong voice (`.hud-label` inherits grotesk). → typeset

## Persona Red Flags
- Casey: 5139px page; the four-worlds band is a full screen of stacked cards that duplicates the strip under the bar.
- Sam: each world-card link's accessible name is the whole card text.
- Engineer: no route from a Selected work card to that project.

## Minor Observations
- Inline styles for the CTA row and the world cards; should be classes.
- `.hud-hero` 46vh leaves ~110px dead space before the first band.
- Page ends on a tag cloud and "Open About".

## Questions to Consider
- Should the flat view be the most proof-dense page on the site?
- Why does the reader's page end on a tag cloud instead of the two actions it came for?
