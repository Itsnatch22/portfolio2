"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ErrorBoundary from "../ui/ErrorBoundary";
import { PROJECTS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => new Set(prev).add(projectId));
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(".project-panel");

        if (sections.length <= 1 || !horizontalRef.current) {
          return;
        }
        
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: horizontalRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                end: () => "+=" + horizontalRef.current!.offsetWidth
            }
        });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <ErrorBoundary>
      <section id="work" ref={containerRef} className="bg-[#050505] text-[#f2f2f2] relative">
        {/* Section Header */}
        <div className="px-4 sm:px-6 md:px-24 py-16 sm:py-24 mb-8 sm:mb-12">
            <h2 className="text-xs sm:text-sm font-inter tracking-[0.2em] uppercase text-white/40 mb-4">
                (002) Selected Works
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair max-w-2xl">
                Case studies in digital transformation.
            </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={horizontalRef} className="min-h-screen md:h-screen w-full flex md:overflow-x-hidden overflow-y-auto md:overflow-y-hidden">
            {PROJECTS.map((project) => (
                <div key={project.id} className="project-panel w-full md:w-full h-auto md:h-full flex-shrink-0 flex flex-col md:flex-row p-4 sm:p-6 md:p-24 box-border border-r border-white/5 bg-[#050505] mb-8 md:mb-0">
                    
                    {/* Content Side */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 md:space-y-8 pr-0 md:pr-12 md:max-w-xl">
                        <span className="text-4xl sm:text-6xl md:text-8xl font-playfair text-white/5 absolute top-16 left-4 sm:left-6 md:static">
                            {project.id}
                        </span>
                        
                        <div>
                            <span className="text-xs uppercase tracking-widest text-accent/70 mb-2 block">{project.category}</span>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-playfair mb-4 leading-[0.9]">{project.title}</h3>
                            <p className="text-base sm:text-lg md:text-xl text-white/60 font-inter italic">{project.description}</p>
                        </div>

                        <div className="space-y-4 md:space-y-6 md:pl-8 border-l border-white/10 my-6 md:my-8">
                             <div>
                                <h4 className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-1">The Challenge</h4>
                                <p className="text-white/80 font-inter text-sm md:text-base">{project.challenge}</p>
                             </div>
                             <div>
                                <h4 className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-1">The Idea</h4>
                                <p className="text-white/80 font-inter text-sm md:text-base">{project.idea}</p>
                             </div>
                             <div>
                                <h4 className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mb-1">The Execution</h4>
                                <p className="text-white/80 font-inter text-sm md:text-base">{project.execution}</p>
                             </div>
                        </div>

                        <div>
                            <Link href={project.link} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-colors group touch-manipulation">
                                <span className="uppercase text-xs sm:text-xs tracking-widest">View Project</span>
                                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Image/Visual Side */}
                    <div className="group w-full md:w-1/2 mt-8 md:mt-0 relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {imageErrors.has(project.id) ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-white/40 text-xs sm:text-sm">Image not available</p>
                                </div>
                            ) : (
                                <Image 
                                    src={project.image} 
                                    alt={project.title} 
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={() => handleImageError(project.id)}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            )}
                        </div>
                    </div>

                </div>
            ))}
        </div>
      </section>
    </ErrorBoundary>
  );
}
