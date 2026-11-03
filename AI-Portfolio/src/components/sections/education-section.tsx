import React from "react";
import { Card } from "@/components/ui/card";
import { Education } from "@/types/portfolio";
import { Calendar, MapPin, Award } from "lucide-react";

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section id="education" className="py-24 px-6 bg-obsidian border-b border-char">
      <div className="max-w-container mx-auto space-y-12">
        {/* Section Heading */}
        <div className="max-w-xl space-y-3">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-bone font-normal leading-[1.05] tracking-[-0.03em]">
            Education & Academic Foundation
          </h2>
          <p className="text-[16px] text-slate">
            Academic degree, university background, and core engineering coursework.
          </p>
        </div>

        {/* Timeline / Cards */}
        <div className="space-y-6">
          {education.map((item) => (
            <Card key={item.id} variant="char" className="p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-char/60 pb-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-[12px] text-slate font-mono uppercase tracking-widest">
                    <span>Undergraduate Degree</span>
                    <span>·</span>
                    <span className="text-[#feed7a]">In Progress</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-bone tracking-tight">
                    {item.degree} in {item.fieldOfStudy}
                  </h3>
                  <p className="text-[16px] text-bone/90 font-medium">
                    {item.institution}
                  </p>
                </div>

                <div className="flex flex-col md:items-end gap-1.5 text-[13px] text-slate">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.startDate} — Present</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Phayao, Thailand</span>
                  </span>
                </div>
              </div>

              {/* Coursework & Description */}
              <div className="space-y-4">
                <p className="text-[15px] text-bone/80 leading-relaxed max-w-3xl">
                  {item.description}
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
                      className="px-3.5 py-2.5 rounded-lg border border-char/60 bg-char/20 text-[13px] text-bone/90 flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-slate shrink-0" />
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
