"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ErrorBoundary from "./ErrorBoundary";
import { ProjectSkeleton } from "./SkeletonLoader";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "EaziWage",
    category: "Fintech",
    description: "Reimagining payroll for the African workforce.",
    challenge: "Payroll systems in emerging markets are fragmented and manual.",
    idea: "A unified, mobile-first dashboard that automates meaningful disbursements.",
    execution: "Built with Next.js and Supabase for real-time processing.",
    link: "https://eaziwage.com",
    color: "from-blue-900/20 to-indigo-900/20",
    image: '/eaziwage.png'
  },
  {
    id: "02",
    title: "Splyt",
    category: "E-Commerce",
    description: "A showcase of milk products.",
    challenge: "Standard e-commerce templates lack soul and narrative.",
    idea: "Treating products as art pieces with immersive storytelling.",
    execution: "GSAP Scrolltrigger and cinematic transition states.",
    link: "#",
    color: "from-purple-900/20 to-fuchsia-900/20",
    image: '/splyt.png'
  },
  {
    id: "03",
    title: "SkillsConnect",
    category: "Experimental",
    description: "A platform for connecting skills and opportunities.",
    challenge: "Too many platforms exist but none connect skills to real opportunities.",
    idea: "An open hub for opportunities.",
    execution: "Built with Next.js and Supabase for real-time processing.",
    link: "#",
    color: "from-emerald-900/20 to-teal-900/20",
    image: '/skills.png'
  }
];

export default function Work() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const handleImageError = (projectId: string) => {
    setImageErrors(prev => new Set(prev).add(projectId));
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 768px)", () => {
            // Horizontal Scroll for Projects
            const sections = gsap.utils.toArray(".project-panel");
            
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <ErrorBoundary>
      <section id="work" ref={containerRef} className="bg-[#050505] text-[#f2f2f2] relative">
        {isLoading && <ProjectSkeleton />}
        
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
            {projects.map((project, index) => (
                <div key={project.id} className="project-panel w-full md:w-full h-auto md:h-full flex-shrink-0 flex flex-col md:flex-row p-4 sm:p-6 md:p-24 box-box border-r border-white/5 bg-[#050505] mb-8 md:mb-0">
                    
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
                    <div className="w-full md:w-1/2 mt-8 md:mt-0 relative rounded-2xl md:rounded-3xl overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {imageErrors.has(project.id) ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-white/40 text-xs sm:text-sm">Image not available</p>
                                </div>
                            ) : (
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={() => handleImageError(project.id)}
                                    onLoad={handleImageLoad}
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
