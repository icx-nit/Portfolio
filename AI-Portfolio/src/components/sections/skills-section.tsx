"use client";

import React from "react";
import Image from "next/image";
import {
  Layers,
  Layout,
  Sparkles,
  BookOpen,
  CheckCircle,
  HeartHandshake,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApp } from "@/lib/i18n/context";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SkillsSectionProps {
  cmsSkills?: Array<{
    category: string;
    items: Array<{
      id: string;
      name: string;
      level?: string;
      image?: string;
      description?: string;
      enabled?: boolean;
    }>;
  }>;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ cmsSkills }) => {
  const { t, language } = useApp();

  const hardSkillTranslations: Record<string, { th: string; en: string; descTh: string; descEn: string }> = {
    "Wireframing & Prototyping": {
      th: "การสร้างโครงร่างและแบบจำลอง (Wireframing & Prototyping)",
      en: "Wireframing & Prototyping",
      descTh: "ออกแบบโครงสร้างหน้าจอ ลำดับข้อมูล และเส้นทางการใช้งานของผู้ใช้",
      descEn: "Structuring screen layouts, information architecture, and user journeys.",
    },
    "Design System & Component Tokens": {
      th: "ระบบการออกแบบและชุดคอมโพเนนต์ (Design System)",
      en: "Design System & Component Tokens",
      descTh: "กำหนดโทเค็นสี ขนาดตัวอักษร คอมโพเนนต์ และคู่มือการออกแบบ",
      descEn: "Establishing unified color tokens, typography scales, and UI components.",
    },
    "Design System & Component Architecture": {
      th: "ระบบการออกแบบและชุดคอมโพเนนต์ (Design System)",
      en: "Design System & Component Tokens",
      descTh: "กำหนดโทเค็นสี ขนาดตัวอักษร คอมโพเนนต์ และคู่มือการออกแบบ",
      descEn: "Establishing unified color tokens, typography scales, and UI components.",
    },
    "Interaction & Motion Design": {
      th: "การออกแบบการมีปฏิสัมพันธ์และการเคลื่อนไหว (Motion Design)",
      en: "Interaction & Motion Design",
      descTh: "ออกแบบไมโครอินเตอร์แอคชันและการเคลื่อนไหวที่ช่วยยกระดับ UX",
      descEn: "Designing intuitive micro-interactions and transitions that enhance UX.",
    },
    "User Journey & Usability Research": {
      th: "การวิจัยผู้ใช้และทดสอบการใช้งาน (Usability Research)",
      en: "User Journey & Usability Research",
      descTh: "ศึกษาพฤติกรรมผู้ใช้ วางแผนเส้นทาง และทดสอบความง่ายในการใช้งาน",
      descEn: "Studying user behavior, journey mapping, and usability testing.",
    },
    "Responsive Layouts (HTML/CSS)": {
      th: "การออกแบบเลย์เอาต์ที่ยืดหยุ่น (Responsive Layouts)",
      en: "Responsive Layouts (HTML/CSS)",
      descTh: "จัดโครงสร้างการแสดงผลให้เหมาะสมกับทุกขนาดหน้าจอทั้งเดสก์ท็อปและมือถือ",
      descEn: "Crafting layouts that adapt smoothly across desktop, tablet, and mobile.",
    },
  };

  const softSkillTranslations: Record<string, { th: string; en: string; descTh: string; descEn: string }> = {
    "Continuous Learning & Empathy": {
      th: "การเรียนรู้อย่างต่อเนื่องและการเข้าใจผู้ใช้ (Empathy)",
      en: "Continuous Learning & Empathy",
      descTh: "พร้อมเปิดรับความรู้ใหม่ ๆ และมีความเข้าใจในมุมมองของผู้ใช้งาน",
      descEn: "Actively seeking knowledge and understanding users deeply with empathy.",
    },
    "High Responsibility & Attention to Detail": {
      th: "ความรับผิดชอบสูงและใส่ใจในรายละเอียด (Responsibility)",
      en: "High Responsibility & Attention to Detail",
      descTh: "มุ่งมั่นในคุณภาพ ใส่ใจทุกรายละเอียด ส่งมอบงานได้ตรงเวลา",
      descEn: "Accountable, meticulous with details, and committed to punctuality.",
    },
    "Cross-Functional Collaboration": {
      th: "การทำงานร่วมกันข้ามสายงาน (Team Collaboration)",
      en: "Cross-Functional Collaboration",
      descTh: "สื่อสารและทำงานร่วมกับนักพัฒนาและทีมอื่น ๆ ได้อย่างราบรื่น",
      descEn: "Communicating and collaborating seamlessly across multidisciplinary teams.",
    },
    "Cross-Functional Team Collaboration": {
      th: "การทำงานร่วมกันข้ามสายงาน (Team Collaboration)",
      en: "Cross-Functional Collaboration",
      descTh: "สื่อสารและทำงานร่วมกับนักพัฒนาและทีมอื่น ๆ ได้อย่างราบรื่น",
      descEn: "Communicating and collaborating seamlessly across multidisciplinary teams.",
    },
    "Feedback Receptiveness & Iteration": {
      th: "การรับฟังข้อเสนอแนะและพัฒนาผลงานต่อเนื่อง (Feedback Iteration)",
      en: "Feedback Receptiveness & Iteration",
      descTh: "เปิดรับคำแนะนำเพื่อนำมาปรับปรุงงานออกแบบให้ดียิ่งขึ้นเสมอ",
      descEn: "Receptive to constructive feedback and continuously iterating on designs.",
    },
    "Time & Sprint Task Management": {
      th: "การบริหารเวลาและจัดการงานในรอบ Sprint (Time Management)",
      en: "Time & Sprint Task Management",
      descTh: "จัดลำดับความสำคัญของงาน บริหารเวลาได้อย่างมีประสิทธิภาพ",
      descEn: "Prioritizing tasks effectively and managing time within agile sprints.",
    },
  };

  // Find CMS categories if provided
  const cmsHard = cmsSkills?.find((c) => c.category === "Hard Skills")?.items.filter((i) => i.enabled !== false);
  const cmsSoft = cmsSkills?.find((c) => c.category === "Soft Skills")?.items.filter((i) => i.enabled !== false);
  const cmsTools = cmsSkills?.find((c) => c.category === "Tools & Technologies")?.items.filter((i) => i.enabled !== false);

  // 1. Hard Skills
  const defaultHardSkills = [
    {
      title: t.skills.hard1Title,
      desc: t.skills.hard1Desc,
      icon: <Layout className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: t.skills.hard2Title,
      desc: t.skills.hard2Desc,
      icon: <Layers className="w-5 h-5 text-lilac-beam" />,
    },
    {
      title: t.skills.hard3Title,
      desc: t.skills.hard3Desc,
      icon: <Sparkles className="w-5 h-5 text-pink-400" />,
    },
  ];

  const hardSkills = cmsHard && cmsHard.length > 0
    ? cmsHard.map((item, idx) => {
        const trans = hardSkillTranslations[item.name];
        const title = trans ? (language === "th" ? trans.th : trans.en) : item.name;
        const desc = trans
          ? (language === "th" ? trans.descTh : trans.descEn)
          : (item.description || (item.level ? (language === "th" ? `ระดับ: ${item.level}` : `Level: ${item.level}`) : ""));

        return {
          title,
          desc,
          icon: idx % 3 === 0 ? <Layout className="w-5 h-5 text-cyan-400" /> : idx % 3 === 1 ? <Layers className="w-5 h-5 text-lilac-beam" /> : <Sparkles className="w-5 h-5 text-pink-400" />,
        };
      })
    : defaultHardSkills;

  // 2. Soft Skills
  const defaultSoftSkills = [
    {
      title: t.skills.soft1Title,
      desc: t.skills.soft1Desc,
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: t.skills.soft2Title,
      desc: t.skills.soft2Desc,
      icon: <CheckCircle className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: t.skills.soft3Title,
      desc: t.skills.soft3Desc,
      icon: <HeartHandshake className="w-5 h-5 text-amber-400" />,
    },
  ];

  const softSkills = cmsSoft && cmsSoft.length > 0
    ? cmsSoft.map((item, idx) => {
        const trans = softSkillTranslations[item.name];
        const title = trans ? (language === "th" ? trans.th : trans.en) : item.name;
        const desc = trans
          ? (language === "th" ? trans.descTh : trans.descEn)
          : (item.description || (item.level ? (language === "th" ? `ระดับ: ${item.level}` : `Proficiency: ${item.level}`) : ""));

        return {
          title,
          desc,
          icon: idx % 3 === 0 ? <BookOpen className="w-5 h-5 text-emerald-400" /> : idx % 3 === 1 ? <CheckCircle className="w-5 h-5 text-cyan-400" /> : <HeartHandshake className="w-5 h-5 text-amber-400" />,
        };
      })
    : defaultSoftSkills;

  // 3. Tools & Technologies (Updated with official user images)
  const defaultTools = [
    {
      name: "Canva",
      image: "/images/tools/canva.webp",
      color: "hover:border-teal-300/50",
    },
    {
      name: "Microsoft Word",
      image: "/images/tools/word.webp",
      color: "hover:border-blue-400/50",
    },
    {
      name: "Figma",
      image: "/images/tools/figma.png",
      color: "hover:border-pink-400/50",
    },
    {
      name: "Visual Studio Code",
      image: "/images/tools/vscode.webp",
      color: "hover:border-sky-400/50",
    },
    {
      name: "GitHub",
      image: "/images/tools/github.webp",
      color: "hover:border-white/40",
    },
  ];

  const tools = cmsTools && cmsTools.length > 0
    ? cmsTools.map((item) => ({
        name: item.name,
        image: item.image || "/images/tools/canva.webp",
        color: "hover:border-cyan-400/50",
      }))
    : defaultTools;

  return (
    <section id="skills" className="py-24 px-6 bg-transparent border-b border-white/10">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="space-y-3 max-w-2xl text-left">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold tracking-tight">
            {t.skills.title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-ash-lilac">
            {t.skills.subtitle}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 1. HARD SKILLS (Slides in from LEFT)                      */}
        {/* ========================================================= */}
        <ScrollReveal direction="left" amount={0.15} once={false} className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <h3 className="font-display font-bold text-xl sm:text-2xl text-soft-quartz">
              {t.skills.hardSkillsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hardSkills.map((skill, idx) => (
              <Card
                key={idx}
                variant="surface"
                className="p-6 space-y-3.5 border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {skill.icon}
                </div>
                <h4 className="font-display font-bold text-base text-soft-quartz">
                  {skill.title}
                </h4>
                <p className="text-xs sm:text-sm text-ash-lilac leading-relaxed">
                  {skill.desc}
                </p>
              </Card>
            ))}
          </div>
        </ScrollReveal>

        {/* ========================================================= */}
        {/* 2. SOFT SKILLS (Slides in from RIGHT)                     */}
        {/* ========================================================= */}
        <ScrollReveal direction="right" amount={0.15} once={false} className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lilac-beam" />
            <h3 className="font-display font-bold text-xl sm:text-2xl text-soft-quartz">
              {t.skills.softSkillsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {softSkills.map((skill, idx) => (
              <Card
                key={idx}
                variant="surface"
                className="p-6 space-y-3.5 border-white/10 hover:border-lilac-beam/40 transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                  {skill.icon}
                </div>
                <h4 className="font-display font-bold text-base text-soft-quartz">
                  {skill.title}
                </h4>
                <p className="text-xs sm:text-sm text-ash-lilac leading-relaxed">
                  {skill.desc}
                </p>
              </Card>
            ))}
          </div>
        </ScrollReveal>

        {/* ========================================================= */}
        {/* 3. TOOLS & TECHNOLOGIES (Slides in from LEFT)             */}
        {/* ========================================================= */}
        <ScrollReveal direction="left" amount={0.15} once={false} className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-display font-bold text-xl sm:text-2xl text-soft-quartz">
              {t.skills.toolsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {tools.map((tool, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border border-cyan-400/25 bg-[#070014] backdrop-blur-md flex flex-col items-center justify-center text-center space-y-3.5 transition-all duration-300 hover:scale-105 hover:bg-[#0d0124] hover:border-cyan-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${tool.color}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0e0227] border border-cyan-400/30 flex items-center justify-center shadow-inner overflow-hidden p-2">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain drop-shadow"
                  />
                </div>
                <span className="font-display font-semibold text-xs sm:text-sm text-soft-quartz tracking-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
