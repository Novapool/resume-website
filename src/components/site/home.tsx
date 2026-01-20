// src/components/site/home.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Code, Brain, Cpu } from "lucide-react";
import ContentRevealer from "@/components/loaders/ContentRevealer";

export default function Home() {
  // Skills organized by category
  const skillCategories = [
    { category: "Languages", skills: ["Python", "C++", "C#", "SQL", "TypeScript"] },
    { category: "AI/ML", skills: ["PyTorch", "TensorFlow", "OpenAI API", "ML-Agents", "YAMNet", "OpenCV", "Ollama"] },
    { category: "Web & Backend", skills: ["FastAPI", "Flask", "React", "REST APIs", "WebSockets", "Firebase", "Supabase"] },
    { category: "Infrastructure", skills: ["Unity", "Git", "Linux", "Docker", "SSH", "AsyncIO", "Streamlit"] }
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
            CS Student | MHacks Winner | AI Club Workshop Coordinator
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
            I&apos;m a Computer Science student at Michigan State University, MHacks 2025 winner, and Workshop Coordinator
            for MSU AI Club. I specialize in real-time AI systems and high-performance backend development with FastAPI and WebSockets.
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
                    Building real-time inference systems with PyTorch, YAMNet, and OpenAI API. Specialized in sub-50ms latency ML pipelines.
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
                    Architecting high-performance backends with FastAPI, WebSockets, and AsyncIO. Expert in real-time streaming with sub-10ms response times.
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
                    <Cpu className="mr-2 h-5 w-5" /> Systems & Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Building server management platforms with Docker, SSH, and Linux. Automating infrastructure and reducing admin overhead.
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
                  <CardTitle>SoundSense - MHacks 2025 Winner</CardTitle>
                  <CardDescription>Real-Time Audio Classification for Accessibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Award-winning hackathon project (300+ participants) providing real-time hazard detection for hearing-impaired users.
                    YAMNet CNN with 95% accuracy and &lt;50ms latency, Flask backend with WebSocket streaming.
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
                  <CardTitle>Nexus - AI Server Management</CardTitle>
                  <CardDescription>WebSocket-based SSH platform with GPT integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Web-based SSH terminal using FastAPI and AsyncSSH. Real-time WebSocket streaming with sub-10ms latency,
                    GPT-powered command assistance, reducing server admin time by 70%.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + categoryIndex * 0.1, duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </ContentRevealer>
    </div>
  );
}
