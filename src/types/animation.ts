// src/types/animation.ts

export interface AnimationProps {
    delay?: number;
    duration?: number;
  }
  
  export interface LoadingAnimationProps extends AnimationProps {
    minDisplayTime?: number;
    onLoadingComplete: () => void;
  }
  
  export interface ContentRevealProps extends AnimationProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export interface DigitalCascadeProps extends AnimationProps {
    isActive: boolean;
    onComplete: () => void;
  }