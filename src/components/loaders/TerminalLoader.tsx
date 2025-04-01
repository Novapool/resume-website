// src/components/loaders/TerminalLoader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/theme-provider";

// Types for our component props
interface TerminalLoaderProps {
  onLoadingComplete: () => void;
  minDisplayTime?: number; // Minimum time to display the loader in ms
}

// Type for the loading messages
interface LoadingStep {
  message: string;
  duration: number;
}

// Make sure there's a proper default export
export default function TerminalLoader({
  onLoadingComplete,
  minDisplayTime = 4000, // Default to 4 seconds minimum display time
}: TerminalLoaderProps) {
  const { theme } = useTheme();
  
  // Animation states
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showCascade, setShowCascade] = useState(false);
  
  // Track when the page is actually loaded
  const [pageLoaded, setPageLoaded] = useState(false);
  const startTimeRef = useRef(Date.now());
  
  // Define the loading steps and their durations
  const loadingSteps: LoadingStep[] = [
    { message: "Initializing portfolio...", duration: 1000 },
    { message: "Loading components...", duration: 1000 },
    { message: "Verifying credentials...", duration: 1000 },
    { message: "Access granted.", duration: 500 },
  ];

  // Effect to handle the typing animation for each step
  useEffect(() => {
    if (currentStep >= loadingSteps.length) return;
    
    const currentMessage = loadingSteps[currentStep].message;
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Move to next step after this message is fully displayed
        const timer = setTimeout(() => {
          if (currentStep < loadingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            // If it's the last step, start the terminal expansion
            setTimeout(() => {
              setIsExpanding(true);
              
              // After expansion, show the cascade effect
              setTimeout(() => {
                setShowCascade(true);
                
                // After cascade, complete the loading
                setTimeout(() => {
                  setIsVisible(false);
                  onLoadingComplete();
                }, 1500);
              }, 1000);
            }, 1000);
          }
        }, loadingSteps[currentStep].duration);
        
        return () => clearTimeout(timer);
      }
    }, 40); // Speed of typing animation
    
    return () => clearInterval(typingInterval);
  }, [currentStep, loadingSteps, onLoadingComplete]);
  
  // Handle progress bar advancement
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        return newProgress <= 100 ? newProgress : 100;
      });
    }, minDisplayTime / 100);
    
    return () => clearInterval(interval);
  }, [minDisplayTime]);
  
  // Check if the page has loaded and we've displayed the loader for the minimum time
  useEffect(() => {
    // Check if the page has loaded
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
  
  // Matrix digital rain effect component
  const DigitalRain = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 text-green-500 text-sm font-mono opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `fall 1.5s linear ${Math.random() * 1}s forwards`,
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
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          {/* Digital rain effect (shown after terminal expands) */}
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
                  <span className="animate-pulse ml-1">▋</span>
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