---
target: /projects (impeccable pass)
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/home/user/resume-website/src/components/site/projects-page.tsx"
target_fingerprint: "sha256:7247c3c9c0feae770ab78131f01a99216061be961137b26bb0c1ce8213f0fefa"
target_path: /home/user/resume-website/src/components/site/projects-page.tsx
timestamp: 2026-11-02T19-43-05Z
slug: src-components-site-projects-page-tsx
---
# Critique: /projects (crystalline world), Impeccable pass 2026-11-02
Method: dual-agent (A: blind design review sub-agent · B: detector + DOM + overlay sub-agent). Production build on :3100, 1440x900, 390x844, reduced motion.

## Design Health Score (H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Readout, zone, active pill, chevron rotation work; an open index row shows only a 6% wash |
| 2 | Match system / real world | 3 | First orbit figure "5,000 eval battles gate each CI push" is engineer jargon at recruiter glance |
| 3 | User control and freedom | 3 | 5,652px phone page with no in-page jump |
| 4 | Consistency and standards | 3 | "How it works" is a control set in label type; "ten-agent" vs "10-agent"; mobile index detail misaligned |
| 5 | Error prevention | 4 | Named source links; private repos say so |
| 6 | Recognition rather than recall | 3 | Index rows hide `kind` and stack until opened; 10 of 15 rows have an empty stat column |
| 7 | Flexibility and efficiency | n/a | |
| 8 | Aesthetic and minimalist design | 3 | Deck excellent; index is a 15-row wall of identical weight |
| 9 | Error recovery | 3 | |
| 10 | Help and documentation | n/a | |
| **Total** | | **25/32** | Good (78%) |

## Design Specificity Verdict
Authored: three different crystal facet cuts with per-project top edges, the small-multiples win-rate chart with n per bar, pinned log sources and written caveats, the 400 km readout, the rust-material next card. The index below the deck is a standard accordion on a flat backing; the world thins exactly where content is weakest.

**Deterministic scan** (`impeccable detect`, URL, baseline): 1280: 4 primary / 1 advisory (dark-glow 3, radial-spotlight-glow 1; repeating-stripes 1a = the 62deg crystal air). 390: 4 / 2 (straggler 1a TP). Glows are the planet body and horizon limb (FP). Static scan of src/: exit 0 (133 advisory design-system drift: off-ramp 13/14/15/18/22/30px sizes, a few undocumented colours, one 3px radius).

## Priority Issues
- [P2] The index is a flat wall that hides what engineers scan for (kind/stack only after opening; empty stat column). Fix: show `kind` in the summary; rows without a stat let the title column span. → layout, distill
- [P2] The lead card's height pushes the 44 / 2nd proofs to screen 2–3 on phones. Fix: tighten the eval spacing; pair the opponent panels below 760px. → adapt
- [P2] Eval table counts sit 30px apart from their percentages; stage headers wrap 3–4 lines at 390. → polish
- [P2] Screen readers: three identical "How it works" names; index projects are not headings. Fix: visually hidden project name in the summary; h3 on index titles. → harden
- [P3] On phones the index detail hangs outside the title column (x=42 vs 64). → polish

## Persona Red Flags
- Jordan: rows don't look expandable (12px chevron 760px from the title).
- Casey: lead card 990px closed; stage labels wrap to four lines.
- Sam: identical disclosure names; 3 headings for 18 projects.
- Recruiter 10s: misses 44 repos and MHacks 2nd below the fold.

## Minor Observations
- "Private repository" orphans onto its own line in the Agentic card foot.
- Hard-coded `aria-labelledby="hud-eval-title"` id; "n per bar" assumes stats literacy.

## Questions to Consider
- Should "Everything else" have two weights: builds with a number or architecture as full rows, early builds as one-liners?
- Should the crystal material continue past the deck into the index?
