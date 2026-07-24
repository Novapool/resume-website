// src/components/site/space-navigator/constants.ts
// Motion constants for the "Space Navigator" landing page.
// See archived/design_handoff_space_navigator/README.md — these are hifi and
// should not be tweaked casually; they set the pacing of the flythrough.
//
// The worlds themselves (colour, texture, teaser, world position, route) live
// in `src/lib/planets.ts`, shared with the section pages.

export const FOCAL = 780; // perspective focal length (px)
export const FOCUS_Z = 170; // relative-z at which a planet is centered & sharp
export const MAX_Z = 4500; // furthest planet's z
export const CAM_Z_MAX = MAX_Z - FOCUS_Z;

export const DOC_HEIGHT = "640vh"; // scroll range that produces `prog`
export const ACCENT = "#57e6c4"; // primary HUD accent (cyan)

/** Star layer specs: count, base opacity, dot size, warp rate. */
export const STAR_LAYERS = [
  { count: 150, opacity: 0.5, size: 1, rate: 0.35, twinkle: false },
  { count: 90, opacity: 0.72, size: 1.7, rate: 0.7, twinkle: false },
  { count: 46, opacity: 0.95, size: 2.4, rate: 1.2, twinkle: true },
];
