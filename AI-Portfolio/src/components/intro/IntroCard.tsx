"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { initialProfile } from "@/data/portfolio-seed";

interface IntroCardProps {
  onComplete: () => void;
  profile?: any;
}

export const IntroCard: React.FC<IntroCardProps> = ({ onComplete, profile }) => {
  // Phase state: 'enter' (0 - 0.8s) | 'reveal' (0.8 - 2.4s) | 'exit' (2.4 - 3.2s) | 'done' (3.6s)
  const [phase, setPhase] = useState<"enter" | "reveal" | "exit" | "done">("enter");
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionQuery.matches) {
        setIsReducedMotion(true);
      }
    }

    // Timeline control:
    // 0.8s: Enter finishes, trigger content reveal
    const tReveal = setTimeout(() => {
      setPhase("reveal");
    }, 800);

    // 2.4s: Reading pause finishes, start exit
    const tExit = setTimeout(() => {
      setPhase("exit");
    }, 2400);

    // 3.4s: Exit finishes, notify parent to reveal main portfolio & unmount
    const tDone = setTimeout(() => {
      handleFinish();
    }, 3400);

    return () => {
      clearTimeout(tReveal);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, []);

  const handleFinish = () => {
    setPhase("done");
    onComplete();
  };

  if (phase === "done") {
    return null;
  }

  // Profile avatar fallback initials
  const initials = initialProfile.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "NP";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-night-violet/90 backdrop-blur-md overflow-hidden select-none"
    >
      {/* ========================================================= */}
      {/* The Animated Portfolio Intro Card                         */}
      {/* ========================================================= */}
      <div
        className={`relative w-[92vw] sm:w-[84vw] md:w-[72vw] max-w-[820px] aspect-[16/9] min-h-[290px] sm:min-h-[360px] md:min-h-[400px] rounded-[28px] sm:rounded-[36px] border border-white/20 sm:border-white/25 bg-gradient-to-br from-[#150933] via-[#0b011c] to-[#04010a] shadow-[0_35px_100px_rgba(113,61,255,0.45),0_0_40px_rgba(6,182,212,0.15)] overflow-hidden flex items-center px-6 sm:px-12 md:px-16 -rotate-[4.5deg] ${
          isReducedMotion
            ? phase === "exit"
              ? "opacity-0 transition-opacity duration-500"
              : "opacity-100 transition-opacity duration-500"
            : phase === "exit"
            ? "animate-intro-out"
            : "animate-intro-in"
        }`}
      >
        {/* Soft Ambient Radial Glow inside card */}
        <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-ultraviolet-core/30 blur-[70px]" />
        <div className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-[80px]" />

        {/* Card Content Layout: Centered & Balanced Spacing */}
        <div className="relative z-10 w-full max-w-[620px] mx-auto flex items-center justify-center gap-8 sm:gap-12 md:gap-14">
          {/* Left Column: Title & Display Name (Without Thai parentheses) */}
          <div className="flex-1 space-y-2 sm:space-y-3 text-left">
            <h1
              className={`font-display text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${
                phase === "reveal" || phase === "exit" ? "animate-intro-text" : "opacity-0"
              }`}
            >
              Portfolio
            </h1>

            <p
              className={`font-sans text-sm sm:text-lg md:text-xl text-white/90 font-semibold tracking-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] ${
                phase === "reveal" || phase === "exit" ? "animate-intro-text" : "opacity-0"
              }`}
              style={{ animationDelay: "200ms" }}
            >
              {(profile?.name || initialProfile.name).split(" (")[0]}
            </p>
          </div>

          {/* Right Column: Owner Profile Avatar (Enlarged and centered) */}
          <div
            className={`w-[125px] h-[125px] sm:w-[175px] sm:h-[175px] md:w-[210px] md:h-[210px] lg:w-[225px] lg:h-[225px] flex-shrink-0 rounded-2xl sm:rounded-3xl border-2 border-cyan-400/50 bg-gradient-to-tr from-ultraviolet-core/35 to-blue-500/25 shadow-[0_0_35px_rgba(6,182,212,0.35)] overflow-hidden flex items-center justify-center ${
              phase === "reveal" || phase === "exit" ? "animate-intro-avatar" : "opacity-0"
            }`}
          >
            {(profile?.avatarUrl || initialProfile.avatarUrl) ? (
              <Image
                src={profile?.avatarUrl || initialProfile.avatarUrl}
                alt={profile?.name || initialProfile.name}
                width={230}
                height={230}
                className="h-full w-full object-cover"
                priority
              />
            ) : (
              <span className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider">
                {initials}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Skip Button (Bottom-Right, non-intrusive full pill)        */}
      {/* ========================================================= */}
      <button
        onClick={handleFinish}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-[#0a0218]/80 hover:bg-white/[0.12] hover:border-white/35 text-xs sm:text-sm text-white font-medium backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
        aria-label="Skip introduction animation"
      >
        <span>Skip</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};
