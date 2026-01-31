"use client"

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  delay = 0,
  duration = 2
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Initial fade-in animation
    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, delay, ease: 'back.out(1.7)' }
    );

    // Continuous floating animation
    gsap.to(elementRef.current, {
      y: -30,
      scale: 1.05,
      duration,
      delay: delay + 0.8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [delay, duration]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
};

export default FloatingElement;
