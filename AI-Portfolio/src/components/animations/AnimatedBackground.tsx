"use client";

import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const isMovingRef = useRef(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    // Linear interpolation loop (Lerp) for smooth spotlight damping
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updatePosition = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.3) {
        currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08);
        currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08);

        // Center the 650px spotlight over the mouse cursor
        spotlight.style.transform = `translate3d(${currentPos.current.x - 325}px, ${currentPos.current.y - 325}px, 0)`;
        animFrameId.current = requestAnimationFrame(updatePosition);
      } else {
        isMovingRef.current = false;
        animFrameId.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Fade in spotlight on initial mouse entry
      if (spotlight.style.opacity !== "1") {
        spotlight.style.opacity = "1";
      }

      if (!isMovingRef.current) {
        isMovingRef.current = true;
        animFrameId.current = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      spotlight.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-night-violet"
    >
      {/* ========================================================= */}
      {/* LAYER A: Aurora Gradient Background                       */}
      {/* ========================================================= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1: Ultraviolet Core (Top Left) */}
        <div className="animate-aurora-1 absolute -left-40 -top-40 h-[650px] w-[650px] rounded-full bg-ultraviolet-core/35 blur-[100px]" />

        {/* Blob 2: Electric Azure / Blue (Top Right) */}
        <div className="animate-aurora-2 absolute -right-32 top-[15%] h-[680px] w-[680px] rounded-full bg-blue-500/30 blur-[110px]" />

        {/* Blob 3: Lilac Pink (Bottom Center/Left) */}
        <div className="animate-aurora-3 absolute -bottom-40 left-[25%] h-[720px] w-[720px] rounded-full bg-pink-500/25 blur-[120px]" />

        {/* Blob 4: Cyan Radiance (Mid Left) */}
        <div className="animate-aurora-4 absolute -left-32 top-[55%] h-[580px] w-[580px] rounded-full bg-cyan-400/25 blur-[100px]" />
      </div>

      {/* ========================================================= */}
      {/* LAYER B: Interactive Mouse Spotlight                      */}
      {/* ========================================================= */}
      <div
        ref={spotlightRef}
        className="absolute left-0 top-0 h-[650px] w-[650px] rounded-full opacity-0 transition-opacity duration-700 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(113, 61, 255, 0.22) 0%, rgba(59, 130, 246, 0.12) 35%, rgba(6, 182, 212, 0.05) 55%, transparent 70%)",
        }}
      />

      {/* ========================================================= */}
      {/* LAYER C: Floating Background Geometric Shapes             */}
      {/* ========================================================= */}
      <div className="absolute inset-0">
        {/* Shape 1: Top Right Glass Ring */}
        <div className="animate-float-1 absolute right-[10%] top-24 h-56 w-56 rounded-full border border-white/[0.15] bg-white/[0.03] shadow-[0_0_40px_rgba(113,61,255,0.15)] backdrop-blur-[2px]" />

        {/* Shape 2: Mid-Left Tilted Squircle */}
        <div className="animate-float-2 absolute left-[6%] top-[42%] h-48 w-48 rotate-12 rounded-3xl border border-white/[0.12] bg-gradient-to-br from-ultraviolet-core/[0.08] to-transparent shadow-[0_0_35px_rgba(183,164,251,0.1)]" />

        {/* Shape 3: Bottom Right Cyan Orbit Ring */}
        <div className="animate-float-3 absolute bottom-[22%] right-[14%] h-40 w-40 rounded-full border border-cyan-400/[0.25] bg-cyan-400/[0.02] shadow-[0_0_30px_rgba(6,182,212,0.12)]" />

        {/* Shape 4: Bottom Left Lilac Pill */}
        <div className="animate-float-1 absolute bottom-[12%] left-[16%] h-24 w-56 -rotate-12 rounded-full border border-lilac-beam/[0.18] bg-lilac-beam/[0.03] shadow-[0_0_25px_rgba(183,164,251,0.1)]" />
      </div>

      {/* Subtle Vignette for cinema-grade depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,1,24,0.45)_100%)]" />
    </div>
  );
}
