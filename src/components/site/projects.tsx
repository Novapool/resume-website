"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Function to detect if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for mobile
    };
    
    // Check initially
    checkIfMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Space-themed color palette using OKLCH for vibrant neon colors
  const spaceColors = {
    purple: { primary: "oklch(0.72 0.28 290)", secondary: "oklch(0.65 0.30 280)" },
    pink: { primary: "oklch(0.75 0.25 350)", secondary: "oklch(0.70 0.28 340)" },
    green: { primary: "oklch(0.82 0.32 145)", secondary: "oklch(0.75 0.28 155)" },
    yellow: { primary: "oklch(0.88 0.24 85)", secondary: "oklch(0.82 0.26 95)" },
    orange: { primary: "oklch(0.75 0.26 35)", secondary: "oklch(0.70 0.28 45)" },
  };

  const projects = [
    {
      title: "SoundSense",
      description: "MHacks 2025 Winner (300+ participants). Real-time audio classification for hearing-impaired users. YAMNet CNN with 95% accuracy, <50ms latency, Flask/WebSocket backend.",
      tags: ["Python", "YAMNet", "Flask", "WebSocket", "ML"],
      color: spaceColors.purple,
      github: "https://github.com/Novapool/sound_sense",
      icon: "🏆",
    },
    {
      title: "Nexus",
      description: "AI-powered server management with web-based SSH terminal. FastAPI, AsyncSSH, WebSocket streaming with sub-10ms latency. Reduced admin time by 70%.",
      tags: ["FastAPI", "GPT", "SSH", "AsyncIO", "Python"],
      color: spaceColors.pink,
      github: "https://github.com/Novapool/Nexus",
      icon: "🖥️",
    },
    {
      title: "AIForge",
      description: "AI Development Assistant that simplifies the model development process with intuitive interfaces for data management, training, and visualization.",
      tags: ["Python", "Streamlit", "PyTorch", "Pandas"],
      color: spaceColors.green,
      github: "https://github.com/Novapool/AIForge",
      icon: "🧠",
    },
    {
      title: "Adaptive ML Combat AI",
      description: "Unity-based ML agent that dynamically adapts to player fighting style, switching between aggression and defense based on learned patterns.",
      tags: ["Unity", "ML-Agents", "C#", "AI"],
      color: spaceColors.yellow,
      github: "https://github.com/Novapool/ai-game",
      icon: "🎮",
    },
    {
      title: "GradeScape",
      description: "Web application using Firebase, OCR, and AI to help students track and predict academic performance by analyzing documents.",
      tags: ["React", "Firebase", "OpenAI API", "TypeScript"],
      color: spaceColors.orange,
      github: "https://github.com/Novapool/grading-calendar-ai",
      icon: "📚",
    },
    {
      title: "Sign Language Detector",
      description: "Real-time Python application utilizing TensorFlow and OpenCV to recognize hand landmarks and interpret sign language shapes.",
      tags: ["Python", "TensorFlow", "OpenCV", "ML"],
      color: spaceColors.purple,
      github: "https://github.com/Novapool/SignLanguageDetector",
      icon: "👋",
    },
    {
      title: "LifeQuest App",
      description: "Gamified task management application using Flutter, enabling users to complete tasks, set goals, and progress through levels.",
      tags: ["Flutter", "Dart", "Firebase", "Mobile"],
      color: spaceColors.pink,
      github: "https://github.com/Novapool/LifeQuest",
      icon: "📱",
    }
  ];

  // Variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Updated variants for the cards
  const cardVariants = {
    offscreen: {
      y: 300,
      opacity: 0.5,
      scale: 0.8
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    },
    inactive: {
      y: 50,
      opacity: 0.7,
      scale: 0.9,
      rotate: -5,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.5
      }
    }
  };

  // Updated variants for the splash background
  const splashVariants = {
    offscreen: {
      opacity: 0,
      scale: 0.8
    },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    },
    inactive: {
      opacity: 0.7,
      scale: 0.9,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A collection of my work in real-time AI systems, backend infrastructure, and machine learning.
          Featuring award-winning hackathon projects and production-ready applications.
        </p>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        className="max-w-3xl mx-auto pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => {
          return (
            <motion.div
              key={project.title}
              className="relative mx-auto mb-12 sm:mb-24 px-4"
              initial="offscreen"
              // Use whileInView for mobile devices with the once property set to false
              whileInView={isMobile ? "onscreen" : undefined}
              // For desktop, use the inactive/hover states
              animate={!isMobile ? "inactive" : undefined}
              whileHover={!isMobile ? "hover" : undefined}
              variants={cardVariants}
              viewport={isMobile ? { once: false, amount: 0.3, margin: "-100px" } : undefined}
            >
              {/* Background splash */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(306deg, ${project.color.primary}, ${project.color.secondary})`,
                  clipPath: "path('M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z')",
                  zIndex: -1,
                  top: "-2rem",
                  left: "-1rem",
                  right: "-1rem",
                  bottom: "-2rem",
                }}
                variants={splashVariants}
                whileInView={isMobile ? "onscreen" : undefined}
                animate={!isMobile ? "inactive" : undefined}
                whileHover={!isMobile ? "hover" : undefined}
                viewport={isMobile ? { once: false, amount: 0.3, margin: "-100px" } : undefined}
              />

              {/* Card content */}
              <motion.div
                className="bg-card shadow-[4px_4px_0_0_oklch(0.72_0.28_290/0.3)] border-2 border-primary/30 p-6 sm:p-8"
              >
                <div className="flex justify-between items-start">
                  <div className="text-4xl mb-4">{project.icon}</div>
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}