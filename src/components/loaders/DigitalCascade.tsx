// src/components/loaders/DigitalCascade.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface DigitalCascadeProps {
  isActive: boolean;
  onComplete: () => void;
  duration?: number;
}

// Make sure there's a proper default export
export default function DigitalCascade({ 
  isActive, 
  onComplete,
  duration = 1500 
}: DigitalCascadeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to use in the digital rain (Matrix-style)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*!=+:;,._-";
    
    // Columns for the rain
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the Y position of each drop
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    
    // Keep track of the animation start time
    const startTime = Date.now();
    
    // Function to draw the rain effect
    const draw = () => {
      // Calculate the opacity based on elapsed time
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(1, elapsedTime / duration);
      
      // Gradually fade out the rain as we approach the end
      const opacity = 1 - progress;
      
      if (progress >= 1) {
        setIsCompleted(true);
        onComplete();
        return;
      }
      
      // Semi-transparent black to show trail
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set the text color with fading opacity
      ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
      ctx.font = `${fontSize}px monospace`;
      
      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Send the drop back to the top randomly after it crosses the screen
        // Add randomness to the reset to make the drops scattered
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
      
      // Call the draw function again
      if (!isCompleted) {
        requestAnimationFrame(draw);
      }
    };
    
    // Start the animation
    const animationFrame = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive, duration, onComplete, isCompleted]);
  
  if (!isActive) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: isCompleted ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </motion.div>
  );
}
