// src/data/projects.ts
// Constructed worlds — rendered on /projects, with the featured two also
// surfaced on /overview.

export interface Project {
  /** Catalogue designation shown in the HUD, e.g. `PRJ-001`. */
  code: string;
  title: string;
  /** One-line classification under the title. */
  kind: string;
  description: string;
  tags: string[];
  github?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    code: "PRJ-001",
    title: "SoundSense",
    kind: "MHacks 2025 Winner · Real-time audio classification",
    description:
      "Real-time audio classification for hearing-impaired users, built against 300+ participants. YAMNet CNN at 95% accuracy with <50ms latency, on a Flask/WebSocket backend.",
    tags: ["Python", "YAMNet", "Flask", "WebSocket", "ML"],
    github: "https://github.com/Novapool/sound_sense",
    featured: true,
  },
  {
    code: "PRJ-002",
    title: "Bonfire & Ember Framework",
    kind: "Open-source TypeScript framework · npm",
    description:
      '"Rails for party games," published to npm. A phase state machine, Socket.io room orchestration, and a 5-hook API driving 80%+ code reuse. Powers a Next.js platform hosting 1,000+ concurrent rooms on Express + Firebase, deployed across Vercel and Railway.',
    tags: ["TypeScript", "Node.js", "Socket.io", "Next.js", "Firebase"],
    github: "https://github.com/Novapool/ember",
    featured: true,
  },
  {
    code: "PRJ-003",
    title: "Pokémon Showdown RL Agent",
    kind: "Reinforcement learning · Competitive play",
    description:
      "An agent trained to play competitive Pokémon through high-throughput parallel simulation. PPO/DQN plus inference-time MCTS over a transformer policy, with behavior cloning on human replays. Python ML stack bridged to the JS battle sim via a vectorized gym.",
    tags: ["Python", "PyTorch", "Reinforcement Learning", "MCTS"],
    github: "https://github.com/Novapool/pokemon-showdown-ai",
  },
  {
    code: "PRJ-004",
    title: "Nexus",
    kind: "AI server management · Web SSH",
    description:
      "AI-powered server management with a web-based SSH terminal. FastAPI, AsyncSSH, and WebSocket streaming with sub-10ms latency. Reduced admin time by 70%.",
    tags: ["FastAPI", "GPT", "SSH", "AsyncIO", "Python"],
    github: "https://github.com/Novapool/Nexus",
  },
  {
    code: "PRJ-005",
    title: "AIForge",
    kind: "AI development assistant",
    description:
      "Simplifies model development with intuitive interfaces for data management, training, and visualization.",
    tags: ["Python", "Streamlit", "PyTorch", "Pandas"],
    github: "https://github.com/Novapool/AIForge",
  },
  {
    code: "PRJ-006",
    title: "Adaptive ML Combat AI",
    kind: "Unity ML-Agents",
    description:
      "A Unity ML agent that adapts to player fighting style in real time, switching between aggression and defense based on learned patterns.",
    tags: ["Unity", "ML-Agents", "C#", "AI"],
    github: "https://github.com/Novapool/ai-game",
  },
  {
    code: "PRJ-007",
    title: "GradeScape",
    kind: "Academic performance prediction",
    description:
      "Web application using Firebase, OCR, and AI to help students track and predict academic performance by analyzing their documents.",
    tags: ["React", "Firebase", "OpenAI API", "TypeScript"],
    github: "https://github.com/Novapool/grading-calendar-ai",
  },
  {
    code: "PRJ-008",
    title: "Sign Language Detector",
    kind: "Computer vision",
    description:
      "Real-time Python application using TensorFlow and OpenCV to recognize hand landmarks and interpret sign language shapes.",
    tags: ["Python", "TensorFlow", "OpenCV", "ML"],
    github: "https://github.com/Novapool/SignLanguageDetector",
  },
  {
    code: "PRJ-009",
    title: "LifeQuest",
    kind: "Gamified task management",
    description:
      "Flutter application where users complete tasks, set goals, and progress through levels.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    github: "https://github.com/Novapool/LifeQuest",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
