---
target: /projects (impeccable pass, re-critique)
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/home/user/resume-website/src/components/site/projects-page.tsx"
target_fingerprint: "sha256:9784c76e5d1846c13b6894a3b7ad298935a8edb9b6a3f50047a50306412c58c3"
target_path: /home/user/resume-website/src/components/site/projects-page.tsx
timestamp: 2026-11-02T20-16-11Z
slug: src-components-site-projects-page-tsx
---
# Re-critique: /projects, Impeccable pass 2026-11-02
Method: dual-agent re-critique (A: fresh blind design review sub-agent · B: detector re-run on the same build, exit 0 at 1280 and 390 after scoped ignores). Production build on :3100. Scored after the first fix round; the round-two fixes listed under "Acted on" landed after scoring.

| # | Heuristic | Score |
|---|---|---|
| 1 | Visibility of system status | 3 |
| 2 | Match system / real world | 3 |
| 3 | User control and freedom | 3 |
| 4 | Consistency and standards | 3 |
| 5 | Error prevention | 3 |
| 6 | Recognition rather than recall | 4 |
| 7 | Flexibility and efficiency | n/a |
| 8 | Aesthetic and minimalist design | 3 |
| 9 | Error recovery | 3 |
| 10 | Help and documentation | n/a |
| **Total** | | **25/32** (78%, Good; was 25; H6 3→4) |

Verdict: authored. The closed index now shows title, kind, tagline and stat.

## Priority Issues
- [P2] The index bands lose the crystalline material. Left: material on the index is a design-direction call (bolder), not a fix.
- [P2] The orbit proof captions are jargon for recruiters. Content gap (copy).
- [P2] The pair-card footers came in three layouts. Acted on.
- [P2] Index titles are not headings. Left: a heading inside a summary (button role) is flattened by browsers.
- [P3] Title leading, a lone kind word, caps on bot names. Acted on.
