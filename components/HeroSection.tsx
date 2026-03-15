"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state
      gsap.set(titleRefs.current, { y: 150, opacity: 0, rotate: 3 });
      gsap.set(statusRef.current, { opacity: 0, y: 20 });

      // Animation Sequence
      tl.to(titleRefs.current, {
        y: 0,
        opacity: 1,
        rotate: 0,
        stagger: 0.15,
        duration: 1.5,
        delay: 0.5,
      })
      .to(statusRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-center px-6 md:px-24 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Status Bar */}
      <div ref={statusRef} className="absolute top-12 md:top-24 left-6 md:left-24 flex items-center gap-3">
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
          <h1 ref={addToRefs} className="text-[12vw] leading-[0.85] font-playfair font-medium text-[#f2f2f2] tracking-tighter mix-blend-difference">
            DIGITAL
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={addToRefs} className="text-[12vw] leading-[0.85] font-playfair font-medium text-[#f2f2f2] tracking-tighter mix-blend-difference ml-[10vw] md:ml-[15vw]">
            DESIGNER
          </h1>
        </div>
        <div className="overflow-hidden">
           <h1 ref={addToRefs} className="text-[12vw] leading-[0.85] font-playfair font-medium text-[#f2f2f2] tracking-tighter mix-blend-difference">
            & DEVELOPER
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-6 md:left-24 animate-bounce">
         <ArrowDown className="text-white/30 w-6 h-6" />
      </div>
      
       <div className="absolute bottom-12 right-6 md:right-24 hidden md:block">
         <p className="text-xs uppercase tracking-widest text-white/30 max-w-[200px] text-right">
           Crafting narrative-driven digital 
           <br/>experiences
         </p>
      </div>

    </section>
  );
}