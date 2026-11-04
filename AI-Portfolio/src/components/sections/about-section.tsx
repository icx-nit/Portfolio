"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap, Code2, Sparkles, Database } from "lucide-react";
import { Profile } from "@/types/portfolio";
import { useApp } from "@/lib/i18n/context";

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const { t } = useApp();

  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-lilac-beam" />,
      title: t.about.card1Title,
      description: t.about.card1Desc,
    },
    {
      icon: <Code2 className="w-5 h-5 text-lilac-beam" />,
      title: t.about.card2Title,
      description: t.about.card2Desc,
    },
    {
      icon: <Database className="w-5 h-5 text-lilac-beam" />,
      title: t.about.card3Title,
      description: t.about.card3Desc,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-lilac-beam" />,
      title: t.about.card4Title,
      description: t.about.card4Desc,
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-night-violet border-b border-white/10">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Heading & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold leading-[1.14] tracking-[-1.12px]">
              {t.about.title}
            </h2>

            <div className="space-y-4 text-[15px] sm:text-[16px] text-ash-lilac font-normal leading-[1.6]">
              <p className="text-soft-quartz/90 font-medium">
                {t.about.intro}
              </p>
              <p>
                {t.about.para1}
              </p>
              <p>
                {t.about.para2}
              </p>
            </div>
          </div>

          {/* Feature Surface Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <Card key={idx} variant="surface" className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.04]">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-soft-quartz font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[14px] text-ash-lilac leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
