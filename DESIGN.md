---
name: Laith Assaf, Space Navigator
description: A spaceship nav-computer portfolio whose section pages are descents from orbit onto four distinct worlds.
colors:
  deep-space: "#06070e"
  control-base: "#090a12"
  hud-cyan: "#57e6c4"
  dossier-amber: "#ffb35c"
  starlight-text: "#f2f5fc"
  haze-muted: "#b9c3d2"
  instrument-label: "#9aa8ba"
  placeholder-slate: "#8593a6"
  panel-glass: "rgba(10, 14, 24, 0.55)"
  lush-moss: "#a8c47f"
  crystal-blue: "#7fb6ff"
  rust-ember: "#d9743f"
  moon-violet: "#c79bf0"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(38px, 7vw, 68px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
  proof:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    letterSpacing: "0.01em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    letterSpacing: "0.02em"
  lead:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.12em"
  control:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.12em"
rounded:
  instrument: "2px"
  panel: "4px"
  moon: "20px"
  leaf: "30px 6px 30px 6px"
  plate: "0px"
spacing:
  tag: "4px 9px"
  control: "10px 18px"
  panel: "22px 24px"
  feature: "26px 24px 24px"
  gap: "18px"
  deck-gap: "20px"
  gutter: "150px"
  band: "112px"
  page-top: "128px"
components:
  button-primary:
    backgroundColor: "{colors.hud-cyan}"
    textColor: "{colors.deep-space}"
    typography: "{typography.control}"
    rounded: "{rounded.instrument}"
    padding: "{spacing.control}"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.starlight-text}"
    textColor: "{colors.deep-space}"
  button-secondary:
    backgroundColor: "{colors.control-base}"
    textColor: "{colors.hud-cyan}"
    typography: "{typography.control}"
    rounded: "{rounded.instrument}"
    padding: "{spacing.control}"
    height: "44px"
  button-secondary-hover:
    textColor: "{colors.starlight-text}"
  button-dossier:
    textColor: "{colors.dossier-amber}"
    typography: "{typography.control}"
    rounded: "{rounded.instrument}"
    padding: "9px 16px"
    height: "44px"
  waypoint-pill:
    textColor: "{colors.haze-muted}"
    typography: "{typography.control}"
    rounded: "{rounded.instrument}"
    padding: "8px 12px"
    height: "44px"
  waypoint-pill-active:
    textColor: "{colors.hud-cyan}"
  tag:
    textColor: "{colors.starlight-text}"
    typography: "{typography.label}"
    rounded: "{rounded.instrument}"
    padding: "{spacing.tag}"
  input-field:
    backgroundColor: "{colors.deep-space}"
    textColor: "{colors.starlight-text}"
    typography: "{typography.body}"
    rounded: "{rounded.instrument}"
    padding: "10px 12px"
  panel:
    backgroundColor: "{colors.panel-glass}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel}"
  altitude-readout:
    backgroundColor: "{colors.deep-space}"
    textColor: "{colors.hud-cyan}"
    typography: "{typography.control}"
    padding: "8px 10px"
---

# Design System: Laith Assaf, Space Navigator

## Overview

**Creative North Star: "The Descent"**

The site is a ship's nav-computer. The landing is the flight between worlds; every section page is a fall from orbit onto one world's surface, and the work is what the visitor passes on the way down. The page opens in deep space with a small rendition of the planet, a large title, one line of who, and a row of real numbers. As the visitor scrolls, the background thins into that world's own air, a single altitude rule runs down the left of the content with a sticky kilometre readout, and the page ends on the planet's horizon arc, where the only exit is a launch to the next world.

The chrome is one shared instrument (mono labels, thin hairline borders, a fixed top bar, a waypoint rail), and the surfaces are not. Panels are made of the world's material: pressed leaves on the lush world, faceted crystal cells on the crystalline world, hard rust plates on the rust world, a softly lit sample on the moon. One tint variable (`--planet`) colours every control, rule and readout so the instrument always reads as belonging to the world it sits on. Density is a progression: orbit is sparse and large, the cloud deck carries featured work large, lower bands hold the full record compactly.

The system is always dark, regardless of site theme. Motion is scroll-bound and cheap; nothing loops on a section page, and every transition is removed under reduced motion while the sky's fade (opacity) is kept.

**Key Characteristics:**
- One instrument chrome, four world materials.
- Every world page is a vertical descent: orbit, deck, lower bands, touchdown.
- A single per-world tint drives every accent; the cyan instrument colour is the neutral fallback.
- Space Grotesk carries reading; IBM Plex Mono carries instruments.
- Real numbers are the largest type on the page after the title.

## Colors

A near-black space with one tint at a time: the world you are on, or instrument cyan when you are on none.

### Primary
- **Instrument Cyan** (hud-cyan): the neutral accent. Top-bar sub-label, the name-plate diamond, the landing's corner brackets, and the whole tint on pages with no world (overview, 404) and the landing. On a world page it is replaced by that world's colour through `--planet`.

### Secondary
- **Dossier Amber** (dossier-amber): reserved for the résumé control in the top bar. It is the only accent that does not change with the world, so the résumé is findable from every page.

### Tertiary (the four world tints)
- **Lush Moss** (lush-moss): About. Section headings, bullets, rule, readout, proof numbers.
- **Crystal Blue** (crystal-blue): Projects. Also the cold top edge of every crystal cell unless the project carries its own `--accent-rgb`.
- **Rust Ember** (rust-ember): Experience. Also the 3px top band of every rust plate and the strata rules.
- **Moon Violet** (moon-violet): Contact. Lit edge and glow of the moon sample.

Each world also owns an **air**: a full-page vertical gradient from deep-space at the top into its own dark atmosphere (green haze, refracting blue with fine 62deg striations, rust dust bands at 176deg, near-airless violet). Air values live in `src/lib/planets.ts` (`descent.air`), not in CSS, so a world's identity has one source.

### Neutral
- **Deep Space** (deep-space): page base, top bar fill, the altitude readout's backing, solid-button text.
- **Control Base** (control-base): the opaque base under tinted outline buttons, so labels hold contrast over any air.
- **Starlight** (starlight-text): headings, titles, values, field text.
- **Haze** (haze-muted): body copy and intros. Solid, not alpha, so contrast holds on every panel tint.
- **Instrument Label** (instrument-label): mono captions, proof captions, zone and altitude secondary lines.
- **Panel Glass** (panel-glass): the base panel fill before a world material overrides it (overview, 404, landing target card).

### Named Rules
**The One Tint Rule.** A surface carries exactly one hue at a time: its world's `--planet`, or cyan when it has no world. Only the résumé amber and a project's own `--accent-rgb` (on its card edge, index mark and stat) are allowed beside it. The per-project colour is a confirmed product decision (Laith, 2026-10-17), kept even though a critique argued it fights the crystal palette.

**The Softened Heading Rule.** Section headings use the world tint mixed 72% toward starlight (`color-mix(in oklab, var(--planet) 72%, var(--hud-text))`) and outline-button text mixes 85% toward white, so every world stays above 4.5:1 on its panel.

## Typography

**Display Font:** Space Grotesk (with system-ui)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace)

**Character:** A geometric grotesk for everything a person reads, a technical mono for everything an instrument reports. The two never swap jobs.

### Hierarchy
- **Display** (600, clamp(38px, 7vw, 68px), 1): the page title in the orbit block, beside the small planet body.
- **Proof** (600, 36px, 1; 28px under 760px): the orbit's headline numbers in the world tint. The lead featured project's stat goes to 64px (40px on phones); other card stats are 28px.
- **Headline** (600, 24px): one per band, in the softened world tint.
- **Title** (600, 16px): panel headings; featured cards step to 21px, the lead build to 28px; index rows 17px.
- **Lead** (400, 19px, 1.5, max 52ch): the one-line who under the title.
- **Body** (400, 16px, 1.65, max 68ch): all paragraphs, in haze. Lists use a 9px hairline dash in the world tint instead of bullets.
- **Label** (mono 500, 11px, 0.12em, uppercase): captions, dates, proof labels, zone names, project kind lines.
- **Control** (mono 600, 12px, 0.12em, uppercase): buttons, pills, the altitude readout.

### Named Rules
**The Instrument Voice Rule.** Mono is for readouts, labels and controls only. Paragraphs, headings and titles are always Space Grotesk; panel titles read in sentence case even when the data stores them in caps.

**The Numbers Lead Rule.** After the page title, the largest type on a world page is a real figure, never an adjective.

## Layout

A single centred content column (max 1060px plus the gutter) with a 150px left gutter that holds the altitude rule. Content starts 128px below the top of the page to clear the fixed top bar. Each section is a **band** 112px below the last; a band's zone name sits on the rule beside its heading (no km: the sticky readout is the page's only altitude figure) and fades out once the readout reaches it. The deck band paints a full-bleed stratum of the world's air behind itself, extending 72px above and below.

Story order is fixed: orbit (planet, title, who, three-number proof row; About is led by the person instead, Contact by the address), the deck (featured work, large), lower bands (the full record, compact), then a 78vh touchdown where the planet's horizon arc rises and a single arrival card sits on it.

Grids are deliberately uneven per world: Projects runs a 2-column deck where the lead build spans the full width with copy and proof side by side; About's leaves sit in 7fr/5fr pairs or one broad leaf over two; Experience stacks one plate per posting, never half-filled columns; the mission log is a 96px date column beside the entry. Gaps are 18px in grids and 20-22px in decks.

Responsive: between 981px and 1640px the column reserves 210px on the right for the waypoint rail (176px at 1180px). At 980px the rail moves into the top bar as a four-up strip and the gutter narrows to 112px. At 760px the gutter collapses to a thin left edge, the readout runs vertically up it, band marks hide, every grid goes single-column (the game shelf goes two-up, titles only), proof rows stay three across with values top-aligned, the résumé iframe gives way to its link, and bands tighten to 80px apart. Focus and in-page jumps clear the fixed bar via `scroll-padding-top` (112px, 140px under 980px).

## Elevation & Depth

Depth comes from atmosphere and material, not a shadow scale. The fixed sky (stars, the world's sky layers and wash) drifts up 45vh and fades to 10% as `--descent` runs 0 to 1, while the page background brightens into the world's air; that parallax is the primary depth cue. Panels are lifted by their material: soft, very low drop shadows on the lush leaves and rust plates, and inset light edges on crystal and moon. The only glows are the small tint glows on status dots, the active waypoint tick and the scroll fill.

### Shadow Vocabulary
- **Leaf lift** (`0 24px 46px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(214,232,178,0.1)`): lush panels.
- **Plate lift** (`0 16px 32px -20px rgba(0,0,0,0.85)`): rust panels.
- **Crystal edge** (`inset 0 2px 0 rgb(var(--accent-rgb, 127,182,255)), inset 0 0 0 1px rgba(127,182,255,0.14)`): crystal cells.
- **Moonlight** (`inset 1px 1px 0 rgba(236,222,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.45)`): moon panels, lit from the upper left.
- **Tint glow** (`0 0 10-12px var(--planet)`): dots, active tick, scroll fill only.

### Named Rules
**The Air Is The Depth Rule.** A page gets deeper by scrolling through its air, never by stacking shadows. No panel gets a shadow its world's material does not explain.

## Shapes

Instruments are nearly square (2px): buttons, pills, tags, fields, media frames. The base panel is 4px. Each world then reshapes its panels:
- **Lush:** leaves, no border, opposite corners curled (30px/6px), alternating direction across a pair; the portrait is an organic 40%/12% blob.
- **Crystalline:** square, clipped to cut-corner polygons (16px and 38px facets), each of the three featured cells breaking along different lines, with hard-stopped facet planes of light inside.
- **Rust:** square plates (0 radius), a 1px rust border and a heavy 3px rust top band.
- **Moon:** a soft 20px rounded sample.

The one directional mark is a 12px stroked chevron (1.5px, round caps), rotated for disclosure (90deg) or up (-90deg). Index rows carry a 6px rotated square in the project's own colour.

## Components

### Buttons
Squared instrument controls with a 44px minimum target.
- **Shape:** near-square (2px).
- **Primary (solid):** filled with the world tint, deep-space text; hover goes to white.
- **Secondary (outline):** 1px tint border at 45%, an 8% tint wash over the opaque control base, label in tint mixed 85% toward white; hover raises the wash to 20% and the label to starlight.
- **Dossier:** the amber outline résumé control, top bar only.
- **Focus:** a 2px ring in the world tint, offset 3px, on every link, button and summary.

### Chips
- **Tags:** mono 11px, 1px tint border at 30%, 6% tint wash, near-white text, wrapped with 7px gaps.

### Cards / Containers
- **Panel:** padding 22px 24px; featured cards 26px 24px 24px, each sized to its own content (no forced equal heights, so a short card never carries dead air). Material, corner and shadow come from the world (see Shapes and Elevation).
- **Index row:** the compact record. A hairline-ruled list on a dark backing (`rgba(6,10,22,0.62)`) so it holds contrast as the air brightens; summary grid of mark, title plus tagline, right-aligned stat, chevron; expands in place.
- **Stratum:** a dated row (96px date column). Neutral by default (tint hairline, panel fill), so /overview's work band can use it; on the rust world it becomes rock layers, a rust top rule and alternating deeper fills.

### Inputs / Fields
- **Style:** 1px slate border, near-black fill, 2px corners, Space Grotesk 16px.
- **Focus:** border goes to the world tint; keyboard focus adds the 2px offset ring. (The form is built but not mounted.)

### Navigation
- **Top bar:** fixed, opaque deep-space with a 24px fade below. Name plate (cyan diamond, Space Grotesk 15px bold tracked caps, mono sector line), then HOME and RÉSUMÉ (on the landing, OVERVIEW and RÉSUMÉ). A skip link is the first focus stop on every HudPage.
- **Waypoint rail:** four mono pills fixed at the right edge, min 158px. The current world is a position marker, not a link: tinted border and wash with a glowing filled tick. Below 980px it becomes a four-up strip under the bar showing short labels; the landing gets the same strip below 760px, where its pills fly the camera.

### Altitude Rule and Readout (signature)
A 1px rule down the gutter, fading from 12% to 70% tint. A sticky deep-space box with a tint hairline reads `ALT <n> KM` in tint over the current zone name in label grey, tabular figures, counting down from the world's own altitude (120, 400, 250 or 12 km) as the page scrolls. It hides at touchdown, where the ground's own "0 km" takes over.

### Touchdown and Launch (signature)
The planet's horizon arc (220vmax circle) rises into the bottom of the page. A centred card on deep-space at 82% with a tint top hairline holds "Next: <next world>" in the destination's colour (Space Grotesk 28px), the destination's teaser, a mono "Landed on <world> · 0 km" line, and a quiet underlined link to /overview. Activating it plays a full-screen radial fade in the destination's colour, then routes. The last world ends the route instead of looping: "Write to me" (mailto) with the address in the teaser, then "Back to the start" and the overview link.

### Orbit Block (signature)
An 84px planet body beside the display title, a lead line, then a definition-list proof row of three figures (value above caption, 18px by 44px gaps). Each figure is an outcome with one home, where it happened; a page with no figure of its own (About, Contact) shows none rather than a fact dressed as proof.

### Control vocabulary
One label per action on every route: **Home** (to `/`), **Open <world>** (go to a world from the landing), **Next: <world>** (touchdown), **Overview** / "Every section on one page" (to `/overview`), **Résumé** (the PDF), **Email me** (mailto). Ship flavour lives in small metadata (sub-labels, zone names, the docking overlay), never in a control's label. No eyebrows or kickers above headings.

### Landing pitch card
At rest the card slot holds the pitch: "Laith Assaf" as the display h1 (clamp 34–50px), the two-sentence pitch, a hairline, three proof figures (value in cyan, caption in starlight) and "See the projects". It sits low (bottom 40px, 400px wide) so it clears the first planet, and it is first after the header in tab order. Planets too small to see (<44px) leave the tab order; a focused planet shows a round 3px ring.

## Do's and Don'ts

### Do:
- **Do** drive every accent from `--planet` / `--planet-rgb`, and read world colour, air, sky and horizon from `src/lib/planets.ts`.
- **Do** build each world page as orbit, deck, lower bands, touchdown, with every band hung off the altitude rule.
- **Do** make panels from their world's material: leaves, crystal cells, rust plates, the moon sample.
- **Do** keep body text in solid haze (#b9c3d2) and soften tinted headings 72% toward starlight so every world clears 4.5:1.
- **Do** give every control a 44px minimum target and the 2px tint focus ring.
- **Do** disable every animation and transition under reduced motion, keeping only the sky's opacity fade.

### Don't:
- **Don't** put a uniform grid of identical tinted cards on a world page; the deck leads with one large build and the record goes compact.
- **Don't** add a background grid, vignette, ticks on panels, or `//` kicker lines to a world page.
- **Don't** introduce a second accent hue beside the world tint, other than résumé amber and a project's own colour.
- **Don't** set paragraphs or headings in the mono, or controls in the grotesk.
- **Don't** fake project imagery, screenshots or figures; a panel without a real number or source shows nothing in its place.
