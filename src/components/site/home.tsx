// src/components/site/home.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, BookOpen, Code, Brain, Cpu } from "lucide-react";
import ContentRevealer from "@/components/loaders/ContentRevealer";

export default function Home() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const skills = [
    { name: "Python", level: 90 },
    { name: "C++", level: 70 },
    { name: "TensorFlow", level: 70 },
    { name: "OpenCV", level: 65 },
    { name: "Flutter", level: 40 },
    { name: "Firebase", level: 75 },
    { name: "Github", level: 70 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <ContentRevealer delay={0.2}>
        <section className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 color-transition">
            Laith Assaf
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
            Computer Science Student & AI Enthusiast
          </h2>
          <div className="flex gap-4 mb-8">
            <Link href="https://github.com/Novapool" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/laith-assaf-/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="max-w-2xl text-muted-foreground mb-8">
            I'm a Computer Science student at Michigan State University with a passion for artificial intelligence, 
            machine learning, and backend development. Currently working on innovative projects involving AI agents,
            computer vision, and application development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/projects">
              <Button>
                View My Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                Contact Me
              </Button>
            </Link>
          </div>
        </section>
      </ContentRevealer>

      {/* Specialization Areas */}
      <ContentRevealer delay={0.5}>
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center color-transition">
            Specialization Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" /> AI & Machine Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Experience with TensorFlow, PyTorch, and OpenCV for developing intelligent systems and computer vision solutions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5" /> Backend Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Proficient in building robust backend systems with Python, Firebase, and API integration.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cpu className="mr-2 h-5 w-5" /> App & Game Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Creating mobile applications with Flutter and interactive experiences with Unity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </ContentRevealer>

      {/* Featured Projects */}
      <ContentRevealer delay={0.9}>
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center color-transition">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>AIForge - AI Development Assistant</CardTitle>
                  <CardDescription>Streamlit-based application for AI model development</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    A web application that simplifies the AI model development process with intuitive interfaces for data management, 
                    model development, and training visualization.
                  </p>
                  <Link href="/projects">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Adaptive ML Combat AI</CardTitle>
                  <CardDescription>Unity-based machine learning system</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    An ML agent AI that dynamically adapts to player fighting style, switching tactics between aggression
                    and defense based on learned patterns during gameplay.
                  </p>
                  <Link href="/projects">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </ContentRevealer>

      {/* Skills */}
      <ContentRevealer delay={1.2}>
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center color-transition">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                className="mb-4"
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ContentRevealer>
    </div>
  );
}