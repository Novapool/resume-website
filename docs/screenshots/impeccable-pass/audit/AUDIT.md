# Impeccable audit, 2026-11-02

Technical audit of every route (`/`, `/about`, `/experience`, `/projects`,
`/contact`, `/overview`, the 404) on the production build, at 1440x900 and
390x844, with and without `prefers-reduced-motion`. Evidence lives next to
this file: `axe-before.json` / `axe-after.json`, `lighthouse-before.json` /
`lighthouse-after.json`, and the detector JSON in `../detector/`.

## Audit Health Score

| # | Dimension | Before | After | Key finding |
|---|---|---|---|---|
| 1 | Accessibility | 3 | 4 | The Contact address was a 36px target at 390. Hover transitions still ran under reduced motion. The planet focus ring scaled down to ~1px. Three featured disclosures shared one accessible name. All are fixed. |
| 2 | Performance | 3 | 3 | Mobile TBT is ~950ms at 4x throttle on world pages, unchanged. It comes from the sky's raster cost (blur and blend layers, "unattributable" on the main thread) plus React hydration. Left alone, as in the last audit. |
| 3 | Theming | 3 | 3 | Selection and the scrollbar are themed now. One stray radius and one stray tag colour are back on tokens. 132 static advisories remain (see below). |
| 4 | Responsive | 3 | 4 | At tablet portrait (761–980px), the pitch collided with telemetry and the scroll prompt. On phones the index detail was misaligned. Both are fixed. No horizontal overflow, and no visible target under 44px. |
| 5 | Implementation integrity | 3 | 4 | DESIGN.md disagreed with the code on the arrival card's material, celestial glows and the reduced-motion transitions. The 404 readout briefly read as an eyebrow. All are resolved. The detector exits 0 everywhere. |
| | **Total** | **15/20** (Good) | **18/20** (Excellent) | |

## Measured checks (after)

- **axe-core 4.10** (wcag2a/aa, 21aa, 22aa, best-practice): 0 violations on
  every route at both widths, before and after.
- **Lighthouse accessibility:** 100 on every route, mobile and desktop.
  Best practices 100, SEO 100.
- **Lighthouse performance (after, single runs):**

  | Route | Mobile (before → after) | Desktop (before → after) |
  |---|---|---|
  | `/` | 93 → 96 | 100 → 100 |
  | `/about` | 78 → 87 | 85 → 97 |
  | `/experience` | 75 → 78 | 89 → 92 |
  | `/projects` | 76 → 77 | 95 → 79 |
  | `/contact` | 76 → 83 | 92 → 95 |
  | `/overview` | 82 → 83 | 96 → 100 |

  **Open regression: /projects desktop.** Back-to-back runs of the
  baseline build gave 98/98/86 (TBT 110–320ms). This branch gives 79–88
  (TBT 310–480ms). Traces put the extra time in the compositor commit at
  first paint (~420–460ms vs ~210–290ms). Layout and script are flat, and
  disabling `text-wrap`, the selection rule or the root scrollbar colour
  did not recover it. The page's long task is bimodal (some loads have
  none), which made the commit bisect unreliable. It needs a proper trace
  bisect. Mobile /projects is unchanged (76 → 77).
- **Playwright probes:**
  - No console or page errors.
  - No horizontal overflow.
  - No visible, focusable target under 44px.
  - Every tab stop shows a ring of at least 2px. On the landing, the planet ring is counter-scaled to ~3px.
  - Under reduced motion, zero elements carry a running animation or a transition, except the two opacity-only docking fades.
- **Focus under the fixed bar:** 0 cases on any route, thanks to `scroll-padding-top`.

## Left alone, with reasons

- **Mobile TBT and the sky's raster cost.** The blur and blend sky layers are the
  world's atmosphere, and the descent is the binding concept. Cutting them is
  a redesign, not an audit fix. CLS is 0 and LCP is 2.6–2.7s on throttled
  mobile.
- **132 static design-system advisories** (`detect src/`, exit 0):
  - **97 colour:** 66 are the per-world values that `planets.ts` owns by design. Most of the rest are alpha forms of the documented tints.
  - **32 font-size:** most are sizes DESIGN.md prose already documents but its frontmatter ramp doesn't list (15, 17, 21, 28, 64, 40px). A few 13/14/15px caption sizes are real ramp drift.
  - **3 radius:** the leaf's 6px corners and a retired loader.

  Snapping the captions or extending the frontmatter ramp is a typography-system decision. It's listed as a next step rather than done quietly here.
- **`repeating-stripes-gradient` (advisory):** this is the crystal world's 62deg
  striations and the rust world's dust bands in their air, plus banding inside
  the planet spheres.
