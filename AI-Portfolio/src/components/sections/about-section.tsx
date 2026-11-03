import React from "react";
import { Card } from "@/components/ui/card";
import { GraduationCap, Code2, Sparkles, Database } from "lucide-react";
import { Profile } from "@/types/portfolio";

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-bone" />,
      title: "University of Phayao",
      description: "Studying Software Engineering at School of Information and Communication Technology.",
    },
    {
      icon: <Code2 className="w-5 h-5 text-bone" />,
      title: "Full-Stack Development",
      description: "Building modern web applications with React, Next.js, TypeScript, and Tailwind CSS.",
    },
    {
      icon: <Database className="w-5 h-5 text-bone" />,
      title: "Database Engineering",
      description: "Relational database modeling with PostgreSQL and Supabase with strict Row Level Security.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-bone" />,
      title: "AI Integration",
      description: "Developing intelligent retrieval assistants and data-driven web services.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-obsidian border-b border-char">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Heading & Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-bone font-normal leading-[1.05] tracking-[-0.03em]">
              About the Developer
            </h2>

            <div className="space-y-4 text-[16px] text-bone/80 font-normal leading-relaxed">
              <p>
                Hello, I’m <span className="text-bone font-medium">{profile.name}</span>. Currently pursuing a Bachelor’s degree in Software Engineering at the{" "}
                <span className="text-bone">School of Information and Communication Technology, University of Phayao</span>.
              </p>
              <p>
                My focus lies at the intersection of robust backend architecture and crafted frontends. I believe that software should be engineered cleanly—from normalized database schemas and type-safe APIs to minimal, high-contrast user interfaces.
              </p>
              <p className="text-[14px] text-slate">
                Dedicated to continuous learning, building production-grade web systems, and contributing to open-source software.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <Card key={idx} variant="char" className="p-6 space-y-3">
                <div className="w-10 h-10 rounded-full border border-char flex items-center justify-center bg-char/30">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl text-bone tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[14px] text-slate leading-relaxed">
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
