"use client";

import React from "react";
import { Github, Download, Heart, ExternalLink, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/i18n/context";
import { initialProfile } from "@/data/portfolio-seed";

interface HeroSectionProps {
  followerCount: number;
  hasFollowed: boolean;
  onFollow: () => void;
  profile?: {
    name?: string;
    role?: string;
    bio?: string;
    githubUrl?: string;
  };
  activeResume?: {
    url?: string;
    fileName?: string;
    title?: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  followerCount,
  hasFollowed,
  onFollow,
  profile,
  activeResume,
}) => {
  const { t, language } = useApp();

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-transparent"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-7">
        {/* Line 1: Big Prominent Greeting */}
        <div className="space-y-2.5">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {t.hero.greeting}
          </h1>

          {/* Line 2: Role with Accent Color */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-lilac-beam to-cyan-400 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {t.hero.role}
          </h2>
        </div>

        {/* Short Bio Paragraph (Centered with optimal reading width) */}
        <p className="text-[16px] sm:text-[18px] md:text-[19px] text-[#d6d3e6] leading-relaxed max-w-2xl font-normal mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          {language === "th" ? t.hero.subheadline : (profile?.bio || t.hero.subheadline)}
        </p>

        {/* GitHub Information Box (Proportionate, Balanced Spacing & Sizing - Matches Image 3 & 10) */}
        <a
          href={profile?.githubUrl || initialProfile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-400/40 bg-[#0d0722]/90 hover:bg-[#150a35] hover:border-cyan-400 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-cyan-500/15 border border-cyan-400/35 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
            <Github className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors tracking-wide">
            GitHub · {(profile?.githubUrl || initialProfile.githubUrl).replace("https://", "")}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-0.5" />
        </a>

        {/* Action Buttons: Centered Download Resume & Follow Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Button 1: Download Resume */}
          <a
            href={activeResume?.url || "/Nittaya_Pana_Resume.pdf"}
            download={activeResume?.fileName || "Nittaya_Pana_Resume.pdf"}
            className="inline-block"
          >
            <Button
              variant="violet"
              size="lg"
              className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold rounded-full gap-2 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.hero.downloadResume}</span>
            </Button>
          </a>

          {/* Button 2: Follow / Unfollow Toggle */}
          <Button
            onClick={onFollow}
            variant={hasFollowed ? "outline" : "glass"}
            size="lg"
            className={`rounded-full gap-2 transition-all duration-200 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.5)] ${
              hasFollowed
                ? "border-emerald-400/50 text-emerald-300 bg-emerald-500/15 hover:bg-red-500/15 hover:border-red-400/50 hover:text-red-300"
                : "border-white/25 bg-[#0c051e]/85 text-white hover:border-cyan-400 hover:text-cyan-300 hover:scale-[1.02]"
            }`}
            title={
              language === "th"
                ? hasFollowed
                  ? "คลิกเพื่อยกเลิกติดตาม"
                  : "คลิกเพื่อติดตาม"
                : hasFollowed
                ? "Click to Unfollow"
                : "Click to Follow"
            }
          >
            {hasFollowed ? (
              <>
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.following}</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 text-pink-400" />
                <span>{t.hero.followMe}</span>
              </>
            )}
            <span className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-soft-quartz font-semibold">
              {followerCount}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
