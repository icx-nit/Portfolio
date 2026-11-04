"use client";

import React from "react";
import { UltravioletGlow } from "@/components/ui/ultraviolet-glow";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Sparkles } from "lucide-react";
import { useApp } from "@/lib/i18n/context";

interface HeroSectionProps {
  onOpenChat?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat }) => {
  const { t } = useApp();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 pt-36 pb-24 overflow-hidden bg-night-violet">
      {/* Radiant Violet Horizon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0">
        <UltravioletGlow intensity="vibrant" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Wope Promotional Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-soft-quartz text-[13px] mb-8 tracking-wide backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-lilac-beam animate-pulse" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Display Headline in Rebond Grotesque / Sora */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-soft-quartz font-bold leading-[1.11] tracking-[-1.44px] mb-8 max-w-4xl">
          {t.hero.headline}
        </h1>

        {/* Supporting Inter Body */}
        <p className="text-[16px] sm:text-[18px] text-ash-lilac font-normal max-w-[620px] leading-[1.56] tracking-[-0.16px] mb-10">
          {t.hero.subheadline}
        </p>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects">
            <Button variant="glass" size="lg" className="border-white/20 hover:border-lilac-beam/50">
              {t.hero.exploreProjects}
            </Button>
          </a>

          <a href="#contact">
            <Button variant="outline" size="lg">
              {t.hero.getInTouch}
            </Button>
          </a>

          {onOpenChat && (
            <Button
              variant="violet"
              size="lg"
              onClick={onOpenChat}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{t.hero.askAssistant}</span>
            </Button>
          )}
        </div>

        {/* GitHub External Note */}
        <div className="mt-14 flex items-center gap-2.5 text-[13px] text-ash-lilac">
          <span>{t.hero.githubSubtitle}</span>
          <a
            href="https://github.com/icx-nit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-soft-quartz hover:text-lilac-beam hover:underline underline-offset-4 font-mono transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>github.com/icx-nit</span>
          </a>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ash-lilac/50 animate-bounce">
        <a href="#feed" aria-label="Scroll to social feed section">
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
