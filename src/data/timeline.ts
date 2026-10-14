// src/data/timeline.ts
// The mission log rendered on /experience.

export interface LogEntry {
  /** Stardate-style marker shown in the rail. */
  date: string;
  title: string;
  /** Short classification shown beside the title. */
  role?: string;
  bullets: string[];
}

export const MISSION_LOG: LogEntry[] = [
  {
    date: "2026",
    title: "Going Enterprise",
    role: "Delta Dental · PC Technician Intern",
    bullets: [
      "Joined Delta Dental's Onsite Support Team as a PC Technician Intern in May",
      "Built LLM agents in Copilot Studio and AI Builder across 3 Power Automate workflows",
      "Shipped an asset management workflow saving $11K annually",
      "Set up 400+ workstations after a corporate office renovation",
      "Began the Pokémon battle agent and the Raspberry Pi TV launcher",
    ],
  },
  {
    date: "2025",
    title: "Taking Leadership",
    role: "MSU AI Club · Workshop Coordinator",
    bullets: [
      "Placed 2nd of 300+ participants at MHacks 2025 with a real-time audio classifier",
      "Became Workshop Coordinator for the MSU AI Club, delivering 8+ workshops to 500+ attendees",
      "Led a 4-student team building an Academic Performance Predictor on the GPT-4 API",
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
