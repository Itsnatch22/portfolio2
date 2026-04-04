"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (counter === 100) {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tl.to(".preloader-text", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power4.in",
      })
      .to(".preloader-bg", {
        height: 0,
        duration: 1.2,
        ease: "power4.inOut",
        stagger: 0.1,
      });
    }
  }, { dependencies: [counter] });

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Panels */}
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="preloader-bg absolute top-0 w-full bg-[#050505] border-b border-white/5" 
          style={{ height: '100%', left: 0, zIndex: 3 - i }}
        />
      ))}
      
      <div className="preloader-text relative z-1001 flex flex-col items-center">
        <span className="text-[10vw] font-playfair font-medium text-white mix-blend-difference tracking-tighter">
          {counter}%
        </span>
        <div className="w-48 h-px bg-white/10 mt-4 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out" 
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>
    </div>
  );
}