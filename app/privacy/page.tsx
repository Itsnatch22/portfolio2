"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen px-6 md:px-24 pt-48 pb-24" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-12 transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-5xl md:text-7xl font-playfair mb-12 tracking-tighter" style={{ color: 'var(--foreground)' }}>
          Privacy <span className="italic">Policy</span>
        </h1>

        <div className="space-y-12 font-inter leading-relaxed" style={{ color: 'var(--muted)' }}>
          <section>
            <h2 className="text-lg uppercase tracking-widest mb-4" style={{ color: 'var(--foreground)' }}>01. Overview</h2>
            <p>
              This portfolio is a showcase of my digital craft. I value your privacy as much as I value clean code. This policy explains how I treat any information you might share while exploring this space.
            </p>
          </section>

          <section>
            <h2 className="text-lg uppercase tracking-widest mb-4" style={{ color: 'var(--foreground)' }}>02. Information Collection</h2>
            <p>
              I do not collect personal data from visitors unless you explicitly contact me via email. No tracking cookies or invasive analytics are active on this site.
            </p>
          </section>

          <section>
            <h2 className="text-lg uppercase tracking-widest mb-4" style={{ color: 'var(--foreground)' }}>03. Use of Data</h2>
            <p>
              If you reach out, your email and name will only be used to respond to your inquiry. I will never sell, lease, or share your details with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg uppercase tracking-widest mb-4" style={{ color: 'var(--foreground)' }}>04. External Links</h2>
            <p>
              My portfolio contains links to external sites (like GitHub, LinkedIn, or Twitter). I am not responsible for the privacy practices or content of these third-party platforms.
            </p>
          </section>

          <section>
             <p className="text-xs uppercase tracking-[0.2em] pt-12" style={{ color: 'var(--muted)' }}>
               Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
             </p>
          </section>
        </div>
      </div>
    </main>
  );
}
