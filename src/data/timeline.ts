// src/data/timeline.ts
// The mission log rendered on /experience.

export interface LogEntry {
  /** Stardate-style marker shown in the rail. */
  date: string;
  title: string;
  /** Short classification shown beside the title. */
  role?: string;
  /** The role's outcome in one line, for /overview's work band. */
  summary?: string;
  bullets: string[];
}

export const MISSION_LOG: LogEntry[] = [
  {
    date: "2026",
    title: "Going Enterprise",
    role: "Delta Dental · PC Technician Intern",
    summary: "LLM agents in 3 Power Automate workflows; one workflow saves $11K a year.",
    bullets: [
      "Joined Delta Dental's Onsite Support Team as a PC Technician Intern in May",
      "Began the Pokémon battle agent and the Raspberry Pi TV launcher",
    ],
  },
  {
    date: "2025",
    title: "Taking Leadership",
    role: "MSU AI Club · Workshop Coordinator",
    summary: "8+ technical workshops for 500+ attendees, rated 4.8/5.",
    bullets: [
      "Became Workshop Coordinator for the MSU AI Club",
      "Built a real-time audio classifier for the hearing-impaired at MHacks 2025",
      "Began building the open-source Ember framework for multiplayer party games",
    ],
  },
  {
    date: "2024",
    title: "Deepening Expertise",
    bullets: [
      "Began attending MSU AI Club workshops",
      "Contributed to an ML-based Unity game development project",
      "Created adaptive AI that responds to player fighting styles",
    ],
  },
  {
    date: "2023",
    title: "First IT Posting",
    role: "MSU College of Osteopathic Medicine · IT and Media Services",
    summary: "Three years supporting 100+ classroom AV systems for 1,200+ students.",
    bullets: [
      "Started as an IT and Media Services Support Associate in May, a role held until May 2026",
      "Supported 100+ classroom AV and conferencing systems across 4 buildings serving 1,200+ students",
      "Began running a rack server with containerized media, game, and VPN services under Docker",
    ],
  },
  {
    date: "2022",
    title: "Discovering My Path",
    bullets: ["Enrolled at Michigan State University in August"],
  },
  {
    date: "BEYOND",
    title: "Future Aspirations",
    bullets: [
      "Graduate in May 2027 with a B.S. in Computer Science (AI/ML concentration) and a minor in Economics",
      "Start a full-time role in AI/ML or software engineering",
    ],
  },
];
