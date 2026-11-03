import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillCategory } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-24 px-6 bg-obsidian border-b border-char">
      <div className="max-w-container mx-auto space-y-12">
        {/* Section Heading */}
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-bone font-normal leading-[1.05] tracking-[-0.03em]">
            Technical Competencies
          </h2>
          <p className="text-[16px] text-slate">
            Languages, frameworks, and engineering tools mastered throughout studies and project development.
          </p>
        </div>

        {/* 4-Column Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <Card key={idx} variant="char" className="p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-char pb-3">
                  <span className="text-[11px] text-slate font-mono uppercase tracking-widest">
                    Category 0{idx + 1}
                  </span>
                  <h3 className="font-display text-xl text-bone tracking-tight mt-1">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, sIdx) => (
                    <Badge
                      key={sIdx}
                      variant="outline"
                      className="hover:border-bone/50 hover:text-bone text-[13px] py-1.5 px-3"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[12px] text-slate/70">
                Verified in coursework & projects
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
