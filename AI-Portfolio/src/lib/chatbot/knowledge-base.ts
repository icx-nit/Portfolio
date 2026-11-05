export interface KnowledgeItem {
  id: string;
  category: "profile" | "education" | "skills" | "projects" | "contact" | "resume" | "general";
  keywords: string[];
  questionPatterns: string[];
  title: string;
  answerEn: string;
  answerTh: string;
  actionUrl?: string;
  actionLabelEn?: string;
  actionLabelTh?: string;
}

export const portfolioKnowledgeBase: KnowledgeItem[] = [
  {
    id: "profile-about",
    category: "profile",
    keywords: [
      "name", "who", "developer", "designer", "owner", "author", "creator", "nittaya", "pana",
      "ชื่อ", "ใคร", "ผู้พัฒนา", "ดีไซเนอร์", "นิตยา", "ปานา", "เจ้าของ", "ประวัติ", "แนะนำตัว",
    ],
    questionPatterns: [
      "what is your name",
      "who are you",
      "who is the owner",
      "tell me about yourself",
      "who is nittaya",
      "what role",
      "คุณชื่ออะไร",
      "ใครคือเจ้าของ",
      "นิตยา ปานา คือใคร",
      "แนะนำตัวหน่อย",
      "ทำตำแหน่งอะไร",
    ],
    title: "About Nittaya Pana (นิตยา ปานา)",
    answerEn:
      "Nittaya Pana (นางสาวนิตยา ปานา) is a UX/UI Designer and undergraduate student in Software Engineering at School of Information and Communication Technology, University of Phayao. Passionate about user-centered design, wireframing, crafting intuitive interfaces, and building accessible digital products.",
    answerTh:
      "นิตยา ปานา (นางสาวนิตยา ปานา) เป็น UX/UI Designer และนิสิตสาขาวิชาวิศวกรรมซอฟต์แวร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา มุ่งเน้นการออกแบบประสบการณ์ผู้ใช้ (UX/UI Design) โดยคำนึงถึงผู้ใช้เป็นศูนย์กลาง การทำ Wireframe และระบบ Design System ครับ",
  },
  {
    id: "education-degree",
    category: "education",
    keywords: [
      "education", "study", "university", "school", "degree", "college", "up", "phayao", "ict",
      "การศึกษา", "เรียน", "มหาวิทยาลัย", "ม.พะเยา", "มพ", "คณะ", "สาขา", "วิศวกรรมซอฟต์แวร์", "จบจาก",
    ],
    questionPatterns: [
      "where do you study",
      "what is your education",
      "what university",
      "what degree",
      "what do you study",
      "where did you graduate",
      "เรียนที่ไหน",
      "เรียนคณะอะไร",
      "สาขาอะไร",
      "มหาวิทยาลัยอะไร",
      "ประวัติการศึกษา",
      "จบจากที่ไหน",
    ],
    title: "Education — University of Phayao",
    answerEn:
      "Nittaya Pana is studying Bachelor of Science in Software Engineering at the School of Information and Communication Technology, University of Phayao (Thailand). Key studies include Human-Computer Interaction, Software Architecture, Web Engineering, and System Design.",
    answerTh:
      "นิตยา ปานา กำลังศึกษาระดับปริญญาตรี หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิศวกรรมซอฟต์แวร์ คณะเทคโนโลยีสารสนเทศและการสื่อสาร มหาวิทยาลัยพะเยา ศึกษาวิชาสำคัญเช่น Human-Computer Interaction, การออกแบบสถาปัตยกรรมซอฟต์แวร์, และวิศวกรรมเว็บครับ",
  },
  {
    id: "skills-core",
    category: "skills",
    keywords: [
      "skills", "hard skills", "soft skills", "tools", "technologies", "tech stack", "figma", "wireframe", "design system",
      "ทักษะ", "ความสามารถ", "เครื่องมือ", "ฮาร์ดสกิล", "ซอฟต์สกิล", "สแต็ก", "มีทักษะอะไรบ้าง",
    ],
    questionPatterns: [
      "what are your skills",
      "what tools do you use",
      "what is your design process",
      "what is your tech stack",
      "มีทักษะอะไรบ้าง",
      "ใช้โปรแกรมอะไรเป็นบ้าง",
      "ถนัดด้านไหน",
      "ทักษะมีอะไรบ้าง",
      "เครื่องมือที่ใช้",
    ],
    title: "Core UX/UI & Technical Skills",
    answerEn:
      "Skills are divided into 3 areas: 1) Hard Skills: Wireframing, Design System, Interaction & Motion Design. 2) Soft Skills: Continuous Learning, Responsibility, Dedication & Commitment. 3) Tools: Figma, VS Code, GitHub, Microsoft Word, Canva.",
    answerTh:
      "ทักษะแบ่งออกเป็น 3 ด้าน: 1) Hard Skills: การวางโครงสร้าง Wireframing, การจัดทำ Design System, Interaction & Motion Design. 2) Soft Skills: Continuous Learning, Responsibility, Dedication & Commitment. 3) Tools: Figma, VS Code, GitHub, Microsoft Word, และ Canva ครับ",
  },
  {
    id: "projects-work",
    category: "projects",
    keywords: [
      "projects", "work", "portfolio", "case study", "designs", "built", "posts", "social feed",
      "ผลงาน", "โปรเจกต์", "งาน", "งานออกแบบ", "โพสต์", "ฟีด", "ทำอะไรมาบ้าง",
    ],
    questionPatterns: [
      "what projects have you created",
      "what have you designed",
      "show me your portfolio",
      "what is your work",
      "คุณสร้างโปรเจกต์อะไรบ้าง",
      "มีผลงานอะไรบ้าง",
      "ออกแบบอะไรมาบ้าง",
      "ดูผลงานหน่อย",
      "โพสต์อะไรบ้าง",
    ],
    title: "Projects & UX/UI Journal Posts",
    answerEn:
      "Nittaya shares design progress and case studies via the interactive Social Feed section, featuring unified Design Systems with 8pt grids, low-fidelity wireframing & user journeys, and component accessibility prototypes.",
    answerTh:
      "นิตยา ได้จัดทำและนำเสนองานผ่านส่วน Social Feed บนเว็บไซต์นี้ เช่น การสร้าง Unified Design System ด้วย Grid 8pt, การทำ Low-fidelity Wireframe & User Journey Flow และการทดสอบ Accessibility ของ Component ต่าง ๆ สามารถเลื่อนดูในแถบโพสต์ได้เลยครับ",
  },
  {
    id: "contact-channels",
    category: "contact",
    keywords: [
      "contact", "email", "reach", "touch", "message", "hire", "github",
      "ติดต่อ", "อีเมล", "เบอร์", "ส่งข้อความ", "ติดต่อได้ทางไหน", "กิตฮับ",
    ],
    questionPatterns: [
      "how can i contact you",
      "what is your email",
      "where can i reach you",
      "how to hire",
      "ติดต่อคุณได้อย่างไร",
      "ขออีเมลหน่อย",
      "ติดต่อได้ทางไหน",
      "ส่งข้อความหาได้ไหม",
    ],
    title: "Contact Information",
    answerEn:
      "You can contact Nittaya Pana directly via Email: nittaya503555@gmail.com, or through the Contact Me form on this website. You can also view public work on GitHub at https://github.com/icx-nit.",
    answerTh:
      "ท่านสามารถติดต่อ นิตยา ปานา ได้โดยตรงทางอีเมล: nittaya503555@gmail.com หรือกรอกแบบฟอร์มในส่วน Contact Me บนเว็บไซต์นี้ รวมทั้งติดตามผลงานบน GitHub ได้ที่ https://github.com/icx-nit ครับ",
    actionUrl: "mailto:nittaya503555@gmail.com",
    actionLabelEn: "Send Email",
    actionLabelTh: "ส่งอีเมล",
  },
  {
    id: "resume-download",
    category: "resume",
    keywords: [
      "resume", "cv", "download", "pdf", "เรซูเม่", "ซีวี", "ดาวน์โหลด", "ขอเรซูเม่",
    ],
    questionPatterns: [
      "can i download your resume",
      "where is the resume",
      "do you have a cv",
      "download resume",
      "ขอดาวน์โหลดเรซูเม่",
      "เรซูแม่อยู่ไหน",
      "มี cv ไหม",
      "ดาวน์โหลด cv",
    ],
    title: "Resume / CV Download",
    answerEn:
      "You can download Nittaya Pana's official Resume in PDF format directly from the top navigation bar or the Download Resume button in the Hero section.",
    answerTh:
      "คุณสามารถดาวน์โหลดเรซูเม่อย่างเป็นทางการของ นิตยา ปานา (ไฟล์ PDF) ได้ทันทีจากปุ่ม 'Download Resume' ในส่วน Hero หรือในเมนูด้านบนครับ",
    actionUrl: "/Nittaya_Pana_Resume.pdf",
    actionLabelEn: "Download Resume PDF",
    actionLabelTh: "ดาวน์โหลด Resume PDF",
  },
];
