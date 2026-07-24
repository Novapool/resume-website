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

## ⬜ M2 — Frontend / Visual Refresh (Phase 2)
Redesign the look and feel while keeping the content from M1.
- ⬜ Define design direction (typography, color system, spacing, motion)
- ⬜ Restyle hero, project cards, and timeline
- ⬜ Audit animations for performance (mobile/Safari)
- ⬜ Improve responsive behavior and accessibility (contrast, focus states)

## ⬜ M3 — Content Architecture Cleanup
Reduce duplication so future updates touch one place.
- ⬜ Extract projects/skills/timeline/social links into a central `src/data/` module
- ⬜ De-duplicate featured-project content shared between `home.tsx` and `projects.tsx`
- ⬜ De-duplicate social/contact links across `home.tsx` and `about-contact.tsx`

## ⬜ M4 — Functional Gaps
- ⬜ Wire the contact form to a real backend/email endpoint (currently simulated)
- ⬜ Confirm the correct MSU email (site uses `assaflai@msu.edu`)
- ⬜ SEO/social: Open Graph tags, favicon, sitemap
