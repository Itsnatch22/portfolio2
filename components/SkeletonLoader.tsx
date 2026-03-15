"use client";

import React from 'react';

export function TextSkeleton({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-white/10 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-center px-6 md:px-24">
      <div className="space-y-4">
        <div className="h-[20vw] bg-white/10 rounded animate-pulse" />
        <div className="h-[20vw] bg-white/10 rounded animate-pulse ml-[10vw] md:ml-[15vw]" />
        <div className="h-[20vw] bg-white/10 rounded animate-pulse" />
      </div>
    </section>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="w-full h-full flex-shrink-0 flex flex-col md:flex-row p-6 md:p-24 box-box border-r border-white/5 bg-[#050505]">
      <div className="w-full md:w-1/2 space-y-8">
        <div className="h-16 w-16 bg-white/10 rounded animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
          <div className="h-12 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="h-6 w-full bg-white/10 rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          <TextSkeleton lines={3} />
        </div>
        <div className="h-12 w-32 bg-white/10 rounded-full animate-pulse" />
      </div>
      <div className="w-full md:w-1/2 mt-12 md:mt-0">
        <div className="h-full bg-white/10 rounded-3xl animate-pulse" />
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <section className="relative min-h-[80vh] w-full bg-[#050505] text-[#f2f2f2] flex flex-col justify-between px-6 md:px-24 pt-32 pb-12">
      <div className="flex-grow flex flex-col justify-center max-w-[1400px] mx-auto w-full">
        <div className="h-8 w-48 bg-white/10 rounded animate-pulse mb-8" />
        <div className="h-32 w-full bg-white/10 rounded animate-pulse mb-12" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="h-12 w-64 bg-white/10 rounded animate-pulse" />
          <div className="flex gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 w-12 bg-white/10 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
