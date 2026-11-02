---
target: /experience (impeccable pass)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/resume-website/src/components/site/experience-page.tsx"
target_fingerprint: "sha256:55c865491959664184b80c513de6468ab9db62aa6da10bbc6dcf0aaf0b8f8f94"
target_path: /home/user/resume-website/src/components/site/experience-page.tsx
timestamp: 2026-11-02T19-43-05Z
slug: src-components-site-experience-page-tsx
---
# Critique: /experience (rust world), Impeccable pass 2026-11-02
Method: dual-agent (A: blind design review sub-agent · B: detector + DOM + overlay sub-agent). Production build on :3100, 1440x900, 390x844, reduced motion.

## Design Health Score (H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Readout and zone hand-off excellent; readout hides at 96% while the end-of-log button is on screen |
| 2 | Match system / real world | 3 | "Current postings" reads as job ads; strata chapter titles are generic |
| 3 | User control and freedom | 3 | |
| 4 | Consistency and standards | 3 | `.hud-debrief summary` renders in Space Grotesk (`.hud-label` sets no font-family); two résumé controls in two colours |
| 5 | Error prevention | 3 | |
| 6 | Recognition rather than recall | 3 | The longest role (MSU IT) has no plate and no date range in meta |
| 7 | Flexibility and efficiency | n/a | |
| 8 | Aesthetic and minimalist design | 2 | Plates are walls of 30–45-word bullets; figures ($11K, 4.8/5) buried in body prose |
| 9 | Error recovery | 3 | |
| 10 | Help and documentation | n/a | |
| **Total** | | **23/32** | Good (72%) |

## Design Specificity Verdict
Authored: black hole at the shoulder, dust bands, square plates with a 3px rust band, rock-strata log, cratered horizon with a violet next card. Plate interiors are résumé bullets pasted verbatim.

**Deterministic scan** (`impeccable detect`, URL, baseline): 1280: 8 primary / 1 advisory (dark-glow 4, radial-spotlight-glow 2, ai-color-palette 1, overused-font 1). 390: 7 / 4 (straggler 3a TP). The violet + spotlight hit on `.hud-arrival` is the next world's moon material on the touchdown card: TP as doc drift (DESIGN.md doesn't document it). Space Grotesk is binding (FP). Static scan of src/: exit 0 (133 advisory design-system drift: off-ramp 13/14/15/18/22/30px sizes, a few undocumented colours, one 3px radius).

## Priority Issues
- [P1] The record isn't scannable as a role history (MSU IT, the longest role, lives in a stratum). Content-structure change; left for Laith (plates are hard-coded résumé copy).
- [P1] Numbers buried in the plates, against the Numbers Lead Rule. Fix: lead each plate with its existing one-line `summary` from timeline.ts. → distill, typeset
- [P2] Third proof figure ("100+ endpoints") argues IT support, not agents. Content decision for Laith (moving a stat).
- [P2] Disclosure summary breaks the instrument voice (grotesk). Fix: `.hud-label` gets the mono family. → polish
- [P3] Solid end-of-log RÉSUMÉ is the loudest control and duplicates the bar's amber dossier. → quieter

## Persona Red Flags
- Recruiter 10s: reads "PC Technician Intern"; "LLM agents" is the third word of a body-size bullet.
- Casey: proof captions wrap to 3 lines; Delta Dental plate ~1.6 screens.
- Sam: year sits before the h3, so heading navigation lands on the title without its year.

## Minor Observations
- "and am piloting an agent…" bullet lacks a subject.
- Hover colour transitions still run under reduced motion.

## Questions to Consider
- Should the strata be roles-only, leaving project milestones to Projects?
