"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Create ref array with the correct type
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  const projects = [
    {
      title: "AIForge",
      description: "AI Development Assistant that simplifies the model development process with intuitive interfaces for data management, training, and visualization.",
      tags: ["Python", "Streamlit", "PyTorch", "Pandas"],
      color: { primary: 340, secondary: 10 }, // Reddish
      github: "https://github.com/Novapool/AIForge",
      icon: "🧠",
    },
    {
      title: "Adaptive ML Combat AI",
      description: "Unity-based ML agent that dynamically adapts to player fighting style, switching between aggression and defense based on learned patterns.",
      tags: ["Unity", "ML-Agents", "C#", "AI"],
      color: { primary: 205, secondary: 245 }, // Bluish
      github: "https://github.com/Novapool/ai-game",
      icon: "🎮",
    },
    {
      title: "Academic Performance Predictor",
      description: "Web application using Firebase, OCR, and AI to help students track and predict academic performance by analyzing documents.",
      tags: ["React", "Firebase", "OpenAI API", "TypeScript"],
      color: { primary: 80, secondary: 120 }, // Greenish
      github: "https://github.com/Novapool/grading-calendar-ai",
      icon: "📚",
    },
    {
      title: "Sign Language Detector",
      description: "Real-time Python application utilizing TensorFlow and OpenCV to recognize hand landmarks and interpret sign language shapes.",
      tags: ["Python", "TensorFlow", "OpenCV", "ML"],
      color: { primary: 260, secondary: 290 }, // Purplish
      github: "https://github.com/Novapool/SignLanguageDetector",
      icon: "👋",
    },
    {
      title: "LifeQuest App",
      description: "Gamified task management application using Flutter, enabling users to complete tasks, set goals, and progress through levels.",
      tags: ["Flutter", "Dart", "Firebase", "Mobile"],
      color: { primary: 20, secondary: 40 }, // Orange
      github: "https://github.com/Novapool/LifeQuest",
      icon: "📱",
    }
  ];

  // Initialize cardRefs array to match projects length
  useEffect(() => {
    cardRefs.current = Array(projects.length).fill(null);
  }, [projects.length]);

  const hue = (h: number) => `hsl(${h}, 85%, 55%)`;

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

  // Function to set ref that works with TypeScript
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
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
          A collection of my work in AI, machine learning, game development, and web applications.
          These projects showcase my technical skills and passion for solving complex problems.
        </p>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        className="max-w-3xl mx-auto pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="relative mx-auto mb-12 sm:mb-24 px-4"
            initial="offscreen"
            // On mobile, we'll use the viewport trigger for animation
            // On desktop, we'll keep the hover animations
            whileInView={isMobile ? "onscreen" : undefined}
            animate={!isMobile ? "inactive" : undefined}
            whileHover={!isMobile ? "hover" : undefined}
            variants={cardVariants}
            ref={(el) => setCardRef(el, i)}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background splash */}
            <motion.div 
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(306deg, ${hue(project.color.primary)}, ${hue(project.color.secondary)})`,
                clipPath: "path('M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z')",
                zIndex: -1,
                top: "-2rem",
                left: "-1rem",
                right: "-1rem",
                bottom: "-2rem",
              }}
              variants={splashVariants}
              animate={!isMobile ? "inactive" : undefined}
              whileHover={!isMobile ? "hover" : undefined}
              whileInView={isMobile ? "onscreen" : undefined}
              viewport={{ once: true, margin: "-100px" }}
            />

            {/* Card content */}
            <motion.div 
              className="bg-card shadow-lg rounded-xl p-6 sm:p-8"
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
        ))}
      </motion.div>
    </div>
  );
}
