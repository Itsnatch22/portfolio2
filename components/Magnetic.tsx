"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function Magnetic({
  children,
  className = "inline-block",
  strength = 0.35,
}: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = magneticRef.current;

    if (!element) {
      return;
    }

    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { dependencies: [strength], scope: magneticRef, revertOnUpdate: true });

  return (
    <div ref={magneticRef} className={className}>
      {children}
    </div>
  );
}
