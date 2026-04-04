"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import ErrorBoundary from "../ui/ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!titleRef.current || !emailRef.current) {
      return;
    }

    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
      },
    });

    gsap.from(emailRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.3,
      scrollTrigger: {
        trigger: emailRef.current,
        start: "top 95%",
      },
    });
  }, { scope: containerRef });

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub className="w-4 h-4" />, href: "https://github.com/Itsnatch22" },
    { name: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://twitter.com/itsnatch_" },
    { name: "LinkedIn", icon: <FaLinkedin className="w-4 h-4" />, href: "https://linkedin.com/in/mark-kamau-4a0b932b0" },
    { name: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/u.to.pia._" },
  ];

  return (
    <ErrorBoundary>
      <section 
        id="contact"
        ref={containerRef} 
        className="relative min-h-[80vh] w-full flex flex-col justify-between px-6 md:px-24 pt-32 pb-12 overflow-hidden"
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      >
        {/* Background Subtle Gradient */}
         <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full blur-[150px] pointer-events-none" style={{ backgroundColor: 'var(--foreground)', opacity: 0.05 }} />

        <div className="grow flex flex-col justify-center max-w-350 mx-auto w-full">
          <div className="mb-8">
              <h2 className="text-sm font-inter tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
                  (003) Get in Touch
              </h2>
          </div>

          <div className="overflow-hidden">
            <h1 ref={titleRef} className="text-6xl md:text-[10vw] font-playfair font-medium leading-[0.9] tracking-tighter mb-12">
              LET&apos;S WORK <br/> TOGETHER
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <a 
                ref={emailRef}
                href="mailto:kamaumark996@gmail.com" 
                className="group text-2xl md:text-4xl font-inter border-b pb-2 inline-flex items-center gap-4 transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--foreground)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--foreground)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                kamaumark996@gmail.com
                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </a>

              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <Link 
                    key={social.name} 
                    href={social.href} 
                    className="p-3 border rounded-full transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--link-color)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--nav-bg)'; e.currentTarget.style.color = 'var(--foreground)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--link-color)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full max-w-350 mx-auto pt-24 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-inter" style={{ borderColor: 'var(--border-color)', color: 'var(--muted)' }}>
          <div>
             &copy; {new Date().getFullYear()} Mark. All rights reserved.
          </div>
          <div className="flex gap-8">
              <Link href="#about" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>About</Link>
              <Link href="#work" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Work</Link>
              <Link href="/privacy" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}>Privacy Policy</Link>
          </div>
          <div>
              Built with ❤️
          </div>
        </footer>
      </section>
    </ErrorBoundary>
  );
}
