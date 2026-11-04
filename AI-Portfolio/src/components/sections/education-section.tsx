"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Education } from "@/types/portfolio";
import { Calendar, MapPin, Award } from "lucide-react";
import { useApp } from "@/lib/i18n/context";

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const { language, t } = useApp();

  return (
    <section id="education" className="py-24 px-6 bg-night-violet border-b border-white/10">
      <div className="max-w-container mx-auto space-y-12">
        {/* Section Heading */}
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold leading-[1.14] tracking-[-1.12px]">
            {t.education.title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-ash-lilac">
            {t.education.subtitle}
          </p>
        </div>

        {/* Timeline / Cards */}
        <div className="space-y-6">
          {education.map((item) => (
            <Card key={item.id} variant="surface" className="p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-[12px] text-lilac-beam font-mono uppercase tracking-widest">
                    <span>{language === "th" ? "ระดับปริญญาตรี" : "Undergraduate Degree"}</span>
                    <span>·</span>
                    <span className="text-ultraviolet-core">{t.education.status}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-soft-quartz font-bold tracking-tight">
                    {t.education.degree}
                  </h3>
                  <p className="text-[16px] text-soft-quartz/90 font-medium">
                    {t.education.institution} ({t.education.faculty})
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-1.5 text-[13px] text-ash-lilac">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-dim-fog" />
                    <span>{t.education.timeline}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-dim-fog" />
                    <span>{t.education.location}</span>
                  </span>
                </div>
              </div>

              {/* Coursework & Description */}
              <div className="space-y-4">
                <p className="text-[15px] text-ash-lilac leading-relaxed max-w-3xl">
                  {t.education.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    "Software Architecture",
                    "Database Systems",
                    "Web Engineering",
                    "Algorithms & Data Structures",
                  ].map((course, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-[13px] text-soft-quartz/90 flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-lilac-beam shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
