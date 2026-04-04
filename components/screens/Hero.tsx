"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import Antigravity from "@/components/Antigravity";
import { useTheme } from "@/contexts/ThemeContext";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme() || { theme: 'dark' };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(".hero-title-line", { y: 150, opacity: 0, rotate: 3 });
    gsap.set(".status-bar", { opacity: 0, y: 20 });
    gsap.set(".scroll-indicator", { opacity: 0 });

    tl.to(".hero-title-line", {
      y: 0,
      opacity: 1,
      rotate: 0,
      stagger: 0.15,
      duration: 1.5,
      delay: 1.5, // Wait for preloader panels
    })
    .to(".status-bar", {
      opacity: 1,
      y: 0,
      duration: 1,
    }, "-=1")
    .to(".scroll-indicator", {
      opacity: 1,
      duration: 1,
    }, "-=0.5");

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 md:px-24 overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >

      {/* Interactive Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Antigravity 
          count={900}
          color={theme === 'light' ? "#0F0E0E" : "#FFFFFF"}
          magnetRadius={15}
          ringRadius={8}
          waveSpeed={0.3}
          waveAmplitude={0.8}
          particleSize={1.5}
          autoAnimate={true}
          particleVariance={0.5}
          rotationSpeed={0.1}
          depthFactor={0.8}
          pulseSpeed={2}
          particleShape="capsule"
          fieldStrength={12}
        />
      </div>

      {/* Status Bar */}
      <div className="status-bar absolute top-16 md:top-24 left-4 md:left-24 flex items-center gap-3 z-10">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs md:text-sm uppercase tracking-widest font-inter" style={{ color: 'var(--muted)' }}>
          Available for new projects
        </span>
      </div>

      {/* Main Typography */}
      <div className="z-10 mt-20 md:mt-0">
        <div className="overflow-hidden">
          <h1 className="hero-title-line text-[14vw] sm:text-[12.5vw] md:text-[10vw] lg:text-[8vw] leading-[0.98] sm:leading-[0.95] md:leading-[0.88] font-playfair font-medium tracking-tighter mix-blend-difference max-w-[90vw] sm:max-w-[85vw]" style={{ color: 'var(--foreground)' }}>
            CREATIVE
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-title-line text-[14vw] sm:text-[12.5vw] md:text-[10vw] lg:text-[8vw] leading-[0.98] sm:leading-[0.95] md:leading-[0.88] font-playfair font-medium tracking-tighter mix-blend-difference ml-[4vw] sm:ml-[6vw] md:ml-[10vw] max-w-[86vw] sm:max-w-[80vw]" style={{ color: 'var(--foreground)' }}>
            DEVELOPER
          </h1>
        </div>
        <div className="overflow-hidden">
           <h1 className="hero-title-line text-[14vw] sm:text-[12.5vw] md:text-[10vw] lg:text-[8vw] leading-[0.98] sm:leading-[0.95] md:leading-[0.88] font-playfair font-medium tracking-tighter mix-blend-difference max-w-[90vw] sm:max-w-[85vw]" style={{ color: 'var(--foreground)' }}>
            EXPERIENCE
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-4 md:left-24 animate-bounce">
         <ArrowDown className="w-6 h-6" style={{ color: 'var(--muted)' }} />
      </div>
      
       <div className="scroll-indicator absolute bottom-12 right-4 md:right-24 hidden md:block">
         <p className="text-xs uppercase tracking-widest max-w-50 text-right" style={{ color: 'var(--muted)' }}>
           Crafting narrative-driven digital 
           <br/>experiences
         </p>
      </div>

    </section>
  );
}