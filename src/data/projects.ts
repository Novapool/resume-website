// src/data/projects.ts
// Constructed worlds, rendered on /projects in two sections (builds, then
// hackathons); the featured three are also surfaced on /overview. Featured
// order leads with the agent systems (the positioning), then the hackathon
// win, on every page that shows them.

export interface Project {
  /** Catalogue designation shown in the HUD, e.g. `PRJ-001`. */
  code: string;
  title: string;
  /** One-line classification under the title. */
  kind: string;
  /** The elevator pitch — the only copy shown on the card by default. */
  tagline: string;
  /** Full write-up, tucked behind the card's "full debrief" toggle. */
  description: string;
  /** Signature colour as `r,g,b`; re-tints the whole card. */
  accent: string;
  /** One headline number, e.g. `{ value: "93%", label: "win rate" }`. */
  stat?: { value: string; label: string };
  tags: string[];
  github?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    code: "PRJ-001",
    title: "Pokémon Battle Agent",
    kind: "Reinforcement learning · In progress",
    tagline:
      "An AI that learned Pokémon battling by watching human replays, then sharpened up with RL and look-ahead search.",
    description:
      "Trained a battle agent by imitating human replay data, then fine-tuned it with reinforcement learning (PPO) and added MCTS at decision time to plan several moves ahead, reaching a 93% win rate against scripted baselines. Built a parallel battle-simulation and evaluation harness on the Pokémon Showdown engine, tracked every run in MLflow, and gated the shipping checkpoint in GitHub Actions CI on 5,000 evaluation battles per push against a pre-registered threshold.",
    accent: "255,214,74",
    stat: { value: "93%", label: "win rate vs scripted bots" },
    tags: ["Python", "PyTorch", "PPO", "MCTS", "MLflow"],
    github: "https://github.com/Novapool/pokemon-showdown-ai",
    featured: true,
  },
  {
    code: "PRJ-002",
    title: "Agentic Development System",
    kind: "Multi-agent development pipeline on Claude Code",
    tagline:
      "A ten-agent dev team that lives in my terminal: it plans, builds, reviews, and tests its own work.",
    description:
      "A 10-agent orchestration pipeline (planner, parallel builders, then reviewer, tester, simplifier, and docs auditor) with a single transient plan file as the handoff contract, applied across 44 repositories. Instruments 11 lifecycle hook events to enforce project conventions automatically, and pairs with a tiered documentation protocol that requires every milestone to define a testable success criterion before implementation, plus 5 reusable skills for debugging, adversarial review, and requirements elicitation.",
    accent: "224,135,98",
    stat: { value: "44", label: "repos run on it" },
    tags: ["Claude Code", "Subagents", "Hooks", "MCP"],
    featured: true,
  },
  {
    code: "PRJ-003",
    title: "Multiplayer Party Game Framework",
    kind: "Ember + Bonfire · Open-source TypeScript on npm",
    tagline:
      "The engine under every party game I make. Write five hooks, get a multiplayer game.",
    description:
      "Designed and published Ember, an open-source TypeScript framework for multiplayer party games (the @bonfire-ember core, server, and client npm packages). It packages a phase state machine, WebSocket room orchestration, and player lifecycle into a 5-hook API enabling 80%+ code reuse across new game builds. Multi-room orchestration runs on Express + Socket.io namespaces with Firebase Realtime DB state sync, hosting 4 concurrent games on a single Railway server.",
    accent: "255,130,64",
    stat: { value: "80%+", label: "code reuse" },
    tags: ["TypeScript", "Socket.io", "Next.js", "Express", "Firebase"],
    github: "https://github.com/Novapool/ember",
  },
  {
    code: "PRJ-004",
    title: "Reverse-Depth Party Game",
    kind: "Surface Level · Database-authoritative multiplayer",
    tagline:
      "Small talk, run backwards. Open with the deep questions, end on the weather.",
    description:
      "A phone-based party game for 2–10 players that inverts small talk, starting with the most vulnerable questions and working back to the weather. All game logic lives in PostgreSQL (triggers, RPC functions, and server-side validation) and reaches every device through Supabase Realtime change-data-capture, with session-based reconnection, per-level question rerolls, and automatic cleanup of idle rooms.",
    accent: "92,200,220",
    tags: ["React", "PostgreSQL", "Supabase Realtime", "Tailwind"],
    github: "https://github.com/Novapool/LOI",
  },
  {
    code: "PRJ-005",
    title: "Raspberry Pi TV Launcher",
    kind: "Lumen · Rust TV launcher replacing Kodi · In progress",
    tagline:
      "Kodi felt sluggish on my TV, so I wrote a launcher in Rust that holds 60 fps at 4K.",
    description:
      "Building a Raspberry Pi 5 TV launcher in Rust that replaces Kodi, opening Jellyfin, Steam Link, and Kodi under per-app lifecycle rules, with a Home key that returns to the launcher from inside any app. Benchmarked the first Tauri/WebKit interface at 56.6 fps with 9.8% slow frames, prototyped a Slint replacement that held 60 fps with 0.1% slow frames, and migrated the UI. Pre-rendering gradients, gloss, and shadows on the CPU raised 4K output from 27.8 to 59.7 fps.",
    accent: "170,140,255",
    stat: { value: "27.8 → 59.7", label: "fps at 4K" },
    tags: ["Rust", "Slint", "Linux", "Wayland"],
    github: "https://github.com/Novapool/lumen-tv",
  },
  {
    code: "PRJ-006",
    title: "AI-Powered SSH Terminal Manager",
    kind: "Nexus · Local LLM + multi-server SSH",
    tagline:
      "Talk to your servers in plain English. A local LLM drafts the command; you pull the trigger.",
    description:
      "A multi-server SSH management platform pairing live terminal access with a locally hosted LLM (Ollama, gpt-oss:20b). Natural-language requests stream into suggested shell commands behind a safety validation layer, so no generated command executes unreviewed. Real-time terminal I/O runs over WebSockets with a FastAPI backend and Svelte 5 frontend, handling multi-server connection state and session lifecycle; containerized with Docker.",
    accent: "110,240,150",
    tags: ["FastAPI", "Svelte", "Ollama", "WebSockets", "Docker"],
    github: "https://github.com/Novapool/Nexus",
  },
  {
    code: "PRJ-007",
    title: "Universal File Converter",
    kind: "Unicon · Electron + Python desktop app",
    tagline:
      "Convert anything (video, audio, images, PDFs, Office docs) without trusting a sketchy upload site.",
    description:
      "A desktop converter for video, audio, images, and documents (PDF, Word, Excel, PowerPoint). The Electron shell launches a bundled Flask server on startup and forwards IPC to its HTTP API; FFmpeg and document libraries do the conversion, with batch jobs and live progress streamed back to the React interface over server-sent events.",
    accent: "240,110,200",
    tags: ["Electron", "React", "TypeScript", "Flask", "FFmpeg"],
    github: "https://github.com/Novapool/unicon",
  },
  {
    code: "PRJ-008",
    title: "Location-Based Food Reviews",
    kind: "Tastewise · Native iOS app",
    tagline:
      "“Where should we eat?” answered: nearby spots, sorted by distance, each with an AI second opinion.",
    description:
      "A SwiftUI iOS app that finds restaurants within a 10-mile radius using Core Location, backed by Supabase Edge Functions on Deno that query Google Places and generate AI restaurant analysis and recommendations, filterable by rating and sorted by distance.",
    accent: "255,110,96",
    tags: ["Swift", "SwiftUI", "Supabase", "Deno", "Google Places"],
    github: "https://github.com/Novapool/food-review",
  },
  {
    code: "PRJ-009",
    title: "Academic Performance Predictor",
    kind: "GradeScape · MSU AI Club team project",
    tagline:
      "Tells you how your semester is going to go, before the final does.",
    description:
      "Led a 4-student team building an academic performance predictor on the GPT-4 API and prompt engineering, shipping course-level predictions across 50+ courses on agile sprints.",
    accent: "130,150,255",
    stat: { value: "50+", label: "courses" },
    tags: ["React", "Firebase", "OpenAI API", "TypeScript"],
    github: "https://github.com/Novapool/grading-calendar-ai",
  },
  {
    code: "PRJ-010",
    title: "AI Model Development Assistant",
    kind: "AIForge",
    tagline:
      "Model training without the boilerplate: data, training runs, and charts in one cockpit.",
    description:
      "Simplifies model development with interfaces for data management, training, and visualization.",
    accent: "180,200,220",
    tags: ["Python", "Streamlit", "PyTorch", "Pandas"],
    github: "https://github.com/Novapool/AIForge",
  },
  {
    code: "PRJ-011",
    title: "Adaptive Game Combat AI",
    kind: "Unity ML-Agents",
    tagline:
      "A Unity opponent that studies how you fight, then picks aggression or defense to counter it.",
    description:
      "A Unity ML agent that adapts to the player's fighting style, switching between aggression and defense based on learned patterns.",
    accent: "255,80,110",
    tags: ["Unity", "ML-Agents", "C#"],
    github: "https://github.com/Novapool/ai-game",
  },
  {
    code: "PRJ-012",
    title: "Sign Language Detector",
    kind: "Computer vision",
    tagline:
      "A webcam that reads hand signs, turning tracked landmarks into sign-language shapes.",
    description:
      "Python application using TensorFlow and OpenCV to recognize hand landmarks and interpret sign language shapes.",
    accent: "87,230,196",
    tags: ["Python", "TensorFlow", "OpenCV"],
    github: "https://github.com/Novapool/SignLanguageDetector",
  },
  {
    code: "PRJ-013",
    title: "Gamified Task Manager",
    kind: "LifeQuest · Flutter app",
    tagline:
      "Your to-do list, but it's an RPG. Finish tasks, earn XP, level up.",
    description:
      "Flutter application where users complete tasks, set goals, and progress through levels.",
    accent: "180,240,90",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    github: "https://github.com/Novapool/LifeQuest",
  },
];

export const HACKATHONS: Project[] = [
  {
    code: "HCK-001",
    title: "Real-Time Audio Classification",
    kind: "SoundSense · MHacks 2025, 2nd place",
    tagline:
      "Ears for people who can't hear the room: on-device AI that flags the sounds around you in under 50ms.",
    description:
      "Placed 2nd of 300+ participants at MHacks 2025 with a real-time audio classifier that alerts hearing-impaired users to surrounding sounds, reaching 95% accuracy at <50ms latency across 500+ sound categories. The YAMNet model runs on dedicated edge AI accelerators, so all inference happens on-device without a cloud connection, and hazard alerts stream to a live web interface through a Flask + WebSocket pipeline.",
    accent: "90,220,255",
    stat: { value: "2nd", label: "of 300+" },
    tags: ["Python", "YAMNet", "Flask", "WebSockets", "Edge AI"],
    github: "https://github.com/Novapool/sound_sense",
    featured: true,
  },
  {
    code: "HCK-002",
    title: "Live AI Trolley-Problem Voting",
    kind: "ParallelTracks · SpartaHack 2026",
    tagline:
      "Five frontier AIs face the trolley problem live, and the crowd votes on which one is least monstrous.",
    description:
      "A live audience game where five frontier models (Claude, GPT, Gemini, Grok, DeepSeek) answer trolley problems and the room votes on the best response. Each scenario is illustrated by Gemini, each model speaks in its own ElevenLabs voice with colour-coded subtitles, and votes and the running AI leaderboard update in real time over Supabase Realtime.",
    accent: "255,179,92",
    stat: { value: "5", label: "AIs on trial" },
    tags: ["TypeScript", "Python", "Supabase", "OpenRouter", "ElevenLabs"],
    github: "https://github.com/Novapool/ParallelTracks",
  },
  {
    code: "HCK-003",
    title: "Toyota GR Cup Telemetry Analysis",
    kind: "Hack the Track · Tire degradation modeling",
    tagline:
      "Predicting when a race car's tires give up, from real Toyota GR Cup telemetry.",
    description:
      "Modeled tire degradation across 3,257 laps from 7 racetracks at a hackathon, reaching R² = 0.631 with one cross-track model, with telemetry normalized into PostgreSQL.",
    accent: "235,60,60",
    stat: { value: "3,257", label: "laps modeled" },
    tags: ["Python", "PostgreSQL", "scikit-learn"],
    github: "https://github.com/Novapool/hack_the_track",
  },
  {
    code: "HCK-004",
    title: "AI Pronunciation Coach",
    kind: "Language++ · MHacks 2024",
    tagline:
      "A language tutor with no screen to hide behind. You speak, it listens, it coaches you out loud.",
    description:
      "A voice-only language tutor with no text in or out. Azure AI scores each spoken phrase for pronunciation and fluency, GPT-4o turns the scores into feedback, and OpenAI text-to-speech speaks it back, so practice runs as a continuous conversation with a trainer.",
    accent: "200,160,255",
    tags: ["Python", "Streamlit", "Azure AI", "GPT-4o"],
    github: "https://github.com/Novapool/language.plusplus",
  },
  {
    code: "HCK-005",
    title: "Fusion Recipe Generator",
    kind: "FusionFeast · SpartaHack 2024",
    tagline:
      "Pick two cuisines, get one dish. Korean-Mexican? Done.",
    description:
      "Pick two cuisines and get a recipe that blends them. A Flutter front end sends the pairing to a Flask backend, which prompts ChatGPT to generate an original fusion dish.",
    accent: "255,190,90",
    tags: ["Flutter", "Dart", "Flask", "OpenAI API"],
    github: "https://github.com/Novapool/FusionFeast",
  },
];

export const FEATURED_PROJECTS = [...PROJECTS, ...HACKATHONS].filter(
  (p) => p.featured,
);
