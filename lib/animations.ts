import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animatePreloader() {
  const tl = gsap.timeline();

  // Animate preloader panels
  tl.to(".preloader-panel", {
    height: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.inOut",
  });

  // Animate status bar and scroll indicator
  tl.to(".status-bar", {
    opacity: 1,
    y: 0,
    duration: 1,
  }, "-=1")
  .to(".scroll-indicator", {
    opacity: 1,
    duration: 1,
  }, "-=0.5");

  return tl;
}
/**
 * Split text into individual characters wrapped in spans
 */
export function splitText(element: HTMLElement): NodeListOf<HTMLElement> {
  const text = element.textContent || "";
  const chars = text.split("");
  
  element.innerHTML = "";
  
  chars.forEach((char) => {
    const span = document.createElement("span");
    span.className = "char inline-block";
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    element.appendChild(span);
  });
  
  return element.querySelectorAll(".char");
}

/**
 * Split text into words wrapped in spans
 */
export function splitWords(element: HTMLElement): NodeListOf<HTMLElement> {
  const text = element.textContent || "";
  const words = text.split(" ");
  
  element.innerHTML = "";
  
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word inline-block";
    span.textContent = word;
    span.style.display = "inline-block";
    element.appendChild(span);
    
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });
  
  return element.querySelectorAll(".word");
}

/**
 * Animate characters with stagger
 */
export function animateChars(
  chars: NodeListOf<HTMLElement> | HTMLElement[],
  options: gsap.TweenVars = {}
) {
  return gsap.to(chars, {
    yPercent: 0,
    opacity: 1,
    rotateX: 0,
    stagger: 0.02,
    duration: 1,
    ease: "power4.out",
    ...options,
  });
}

/**
 * Fade in with slide up animation
 */
export function fadeInUp(
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      ...options,
    }
  );
}

/**
 * Scale in animation
 */
export function scaleIn(
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      ...options,
    }
  );
}

/**
 * Reveal animation with clip-path
 */
export function reveal(
  element: gsap.TweenTarget,
  direction: "left" | "right" | "top" | "bottom" = "bottom",
  options: gsap.TweenVars = {}
) {
  const clipPaths = {
    left: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0)" },
    right: { from: "inset(0 100% 0 0)", to: "inset(0 0 0 0)" },
    top: { from: "inset(0 0 100% 0)", to: "inset(0 0 0 0)" },
    bottom: { from: "inset(100% 0 0 0)", to: "inset(0 0 0 0)" },
  };

  return gsap.fromTo(
    element,
    { clipPath: clipPaths[direction].from },
    {
      clipPath: clipPaths[direction].to,
      duration: 1.2,
      ease: "power4.inOut",
      ...options,
    }
  );
}

/**
 * Magnetic effect for interactive elements
 */
export function createMagnetic(element: HTMLElement, strength = 0.4) {
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
}

/**
 * Parallax scroll effect
 */
export function parallax(
  element: HTMLElement | string,
  speed = 0.5,
  options: gsap.TweenVars = {}
) {
  return gsap.to(element, {
    yPercent: -100 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    ...options,
  });
}

/**
 * Stagger fade in animation for lists
 */
export function staggerFadeIn(
  elements: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) {
  return gsap.fromTo(
    elements,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      ...options,
    }
  );
}

/**
 * Counter animation
 */
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration = 2,
  suffix = ""
) {
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + suffix;
    },
  });
}

/**
 * Smooth scroll to element
 */
export function scrollTo(target: string | HTMLElement, options: any = {}) {
  const element = typeof target === "string" 
    ? document.querySelector(target) 
    : target;
    
  if (!element) return;

  window.scrollTo({
    top: (element as HTMLElement).offsetTop,
    behavior: "smooth",
    ...options,
  });
}

/**
 * Mouse follower effect
 */
export function createMouseFollower(
  follower: HTMLElement,
  options: { speed?: number; scale?: number } = {}
) {
  const { speed = 0.2, scale = 1 } = options;
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  const updatePosition = () => {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    
    gsap.set(follower, {
      x: currentX,
      y: currentY,
      scale,
    });
    
    requestAnimationFrame(updatePosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.addEventListener("mousemove", handleMouseMove);
  updatePosition();

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}