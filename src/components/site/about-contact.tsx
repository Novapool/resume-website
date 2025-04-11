"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, FileText, ArrowRight, ArrowDown, Maximize2 } from "lucide-react";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import ContactForm from "@/components/site/contact-form";
import ContentRevealer from "@/components/loaders/ContentRevealer";

export default function AboutContact() {
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const [isResumeFullscreen, setIsResumeFullscreen] = useState(false);

  // Timeline data with bullet points
  const timelineItems: TimelineItem[] = [
    {
      title: "Building Foundations (High School)",
      date: "2018 - 2022",
      description: "<ul class='list-disc pl-5 space-y-1'><li>Attended Brother Rice High School</li><li>Active in Debate Team, earning the prestigious Speech Award at graduation</li><li>Participated in Model United Nations, developing global perspective</li><li>Member of Quiz Bowl and Snowboarding Team</li></ul>"
    },
    {
      title: "Discovering My Path",
      date: "2022",
      description: "<ul class='list-disc pl-5 space-y-1'><li>Enrolled at Michigan State University as a Finance major</li><li>Took first programming class, which sparked unexpected passion for code</li></ul>"
    },
    {
      title: "Pivotal Career Shift",
      date: "2023",
      description: "<ul class='list-disc pl-5 space-y-1'><li>Switched majors to Computer Science after discovering natural aptitude</li><li>Secured IT position at MSU College of Osteopathic Medicine</li><li>Developed first ML project: Sign Language Detector using TensorFlow and OpenCV</li><li>Participated in first hackathon at UofM, creating a motion-responsive music app</li></ul>"
    },
    {
      title: "Deepening Expertise",
      date: "2024",
      description: "<ul class='list-disc pl-5 space-y-1'><li>Joined MSU AI Club, finding a community of like-minded enthusiasts</li><li>Participated in advanced workshops, expanding theoretical knowledge</li><li>Contributed to ML-based Unity game development project</li><li>Created adaptive AI that responds to player fighting styles</li></ul>"
    },
    {
      title: "Taking Leadership",
      date: "2025",
      description: "<ul class='list-disc pl-5 space-y-1'><li>Began Academic Performance Predictor project</li><li>Appointed to AI Club board as Workshop Coordinator</li><li>Designed and presented &apos;Your Place in the AI Industry&apos; workshop</li></ul>"
    },
    {
      title: "Future Aspirations",
      date: "Beyond",
      description: "<ul class='list-disc pl-5 space-y-1'><li>Continue developing innovative personal projects</li><li>Refine ideas toward potential startup opportunities</li><li>Deploy applications that provide real value to users</li></ul>"
    }
  ];

  // Get only the first 2 items or all items based on state
  const visibleItems = showFullTimeline ? timelineItems : timelineItems.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Photo and Intro */}
      <ContentRevealer delay={0.2}>
        <section className="mb-20 relative">
          {/* Photo Area - Moved to absolute positioning in the left corner */}
          <div className="absolute left-0 top-0 w-64 h-64">
            <div className="relative w-full h-full rounded-xl overflow-hidden border-4 border-primary">
              <Image 
                src="/images/profile.jpg" 
                alt="Profile photo" 
                fill 
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
          
          {/* Intro Text - Centered */}
          <div className="max-w-2xl mx-auto text-center pt-10">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <Card className="mb-4">
              <CardContent className="p-6">
                <p className="mb-3">
                  Hi, I&apos;m Laith Assaf, a Junior in Computer Science student at Michigan State University with a passion for artificial intelligence and machine learning. I&apos;m currently working to become a more well-rounded full-stack developer, combining my ML expertise with modern web development skills.
                </p>
                <p>
                My journey in tech started with Python and a drive to create and test my own AI. Since then I&apos;ve expanded into mobile app development with Flutter, WebSockets with Go, and now web development with Next.js and React. I&apos;m driven by the challenge of creating intelligent, responsive applications that are user-friendly.
                </p>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-4">
              <Link href="https://github.com/Novapool" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/laith-assaf-/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </Link>
              <Link href="mailto:assaflai@msu.edu">
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </ContentRevealer>

      {/* Timeline Section */}
      <ContentRevealer delay={0.4}>
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">My Journey</h2>
          <Timeline items={visibleItems} />
          <div className="text-center mt-6">
            <Button 
              variant="ghost" 
              className="gap-2"
              onClick={() => setShowFullTimeline(!showFullTimeline)}
            >
              <ArrowDown className="h-4 w-4" />
              {showFullTimeline ? "Show Less" : "See Full Timeline"}
            </Button>
          </div>
        </section>
      </ContentRevealer>

      {/* Professional Values & Working Style */}
      <ContentRevealer delay={0.6}>
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Professional Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Working Style & Values</h3>
                <p>
                  I thrive in collaborative environments where I can contribute my technical expertise while learning from others. I value clean, well-documented code and approach problems methodically, focusing on creating solutions that are both efficient and maintainable.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Problem-Solving Approach</h3>
                <p>
                  When tackling complex problems, I break them down into manageable components, research thoroughly, and test continuously. I&apos;m not afraid to dive deep into documentation or explore new technologies when needed to find the best solution.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </ContentRevealer>

      {/* Background & Personal Interests */}
      <ContentRevealer delay={0.8}>
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Beyond Tech</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Hobbies & Interests</h3>
                  <p>
                  Outside of programming, I enjoy traveling, video games, and tinkering with hardware. I&apos;m also an avid cook, preferring to try ingredients and techniques I&apos;ve never encountered before—this curiosity even inspired me to develop an app that creates fusion recipes by blending elements from different cuisines.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Inspiration</h3>
                  <p>
                  My interest in AI was sparked by my initial fascination with DALL-E and later deepened through my exploration of ChatGPT. I&apos;m captivated by how these transformative technologies can tackle complex problems and create new possibilities across various domains.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Community</h3>
                  <p>
                  I actively participate in hackathons across Michigan to challenge my skills and collaborate with fellow developers. As a Workshop Coordinator on the AI club board, I dedicate much of my time to creating educational presentations on various AI topics, helping members develop their understanding of artificial intelligence concepts and applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </ContentRevealer>

      {/* Resume Section */}
      <ContentRevealer delay={1.0}>
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Resume</h2>
          <div className="flex flex-col items-center">
            {/* Improved PDF viewer with fullscreen toggle */}
            <div className={`relative w-full max-w-3xl ${isResumeFullscreen ? 'h-screen fixed inset-0 z-50 max-w-none p-4 bg-background' : 'h-[600px]'} bg-card rounded-xl border-2 border-primary/20 p-4 mb-6 overflow-hidden transition-all duration-300`}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 z-10"
                onClick={() => setIsResumeFullscreen(!isResumeFullscreen)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <iframe 
                src="/documents/resume.pdf" 
                width="100%" 
                height="100%" 
                style={{ border: "none" }}
                title="Resume Preview"
              />
            </div>
            <Link href="/documents/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Download Full Resume (PDF)
              </Button>
            </Link>
          </div>
        </section>
      </ContentRevealer>

      {/* Contact Section */}
      <ContentRevealer delay={1.2}>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Made cards clickable with Link component */}
            <Link href="mailto:assaflai@msu.edu" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Mail className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">assaflai@msu.edu</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://www.linkedin.com/in/laith-assaf-/" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Linkedin className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-semibold">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">Connect professionally</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://github.com/Novapool" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="h-full transition-all hover:shadow-md hover:scale-105">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Github className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-semibold">GitHub</h3>
                  <p className="text-sm text-muted-foreground">Check out my code</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          {/* Updated Contact Form - we'll create a new version of the ContactForm component */}
          <ContactForm />
        </section>
      </ContentRevealer>

      {/* Final Call to Action */}
      <ContentRevealer delay={1.4}>
        <section className="text-center py-10">
          <h2 className="text-xl font-semibold mb-4">Want to see what I&apos;ve built?</h2>
          <Link href="/projects">
            <Button className="gap-2">
              View My Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </ContentRevealer>
    </div>
  );
}
