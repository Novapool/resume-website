# Milestones

Status markers: ✅ done · 🔄 in progress · ⬜ planned

## ✅ M1 — Content Refresh (2026-07-24)
Bring the site in sync with the updated resume, new role, and new projects.
- ✅ Add Delta Dental (PC Technician Intern) to experience/timeline
- ✅ Add Bonfire & Ember Framework project
- ✅ Add Pokémon Showdown RL Agent project (links to `pokemon-showdown-ai` repo)
- ✅ Update skills (Node.js, Express, Socket.io, Railway, Vercel, Active Directory, Intune, Power Automate)
- ✅ Refresh hero tagline, bio, and specialization cards
- ✅ Swap featured project Nexus → Bonfire on home page
- ✅ Update page metadata (title/description)
- ✅ Replace embedded resume PDF with the latest version
- ✅ Fix dead `/contact` link → `/about`

## 🔄 M2 — Frontend / Visual Refresh (Phase 2)
Redesign the look and feel while keeping the content from M1.
- ✅ Define design direction — **"Space Navigator"** nav-computer flythrough
      (handoff in `archived/design_handoff_space_navigator/`)
- ✅ Build the Space Navigator landing page at `/` (scroll-driven z-axis flight,
      HUD, four planet portals into About / Projects / Experience / Contact)
- ✅ Restyle every section page to the nav-computer HUD language, with a
      per-world identity for each planet (`src/lib/planets.ts` is the single
      source of truth shared by the landing scene and the pages)
- ✅ Split Experience and Contact into their own routes
- ✅ Retire the terminal boot loader (kept in-repo, no longer mounted)
- ⬜ Audit animations for performance (mobile/Safari)
- ⬜ Improve responsive behavior and accessibility (contrast, focus states)

## ✅ M3 — Content Architecture Cleanup (2026-07-24)
Reduce duplication so future updates touch one place.
- ✅ Extract projects/skills/timeline/social links into a central `src/data/` module
- ✅ De-duplicate featured-project content (`FEATURED_PROJECTS` in `src/data/projects.ts`)
- ✅ De-duplicate social/contact links (`PROFILE` in `src/data/profile.ts`)

## ⬜ M4 — Functional Gaps
- ⬜ Wire the contact form to a real backend/email endpoint (currently simulated)
- ⬜ Confirm the correct MSU email (site uses `assaflai@msu.edu`)
- ⬜ SEO/social: Open Graph tags, favicon, sitemap
