"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import ErrorBoundary from "./ErrorBoundary";

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
        className="relative min-h-[80vh] w-full bg-[#050505] text-[#f2f2f2] flex flex-col justify-between px-6 md:px-24 pt-32 pb-12 overflow-hidden"
      >
        {/* Background Subtle Gradient */}
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="flex-grow flex flex-col justify-center max-w-[1400px] mx-auto w-full">
          <div className="mb-8">
              <h2 className="text-sm font-inter tracking-[0.2em] uppercase text-white/40 mb-4">
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
                className="group text-2xl md:text-4xl font-inter border-b border-white/20 pb-2 hover:border-white transition-colors inline-flex items-center gap-4"
              >
                kamaumark996@gmail.com
                <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </a>

              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <Link 
                    key={social.name} 
                    href={social.href} 
                    className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
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
        <footer className="w-full max-w-[1400px] mx-auto pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/30 font-inter">
          <div>
             &copy; {new Date().getFullYear()} Mark. All rights reserved.
          </div>
          <div className="flex gap-8">
              <Link href="#work" className="hover:text-white transition-colors">Work</Link>
              <Link href="#about" className="hover:text-white transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-white transition-colors text-[8px]">Privacy Policy</Link>
          </div>
          <div>
              Designed & Built with &hearts;
          </div>
        </footer>
      </section>
    </ErrorBoundary>
  );
}
