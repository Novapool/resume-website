# In Progress

## Current Work
None active. **M1 (Content Refresh)** is complete. The next planned effort is **M2 — Frontend / Visual Refresh** (not yet started).

## Active Plan
No active implementation plan. M2 needs a design direction decided before work begins (see `MILESTONES.md` → M2).

## Recently Completed
- **Content Refresh (2026-07-24):** Synced the site to the updated resume.
  - Added Delta Dental (PC Technician Intern) to the About journey timeline (new "2026" entry) and bio.
  - Added two projects to `projects.tsx`: **Bonfire & Ember Framework** (links to public `ember` repo) and **Pokémon Showdown RL Agent** (private repo — renders a disabled "Private Repository" button; `github` field is now optional via a new `Project` type).
  - Updated skills in `home.tsx` (added Node.js, Express, Socket.io, Railway, Vercel, Active Directory, Intune, Power Automate; renamed "Infrastructure" → "Infrastructure & IT").
  - Refreshed hero tagline, bio, and "Systems & Infrastructure" specialization card; swapped featured project Nexus → Bonfire.
  - Updated `layout.tsx` metadata; replaced `public/documents/resume.pdf` with the latest export; fixed dead `/contact` link → `/about`.
  - Verified: `npm run lint` clean, `npm run build` succeeds.

## Blockers
- **Email verification:** site uses `assaflai@msu.edu`; the resume PDF text renders as `asaflai@msu.edu`. Left as-is — confirm which is correct.
- **M2 design direction** undecided (user chose "content first, refresh later").

## Next Steps
1. Decide design direction for the M2 visual refresh.
2. (Optional, M3) Extract hardcoded content into `src/data/` to kill the duplication between `home.tsx`, `projects.tsx`, and `about-contact.tsx`.
3. (Optional, M4) Wire the contact form to a real backend.
