// src/data/timeline.ts
// The role plates and the mission log rendered on /experience.

export interface Role {
  /** "Org · Title", shown as the plate's label. */
  label: string;
  /** Date range, shown in the plate's corner. */
  dates: string;
  /** Team and place, when the role has one. */
  sub?: string;
  bullets: string[];
  /** Behind the "More from this role" disclosure. */
  more?: string[];
}

// Newest first; current roles lead.
export const ROLES: Role[] = [
  {
    label: "Delta Dental · PC Technician Intern",
    dates: "MAY 2026 – NOW",
    sub: "Onsite support team · Okemos, MI",
    bullets: [
      "Built LLM agents in Copilot Studio and AI Builder across 3 Power Automate workflows, converting natural-language requests into structured records using live Ivanti asset and user data retrieved via API",
      "Shipped an asset management workflow to production, saving 5 minutes per run and $11K annually",
      "Shipped an agent that parses incoming emails and updates the matching tickets, rolled out across IT teams",
      "Imaged and configured 100+ endpoints through Ivanti, enrolling each device in Active Directory and Intune so it reached its user with policy applied, and backing up and wiping each drive at the end of the device lifecycle",
    ],
    more: [
      "Resolved 100+ tickets spanning laptop upgrades and hardware faults, restoring locked-out users through Azure BitLocker recovery and CyberArk credential access, and tracing network port issues with Cisco DDI",
      "Set up 400+ workstations (desks, monitors, docking stations, and peripherals) after a corporate office renovation",
    ],
  },
  {
    label: "MSU AI Club · Workshop Coordinator",
    dates: "JAN 2025 – NOW",
    bullets: [
      "Delivered 8+ technical workshops on local LLM deployment (Ollama, LM Studio), AI ethics, and ML fundamentals (PyTorch) to 500+ attendees across 15 sessions, recording 90% retention and a 4.8/5 satisfaction score",
    ],
    more: [
      "Built and taught a multi-agent orchestrator demo coordinating Scope, Architecture, Builder, and Reviewer agents to plan and generate a web application from a one-line idea, used as live workshop material",
      "As Project Lead (Jan to May 2025), led a 4-student team building an Academic Performance Predictor on the GPT-4 API, shipping course-level predictions across 50+ courses",
    ],
  },
  {
    label: "MSU · IT and Media Services Support Associate",
    dates: "MAY 2023 – MAY 2026",
    sub: "College of Osteopathic Medicine · East Lansing, MI",
    bullets: [
      "Supported 100+ classroom AV and conferencing systems across 4 buildings serving 1,200+ students",
      "Resolved 50–70 tickets weekly at a 5–10 minute average response time, maintaining 99.5% uptime during live lectures through a documented troubleshooting process for network, display, audio routing, and Zoom failures",
    ],
  },
];

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
      "Trained a PPO combat enemy in Unity ML-Agents for an MSU AI Club game",
    ],
  },
  {
    date: "2023",
    title: "First IT Posting",
    role: "MSU College of Osteopathic Medicine · IT and Media Services",
    summary: "Three years supporting 100+ classroom AV systems for 1,200+ students.",
    bullets: [
      "Started in IT and Media Services at the MSU College of Osteopathic Medicine in May",
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
