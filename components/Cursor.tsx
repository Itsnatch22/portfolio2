"use client"
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastUpdateTime = useRef<number>(0);
  const throttleDelay = 16; // ~60fps

  const cursorX = useSpring(0, { stiffness: 250, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 250, damping: 20 });

  const throttledMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdateTime.current < throttleDelay) return;
    
    lastUpdateTime.current = now;
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('a, button, [data-cursor-hover]');
    setIsHovering(!!isInteractive);
  }, []);

  useEffect(() => {
    // Check if device supports touch (mobile/tablet)
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return;
    }

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [throttledMouseMove, handleElementHover, handleMouseEnter, handleMouseLeave]);

  // Hide on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 2.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="w-3 h-3 bg-foreground rounded-full" />
        </motion.div>
      </motion.div>

      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="w-10 h-10 border border-foreground/30 rounded-full blur-[1px]" />
        </motion.div>
      </motion.div>
    </>
  );
};
