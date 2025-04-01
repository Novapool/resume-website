// src/components/loaders/LoadingManager.tsx
"use client";

import { useState, useEffect } from "react";
// Use named imports to avoid potential issues with default imports
import type { FC, ReactNode } from 'react';
import TerminalLoader from "./TerminalLoader";
import DigitalCascade from "./DigitalCascade";

interface LoadingManagerProps {
  children: ReactNode;
}

const LoadingManager: FC<LoadingManagerProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [showCascade, setShowCascade] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Handle the terminal animation completion with debugging
  const handleTerminalComplete = () => {
    console.log("Terminal animation complete callback triggered");
    setLoading(false);
    setShowCascade(true);
  };
  
  // Handle the cascade animation completion with debugging
  const handleCascadeComplete = () => {
    console.log("Cascade animation complete callback triggered");
    setShowCascade(false);
    setShowContent(true);
  };
  
  // Skip the loading animation if the user has already seen it in this session
  useEffect(() => {
    console.log("LoadingManager mounted");
    
    try {
      const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
      console.log(`hasSeenLoading from sessionStorage: ${hasSeenLoading}`);
      
      if (hasSeenLoading === "true") {
        console.log("User has seen loading animation before, skipping");
        setLoading(false);
        setShowContent(true);
      } else {
        console.log("First visit, showing loading animation");
        // Mark that user has seen the animation for future visits
        sessionStorage.setItem("hasSeenLoading", "true");
      }
    } catch (error) {
      console.error("Error accessing sessionStorage:", error);
    }
  }, []);

  return (
    <>
      {/* Terminal Loading Screen - now with shorter minimum display time */}
      {loading && (
        <TerminalLoader onLoadingComplete={handleTerminalComplete} minDisplayTime={5000} />
      )}
      
      {/* Digital Cascade Effect - now with shorter duration */}
      <DigitalCascade 
        isActive={showCascade} 
        onComplete={handleCascadeComplete} 
        duration={1000} // Reduced from 1500ms
      />
      
      {/* Actual Content */}
      <div 
        className={`
          ${!showContent ? 'opacity-0' : ''}
          transition-opacity duration-500
        `}
      >
        {children}
      </div>
    </>
  );
};

export default LoadingManager;