import { Post } from "@/types/portfolio";

export const initialPosts: Post[] = [
  {
    id: "post-ux-system",
    content:
      "✨ Working on a unified Design System: crafting consistent color tokens, 8pt spatial grid, and accessible typography scales in Figma. Ensuring high usability and seamless developer handoff for upcoming web applications.",
    contentTh:
      "✨ กำลังพัฒนา Design System: วางระบบโทนสี Grid ระยะห่าง 8pt และขนาดตัวอักษรที่คำนึงถึง Accessibility บน Figma เพื่อความสม่ำเสมอของ UI และส่งต่องานให้ทีม Developer ได้อย่างมีประสิทธิภาพครับ",
    category: "Design System",
    categoryTh: "การออกแบบระบบ",
    likesCount: 0,
    isPublished: true,
    publishedAt: "2026-11-04",
  },
  {
    id: "post-wireframing",
    content:
      "📐 User-Centered Design Process: Completed low-fidelity wireframing and user journey mapping for an intuitive web experience. Iterating based on usability feedback before moving into interactive prototyping.",
    contentTh:
      "📐 กระบวนการออกแบบโดยคำนึงถึงผู้ใช้: จัดทำ Wireframe โครงสร้างหน้าจอและ User Journey Flow เพื่อทดสอบความเข้าใจในการใช้งาน ก่อนเริ่มขั้นตอนทำ Interactive Prototype ในขั้นต่อไปครับ",
    category: "UX Research",
    categoryTh: "การวิจัยผู้ใช้",
    likesCount: 0,
    isPublished: true,
    publishedAt: "2026-11-02",
  },
  {
    id: "post-accessibility",
    content:
      "♿ Accessibility & Usability Audit: Reviewing contrast ratios against WCAG AAA guidelines across dark and light palettes. Ensuring clear focus indicators and intuitive navigation targets for all users.",
    contentTh:
      "♿ ตรวจสอบมาตรฐาน Accessibility & Usability: วัดค่าความเปรียบต่างสีตามแนวทาง WCAG AAA ทั้งในโหมด Dark และ Light พร้อมปรับปรุง Focus State และระยะสัมผัสปุ่มให้เข้าถึงได้ง่ายและสะดวกขึ้นครับ",
    category: "Accessibility",
    categoryTh: "การเข้าถึงและการใช้งาน",
    likesCount: 0,
    isPublished: true,
    publishedAt: "2026-10-28",
  },
  {
    id: "post-micro-interactions",
    content:
      "✨ Motion & Micro-interactions: Designing subtle spring transitions and tactile feedback states in Figma & CSS. Subtle motions guide user attention without overwhelming the core experience.",
    contentTh:
      "✨ การออกแบบ Motion & Micro-interactions: ออกแบบ Transition แบบ Spring นุ่มนวลและ Feedback การตอบสนองของการกดบน Figma & CSS เพื่อช่วยนำสายตาผู้ใช้โดยไม่รบกวนสมาธิในการใช้งานครับ",
    category: "Interaction Design",
    categoryTh: "การออกแบบปฏิสัมพันธ์",
    likesCount: 0,
    isPublished: true,
    publishedAt: "2026-10-22",
  },
];

export const posts = initialPosts;
