// src/data/pages.ts
// Per-route copy for <head>, link previews and the generated OG images.
// Kept plain on purpose: this is what a recruiter sees in a pasted link,
// before any of the nav-computer theme has loaded.

import { PROFILE } from "./profile";

export type PageKey =
  | "home"
  | "overview"
  | "about"
  | "projects"
  | "experience"
  | "contact";

export interface PageMeta {
  path: string;
  /** <title>; every route but home gets the " | Laith Assaf" suffix. */
  title: string;
  description: string;
  /** Large line on the OG image. */
  ogHeadline: string;
  /** Supporting line under it. */
  ogLine: string;
}

export const PAGES: Record<PageKey, PageMeta> = {
  home: {
    path: "/",
    title: "Laith Assaf | AI/ML Software Engineer",
    description:
      "CS (AI/ML) senior at Michigan State building LLM agents and reinforcement learning systems that run, with measured results. Graduating May 2027.",
    ogHeadline: PROFILE.name,
    ogLine: "I build LLM agents, reinforcement learning systems, and real-time backends.",
  },
  overview: {
    path: "/overview",
    title: "Overview",
    description:
      "Laith Assaf's portfolio on one page: proof figures, skills, selected projects and work history.",
    ogHeadline: "The whole portfolio, one page",
    ogLine: "Proof figures, skills, selected projects and work history.",
  },
  about: {
    path: "/about",
    title: "About",
    description:
      "Laith Assaf: Computer Science (AI/ML) senior at Michigan State with an Economics minor, graduating May 2027. How I work and what I do outside code.",
    ogHeadline: "About Laith",
    ogLine: "CS (AI/ML) at Michigan State, Econ minor, class of 2027.",
  },
  projects: {
    path: "/projects",
    title: "Projects",
    description:
      "A Pokémon battle agent at a 93% win rate, a 10-agent dev pipeline used across 44 repos, and hackathon builds including 2nd of 300+ at MHacks 2025.",
    ogHeadline: "Projects",
    ogLine: "An RL Pokémon agent, a 10-agent dev pipeline, a hackathon-winning audio classifier.",
  },
  experience: {
    path: "/experience",
    title: "Experience",
    description:
      "LLM agents in 3 Delta Dental Power Automate workflows, 8+ MSU AI Club workshops for 500+ attendees, and IT work at MSU.",
    ogHeadline: "Experience",
    ogLine: "LLM agents at Delta Dental, AI Club workshops, and IT at MSU.",
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description: `Write to Laith Assaf at ${PROFILE.email} about full-time AI/ML and software engineering roles, or find him on GitHub and LinkedIn.`,
    ogHeadline: "Write to me",
    ogLine: PROFILE.email,
  },
};
