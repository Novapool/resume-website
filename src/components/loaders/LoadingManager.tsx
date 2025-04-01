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
  
  // Handle the terminal animation completion
  const handleTerminalComplete = () => {
    setLoading(false);
    setShowCascade(true);
  };
  
  // Handle the cascade animation completion
  const handleCascadeComplete = () => {
    setShowCascade(false);
    setShowContent(true);
  };
  
  // Skip the loading animation if the user has already seen it in this session
  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
    
    if (hasSeenLoading === "true") {
      // Skip the animation if the user has seen it
      setLoading(false);
      setShowContent(true);
    } else {
      // Mark that the user has seen the loading animation
      sessionStorage.setItem("hasSeenLoading", "true");
    }
  }, []);

  return (
    <>
      {/* Terminal Loading Screen */}
      {loading && (
        <TerminalLoader onLoadingComplete={handleTerminalComplete} minDisplayTime={4000} />
      )}
      
      {/* Digital Cascade Effect */}
      <DigitalCascade 
        isActive={showCascade} 
        onComplete={handleCascadeComplete} 
        duration={1500}
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