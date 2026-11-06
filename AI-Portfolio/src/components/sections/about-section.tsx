"use client";

import React from "react";
import Image from "next/image";
import {
  GraduationCap,
  CheckCircle2,
  Workflow,
} from "lucide-react";
import { useApp } from "@/lib/i18n/context";
import { initialProfile } from "@/data/portfolio-seed";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface AboutSectionProps {
  profile?: any;
  education?: any[];
  aboutDetails?: {
    topic1Title?: string;
    topic1Desc?: string;
    topic2Title?: string;
    topic2Desc?: string;
    topic3Title?: string;
    topic3Desc?: string;
    topic4Title?: string;
    topic4Items?: string[];
    topic5Title?: string;
    topic5Desc?: string;
  };
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  education,
  aboutDetails,
}) => {
  const { t, language } = useApp();

  const primaryEdu = education && education.length > 0 ? education[0] : null;
  const eduInstitution = language === "en" ? t.about.universityValue : (primaryEdu?.institution || t.about.universityValue);
  const eduDegree = language === "en" ? t.about.facultyValue : (primaryEdu?.degree || t.about.facultyValue);
  const eduMajor = language === "en" ? t.about.majorValue : (primaryEdu?.fieldOfStudy || t.about.majorValue);

  const topic1Title = language === "en" ? t.about.topic1Title : (aboutDetails?.topic1Title || t.about.topic1Title);
  const topic1Desc = language === "en" ? t.about.topic1Desc : (aboutDetails?.topic1Desc || t.about.topic1Desc);
  const topic2Title = language === "en" ? t.about.topic2Title : (aboutDetails?.topic2Title || t.about.topic2Title);
  const topic2Desc = language === "en" ? t.about.topic2Desc : (aboutDetails?.topic2Desc || t.about.topic2Desc);
  const topic3Title = language === "en" ? t.about.topic3Title : (aboutDetails?.topic3Title || t.about.topic3Title);
  const topic3Desc = language === "en" ? t.about.topic3Desc : (aboutDetails?.topic3Desc || t.about.topic3Desc);
  const topic4Title = language === "en" ? t.about.topic4Title : (aboutDetails?.topic4Title || t.about.topic4Title);
  const topic4Items = language === "en" ? t.about.topic4Items : (aboutDetails?.topic4Items || t.about.topic4Items);
  const topic5Title = language === "en" ? t.about.topic5Title : (aboutDetails?.topic5Title || t.about.topic5Title);
  const topic5Desc = language === "en" ? t.about.topic5Desc : (aboutDetails?.topic5Desc || t.about.topic5Desc);

  return (
    <section
      id="about"
      className="py-28 px-6 bg-transparent border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Transparent Cutout Portrait Only (No Text)  */}
          {/* Slides in from LEFT                                      */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <ScrollReveal
              direction="left"
              amount={0.15}
              once={false}
              className="w-full flex flex-col items-center justify-center"
            >
              <div className="relative group w-full max-w-[460px] flex items-center justify-center">
                {/* Soft Ambient Background Aura (Violet/Cyan glow) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-ultraviolet-core/30 to-pink-500/15 blur-3xl opacity-75 pointer-events-none" />

                {/* Seamless Floating Portrait Cutout with Transparent Background (Enlarged) */}
                <div className="relative w-[320px] sm:w-[380px] md:w-[420px] lg:w-[450px] aspect-[496/628] select-none [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]">
                  <Image
                    src={profile?.aboutAvatarUrl || "/images/profile_cutout.png"}
                    alt={profile?.name || initialProfile.name}
                    fill
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, 450px"
                    className="object-contain object-bottom drop-shadow-[0_25px_50px_rgba(113,61,255,0.45)] transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: High-Contrast Editorial Content            */}
          {/* Slides in from RIGHT                                     */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <ScrollReveal
              direction="right"
              amount={0.15}
              once={false}
              className="space-y-6 text-left"
            >
              {/* Header: Title + Accent Bar (Without top pill badge per request) */}
              <div className="space-y-3">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {language === "th" ? "เกี่ยวกับฉัน" : "About Me."}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-ultraviolet-core via-lilac-beam to-cyan-400 rounded-full" />
              </div>

              {/* Education & Academic Badge (Prominent High-Contrast Card) */}
              <div className="p-5 sm:p-6 rounded-2xl border border-cyan-400/30 bg-[#090216]/90 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                    {profile?.name || t.about.fullNameValue}
                  </h4>
                  <p className="text-xs sm:text-sm text-ash-lilac leading-relaxed">
                    {eduInstitution} · {eduDegree} ·{" "}
                    <span className="text-cyan-300 font-semibold">{eduMajor}</span>
                  </p>
                </div>
              </div>

              {/* Unified Single Frame Container: Topics 1 - 5 in ONE single box with highlighted headings */}
              <div className="p-6 sm:p-8 rounded-3xl border border-cyan-400/25 bg-[#090216]/95 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-md space-y-6">
                {/* 1. Technology Interests */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 font-display font-bold text-sm sm:text-base shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <span>{topic1Title}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-sans pl-1">
                    {topic1Desc}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                {/* 2. Career Goals */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-400/35 text-lilac-beam font-display font-bold text-sm sm:text-base shadow-[0_0_12px_rgba(192,132,252,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-lilac-beam shadow-[0_0_8px_rgba(192,132,252,0.8)]" />
                    <span>{topic2Title}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-sans pl-1">
                    {topic2Desc}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                {/* 3. Strengths */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-500/15 border border-pink-400/35 text-pink-300 font-display font-bold text-sm sm:text-base shadow-[0_0_12px_rgba(244,114,182,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
                    <span>{topic3Title}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed font-sans pl-1">
                    {topic3Desc}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                {/* Sub-grid for Topics 4 & 5 inside the SAME container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  {/* 4. Currently Learning */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/20 bg-white/[0.02] space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-display font-bold text-xs sm:text-sm shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span>{topic4Title}</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-white pl-1">
                      {topic4Items.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-white font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. Working Approach */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-white/[0.02] space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300 font-display font-bold text-xs sm:text-sm shadow-[0_0_10px_rgba(251,191,36,0.15)]">
                      <Workflow className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{topic5Title}</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-white leading-relaxed pl-1">
                      {topic5Desc}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
