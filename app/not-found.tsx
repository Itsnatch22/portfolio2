"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      // Subtle pulse animation for 404
      gsap.to(".digit", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="bg-[#050505] min-h-screen flex flex-col items-center justify-center text-[#f2f2f2] px-6"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-playfair font-bold text-white/5 tracking-tighter flex gap-12">
           <span className="digit">4</span>
           <span className="digit">0</span>
           <span className="digit">4</span>
        </div>
      </div>

      <div className="relative z-10 text-center">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-playfair mb-8 tracking-tighter">
          LOST IN THE <span className="italic">VOID</span>
        </h1>
        
        <p className="text-white/40 font-inter uppercase tracking-[0.3em] text-xs mb-12 max-w-xs mx-auto">
          The page you are looking for has either drifted into deep space or never existed.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white/80 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return Home
        </Link>
      </div>
    </main>
  );
}
