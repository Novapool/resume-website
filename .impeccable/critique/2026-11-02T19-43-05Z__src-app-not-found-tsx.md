---
target: themed 404 (impeccable pass)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/home/user/resume-website/src/app/not-found.tsx"
target_fingerprint: "sha256:8dd6a099d5fd09860d4da48aa5e279e195c9fb543c94297561480dd3386b246a"
target_path: /home/user/resume-website/src/app/not-found.tsx
timestamp: 2026-11-02T19-43-05Z
slug: src-app-not-found-tsx
---
# Critique: themed 404, Impeccable pass 2026-11-02
Method: dual-agent (A: blind design review sub-agent · B: detector + DOM, scanned through a 200-status proxy because the detector refuses HTTP 404). Production build on :3100.

## Design Health Score (H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | "Error 404" stated; failed address not echoed |
| 2 | Match system / real world | 3 | Metaphor in the title, plain explanation in the body |
| 3 | User control and freedom | 3 | HOME appears twice in one viewport |
| 4 | Consistency and standards | 3 | "SEE EVERY SECTION" is a third name for the overview control |
| 5 | Error prevention | 3 | |
| 6 | Recognition rather than recall | 3 | Visitor can't see what they tried to reach |
| 7 | Flexibility and efficiency | n/a | |
| 8 | Aesthetic and minimalist design | 3 | Lower half of the viewport empty |
| 9 | Error recovery | 3 | Cause and two routes given |
| 10 | Help and documentation | n/a | |
| **Total** | | **24/32** | Good (75%) |

## Design Specificity Verdict
Authored in voice ("Off the chart", in-world chrome), generic in form (heading, paragraph, two buttons over empty stars).

**Deterministic scan** (`impeccable detect`, URL, baseline): 1280: 0 / 0. 390: 0 / 0. Clean (scanned through a 200-status proxy). Static scan of src/: exit 0 (133 advisory design-system drift: off-ramp 13/14/15/18/22/30px sizes, a few undocumented colours, one 3px radius).

## Priority Issues
- [P2] HOME offered twice (bar pill + body solid CTA). Fix: body primary becomes the projects, secondary the overview with its canonical label. → clarify
- [P2] The failed address is not echoed. Fix: small client line using usePathname(). → harden
- [P3] Empty lower half reads unfinished. → layout
- [P3] "SEE EVERY SECTION" drifts from the control vocabulary. → polish

## Minor Observations
- Teaser is a `div`, not a `p`. Inline CTA-row style shared with /overview.

## Questions to Consider
- Is the flythrough (Home) really the best recovery from a stale deep link, or is Projects?
