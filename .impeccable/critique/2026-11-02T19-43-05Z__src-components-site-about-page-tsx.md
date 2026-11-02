---
target: /about (impeccable pass)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:/home/user/resume-website/src/components/site/about-page.tsx"
target_fingerprint: "sha256:814dac27e39e11efdb45b7d47dc55bbce59bb982679a47296d732647de88770c"
target_path: /home/user/resume-website/src/components/site/about-page.tsx
timestamp: 2026-11-02T19-43-05Z
slug: src-components-site-about-page-tsx
---
# Critique: /about (lush world), Impeccable pass 2026-11-02
Method: dual-agent (A: blind design review, own sub-agent · B: detector + DOM + overlay, separate sub-agent). Production build on :3100, 1440x900, 390x844, reduced motion.

## Design Health Score (H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Readout, zone names and rail tick work; at 390 the Understory band is only 148px |
| 2 | Match system / real world | 3 | Plain band titles; "SHOW THE WHOLE PAGE" is vague |
| 3 | User control and freedom | 3 | Skip link, Home, rail, overview link |
| 4 | Consistency and standards | 3 | Community leaf restates 2nd of 300+ and 8+ workshops / 500+ attendees (homes: Projects, Experience) |
| 5 | Error prevention | 3 | Résumé iframe has no fallback if the PDF viewer is off |
| 6 | Recognition rather than recall | 3 | Name only in the 15px top-bar plate |
| 7 | Flexibility and efficiency | n/a | Experience-mode portfolio |
| 8 | Aesthetic and minimalist design | 2 | Personal band 39% of page height at 1440 (44% at 390); ~460x620 dead space beside the clip |
| 9 | Error recovery | 3 | PDF link always available |
| 10 | Help and documentation | n/a | Experience-mode portfolio |
| **Total** | | **23/32** | Good (72%) |

## Design Specificity Verdict
Authored top half (orbit, blob portrait, counter-curled leaves, readout, crystal arrival card). The lower half (hobby grid, single portrait clip in a box, four-up game shelf) reads like a generic personal-portfolio template; only the leaf corners tie it to the world.

**Deterministic scan** (`impeccable detect`, URL, baseline): 1280: 13 primary / 3 advisory (radial-spotlight-glow 8, dark-glow 4, radial-halo 1; straggler 2a, repeating-stripes 1a). 390: 12 / 4. Spotlight hits are the leaf material's upper-left light; glows are the planet and horizon rim (FP by named rule). Stragglers are TP: no `text-wrap` anywhere. Static scan of src/: exit 0 (133 advisory design-system drift: off-ramp 13/14/15/18/22/30px sizes, a few undocumented colours, one 3px radius).

## Priority Issues
- [P1] The personal band outweighs the professional content (games covers and the clip are the largest visuals after the title). Fix: compact the game shelf, put the clip beside the games instead of its own row. → distill, layout
- [P2] Dead space beside the single bouldering clip (auto-fit grid of one 350px item in an 810px column). → layout
- [P2] Résumé band weak: bare iframe with no fallback, "SHOW THE WHOLE PAGE" unclear; on phones a lone duplicate button. → clarify, harden
- [P2] Community leaf restates stats whose home is Projects / Experience (src/data/profile.ts BEYOND_TECH). Copy change: needs Laith. → distill (content gap)
- [P3] Intro, bio paragraph 1 and 2 restate "CS (AI/ML) / Michigan State / LLM agents / RL" within one screen. → distill (copy: needs Laith)

## Persona Red Flags
- Jordan: no name in the content area; three phrasings of the same intro before anything new.
- Casey: bar + strip take 110px; clip + games take ~2.5 screens.
- Sam: video controls add native stops whose focus style is the UA's; hover colour transitions still run under reduced motion (CLAUDE.md says every animation off).
- Recruiter 10s: face, school, three buttons; no pointer to the proof on Projects until touchdown.

## Minor Observations
- The 7fr leaf holds the shorter text in "How I work" (dead foot in the left leaf).
- The clip's caption is both its aria-label and its visible caption (announced twice).
- "Bouldering" / "What I'm playing" h3s sit loose in the band.

## Questions to Consider
- What one sentence should a recruiter leave About with?
- Does the résumé preview earn 628px when RÉSUMÉ is in the bar on every page?
