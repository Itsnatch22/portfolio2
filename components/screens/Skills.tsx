"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const philosophyText = "I bridge the gap between creative design and technical execution. My approach is rooted in narrative, focusing on motion, interaction, and the subtle details that turn a website into an experience.";

  useGSAP(() => {
    // Text Reveal
    gsap.to(".reveal-word", {
      scrollTrigger: {
        trigger: ".reveal-container",
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
      opacity: 1,
      stagger: 0.05,
      ease: "none",
    });

    // Grid Items Reveal
    gsap.fromTo(".about-grid-item", 
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".about-grid-item",
                start: "top 85%",
            },
            stagger: 0.1
        }
    );

  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-350 mx-auto px-4 sm:px-6 md:px-24">
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 md:flex justify-between items-end pb-6 sm:pb-8" style={{ borderColor: 'var(--border-color)' }}>
            <h2 className="text-xs sm:text-sm font-inter tracking-[0.2em] uppercase mb-3 sm:mb-4 md:mb-0" style={{ color: 'var(--muted)' }}>
                (001) Philosophy
            </h2>
             <p className="text-xs sm:text-sm font-inter text-right max-w-xs" style={{ color: 'var(--muted)' }}>
                Coding is my craft, but storytelling is my passion. I believe the best digital experiences are those that resonate emotionally while delivering seamless performance.
            </p>
        </div>

        {/* Main Statement */}
        <div className="mb-24 sm:mb-32 lg:mb-40 reveal-container">
            <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair leading-[1.1] max-w-5xl">
                {philosophyText.split(' ').map((word, i) => (
                  <span key={i} className="reveal-word opacity-20 inline-block mr-3 mb-2 transition-opacity duration-300">
                    {word}
                  </span>
                ))}
            </p>
        </div>

        {/* Broken Grid Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
            
            {/* Column 1 */}
            <div className="about-grid-item md:col-span-5 md:col-start-1 space-y-2">
                 <span className="text-xs uppercase tracking-widest block mb-3 sm:mb-4" style={{ color: 'var(--accent)' }}>
                   The Toolset
                 </span>
                 <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair mb-4 sm:mb-6" style={{ color: 'var(--foreground)' }}>Built for Performance</h3>
                 <p className="font-inter leading-relaxed max-w-md text-sm sm:text-base" style={{ color: 'var(--muted)' }}>
                    Leveraging modern frameworks and optimization techniques to ensure 
                    every interaction is buttery smooth. No lag, no layout shifts, just pure flow.
                 </p>
                 <div className="flex gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 flex-wrap">
                    {["HTML", "React", "TypeScript", "GSAP", "Tailwind"].map(tech => (
                        <span key={tech} className="px-2 py-1 sm:px-3 sm:py-1 border rounded-full text-xs uppercase tracking-wider" style={{ borderColor: 'var(--border-color)', color: 'var(--link-color)' }}>
                            {tech}
                        </span>
                    ))}
                 </div>
            </div>

            {/* Column 2 (Offset) */}
            <div className="about-grid-item md:col-span-5 md:col-start-7 pt-0 md:pt-20 lg:pt-32 space-y-2">
                 <span className="text-xs uppercase tracking-widest block mb-3 sm:mb-4" style={{ color: 'var(--accent)' }}>
                   The Vibe
                 </span>
                 <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair mb-4 sm:mb-6" style={{ color: 'var(--foreground)' }}>Designed for Humans</h3>
                 <p className="font-inter leading-relaxed max-w-md text-sm sm:text-base" style={{ color: 'var(--muted)' }}>
                   Technology feels cold without a story. I aim to inject personality 
                   and warmth into digital voids. Visual silence is as important as the content itself.
                 </p>
                 <div className="mt-6 sm:mt-8">
                    <Link href="#contact" className="group inline-flex items-center gap-2 border-b pb-1 hover:transition-colors touch-manipulation" style={{ color: 'var(--foreground)', borderColor: 'var(--border-color)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--foreground)' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)' }}>
                        <span className="uppercase text-xs sm:text-sm tracking-widest">Let&apos;s Collaborate</span>
                        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
}
