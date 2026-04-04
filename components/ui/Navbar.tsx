"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 2.2, // Adjust for preloader
    });
  }, { scope: navRef });

  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    gsap.fromTo(mobileMenuRef.current, 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, { dependencies: [isMobileMenuOpen], scope: navRef, revertOnUpdate: true });

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Rates", href: "/rate-card" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-24 py-2 mix-blend-difference backdrop-blur-md"
      >
        <Magnetic>
          <Link href="/" className="text-xl font-playfair font-bold text-white tracking-tighter block p-2">
            MARK.
          </Link>
        </Magnetic>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <Link
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors p-2"
              >
                {link.name}
              </Link>
            </Magnetic>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>
      
      {/* Mobile Menu logic remains same but simplified for brevity in this step */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div id="mobile-menu" ref={mobileMenuRef} className="absolute top-0 left-0 right-0 bg-[#050505] border-b border-white/10">
             <div className="flex justify-between items-center px-6 py-8">
              <Link href="/" className="text-xl font-playfair font-bold text-white tracking-tighter" onClick={handleLinkClick}>MARK.</Link>
              <button onClick={closeMobileMenu} className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Close menu"><X className="w-6 h-6" /></button>
            </div>
            <nav className="px-6 pb-8">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={handleLinkClick} className="text-lg font-inter text-white/80 hover:text-white transition-colors py-2 border-b border-white/5">{link.name}</Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
