"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";

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
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Rates", href: "/rate-card" },
    { name: "Contact", href: "#contact" },
    { name: "My CV", href: "/mark's-vitae.pdf"}
  ];

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-24 py-2 mix-blend-difference backdrop-blur-md"
        style={{ backgroundColor: 'var(--nav-bg)' }}
      >
        <Magnetic>
          <Link href="/" className="text-xl font-playfair font-bold tracking-tighter block p-2" style={{ color: 'var(--foreground)' }}>
            MARK.
          </Link>
        </Magnetic>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <Link
                href={link.href}
                target="_blank"
                className="text-xs uppercase tracking-[0.2em] transition-colors p-2"
                style={{ color: 'var(--link-color)' }}
              >
                {link.name}
              </Link>
            </Magnetic>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="p-2 transition-colors"
            style={{ color: 'var(--link-color)' }}
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
        </div>
      </header>
      
      {/* Mobile Menu logic remains same but simplified for brevity in this step */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: 'var(--foreground)', opacity: 0.8 }} onClick={closeMobileMenu} />
          <div id="mobile-menu" ref={mobileMenuRef} className="absolute top-0 left-0 right-0 border-b" style={{ backgroundColor: 'var(--mobile-menu-bg)', borderColor: 'var(--border-color)' }}>
             <div className="flex justify-between items-center px-6 py-8">
              <Link href="/" className="text-xl font-playfair font-bold tracking-tighter" style={{ color: 'var(--foreground)' }} onClick={handleLinkClick}>MARK.</Link>
              <button onClick={closeMobileMenu} className="p-2 transition-colors" style={{ color: 'var(--link-color)' }} aria-label="Close menu"><X className="w-6 h-6" /></button>
            </div>
            <nav className="px-6 pb-8">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} onClick={handleLinkClick} target="_blank" className="text-lg font-inter transition-colors py-2 border-b" style={{ color: 'var(--link-color)', borderColor: 'var(--border-color)' }}>{link.name}</Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
