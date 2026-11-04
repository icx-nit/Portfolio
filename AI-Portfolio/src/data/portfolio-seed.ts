import { Profile, Education, SkillCategory, Project, Post, PortfolioStats } from "@/types/portfolio";

export const initialProfile: Profile = {
  id: "nittaya-pana",
  name: "Nittaya Pana (นิตยา ปานา)",
  title: "Software Developer & Engineer",
  bio: "Software Engineering student at School of Information and Communication Technology, University of Phayao. Passionate about building modern, performant web applications, clean system architecture, and intuitive user experiences.",
  institution: "University of Phayao",
  faculty: "School of Information and Communication Technology",
  major: "Software Engineering",
  email: "nittaya503555@gmail.com",
  githubUrl: "https://github.com/icx-nit",
  resumeUrl: "/resume.pdf",
};

export const initialPosts: Post[] = [
  {
    id: "post-launch",
    content:
      "🚀 Officially launched my new personal developer portfolio! Engineered with Next.js 15, TypeScript, Tailwind CSS with the Wope Violet Horizon aesthetic, and an AI-powered portfolio assistant. Features social updates, project showcase, and Supabase integration. Welcome everyone to explore and connect!",
    contentTh:
      "🚀 เปิดตัวเว็บไซต์พอร์ตโฟลิโอส่วนตัวอย่างเป็นทางการครับ! พัฒนาด้วย Next.js 15, TypeScript, Tailwind CSS ในดีไซน์ Wope Violet Horizon พร้อมผู้ช่วย AI ตอบคำถามเกี่ยวกับพอร์ตโฟลิโอ ระบบฟีดอัปเดต และการจัดการผ่าน Supabase ยินดีต้อนรับทุกท่านเข้ามาชมและแลกเปลี่ยนความรู้ครับ!",
    category: "Announcement",
    categoryTh: "ประกาศทางการ",
    likesCount: 19,
    isPublished: true,
    publishedAt: "2026-11-04",
  },
  {
    id: "post-coursework",
    content:
      "Working on advanced Database Systems & Software Architecture coursework at the School of ICT, University of Phayao. Deep-diving into relational schema optimization, query indexes, and Row Level Security policies.",
    contentTh:
      "กำลังศึกษาและทำโครงงานรายวิชา Database Systems และ Software Architecture ที่คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา เน้นการออกแบบโครงสร้างฐานข้อมูลเชิงสัมพันธ์ การทำดัชนี และความปลอดภัยด้วย Row Level Security (RLS)",
    category: "Academic",
    categoryTh: "การศึกษา",
    likesCount: 12,
    isPublished: true,
    publishedAt: "2026-11-01",
  },
];

export const initialEducation: Education[] = [
  {
    id: "up-se",
    institution: "University of Phayao",
    degree: "Bachelor of Science",
    fieldOfStudy: "Software Engineering",
    startDate: "2023",
    current: true,
    description:
      "School of Information and Communication Technology. Coursework in Software Architecture, Database Systems, Web Engineering, Algorithms & Data Structures, and System Analysis.",
  },
];

export const initialSkills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "Python" },
      { name: "SQL" },
      { name: "HTML5 & CSS3" },
    ],
  },
  {
    category: "Frontend Development",
    items: [
      { name: "React" },
      { name: "Next.js (App Router)" },
      { name: "Tailwind CSS" },
      { name: "Responsive UI/UX" },
      { name: "State Management" },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js" },
      { name: "RESTful APIs" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Database Design & RLS" },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git & GitHub" },
      { name: "VS Code" },
      { name: "Vercel" },
      { name: "Postman" },
      { name: "Playwright Testing" },
    ],
  },
];

export const initialProjects: Project[] = [
  {
    id: "ai-portfolio",
    title: "AI-Powered Personal Developer Portfolio",
    description:
      "Full-stack developer portfolio featuring Wope Violet Horizon UI, zero-paid-API retrieval chatbot, social feed stream, Supabase persistence, and Resend email.",
    overview:
      "Designed and engineered to present professional developer identity, academic achievements at University of Phayao, and full-stack projects. Includes an intelligent non-paid portfolio Q&A assistant and personal social updates.",
    category: "Full-Stack",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Resend", "Fuse.js"],
    imageUrl: "/images/project-portfolio.png",
    demoUrl: "https://github.com/icx-nit",
    githubUrl: "https://github.com/icx-nit",
    highlights: [
      "Wope Violet Horizon dark aesthetic with 1px glass borders and violet horizon illumination",
      "Rule-based + fuzzy retrieval chatbot answering queries in Thai & English without paid AI costs",
      "Interactive social feed and visitor engagement engine (follow & like counters) backed by Supabase RLS",
      "Server-side contact form validation with Zod and automated transactional email dispatch",
    ],
    likesCount: 14,
    featured: true,
  },
  {
    id: "academic-management-system",
    title: "University Course & Resource Portal",
    description:
      "Responsive academic portal for university course management, real-time syllabus tracking, and study material collaboration.",
    overview:
      "Built to streamline student course workflows within the School of Information and Communication Technology. Features modular dashboards and relational database structures.",
    category: "Web Development",
    tags: ["React", "TypeScript", "PostgreSQL", "Tailwind CSS", "REST API"],
    imageUrl: "/images/project-academic.png",
    demoUrl: "https://github.com/icx-nit",
    githubUrl: "https://github.com/icx-nit",
    highlights: [
      "Relational database modeling with foreign keys and optimized search queries",
      "Role-based access control protecting student and instructor views",
      "Accessible and responsive design tested across tablet and mobile viewports",
    ],
    likesCount: 8,
    featured: true,
  },
  {
    id: "dev-insights-hub",
    title: "Developer Task & GitHub Analytics Tracker",
    description:
      "Productivity and repository analytics tool integrating GitHub REST API to visualize commit activity, project milestones, and tech stacks.",
    overview:
      "Empowers software developers to track active repositories, monitor issue velocity, and generate summary reports of coding achievements.",
    category: "System & Tools",
    tags: ["Next.js", "GitHub REST API", "TypeScript", "Tailwind CSS"],
    imageUrl: "/images/project-github.png",
    demoUrl: "https://github.com/icx-nit",
    githubUrl: "https://github.com/icx-nit",
    highlights: [
      "Integration with GitHub REST API with server-side caching to avoid rate limits",
      "Interactive data visualizations and repository statistics breakdown",
      "Exportable summary reports for engineering portfolio updates",
    ],
    likesCount: 11,
    featured: true,
  },
];

export const initialStats: PortfolioStats = {
  projectsCount: 3,
  followersCount: 28,
  totalLikesCount: 33,
  totalPostLikesCount: 31,
  repositoriesCount: 6,
  postsCount: 2,
};
