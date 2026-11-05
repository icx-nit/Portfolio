"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
  delayMs?: number;
  amount?: number; // default 0.2 (20% visible)
  once?: boolean; // default true
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  className = "",
  delayMs = 0,
  amount = 0.2,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkPosition = useCallback(() => {
    if (isVisible && once) return;
    if (!ref.current || typeof window === "undefined") return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if element is at least `amount` (e.g. 20%) into viewport
    const visibleThreshold = rect.height * amount;
    const isInView = rect.top + visibleThreshold <= windowHeight && rect.bottom >= visibleThreshold;

    if (isInView) {
      setIsVisible(true);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [isVisible, once, amount]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // 2. IntersectionObserver setup
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (once && observer) {
                observer.disconnect();
              }
            } else if (!once) {
              setIsVisible(false);
            }
          });
        },
        {
          threshold: amount,
          rootMargin: "0px 0px -20px 0px",
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
    }

    // 3. Fallback & complementary triggers:
    // Window scroll, resize, layout-updated event (from intro completion or tab switch)
    const handleLayoutOrScroll = () => {
      checkPosition();
    };

    // Initial check after short delay to let intro mount/unmount settle
    const initialTimer = setTimeout(checkPosition, 100);
    const secondaryTimer = setTimeout(checkPosition, 600);

    window.addEventListener("scroll", handleLayoutOrScroll, { passive: true });
    window.addEventListener("resize", handleLayoutOrScroll, { passive: true });
    window.addEventListener("layout-updated", handleLayoutOrScroll);

    // Watch for theme toggle (class change on <html>)
    const mutationObserver = new MutationObserver(() => {
      checkPosition();
    });
    mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondaryTimer);
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleLayoutOrScroll);
      window.removeEventListener("resize", handleLayoutOrScroll);
      window.removeEventListener("layout-updated", handleLayoutOrScroll);
    };
  }, [checkPosition, amount, once]);

  const getTransformClasses = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0";
    }

    switch (direction) {
      case "left":
        return "opacity-0 -translate-x-16 sm:-translate-x-24";
      case "right":
        return "opacity-0 translate-x-16 sm:translate-x-24";
      case "up":
      default:
        return "opacity-0 translate-y-14 sm:translate-y-20";
      case "down":
        return "opacity-0 -translate-y-14 sm:-translate-y-20";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
