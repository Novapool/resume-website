---
target: /contact (impeccable pass)
total_score: 27
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/home/user/resume-website/src/components/site/contact-page.tsx"
target_fingerprint: "sha256:30121e57f746933f137514c03a29d31ffbc9caf9068875f77db813fc2ce31561"
target_path: /home/user/resume-website/src/components/site/contact-page.tsx
timestamp: 2026-11-02T19-43-05Z
slug: src-components-site-contact-page-tsx
---
# Critique: /contact (moon world, end of route), Impeccable pass 2026-11-02
Method: dual-agent (A: blind design review sub-agent · B: detector + DOM + overlay sub-agent). Production build on :3100.

## Design Health Score (H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 4 | Copy confirms in a live region; clipboard verified |
| 2 | Match system / real world | 3 | Plain, warm |
| 3 | User control and freedom | 3 | |
| 4 | Consistency and standards | 3 | One mailto, three labels (address, EMAIL ME, Write to me); channel rows mix action/URL/description |
| 5 | Error prevention | 4 | Visible address + Copy covers visitors with no mail client |
| 6 | Recognition rather than recall | 4 | |
| 7 | Flexibility and efficiency | n/a | |
| 8 | Aesthetic and minimalist design | 3 | Address shown twice, linked three times |
| 9 | Error recovery | 3 | Copy-failure message clears after 2.4s; timers stack |
| 10 | Help and documentation | n/a | |
| **Total** | | **27/32** | Good (84%) |

## Design Specificity Verdict
Moon material is specific (lit 20px sample, pooled bioluminescence, 12 km descent, violet horizon, end-of-route card); the content block is the standard contact pattern, well executed.

**Deterministic scan** (`impeccable detect`, URL, baseline): 1280: 16 primary / 0 advisory (ai-color-palette 9, radial-spotlight-glow 3, dark-glow 3, radial-halo 1). 390: 15 / 1. Every violet hit is Moon Violet, the world tint, and the Softened Heading mix (FP by named rule). The 36px address target at 390 is TP (fixed this pass). Static scan of src/: exit 0 (133 advisory design-system drift: off-ramp 13/14/15/18/22/30px sizes, a few undocumented colours, one 3px radius).

## Priority Issues
- [P2] The address link is 246x36 at 390, under the 44px invariant. Fix: `.hud-email-address` block-level with a 44px min height. → adapt
- [P2] One action, three labels; the finale is said twice (deck + touchdown). Copy change: left for Laith. → clarify
- [P2] Copy-failure message vanishes in 2.4s and timeouts stack. Fix: keep `failed` until the next click; clear the timer. → harden
- [P3] Channel rows use inconsistent grammar. Copy: left for Laith. → clarify

## Persona Red Flags
- Jordan: may wonder whether "Write to me" differs from "Email me".
- Recruiter 10s: location / relocation not stated (content gap).

## Minor Observations
- Readout reaches 0 and fades while the channel row is mid-screen (short 12 km descent).
- Stale comment in contact-page.tsx ("stays unmounted until M4") contradicts PRODUCT.

## Questions to Consider
- Is the most important contact field one that expires the month he starts work?
