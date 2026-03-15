"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.5,
      })
      .to(progressRef.current, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center gap-6"
    >
      <div className="flex flex-col items-center">
        <span className="text-xl font-playfair italic text-white/20 mb-4 uppercase tracking-[0.5em]">
          MARK.
        </span>
        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-white w-0"
          />
        </div>
      </div>
      
      <span ref={textRef} className="text-[10px] uppercase tracking-[0.3em] text-white/40 opacity-0">
        Synthesizing Experience...
      </span>
    </div>
  );
}
