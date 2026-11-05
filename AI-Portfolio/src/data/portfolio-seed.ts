import { Profile, Education, SkillCategory, Project, Post, PortfolioStats } from "@/types/portfolio";
import { initialProfile, profile } from "./profile";
import { initialPosts, posts } from "./posts";

export { initialProfile, profile, initialPosts, posts };

export const initialEducation: Education[] = [
  {
    id: "up-se",
    institution: "University of Phayao (มหาวิทยาลัยพะเยา)",
    degree: "Bachelor of Science",
    fieldOfStudy: "Software Engineering (สาขาวิชาวิศวกรรมซอฟต์แวร์)",
    startDate: "2023",
    current: true,
    description:
      "School of Information and Communication Technology (คณะเทคโนโลยีสารสนเทศและการสื่อสาร). Focus on UX/UI design principles, software architecture, web technologies, and human-computer interaction.",
  },
];

export const initialSkills: SkillCategory[] = [
  {
    category: "Hard Skills",
    items: [
      {
        name: "Wireframing",
        level: "Advanced",
        icon: "Layout",
      },
      {
        name: "Design System",
        level: "Advanced",
        icon: "Layers",
      },
      {
        name: "Interaction & Motion Design",
        level: "Intermediate",
        icon: "Sparkles",
      },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      {
        name: "Continuous Learning",
        level: "Expert",
        icon: "BookOpen",
      },
      {
        name: "Responsibility",
        level: "Expert",
        icon: "CheckCircle",
      },
      {
        name: "Dedication & Commitment",
        level: "Expert",
        icon: "HeartHandshake",
      },
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "GitHub", icon: "Github" },
      { name: "Visual Studio Code", icon: "Code2" },
      { name: "Figma", icon: "Figma" },
      { name: "Microsoft Word", icon: "FileText" },
      { name: "Canva", icon: "Palette" },
    ],
  },
];

export const initialProjects: Project[] = [];

export const initialStats: PortfolioStats = {
  followersCount: 0,
  likesCount: 0,
  postsCount: 4,
};
