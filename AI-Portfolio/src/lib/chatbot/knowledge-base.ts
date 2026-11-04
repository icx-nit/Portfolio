export interface KnowledgeItem {
  id: string;
  category: "profile" | "education" | "skills" | "projects" | "contact" | "resume" | "general";
  keywords: string[];
  questionPatterns: string[];
  title: string;
  answerEn: string;
  answerTh: string;
}

export const portfolioKnowledgeBase: KnowledgeItem[] = [
  {
    id: "profile-name",
    category: "profile",
    keywords: [
      "name", "who", "developer", "owner", "author", "creator", "nittaya", "pana",
      "ชื่อ", "ใคร", "ผู้พัฒนา", "นิตยา", "ปานา", "เจ้าของ", "ประวัติ",
    ],
    questionPatterns: [
      "what is your name",
      "who are you",
      "who is the developer",
      "tell me about yourself",
      "who is nittaya",
      "คุณชื่ออะไร",
      "ใครคือผู้พัฒนา",
      "นิตยา ปานา คือใคร",
      "แนะนำตัวหน่อย",
    ],
    title: "About Nittaya Pana (นิตยา ปานา)",
    answerEn:
      "My name is Nittaya Pana (นิตยา ปานา). I am a Software Developer and undergraduate student in Software Engineering at the School of Information and Communication Technology, University of Phayao. I focus on full-stack web applications, database architecture, and responsive user experiences.",
    answerTh:
      "ผมชื่อ นิตยา ปานา (Nittaya Pana) เป็นนักพัฒนาซอฟต์แวร์และนิสิตหลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา มุ่งเน้นการพัฒนาเว็บแอปพลิเคชัน Full-Stack สถาปัตยกรรมฐานข้อมูล และการออกแบบ UI ที่เข้าถึงง่ายครับ",
  },
  {
    id: "education-degree",
    category: "education",
    keywords: [
      "education", "study", "university", "school", "degree", "college", "up", "phayao", "ict",
      "การศึกษา", "เรียน", "มหาวิทยาลัย", "ม.พะเยา", "คณะ", "สาขา", "วิศวกรรมซอฟต์แวร์",
    ],
    questionPatterns: [
      "where do you study",
      "what is your education",
      "what university",
      "what degree",
      "what do you study",
      "เรียนที่ไหน",
      "เรียนคณะอะไร",
      "สาขาอะไร",
      "มหาวิทยาลัยอะไร",
      "ประวัติการศึกษา",
    ],
    title: "Education at University of Phayao",
    answerEn:
      "Nittaya Pana is studying Software Engineering at the School of Information and Communication Technology, University of Phayao (UP) in Phayao, Thailand. Core coursework includes Software Architecture, Database Systems, Web Engineering, and Algorithms.",
    answerTh:
      "นิตยา ปานา กำลังศึกษาหลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์ ที่คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา รายวิชาหลักประกอบด้วย สถาปัตยกรรมซอฟต์แวร์ ระบบฐานข้อมูล วิศวกรรมเว็บ โครงสร้างข้อมูลและอัลกอริทึมครับ",
  },
  {
    id: "skills-programming",
    category: "skills",
    keywords: [
      "skills", "languages", "typescript", "javascript", "python", "sql", "technologies", "tech stack",
      "ทักษะ", "ภาษา", "ความสามารถ", "เขียนภาษาอะไร", "เทคโนโลยี",
    ],
    questionPatterns: [
      "what programming languages do you know",
      "what is your tech stack",
      "what skills do you have",
      "do you know typescript",
      "เขียนภาษาอะไรได้บ้าง",
      "มีทักษะอะไรบ้าง",
      "ใช้เทคโนโลยีอะไร",
      "เขียน typescript ได้ไหม",
    ],
    title: "Programming Languages & Tech Stack",
    answerEn:
      "Nittaya's core programming languages are TypeScript, JavaScript (ES6+), Python, and SQL. Frontend technologies include React, Next.js (App Router), and Tailwind CSS. Backend & database skills include Node.js, REST APIs, PostgreSQL, and Supabase.",
    answerTh:
      "ทักษะภาษาโปรแกรมหลักของ นิตยา คือ TypeScript, JavaScript (ES6+), Python และ SQL ด้าน Frontend เชี่ยวชาญ React, Next.js App Router และ Tailwind CSS ส่วน Backend และฐานข้อมูล ใช้ Node.js, REST APIs, PostgreSQL และ Supabase ครับ",
  },
  {
    id: "skills-frontend",
    category: "skills",
    keywords: [
      "frontend", "react", "next.js", "nextjs", "tailwind", "ui", "ux", "styling",
      "ฟรอนต์เอนด์", "ดีไซน์", "หน้าเว็บ",
    ],
    questionPatterns: [
      "what frontend technologies",
      "do you use react",
      "do you know nextjs",
      "ทำ frontend อะไรได้บ้าง",
      "ใช้ react เป็นไหม",
    ],
    title: "Frontend Engineering",
    answerEn:
      "On the frontend, Nittaya specializes in React, Next.js App Router, Tailwind CSS, responsive mobile-first layouts, and clean typographic design systems following the Wope Violet Horizon guidelines.",
    answerTh:
      "ด้าน Frontend นิตยา เชี่ยวชาญการพัฒนาด้วย React, Next.js App Router, Tailwind CSS การออกแบบหน้าเว็บ responsive ที่รองรับทุกอุปกรณ์ และการออกแบบ UI สไตล์ Wope Violet Horizon ครับ",
  },
  {
    id: "skills-backend-db",
    category: "skills",
    keywords: [
      "backend", "database", "postgres", "postgresql", "supabase", "api", "node",
      "แบ็กเอนด์", "ฐานข้อมูล", "เซิร์ฟเวอร์",
    ],
    questionPatterns: [
      "what databases do you use",
      "do you know postgresql",
      "do you know supabase",
      "ใช้ฐานข้อมูลอะไร",
      "ทำ backend อะไรเป็นบ้าง",
    ],
    title: "Backend & Database Skills",
    answerEn:
      "Nittaya works with Node.js Route Handlers, RESTful API design, PostgreSQL relational schemas, Supabase Auth, and Row Level Security (RLS) policies for data security.",
    answerTh:
      "ด้าน Backend และฐานข้อมูล นิตยา ใช้ Next.js Route Handlers, การออกแบบ RESTful API, โครงสร้างฐานข้อมูล PostgreSQL และ Supabase พร้อมตั้งค่าความปลอดภัยระดับแถวข้อมูล (Row Level Security - RLS) ครับ",
  },
  {
    id: "projects-all",
    category: "projects",
    keywords: [
      "projects", "portfolio", "work", "showcase", "built", "apps", "systems",
      "โปรเจกต์", "ผลงาน", "มีงานอะไรบ้าง", "เคยทำอะไร",
    ],
    questionPatterns: [
      "what projects have you built",
      "show me your projects",
      "tell me about your portfolio projects",
      "มีผลงานอะไรบ้าง",
      "เคยทำโปรเจกต์อะไร",
      "ดูผลงานหน่อย",
    ],
    title: "Featured Projects",
    answerEn:
      "Nittaya has developed multiple software projects: (1) 'AI-Powered Personal Developer Portfolio' — full-stack Next.js app with Wope Violet Horizon UI, social feed, and non-paid IR assistant; (2) 'University Course & Resource Portal' — academic management system with relational PostgreSQL; and (3) 'Developer Task & GitHub Analytics Tracker' — tracking repo velocity via GitHub REST API.",
    answerTh:
      "ผลงานเด่นของ นิตยา ได้แก่: (1) 'AI-Powered Personal Developer Portfolio' — เว็บพอร์ตโฟลิโอสไตล์ Wope พร้อมระบบฟีดและ AI ค้นคืนข้อมูล; (2) 'University Course & Resource Portal' — ระบบจัดการหลักสูตรและคลังข้อมูลการศึกษาด้วย PostgreSQL; และ (3) 'Developer Task & GitHub Analytics Tracker' — เครื่องมือวิเคราะห์ข้อมูลคลังโค้ดผ่าน GitHub REST API ครับ",
  },
  {
    id: "contact-info",
    category: "contact",
    keywords: [
      "contact", "email", "reach", "message", "hire", "internship", "talk",
      "ติดต่อ", "อีเมล", "ฝึกงาน", "คุย", "จ้าง",
    ],
    questionPatterns: [
      "how can i contact you",
      "what is your email",
      "how to reach nittaya",
      "ติดต่อได้อย่างไร",
      "อีเมลอะไร",
      "อยากติดต่อ",
    ],
    title: "Contact Nittaya Pana",
    answerEn:
      "You can contact Nittaya Pana directly via email at nittaya503555@gmail.com, or through the Contact Me form on this website. You can also explore their code at https://github.com/icx-nit.",
    answerTh:
      "ท่านสามารถติดต่อ นิตยา ปานา ได้โดยตรงทางอีเมล nittaya503555@gmail.com หรือผ่านแบบฟอร์ม Contact Me บนเว็บไซต์นี้ รวมทั้งดูผลงานบน GitHub ได้ที่ https://github.com/icx-nit ครับ",
  },
  {
    id: "github-profile",
    category: "contact",
    keywords: ["github", "repos", "repositories", "code", "git", "icx-nit", "กิตฮับ", "กิต"],
    questionPatterns: [
      "what is your github",
      "where can i find your code",
      "ขอ github หน่อย",
      "ดูโค้ดได้ที่ไหน",
    ],
    title: "GitHub Profile",
    answerEn:
      "Nittaya's public code repositories and open-source contributions can be found on GitHub at: https://github.com/icx-nit.",
    answerTh:
      "สามารถติดตามคลังโค้ดสาธารณะและผลงานโอเพนซอร์สของ นิตยา ได้ที่ GitHub: https://github.com/icx-nit ครับ",
  },
  {
    id: "resume-download",
    category: "resume",
    keywords: ["resume", "cv", "download", "pdf", "เรซูเม่", "ดาวน์โหลด", "ประวัติย่อ"],
    questionPatterns: [
      "can i download your resume",
      "where is your resume",
      "ดาวน์โหลดเรซูเม่ได้ที่ไหน",
      "ขอเรซูเม่หน่อย",
    ],
    title: "Resume & CV",
    answerEn:
      "Yes! You can view and download Nittaya Pana's resume directly by clicking the 'Resume' button in the navigation header or by navigating to /resume.pdf.",
    answerTh:
      "ได้แน่นอนครับ! สามารถดาวน์โหลดเรซูเม่ของ นิตยา ปานา ได้โดยตรงที่ปุ่ม 'Resume' บนแถบเมนูด้านบน หรือเข้าถึงผ่านลิงก์ /resume.pdf ครับ",
  },
];
