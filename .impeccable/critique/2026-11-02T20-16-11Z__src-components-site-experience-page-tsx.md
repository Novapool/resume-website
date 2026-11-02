---
target: /experience (impeccable pass, re-critique)
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/resume-website/src/components/site/experience-page.tsx"
target_fingerprint: "sha256:01f09a7931261bd7b066a993d06401f74fbb279b0d1da61c7703ebde62c59f14"
target_path: /home/user/resume-website/src/components/site/experience-page.tsx
timestamp: 2026-11-02T20-16-11Z
slug: src-components-site-experience-page-tsx
---
# Re-critique: /experience, Impeccable pass 2026-11-02
Method: dual-agent re-critique (A: fresh blind design review sub-agent · B: detector re-run on the same build, exit 0 at 1280 and 390 after scoped ignores). Production build on :3100. Scored after the first fix round; the round-two fixes listed under "Acted on" landed after scoring.

| # | Heuristic | Score |
|---|---|---|
| 1 | Visibility of system status | 3 |
| 2 | Match system / real world | 3 |
| 3 | User control and freedom | 4 |
| 4 | Consistency and standards | 3 |
| 5 | Error prevention | 3 |
| 6 | Recognition rather than recall | 3 |
| 7 | Flexibility and efficiency | n/a |
| 8 | Aesthetic and minimalist design | 3 |
| 9 | Error recovery | 3 |
| 10 | Help and documentation | n/a |
| **Total** | | **25/32** (78%, Good; was 23; H8 2→3, H3 3→4) |

## Priority Issues
- [P1] The three-year MSU IT role has no plate. Content structure: left for Laith.
- [P1] Plate copy is hard-coded in the page, and the log retells the plates. Content: left for Laith (moving it to timeline.ts means rewording).
- [P2] "Current postings" reads as job ads. Acted on: "Where I work now".
- [P2] Plate titles sat at log-chapter rank. Acted on: 21px.
- [P2] Projects named in the log aren't linked. Left: it needs a bullet shape in timeline.ts.
