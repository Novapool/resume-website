// src/data/projects.ts
// Constructed worlds, rendered on /projects; the featured three are also
// surfaced on /overview. Featured order mirrors the AI/ML resume.

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
    title: "Real-Time Audio Classification",
    kind: "SoundSense · MHacks 2025, 2nd place",
    description:
      "Placed 2nd of 300+ participants at MHacks 2025 with a real-time audio classifier that alerts hearing-impaired users to surrounding sounds, reaching 95% accuracy at <50ms latency across 500+ sound categories. The YAMNet model runs on dedicated edge AI accelerators, so all inference happens on-device without a cloud connection, and hazard alerts stream to a live web interface through a Flask + WebSocket pipeline.",
    tags: ["Python", "YAMNet", "Flask", "WebSockets", "Edge AI"],
    github: "https://github.com/Novapool/sound_sense",
    featured: true,
  },
  {
    code: "PRJ-002",
    title: "Pokémon Battle Agent",
    kind: "Reinforcement learning · In progress",
    description:
      "Trained a battle agent by imitating human replay data, then fine-tuned it with reinforcement learning (PPO) and added MCTS at decision time to plan several moves ahead, reaching a 93% win rate against scripted baselines. Built a parallel battle-simulation and evaluation harness on the Pokémon Showdown engine, tracked every run in MLflow, and gated the shipping checkpoint in GitHub Actions CI on 5,000 evaluation battles per push against a pre-registered threshold.",
    tags: ["Python", "PyTorch", "PPO", "MCTS", "MLflow"],
    github: "https://github.com/Novapool/pokemon-showdown-ai",
    featured: true,
  },
  {
    code: "PRJ-003",
    title: "Agentic Development System",
    kind: "Multi-agent development pipeline on Claude Code",
    description:
      "A 10-agent orchestration pipeline (planner, parallel builders, then reviewer, tester, simplifier, and docs auditor) with a single transient plan file as the handoff contract, applied across 44 repositories. Instruments 11 lifecycle hook events to enforce project conventions automatically, and pairs with a tiered documentation protocol that requires every milestone to define a testable success criterion before implementation, plus 5 reusable skills for debugging, adversarial review, and requirements elicitation.",
    tags: ["Claude Code", "Subagents", "Hooks", "MCP"],
    featured: true,
  },
  {
    code: "PRJ-004",
    title: "Multiplayer Party Game Framework",
    kind: "Ember + Bonfire · Open-source TypeScript on npm",
    description:
      "Designed and published Ember, an open-source TypeScript framework for multiplayer party games (the @bonfire-ember core, server, and client npm packages). It packages a phase state machine, WebSocket room orchestration, and player lifecycle into a 5-hook API enabling 80%+ code reuse across new game builds. Multi-room orchestration runs on Express + Socket.io namespaces with Firebase Realtime DB state sync, hosting 4 concurrent games on a single Railway server.",
    tags: ["TypeScript", "Socket.io", "Next.js", "Express", "Firebase"],
    github: "https://github.com/Novapool/ember",
  },
  {
    code: "PRJ-005",
    title: "Raspberry Pi TV Launcher",
    kind: "Lumen · Rust TV launcher replacing Kodi · In progress",
    description:
      "Building a Raspberry Pi 5 TV launcher in Rust that replaces Kodi, opening Jellyfin, Steam Link, and Kodi under per-app lifecycle rules, with a Home key that returns to the launcher from inside any app. Benchmarked the first Tauri/WebKit interface at 56.6 fps with 9.8% slow frames, prototyped a Slint replacement that held 60 fps with 0.1% slow frames, and migrated the UI. Pre-rendering gradients, gloss, and shadows on the CPU raised 4K output from 27.8 to 59.7 fps.",
    tags: ["Rust", "Slint", "Linux", "Wayland"],
    github: "https://github.com/Novapool/lumen-tv",
  },
  {
    code: "PRJ-006",
    title: "AI-Powered SSH Terminal Manager",
    kind: "Nexus · Local LLM + multi-server SSH",
    description:
      "A multi-server SSH management platform pairing live terminal access with a locally hosted LLM (Ollama, gpt-oss:20b). Natural-language requests stream into suggested shell commands behind a safety validation layer, so no generated command executes unreviewed. Real-time terminal I/O runs over WebSockets with a FastAPI backend and Svelte 5 frontend, handling multi-server connection state and session lifecycle; containerized with Docker.",
    tags: ["FastAPI", "Svelte", "Ollama", "WebSockets", "Docker"],
    github: "https://github.com/Novapool/Nexus",
  },
  {
    code: "PRJ-007",
    title: "Toyota GR Cup Telemetry Analysis",
    kind: "Hackathon · Tire degradation modeling",
    description:
      "Modeled tire degradation across 3,257 laps from 7 racetracks at a hackathon, reaching R² = 0.631 with one cross-track model, with telemetry normalized into PostgreSQL.",
    tags: ["Python", "PostgreSQL", "scikit-learn"],
    github: "https://github.com/Novapool/hack_the_track",
  },
  {
    code: "PRJ-008",
    title: "Academic Performance Predictor",
    kind: "GradeScape · MSU AI Club team project",
    description:
      "Led a 4-student team building an academic performance predictor on the GPT-4 API and prompt engineering, shipping course-level predictions across 50+ courses on agile sprints.",
    tags: ["React", "Firebase", "OpenAI API", "TypeScript"],
    github: "https://github.com/Novapool/grading-calendar-ai",
  },
  {
    code: "PRJ-009",
    title: "AI Model Development Assistant",
    kind: "AIForge",
    description:
      "Simplifies model development with interfaces for data management, training, and visualization.",
    tags: ["Python", "Streamlit", "PyTorch", "Pandas"],
    github: "https://github.com/Novapool/AIForge",
  },
  {
    code: "PRJ-010",
    title: "Adaptive Game Combat AI",
    kind: "Unity ML-Agents",
    description:
      "A Unity ML agent that adapts to the player's fighting style, switching between aggression and defense based on learned patterns.",
    tags: ["Unity", "ML-Agents", "C#"],
    github: "https://github.com/Novapool/ai-game",
  },
  {
    code: "PRJ-011",
    title: "Sign Language Detector",
    kind: "Computer vision",
    description:
      "Python application using TensorFlow and OpenCV to recognize hand landmarks and interpret sign language shapes.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    github: "https://github.com/Novapool/SignLanguageDetector",
  },
  {
    code: "PRJ-012",
    title: "Gamified Task Manager",
    kind: "LifeQuest · Flutter app",
    description:
      "Flutter application where users complete tasks, set goals, and progress through levels.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    github: "https://github.com/Novapool/LifeQuest",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
