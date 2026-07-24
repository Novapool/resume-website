// src/data/profile.ts
// Identity + copy shared across the section pages, so a content change lands
// in one place instead of three page components.

export const PROFILE = {
  name: "Laith Assaf",
  tagline: "AI/ML CS Student @ MSU · MHacks 2025 Winner · IT @ Delta Dental",
  email: "assaflai@msu.edu",
  github: "https://github.com/Novapool",
  linkedin: "https://www.linkedin.com/in/laith-assaf-/",
  resume: "/documents/resume.pdf",
  photo: "/images/profile.jpg",
} as const;

export const BIO = [
  "I'm an AI/ML Computer Science student at Michigan State University, MHacks 2025 winner, and Workshop Coordinator for the MSU AI Club. I specialize in building real-time AI systems and high-performance backend infrastructure, and I currently work in IT at Delta Dental.",
  "My journey started with Python and AI experimentation. I've since focused on real-time systems with FastAPI, Socket.io, and WebSockets, ML inference pipelines, and open-source tooling — most recently the Ember framework and the Bonfire party-game platform. I build intelligent applications that operate at scale with minimal latency.",
];

export interface Dossier {
  label: string;
  body: string;
}

export const WORKING_STYLE: Dossier[] = [
  {
    label: "WORKING STYLE & VALUES",
    body: "I thrive in collaborative environments where I can contribute technical expertise while learning from others. I value clean, well-documented code and approach problems methodically, focusing on solutions that are both efficient and maintainable.",
  },
  {
    label: "PROBLEM-SOLVING APPROACH",
    body: "When tackling complex problems, I break them into manageable components, research thoroughly, and test continuously. I'm not afraid to dive deep into documentation or explore new technologies to find the best solution.",
  },
];

export const BEYOND_TECH: Dossier[] = [
  {
    label: "HOBBIES & INTERESTS",
    body: "Outside of programming I enjoy traveling, video games, and tinkering with hardware. I'm also an avid cook, preferring ingredients and techniques I've never encountered before — that curiosity even inspired an app that creates fusion recipes by blending elements of different cuisines.",
  },
  {
    label: "INSPIRATION",
    body: "My interest in AI was sparked by DALL·E and deepened through exploring ChatGPT. I'm captivated by how these technologies tackle complex problems and open new possibilities across domains.",
  },
  {
    label: "COMMUNITY",
    body: "I compete in hackathons across Michigan — winning MHacks 2025 with SoundSense among 300+ participants. As Workshop Coordinator for the MSU AI Club I've led 8+ workshops reaching 500+ attendees, helping members build real projects.",
  },
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "C++", "C#", "SQL", "TypeScript"],
  },
  {
    category: "AI / ML",
    skills: ["PyTorch", "OpenAI API", "YAMNet", "Ollama", "TensorFlow", "OpenCV"],
  },
  {
    category: "Web & Backend",
    skills: [
      "FastAPI",
      "Flask",
      "React",
      "Node.js",
      "Express",
      "Socket.io",
      "REST APIs",
      "WebSockets",
      "Firebase",
    ],
  },
  {
    category: "Infrastructure & IT",
    skills: [
      "Git",
      "Linux",
      "Docker",
      "Railway",
      "Vercel",
      "Active Directory",
      "Intune",
      "Power Automate",
    ],
  },
];

export interface Specialization {
  title: string;
  body: string;
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    title: "AI & Machine Learning",
    body: "Real-time inference systems with PyTorch, YAMNet, and the OpenAI API. Specialized in sub-50ms latency ML pipelines.",
  },
  {
    title: "Backend Development",
    body: "High-performance backends with FastAPI, WebSockets, and AsyncIO. Real-time streaming with sub-10ms response times.",
  },
  {
    title: "Systems & Infrastructure",
    body: "Enterprise deployment and management with Active Directory, Intune, and Power Automate, plus cloud infra on Docker, Railway, and Vercel.",
  },
];
