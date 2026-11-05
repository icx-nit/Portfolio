import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { initialProfile } from "@/data/profile";
import { initialEducation, initialSkills } from "@/data/portfolio-seed";
import { initialPosts } from "@/data/posts";
import { supabase } from "@/lib/supabase/client";

const STORE_PATH = path.join(process.cwd(), "src/data/cms-store.json");

function loadStoreFromFile() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("[CMS Store] Error reading cms-store.json:", e);
  }
  return null;
}

function saveStoreToFile(store: any) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("[CMS Store] Error writing cms-store.json:", e);
  }
}

const savedData = loadStoreFromFile();

// In-memory CMS store initialized from file store or fallback to seeds
let currentProfile = savedData?.profile || {
  ...initialProfile,
  aboutAvatarUrl: "/images/profile_cutout.png",
  socialLinks: {
    linkedin: "https://linkedin.com/in/nittaya-pana",
    dribbble: "https://dribbble.com/nittayaui",
    twitter: "https://x.com/nittaya_ux",
  },
};

let currentEducation = savedData?.education || [...initialEducation];

let currentSkills = savedData?.skills || [
  {
    category: "Hard Skills",
    items: [
      { id: "h1", name: "Wireframing & Prototyping", level: "Advanced", enabled: true },
      { id: "h2", name: "Design System & Component Architecture", level: "Advanced", enabled: true },
      { id: "h3", name: "Interaction & Motion Design", level: "Intermediate", enabled: true },
      { id: "h4", name: "User Journey & Usability Research", level: "Advanced", enabled: true },
      { id: "h5", name: "Responsive Layouts (HTML/CSS)", level: "Intermediate", enabled: true },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { id: "s1", name: "Continuous Learning & Empathy", level: "Expert", enabled: true },
      { id: "s2", name: "High Responsibility & Attention to Detail", level: "Expert", enabled: true },
      { id: "s3", name: "Cross-Functional Team Collaboration", level: "Expert", enabled: true },
      { id: "s4", name: "Feedback Receptiveness & Iteration", level: "Advanced", enabled: true },
      { id: "s5", name: "Time & Sprint Task Management", level: "Advanced", enabled: true },
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      { id: "t1", name: "Canva", level: "Expert", image: "/images/tools/canva.webp", enabled: true },
      { id: "t2", name: "Microsoft Word", level: "Expert", image: "/images/tools/word.webp", enabled: true },
      { id: "t3", name: "Figma", level: "Advanced", image: "/images/tools/figma.png", enabled: true },
      { id: "t4", name: "Visual Studio Code", level: "Intermediate", image: "/images/tools/vscode.webp", enabled: true },
      { id: "t5", name: "GitHub", level: "Intermediate", image: "/images/tools/github.webp", enabled: true },
    ],
  },
];

let currentPosts = savedData?.posts !== undefined ? savedData.posts : [...initialPosts];

let currentResumes = savedData?.resumes || [
  {
    id: "resume-1",
    title: "Nittaya Pana - UX/UI Designer Resume (2026)",
    fileName: "Nittaya_Pana_Resume.pdf",
    url: "/Nittaya_Pana_Resume.pdf",
    fileSize: "775 KB",
    isDefault: true,
    updatedAt: "2026-11-04",
  },
  {
    id: "resume-2",
    title: "Nittaya Pana - General SE Resume",
    fileName: "resume.pdf",
    url: "/resume.pdf",
    fileSize: "775 KB",
    isDefault: false,
    updatedAt: "2026-10-15",
  },
];

let currentAboutDetails = savedData?.aboutDetails || {
  topic1Title: "1. ความสนใจด้านเทคโนโลยี (Technology Interests)",
  topic1Desc:
    "มีความสนใจด้าน UX/UI Design และการพัฒนาเว็บไซต์ โดยให้ความสำคัญกับการออกแบบที่คำนึงถึงผู้ใช้งานเป็นหลัก สนใจการออกแบบ User Interface การสร้าง User Experience ที่ดี และการนำเทคโนโลยีมาประยุกต์ใช้เพื่อแก้ไขปัญหาในการใช้งานจริง",
  topic2Title: "2. เป้าหมายในการทำงาน (Career Goals)",
  topic2Desc:
    "ต้องการพัฒนาทักษะด้าน UX/UI Design ผ่านการฝึกงานและประสบการณ์ทำงานจริง เรียนรู้กระบวนการออกแบบตั้งแต่การทำความเข้าใจผู้ใช้ การสร้าง Wireframe ไปจนถึงการออกแบบ Prototype พร้อมพัฒนาตนเองให้สามารถทำงานร่วมกับทีม Developer ได้อย่างมีประสิทธิภาพ",
  topic3Title: "3. จุดเด่นในการทำงาน (Strengths)",
  topic3Desc:
    "เป็นคนตั้งใจทำงาน มีความรับผิดชอบ ใส่ใจรายละเอียด และพร้อมเรียนรู้สิ่งใหม่ ๆ สามารถรับฟังความคิดเห็นและนำคำแนะนำมาปรับปรุงงานออกแบบให้ดียิ่งขึ้น",
  topic4Title: "4. สิ่งที่กำลังเรียนรู้ (Currently Learning)",
  topic4Items: [
    "UX Research และการวิเคราะห์ความต้องการของผู้ใช้งาน",
    "Wireframing และ Prototyping",
    "Design System และ Component Design",
    "Responsive Web Design",
    "HTML, CSS และพื้นฐาน Frontend Development",
  ],
  topic5Title: "5. แนวทางการทำงาน (Working Approach)",
  topic5Desc:
    "ให้ความสำคัญกับการออกแบบที่ใช้งานง่าย เข้าใจได้ไม่ซับซ้อน และตอบโจทย์ผู้ใช้งาน โดยเริ่มจากการทำความเข้าใจปัญหา วางโครงสร้าง ออกแบบ ทดลองใช้งาน และปรับปรุงผลงานอย่างต่อเนื่อง",
};

export async function GET() {
  try {
    // Check if store file has newer updates
    const refreshed = loadStoreFromFile();
    if (refreshed?.posts !== undefined) currentPosts = refreshed.posts;
    if (refreshed?.profile) currentProfile = refreshed.profile;
    if (refreshed?.education) currentEducation = refreshed.education;
    if (refreshed?.skills) currentSkills = refreshed.skills;
    if (refreshed?.resumes) currentResumes = refreshed.resumes;
    if (refreshed?.aboutDetails) currentAboutDetails = refreshed.aboutDetails;

    return NextResponse.json({
      profile: currentProfile,
      education: currentEducation,
      skills: currentSkills,
      aboutDetails: currentAboutDetails,
      posts: currentPosts,
      resumes: currentResumes,
      followers: refreshed?.followers || { count: 0, visitors: [] },
      likes: refreshed?.likes || { counts: {}, visitorLikes: {} },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { section, data } = body;

    if (!section || data === undefined) {
      return NextResponse.json({ error: "section and data are required" }, { status: 400 });
    }

    switch (section) {
      case "profile":
        currentProfile = { ...currentProfile, ...data };
        break;
      case "education":
        currentEducation = data;
        break;
      case "skills":
        currentSkills = data;
        break;
      case "aboutDetails":
        currentAboutDetails = { ...currentAboutDetails, ...data };
        break;
      case "posts":
        currentPosts = data;
        break;
      case "resumes":
        currentResumes = data;
        const activeRes = data.find((r: any) => r.isDefault);
        if (activeRes) {
          currentProfile.resumeUrl = activeRes.url;
        }
        break;
      default:
        return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    // Persist to disk so changes are permanent across reboots and page refreshes
    const existingStore = loadStoreFromFile() || {};
    saveStoreToFile({
      ...existingStore,
      profile: currentProfile,
      education: currentEducation,
      skills: currentSkills,
      aboutDetails: currentAboutDetails,
      posts: currentPosts,
      resumes: currentResumes,
    });

    console.log(`[CMS Content Updated] Section "${section}" persisted to disk (${Array.isArray(data) ? data.length + ' items' : 'object'}).`);

    return NextResponse.json({
      success: true,
      section,
      message: `${section} updated successfully.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
