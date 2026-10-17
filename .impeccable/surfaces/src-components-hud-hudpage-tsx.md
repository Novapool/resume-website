---
version: 1
slug: "src-components-hud-hudpage-tsx"
primary_target: "src/components/hud/HudPage.tsx"
related_targets: ["src/components/site/about-page.tsx","src/components/site/projects-page.tsx","src/components/site/experience-page.tsx","src/components/site/contact-page.tsx"]
---

# Surface brief: section pages (About, Projects, Experience, Contact)

Scope: the four world pages plus the shared HudPage frame. Mode: Experience; the work leads.
Audience and job: a recruiter skims (who he is plus headline proof in one screen); an engineer descends for depth.
Proof: the real numbers in src/data/ (93% win rate, 44 repos, 2nd of 300+, 80%+ reuse). No fabricated imagery or claims.
Untouched in M6: landing `/`, `/overview` structure, the 404, copy in src/data/, the planets in planets.ts (extended, not changed). M7 (critique gaps) then touched the landing pitch card, /overview, control labels and some src/data lines; see MILESTONES.md.
Decided at build: each world has its own altitude scale (the moon's descent is short). About keeps its personal sections, folded into one lower band.
Open: project imagery (none exists; do not fake it).
Exemption (M7): About has no proof row. Every number that fit there either contradicted Projects (repo counts) or repeated a stat whose home is another page, so About is led by the portrait and bio.
Exemption (finish review, fix 5): Contact has no proof row. It is the finale, and the email address itself is the page's proof and action; Projects and Experience each carry three real figures.

## Direction contract
THESIS: Every section page continues the landing's flight: the visitor descends from orbit to the planet's surface, and the work is what they pass on the way down. It refuses a 46vh hero over a uniform grid of tinted cards.
OWN-WORLD: A dark-space top that thins into each world's own air as you scroll (humid green haze, thin refracting blue, rust dust bands, airless violet dark). Panels are made of the world's material: faceted crystal cells, hard rust plates, soft organic sheets, a softly lit moon sample. One altitude rule runs down the left of the content with a sticky km readout. The planet's horizon arc is the ground the page lands on. No grid, vignette, panel ticks or `//` kickers.
STORY: Orbit tells who and shows the headline proof. The cloud deck carries the featured work, large. Lower bands hold the full record, compact. Touchdown offers a launch to the next world.
FIRST VIEWPORT: The top bar, then the orbit block: small planet body, a 64px title, a one-line who, and a 3-number proof row. The altitude rule on the left reads ALT <n> KM · ORBIT. The top of the cloud-deck band shows below the fold line at 1440×900.
FORM: Descent, #1 on my ordered list (dealt 3,7,1; chosen from the dealt hand). seed:d08717228390875b
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
