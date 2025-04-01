// src/components/loaders/TerminalLoader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/theme-provider";

interface TerminalLoaderProps {
  onLoadingComplete: () => void;
  minDisplayTime?: number;
}

export default function TerminalLoader({
  onLoadingComplete,
  minDisplayTime = 2000,
}: TerminalLoaderProps) {
  const { theme } = useTheme();
  
  // Animation state
  const [isVisible, setIsVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showCascade, setShowCascade] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Messages to display with improved timing
  const messages = [
    "Initializing portfolio...",
    "Loading components...",
    "Verifying credentials...",
    "Access granted."
  ];
  
  // Use refs to track timers and animation state
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationStartedRef = useRef<boolean>(false);
  const currentPhaseRef = useRef<number>(0);
  
  // Single effect to handle the entire animation sequence
  useEffect(() => {
    console.log(`Progress: ${progress}, Animation started: ${animationStartedRef.current}`);
    
    // Function to type out a message character by character
    const typeMessage = (message: string, delay: number = 30): Promise<void> => {
      return new Promise((resolve) => {
        console.log(`Starting to type message: "${message}"`);
        setDisplayedText("");
        
        let i = 0;
        
        const typeChar = () => {
          if (i <= message.length) {
            const newText = message.substring(0, i);
            setDisplayedText(newText);
            i++;
            typingTimerRef.current = setTimeout(typeChar, delay);
          } else {
            resolve();
          }
        };
        
        typeChar();
      });
    };
    
    // Function to handle the entire animation sequence
    const runAnimation = async () => {
      // Wait for progress to reach threshold
      if (progress < 99 || animationComplete) return;
      
      // Only run the animation once
      if (animationStartedRef.current) return;
      animationStartedRef.current = true;
      
      console.log("Starting animation sequence");
      
      // Type each message in sequence
      for (let i = 0; i < messages.length; i++) {
        currentPhaseRef.current = i;
        console.log(`Phase ${i}: ${messages[i]}`);
        
        // Type the current message
        await typeMessage(messages[i]);
        
        // Pause between messages (except after the last one)
        if (i < messages.length - 1) {
          await new Promise(resolve => {
            phaseTimerRef.current = setTimeout(resolve, 500);
          });
        }
      }
      
      // Final phase - expand terminal
      console.log("Final phase: expanding terminal");
      setIsExpanding(true);
      
      // Then show cascade
      await new Promise(resolve => {
        setTimeout(() => {
          console.log("Showing cascade effect");
          setShowCascade(true);
          resolve(null);
        }, 700);
      });
      
      // Finally complete the animation
      await new Promise(resolve => {
        setTimeout(() => {
          console.log("Animation complete, hiding terminal");
          setAnimationComplete(true);
          setIsVisible(false);
          onLoadingComplete();
          resolve(null);
        }, 1000);
      });
    };
    
    // Start the animation
    runAnimation();
    
    // Clean up function
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
        phaseTimerRef.current = null;
      }
    };
  }, [progress, messages, onLoadingComplete, animationComplete]);
  
  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        return newProgress <= 100 ? newProgress : 100;
      });
    }, minDisplayTime / 50);
    
    return () => clearInterval(interval);
  }, [minDisplayTime]);
  
  // Skip button component
  const SkipButton = () => (
    <button
      onClick={() => {
        // Clean up any timers with proper nullification
        if (typingTimerRef.current) {
          clearTimeout(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        if (phaseTimerRef.current) {
          clearTimeout(phaseTimerRef.current);
          phaseTimerRef.current = null;
        }
        
        setAnimationComplete(true);
        setIsVisible(false);
        onLoadingComplete();
      }}
      className="absolute top-4 right-4 text-green-500 text-xs border border-green-500 rounded px-2 py-1 hover:bg-green-500 hover:text-black transition-colors"
    >
      Skip
    </button>
  );
  
  // Digital rain effect
  const DigitalRain = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={i} 
          className="absolute top-0 text-green-500 text-sm font-mono opacity-0"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `fall 1.5s linear ${Math.random() * 0.5}s forwards`,
          }}
        >
          {Array.from({ length: Math.floor(Math.random() * 20) + 5 }).map((_, j) => (
            <div key={j} style={{ opacity: Math.random() * 0.9 + 0.1 }}>
              {String.fromCharCode(Math.floor(Math.random() * 93) + 33)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SkipButton />
        
        {/* Terminal window */}
        <motion.div 
          className={`bg-black border border-green-500 text-green-500 font-mono overflow-hidden relative ${isExpanding ? 'w-full h-full' : 'w-[600px] rounded-md'}`}
          initial={{ width: "600px", height: "300px", borderRadius: "6px" }}
          animate={{ 
            width: isExpanding ? "100%" : "600px", 
            height: isExpanding ? "100%" : "300px",
            borderRadius: isExpanding ? "0px" : "6px"
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Digital rain effect */}
          {showCascade && <DigitalRain />}
          
          {/* Terminal content */}
          <div className="p-4 flex flex-col h-full">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              <div className="mt-6">
                <p className="text-green-500">
                  {displayedText}
                  <span className="animate-pulse ml-1 inline-block">|</span>
                </p>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-auto">
              <div className="w-full bg-gray-900 rounded-full h-1.5 mb-1">
                <div 
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-green-500">
                Loading: {progress}%
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
