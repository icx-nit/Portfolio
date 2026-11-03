import React from "react";
import { SolsticeOrb } from "@/components/ui/solstice-orb";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenChat?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden bg-obsidian">
      {/* Solstice Atmospheric Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0">
        <SolsticeOrb size="lg" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Category Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-char bg-char/40 text-bone/80 text-[13px] mb-8 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#feed7a] animate-pulse" />
          <span>Software Engineering · University of Phayao</span>
        </div>

        {/* Display Headline in Recoleta Style */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[96px] text-bone font-normal leading-[1.0] tracking-[-0.035em] mb-8">
          Crafting software with intent.
        </h1>

        {/* Body Description Block */}
        <p className="text-[16px] sm:text-[18px] text-bone/75 font-normal max-w-[580px] leading-[1.5] mb-10">
          I’m <span className="text-bone font-medium">Nittaya Pana</span>, a Software Developer from the School of Information and Communication Technology, University of Phayao. Focused on full-stack web applications, clean architecture, and responsive user experiences.
        </p>

        {/* Actions: Clyde Ghost & Filled Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#projects">
            <Button variant="bone" size="lg">
              Explore Projects
            </Button>
          </a>

          <a href="#contact">
            <Button variant="ghost" size="lg">
              Get in Touch
            </Button>
          </a>

          {onOpenChat && (
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenChat}
              className="gap-2 border-char/80 hover:border-bone"
            >
              <Sparkles className="w-4 h-4 text-[#feed7a]" />
              <span>Ask AI Assistant</span>
            </Button>
          )}
        </div>

        {/* External GitHub link */}
        <div className="mt-12 flex items-center gap-3 text-[13px] text-slate">
          <span>Explore code repositories on</span>
          <a
            href="https://github.com/icx-nit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-bone hover:underline underline-offset-4"
          >
            <Github className="w-3.5 h-3.5" />
            <span>github.com/icx-nit</span>
          </a>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate/50 animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
