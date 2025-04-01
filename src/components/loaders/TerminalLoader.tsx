// src/components/loaders/TerminalLoader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/theme-provider";
import { TypeAnimation } from "react-type-animation";

interface TerminalLoaderProps {
  onLoadingComplete: () => void;
  minDisplayTime?: number;
}

export default function TerminalLoader({
  onLoadingComplete,
  minDisplayTime = 1500, // Reduced from 2000ms to 1500ms
}: TerminalLoaderProps) {
  const { theme } = useTheme();
  
  // Animation state
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showCascade, setShowCascade] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Animation sequence reference
  const animationStartedRef = useRef<boolean>(false);
  
  // Handle progress bar animation - faster progression
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 4; // Increased from 2 to 4 for faster progress
        return newProgress <= 100 ? newProgress : 100;
      });
    }, minDisplayTime / 75); // Reduced interval time for faster updates
    
    return () => clearInterval(interval);
  }, [minDisplayTime]);
  
  // Handle animation sequence after typing is complete
  useEffect(() => {
    if (!typingComplete) return;
    
    console.log("All messages typed, expanding terminal");
    
    // Expand the terminal
    setIsExpanding(true);
    
    // Show cascade effect after a delay - reduced delay
    const cascadeTimer = setTimeout(() => {
      console.log("Showing cascade effect");
      setShowCascade(true);
      
      // Complete the animation after another delay - reduced delay
      const completeTimer = setTimeout(() => {
        console.log("Animation complete, hiding terminal");
        setAnimationComplete(true);
        setIsVisible(false);
        onLoadingComplete();
      }, 800); // Reduced from 1000ms
      
      return () => clearTimeout(completeTimer);
    }, 500); // Reduced from 700ms
    
    return () => clearTimeout(cascadeTimer);
  }, [typingComplete, onLoadingComplete]);
  
  // Handle animation start when progress reaches 100%
  useEffect(() => {
    if (progress < 100 || animationComplete || animationStartedRef.current) return;
    animationStartedRef.current = true;
    console.log("Progress reached 100%, animation can start");
  }, [progress, animationComplete]);
  
  // Skip button component
  const SkipButton = () => (
    <button
      onClick={() => {
        console.log("Skip button clicked");
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
                {progress === 100 && !animationComplete && (
                  <TypeAnimation
                    sequence={[
                      // First message
                      "Initializing portfolio...",
                      700, // Reduced from 1000ms
                      // Clear and show second message
                      "",
                      "Loading components...",
                      700, // Reduced from 1000ms
                      // Clear and show third message
                      "",
                      "Access granted.",
                      700, // Reduced from 1000ms
                      // Trigger next animation phase
                      () => {
                        console.log("Typing animation complete");
                        setTypingComplete(true);
                      },
                    ]}
                    wrapper="p"
                    cursor={true}
                    speed={70} // Increased from 50 to 80 (higher is faster)
                    className="text-green-500 terminal-cursor" // Added a custom class for styling the cursor
                  />
                )}
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