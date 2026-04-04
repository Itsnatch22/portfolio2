"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-center px-6 md:px-24 overflow-hidden"
    >

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-150 h-150 bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Status Bar */}
      <div className="status-bar absolute top-12 md:top-24 left-6 md:left-24 flex items-center gap-3 z-10">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs md:text-sm uppercase tracking-widest text-white/50 font-inter">
          Available for new projects
        </span>
      </div>

      {/* Main Typography */}
      <div className="z-10 mt-20 md:mt-0">
        <div className="overflow-hidden">
          <h1 className="hero-title-line text-[12vw] leading-[0.85] font-playfair font-medium text-[#f2f2f2] tracking-tighter mix-blend-difference">
            CREATIVE
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-title-line text-[12vw] leading-[0.85] font-playfair font-medium text-[#f2f2f2] tracking-tighter mix-blend-difference ml-[10vw] md:ml-[15vw]">
            DEVELOPER
          </h1>
        </div>
        <div className="overflow-hidden">
           <h1 className="hero-title-line text-[12vw] leading-[0.85] font-playfair font-medium text-[#f2f2f2] tracking-tighter mix-blend-difference">
            EXPERIENCE
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-6 md:left-24 animate-bounce">
         <ArrowDown className="text-white/30 w-6 h-6" />
      </div>
      
       <div className="scroll-indicator absolute bottom-12 right-6 md:right-24 hidden md:block">
         <p className="text-xs uppercase tracking-widest text-white/30 max-w-50 text-right">
           Crafting narrative-driven digital 
           <br/>experiences
         </p>
      </div>

    </section>
  );
}