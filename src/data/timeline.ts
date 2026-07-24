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
      "Joined the Onsite Support Team as a PC Technician Intern",
      "Deployed and configured 150+ workstations across a new corporate office buildout",
      "Building an automated ticket-creation workflow in Power Automate to streamline IT ops",
      "Continued scaling Bonfire and Ember toward production",
    ],
  },
  {
    date: "2025",
    title: "Taking Leadership",
    role: "MSU AI Club · Workshop Coordinator",
    bullets: [
      "Won MHacks 2025 with SoundSense against 300+ participants",
      "Appointed to the AI Club board as Workshop Coordinator, leading 8+ workshops for 500+ attendees",
      "Led a 4-student team building GradeScape on the GPT-4 API",
      "Began building the open-source Ember framework and the Bonfire party-game platform",
    ],
  },
  {
    date: "2024",
    title: "Deepening Expertise",
    bullets: [
      "Joined the MSU AI Club and found a community of like-minded builders",
      "Attended advanced workshops, expanding theoretical knowledge",
      "Contributed to an ML-based Unity game development project",
      "Created adaptive AI that responds to player fighting styles",
    ],
  },
  {
    date: "2023",
    title: "Pivotal Career Shift",
    role: "MSU College of Osteopathic Medicine · IT",
    bullets: [
      "Switched majors to Computer Science after discovering a natural aptitude",
      "Secured an IT position at the MSU College of Osteopathic Medicine",
      "Built a first ML project: a Sign Language Detector using TensorFlow and OpenCV",
      "Attended a first hackathon at UofM, creating a motion-responsive music app",
    ],
  },
  {
    date: "2022",
    title: "Discovering My Path",
    bullets: [
      "Enrolled at Michigan State University as a Finance major",
      "Took a first programming class, which sparked an unexpected passion for code",
    ],
  },
  {
    date: "2018 — 2022",
    title: "Building Foundations",
    role: "Brother Rice High School",
    bullets: [
      "Debate Team — earned the Speech Award at graduation",
      "Model United Nations, developing a global perspective",
      "Member of Quiz Bowl and the Snowboarding Team",
    ],
  },
  {
    date: "BEYOND",
    title: "Future Aspirations",
    bullets: [
      "Continue developing innovative personal projects",
      "Refine ideas toward potential startup opportunities",
      "Deploy applications that provide real value to users",
    ],
  },
];
