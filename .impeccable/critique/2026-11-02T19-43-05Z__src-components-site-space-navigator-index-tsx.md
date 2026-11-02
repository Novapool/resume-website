---
target: / landing flythrough (impeccable pass)
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/resume-website/src/components/site/space-navigator/index.tsx"
target_fingerprint: "sha256:f2afb3db16d4d13d355e22c4ae41c9f8d81eff243f5095f02c12fad84a19a75c"
target_path: /home/user/resume-website/src/components/site/space-navigator/index.tsx
timestamp: 2026-11-02T19-43-05Z
slug: src-components-site-space-navigator-index-tsx
---
# Critique: / (scroll flythrough landing), Impeccable pass 2026-11-02
Method: dual-agent (A: blind design review sub-agent · B: detector + DOM + overlay sub-agent). Production build on :3100, 1440x900, 390x844, 1280x720, 820x1180, reduced motion; 10 scroll fractions.

## Design Health Score (H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Telemetry, reticle, rail and scroll fill excellent; the pitch card disappears after 73px with no cue |
| 2 | Match system / real world | 3 | Plain control labels; flavour stays in metadata |
| 3 | User control and freedom | 3 | Native scroll, Back restores position; docking (1.3s) can't be cancelled |
| 4 | Consistency and standards | 3 | "See the projects" goes straight there, "Open Projects" docks first |
| 5 | Error prevention | 3 | Layout collides at 761–~900px (pitch vs telemetry and scroll prompt) |
| 6 | Recognition rather than recall | 3 | Once the pitch is gone, identity is only the top-bar name |
| 7 | Flexibility and efficiency | n/a | The rail is the shortcut |
| 8 | Aesthetic and minimalist design | 3 | Route line crosses "SCROLL TO FLY THE ROUTE"; grid, vignette, corners compete |
| 9 | Error recovery | 3 | Degrades gracefully (pitch visible before JS, storage wrapped) |
| 10 | Help and documentation | n/a | |
| **Total** | | **24/32** | Good (75%) |

## Design Specificity Verdict
Authored: four worlds from planets.ts in distinct materials that match the section pages, the per-frame route line and reticle, telemetry, the destination-coloured docking flood, a real name and three real figures on the first frame. The grid, vignette and corner brackets are genre furniture.

**Deterministic scan** (`impeccable detect`, URL, baseline): 1280: 9 primary / 1 advisory (dark-glow 4, ai-color-palette 3, radial-spotlight-glow 1, radial-halo 1; repeating-stripes 1a). 390: 6 / 1. All FP: planet terminator shading and specular light, the violet moon (world tint), planet surface banding. Overlay adds hard-offset-shadow x3 (advisory, FP: the starfield paints stars as zero-blur box-shadows). Static scan of src/: exit 0 (133 advisory design-system drift: off-ramp 13/14/15/18/22/30px sizes, a few undocumented colours, one 3px radius).

## Priority Issues
- [P1] The pitch card disappears after 73px of scroll (`atRest = prog < 0.015`). Fix: widen the rest window and align the pitch slot with the target card so the hand-off doesn't lurch. → clarify, layout
- [P1] Pitch card collides with telemetry and the scroll prompt at 761–~900px wide (tablet portrait); tight at 1280x720. Fix: extend the phone pitch rules to 980px. → adapt
- [P2] Every arrival lands on a dimmed world: FOCUS_Z 170 sits inside the pass-by fade, so the focused planet is at 0.727 opacity and the route line shows through it. → polish
- [P2] Planet keyboard focus ring scales with the planet (~1px at rest). → harden
- [P2] The flight has no finale: the last 24% of scroll only enlarges the moon. → polish

## Persona Red Flags
- Jordan: planets clickable with no visible names; docking can't be backed out of.
- Casey: one flick removes the pitch; Contact ~6–7 swipes away.
- Sam: ~1px planet ring; target-card changes not announced; `.sn-intro` read mid-flight.
- Recruiter 10s: passes as long as they don't scroll.

## Minor Observations
- Route line through the intro prompt at rest; About pops from lit to gone between .10 and .20.
- Docking overlay gives no status; no Esc cancel.

## Questions to Consider
- What should the visitor be holding when the route ends: a dimmed moon, or Laith's address?
