"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { X, Menu } from "lucide-react";

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

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    closeMobileMenu();
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 1,
      });

      // Mobile menu animation
      if (mobileMenuRef.current) {
        gsap.set(mobileMenuRef.current, { y: -20, opacity: 0 });
        
        if (isMobileMenuOpen) {
          gsap.to(mobileMenuRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(mobileMenuRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
          });
        }
      }
    }, navRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // Close menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-24 py-8 mix-blend-difference"
      >
        <Link href="/" className="text-xl font-playfair font-bold text-white tracking-tighter">
          MARK.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Content */}
          <div 
            ref={mobileMenuRef}
            className="absolute top-0 left-0 right-0 bg-[#050505] border-b border-white/10"
          >
            <div className="flex justify-between items-center px-6 py-8">
              <Link 
                href="/" 
                className="text-xl font-playfair font-bold text-white tracking-tighter"
                onClick={handleLinkClick}
              >
                MARK.
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="px-6 pb-8">
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="text-lg font-inter text-white/80 hover:text-white transition-colors py-2 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
