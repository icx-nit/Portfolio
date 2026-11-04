"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillCategory } from "@/types/portfolio";
import { useApp } from "@/lib/i18n/context";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const { t } = useApp();

  return (
    <section id="skills" className="py-24 px-6 bg-night-violet border-b border-white/10">
      <div className="max-w-container mx-auto space-y-12">
        {/* Section Heading */}
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold leading-[1.14] tracking-[-1.12px]">
            {t.skills.title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-ash-lilac">
            {t.skills.subtitle}
          </p>
        </div>

        {/* 4-Column Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <Card key={idx} variant="surface" className="p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[11px] text-lilac-beam font-mono uppercase tracking-widest">
                    Category 0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg text-soft-quartz font-bold tracking-tight mt-1">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, sIdx) => (
                    <Badge
                      key={sIdx}
                      variant="glass"
                      className="hover:border-ultraviolet-core/50 hover:text-soft-quartz text-[13px] py-1.5 px-3"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[12px] text-ash-lilac/70">
                {t.skills.verified}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
