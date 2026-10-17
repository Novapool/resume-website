# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: recruiters, first.** They arrive from a résumé or LinkedIn link
  while screening applicants for entry-level AI/ML and software engineering
  roles. They skim quickly and must understand who Laith is and why he is
  worth a closer look within seconds.
- **Secondary: engineers and hiring managers.** They keep going past the first
  screen, before or after an interview. They need real depth: how the systems
  were built, what they achieved, and links to source.

The site has to serve both at once: instant clarity for the first group,
depth that holds up for the second.

## Product Purpose

The personal portfolio of Laith Assaf, a Computer Science (AI/ML) senior at
Michigan State graduating May 2027 and looking for full-time entry-level
AI/ML and software engineering roles.

A visit succeeds when the visitor:
- **explores project depth**, by reading a debrief or opening a repo and
  coming away convinced he can build; and
- **remembers him**, so he stands out from a stack of near-identical new-grad
  applicants.

Résumé downloads and contact are welcome outcomes but are not the primary
measures of success.

## Positioning

**He ships agent systems for real.** Laith builds LLM-agent and reinforcement
learning systems that actually run and have measured results, not tutorials:
- a Pokémon battle agent trained by imitation learning plus PPO, with MCTS at
  decision time, reaching a 93% win rate;
- a 10-agent development pipeline used across 44 repositories;
- LLM agents built into three of Delta Dental's Power Automate workflows.

A typical new-grad portfolio cannot truthfully make this claim, so it is what
every surface should be built to prove.

## Operating Context

- Visitors typically arrive from links on applications, the résumé PDF or
  LinkedIn, on desktop and on phones.
- The résumé PDF (`public/documents/resume.pdf`) is the artefact that gets
  forwarded internally. The site has to be consistent with it.
- The site is deployed on Vercel. It is a static Next.js app with no backend
  yet.

## Capabilities and Constraints

- **Routes:**
  - `/` — scroll-driven flythrough with four planet portals;
  - `/about`, `/projects`, `/experience`, `/contact` — one world each;
  - `/overview` — the flat, no-flight view;
  - a themed 404 for unknown routes.
- **Content source of truth:** all copy lives in `src/data/` (`profile.ts`,
  `projects.ts`, `timeline.ts`); worlds live in `src/lib/planets.ts`.
- **Contact form:** unmounted. Its backend is undecided (M4), and nothing may
  claim a message was sent until one exists.
- **Contact email:** `assaflai@msu.edu` stays for now. It expires after
  graduation and must be swapped before then. Open question: the résumé PDF
  renders it as `asaflai@msu.edu`; confirm which spelling is right.
- **Private repositories:** some projects have no public source. They show
  "private repository" and no link.

## Brand Commitments

- **The spaceship nav-computer concept is binding.** The four planet portals,
  the per-world identities and the flythrough landing stay. Future work evolves
  inside that world rather than replacing it.
- **The personal sections are not binding.** The bouldering clips and the game
  shelf may shrink, move or go if they weaken the pitch.
- **Voice:** first person, plain and specific, numbers over adjectives, with
  light flavour. Examples: "Small talk, run backwards", "Who's flying this
  thing".

## Evidence on Hand

- Real project data and metrics in `src/data/projects.ts`: 13 projects and
  5 hackathons, with stats such as 93% win rate, 44 repos, 2nd of 300+ at
  MHacks 2025, and 27.8 → 59.7 fps at 4K.
- Role history in `src/data/timeline.ts`: Delta Dental, MSU College of
  Osteopathic Medicine IT, MSU AI Club.
- Résumé PDF, profile photo (`public/images/profile.jpg`), one bouldering clip
  plus poster and photo, and 9 game covers.
- **No project imagery exists yet.** There are no screenshots, recordings or
  diagrams. This is an open gap, to be decided later. Future work must not
  fabricate screenshots, testimonials, employers, metrics or press.

## Product Principles

1. **Proof over claims.** Every assertion leans on a real system, number or
   repo. If it can't be shown, don't say it.
2. **Recruiter in seconds, engineer in depth.** The first screen states who he
   is and what he builds; the depth is one deliberate step away, never in the
   way.
3. **Memorable by being made.** The site's own craft is part of the evidence.
   It should feel authored, not templated.
4. **One source of truth.** Content and world identity each live in one
   place, so the site and the résumé never drift apart.

## Accessibility & Inclusion

No product-specific standard was set. The working bar from M5 is WCAG AA
contrast, full keyboard paths, visible focus, ≥44px touch targets and a real
reduced-motion path. Keep it.
