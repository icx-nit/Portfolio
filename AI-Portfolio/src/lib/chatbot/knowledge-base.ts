export interface KnowledgeItem {
  id: string;
  category: "profile" | "education" | "skills" | "projects" | "contact" | "resume" | "general";
  keywords: string[];
  questionPatterns: string[];
  title: string;
  answer: string;
}

export const portfolioKnowledgeBase: KnowledgeItem[] = [
  {
    id: "profile-name",
    category: "profile",
    keywords: ["name", "who", "developer", "owner", "author", "creator", "nittaya", "pana"],
    questionPatterns: [
      "what is your name",
      "who are you",
      "who is the developer",
      "who created this",
      "tell me about yourself",
      "who is nittaya",
    ],
    title: "About Nittaya Pana",
    answer:
      "My name is Nittaya Pana. I am a Software Developer and undergraduate student in Software Engineering at the School of Information and Communication Technology, University of Phayao. I focus on full-stack web applications, database architecture, and responsive user interfaces.",
  },
  {
    id: "education-degree",
    category: "education",
    keywords: ["education", "study", "university", "school", "degree", "college", "up", "phayao", "ict"],
    questionPatterns: [
      "where do you study",
      "what is your education",
      "what university",
      "what degree",
      "tell me about your school",
      "what do you study",
    ],
    title: "Education at University of Phayao",
    answer:
      "Nittaya Pana is currently studying Software Engineering at the School of Information and Communication Technology, University of Phayao (UP) in Phayao, Thailand. Core coursework includes Software Architecture, Database Systems, Web Engineering, and Algorithms.",
  },
  {
    id: "skills-programming",
    category: "skills",
    keywords: ["skills", "languages", "typescript", "javascript", "python", "sql", "technologies", "tech stack"],
    questionPatterns: [
      "what programming languages do you know",
      "what is your tech stack",
      "what skills do you have",
      "what technologies do you use",
      "do you know typescript",
      "do you know python",
    ],
    title: "Programming Languages & Technical Stack",
    answer:
      "Nittaya's core programming languages are TypeScript, JavaScript (ES6+), Python, and SQL. Frontend technologies include React, Next.js (App Router), and Tailwind CSS. Backend & database skills include Node.js, REST APIs, PostgreSQL, and Supabase.",
  },
  {
    id: "skills-frontend",
    category: "skills",
    keywords: ["frontend", "react", "next.js", "nextjs", "tailwind", "ui", "ux", "styling"],
    questionPatterns: [
      "what frontend technologies",
      "do you use react",
      "do you know nextjs",
      "do you use tailwind",
    ],
    title: "Frontend Engineering",
    answer:
      "On the frontend, Nittaya specializes in React, Next.js App Router, Tailwind CSS, responsive mobile-first layouts, and clean typographic design systems following modern UI/UX guidelines.",
  },
  {
    id: "skills-backend-db",
    category: "skills",
    keywords: ["backend", "database", "postgres", "postgresql", "supabase", "api", "node"],
    questionPatterns: [
      "what databases do you use",
      "do you know postgresql",
      "do you know supabase",
      "what backend technologies",
    ],
    title: "Backend & Database Skills",
    answer:
      "Nittaya works with Node.js Route Handlers, RESTful API design, PostgreSQL relational schemas, Supabase Auth, and Row Level Security (RLS) policies for data security.",
  },
  {
    id: "projects-all",
    category: "projects",
    keywords: ["projects", "portfolio", "work", "showcase", "built", "apps", "systems"],
    questionPatterns: [
      "what projects have you built",
      "show me your projects",
      "tell me about your portfolio projects",
      "what have you developed",
    ],
    title: "Featured Projects",
    answer:
      "Nittaya has developed multiple software projects: (1) 'AI-Powered Personal Developer Portfolio' — full-stack Next.js app with Clyde editorial design and non-paid IR assistant; (2) 'University Course & Resource Portal' — academic management system with relational PostgreSQL; and (3) 'Developer Task & GitHub Analytics Tracker' — tracking repo velocity via GitHub REST API.",
  },
  {
    id: "project-portfolio",
    category: "projects",
    keywords: ["ai portfolio", "this website", "this portfolio", "chatbot"],
    questionPatterns: [
      "how was this website built",
      "tell me about this portfolio",
      "what is this project",
    ],
    title: "This AI Portfolio Project",
    answer:
      "This portfolio was built using Next.js 15, TypeScript, Tailwind CSS with the Clyde luxury editorial palette, Supabase PostgreSQL with RLS, Resend email service, and a non-paid Fuse.js rule-based retrieval chatbot.",
  },
  {
    id: "contact-info",
    category: "contact",
    keywords: ["contact", "email", "reach", "message", "hire", "internship", "talk"],
    questionPatterns: [
      "how can i contact you",
      "what is your email",
      "how to reach nittaya",
      "where can i message you",
    ],
    title: "Contact Nittaya Pana",
    answer:
      "You can contact Nittaya Pana directly via email at nittaya503555@gmail.com, or through the Contact Me form on this website. You can also explore their code at https://github.com/icx-nit.",
  },
  {
    id: "github-profile",
    category: "contact",
    keywords: ["github", "repos", "repositories", "code", "git", "icx-nit"],
    questionPatterns: [
      "what is your github",
      "where can i find your code",
      "github repository",
    ],
    title: "GitHub Profile",
    answer:
      "Nittaya's public code repositories and open-source contributions can be found on GitHub at: https://github.com/icx-nit.",
  },
  {
    id: "resume-download",
    category: "resume",
    keywords: ["resume", "cv", "download", "pdf", "qualifications"],
    questionPatterns: [
      "can i download your resume",
      "where is your resume",
      "how to get your cv",
      "can i view your resume",
    ],
    title: "Resume & CV",
    answer:
      "Yes! You can view and download Nittaya Pana's resume directly by clicking the 'Resume' button in the navigation header or by navigating to /resume.pdf.",
  },
];
