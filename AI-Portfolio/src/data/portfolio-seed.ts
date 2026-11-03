import { Profile, Education, SkillCategory, Project, PortfolioStats } from "@/types/portfolio";

export const initialProfile: Profile = {
  id: "nittaya-pana",
  name: "Nittaya Pana",
  title: "Software Developer & Engineer",
  bio: "Software Engineering student at the School of Information and Communication Technology, University of Phayao. Passionate about building modern, performant web applications, clean system architecture, and intuitive user experiences.",
  institution: "University of Phayao",
  faculty: "School of Information and Communication Technology",
  major: "Software Engineering",
  email: "nittaya503555@gmail.com",
  githubUrl: "https://github.com/icx-nit",
  resumeUrl: "/resume.pdf",
};

export const initialEducation: Education[] = [
  {
    id: "up-se",
    institution: "University of Phayao",
    degree: "Bachelor of Science",
    fieldOfStudy: "Software Engineering",
    startDate: "2023",
    current: true,
    description: "School of Information and Communication Technology. Coursework in Software Architecture, Algorithms, Database Systems, Web Engineering, and Full-Stack Development.",
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
    description: "Full-stack developer portfolio featuring Clyde luxury dark editorial UI, zero-paid-API retrieval chatbot, Supabase persistence, and Resend email.",
    overview: "Designed and engineered to present professional developer identity, academic achievements at University of Phayao, and full-stack projects. Includes an intelligent non-paid portfolio Q&A assistant.",
    category: "Full-Stack",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Resend", "Fuse.js"],
    imageUrl: "/images/project-portfolio.png",
    demoUrl: "https://github.com/icx-nit",
    githubUrl: "https://github.com/icx-nit",
    highlights: [
      "Bespoke Clyde luxury monochrome design system with 1px hairline borders",
      "Rule-based + fuzzy retrieval chatbot answering queries without paid AI costs",
      "Visitor engagement engine with follow and like counters backed by Supabase RLS",
      "Server-side contact form validation and automated transactional email dispatch",
    ],
    likesCount: 14,
    featured: true,
  },
  {
    id: "academic-management-system",
    title: "University Course & Resource Portal",
    description: "Responsive academic portal for university course management, real-time syllabus tracking, and study material collaboration.",
    overview: "Built to streamline student course workflows within the School of Information and Communication Technology. Features modular dashboards and relational database structures.",
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
    description: "Productivity and repository analytics tool integrating GitHub REST API to visualize commit activity, project milestones, and tech stacks.",
    overview: "Empowers software developers to track active repositories, monitor issue velocity, and generate summary reports of coding achievements.",
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
  repositoriesCount: 6,
};
