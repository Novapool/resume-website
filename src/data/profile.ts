// src/data/profile.ts
// Identity + copy shared across the section pages, so a content change lands
// in one place instead of three page components.

export const PROFILE = {
  name: "Laith Assaf",
  tagline: "CS (AI/ML) @ Michigan State · MHacks 2025 2nd Place · IT @ Delta Dental",
  email: "assaflai@msu.edu",
  github: "https://github.com/Novapool",
  linkedin: "https://www.linkedin.com/in/laith-assaf-/",
  resume: "/documents/resume.pdf",
  photo: "/images/profile.jpg",
} as const;

export const BIO = [
  "I'm a senior at Michigan State University studying Computer Science with a concentration in AI/ML and a minor in Economics, graduating in May 2027. I'm looking for full-time entry-level roles in AI/ML and software engineering.",
  "I'm a PC Technician Intern at Delta Dental, where I build LLM agents in Copilot Studio and Power Automate. On my own time I train a reinforcement learning agent for Pokémon battles and build agent orchestration tooling on Claude Code. I'm also Workshop Coordinator for the MSU AI Club.",
];

export interface Dossier {
  label: string;
  body: string;
}

export const WORKING_STYLE: Dossier[] = [
  {
    label: "WORKING STYLE & VALUES",
    body: "I do my best work when I get to architect the solution, not just implement it, and I like code that's efficient and documented well enough for someone else to pick up cold. I'm a big believer in open source: I love that people share software for anyone to use, and I like giving back by publishing my own.",
  },
  {
    label: "PROBLEM-SOLVING APPROACH",
    body: "Evidence-based trial and error. I decide what \"working\" means before I build, then test, measure, and iterate until the numbers say it's done. Every attempt gets written down, including the dead ends, so each round starts from what the last one actually proved instead of what I remember.",
  },
];

export const BEYOND_TECH: Dossier[] = [
  {
    label: "HOBBIES & INTERESTS",
    body: "Outside of programming I enjoy traveling, video games, and tinkering with hardware. I'm also an avid cook, preferring ingredients and techniques I've never encountered before. That curiosity even inspired FusionFeast, an app that creates fusion recipes by blending elements of different cuisines.",
  },
  {
    label: "INSPIRATION IN AI",
    body: "My interest in AI was sparked by DALL·E and deepened through exploring ChatGPT. I'm captivated by how these technologies tackle complex problems and open new possibilities across domains.",
  },
  {
    label: "COMMUNITY",
    body: "I compete in hackathons, and placed 2nd of 300+ participants at MHacks 2025 with a real-time audio classifier. As Workshop Coordinator for the MSU AI Club I've delivered 8+ technical workshops to 500+ attendees.",
  },
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "Machine Learning",
    skills: ["PyTorch", "NumPy", "pandas", "scikit-learn", "Reinforcement Learning", "CNNs"],
  },
  {
    category: "LLMs & Agents",
    skills: [
      "LLM APIs (Anthropic, OpenAI)",
      "Copilot Studio",
      "Power Automate",
      "MCP",
      "Agent Orchestration",
      "Ollama",
      "Evaluation",
    ],
  },
  {
    category: "Languages & Backend",
    skills: [
      "Python",
      "TypeScript",
      "SQL",
      "C++",
      "C#",
      "FastAPI",
      "Flask",
      "PostgreSQL",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    category: "Infrastructure",
    skills: ["Docker", "Linux", "Git", "GitHub Actions CI", "MLflow", "Railway", "Vercel"],
  },
];

export type BoulderingClip =
  | { kind: "video"; src: string; poster: string; caption: string }
  | { kind: "photo"; src: string; alt: string; caption: string };

export const BOULDERING_CLIPS: BoulderingClip[] = [
  {
    kind: "video",
    src: "/videos/bouldering-1.mp4",
    poster: "/images/bouldering-1-poster.jpg",
    caption: "Me totally crushing this climb.",
  },
  {
    kind: "photo",
    src: "/images/bouldering-bat-hang.webp",
    alt: "Laith hanging upside down by his feet from a bouldering wall, grinning",
    caption: "Bat hang — hanging around between sends.",
  },
];

export interface Game {
  title: string;
  cover: string;
  blurb: string;
}

export const GAMES: Game[] = [
  {
    title: "Baldur's Gate 3",
    cover: "/images/games/bg3.jpg",
    blurb:
      "Really interesting gameplay. I like the top-down view, the story is phenomenal, and you basically have infinite choices in how you play.",
  },
  {
    title: "Clair Obscur: Expedition 33",
    cover: "/images/games/clair-obscur.png",
    blurb:
      "One of the most interesting and fantastic art styles I've seen, with an amazingly compelling story.",
  },
  {
    title: "Cities: Skylines II",
    cover: "/images/games/cs2.webp",
    blurb:
      "One of my ADHD architect automation addictions. It hits that sweet spot of automating and building a large-scale system.",
  },
  {
    title: "Cyberpunk 2077",
    cover: "/images/games/cyberpunk-2077.jpg",
    blurb: "Just an overall really great story with good gameplay and beautiful graphics.",
  },
  {
    title: "Dota 2",
    cover: "/images/games/dota-2.jpg",
    blurb:
      "My guilty pleasure and the game I have the most hours on, and really fun to play with friends.",
  },
  {
    title: "Elden Ring",
    cover: "/images/games/elden-ring.jpg",
    blurb:
      "Amazing soundtrack and fantastic gameplay. The story is a little confusing, but playing with different builds makes it a blast.",
  },
  {
    title: "God of War Ragnarök",
    cover: "/images/games/god-of-war-ragnarok.jpg",
    blurb:
      "The best story in any game I've ever played, with beautiful storytelling and amazing character development. A fantastic finish to Kratos's story.",
  },
  {
    title: "Marvel Rivals",
    cover: "/images/games/marvel-rivals.jpg",
    blurb: "Just a fun game to play with friends that hits that competitive itch.",
  },
  {
    title: "Satisfactory",
    cover: "/images/games/satisfactory.jpg",
    blurb:
      "Like Cities: Skylines, it hits that automation and large-scale systems itch.",
  },
];

export interface Specialization {
  title: string;
  body: string;
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    title: "AI & Machine Learning",
    body: "Reinforcement learning and imitation learning in PyTorch, real-time audio classification with on-device inference, and experiment tracking in MLflow.",
  },
  {
    title: "LLM Agents & Automation",
    body: "LLM agents in Copilot Studio and Power Automate, a multi-agent development pipeline on Claude Code, and local LLMs served with Ollama.",
  },
  {
    title: "Backend & Infrastructure",
    body: "FastAPI, Flask, and Express backends over WebSockets, containerized with Docker and deployed on Linux, Railway, and Vercel.",
  },
];
