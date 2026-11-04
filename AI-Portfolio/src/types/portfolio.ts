export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  institution: string;
  faculty: string;
  major: string;
  email: string;
  githubUrl: string;
  avatarUrl?: string;
  resumeUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    level?: string;
    icon?: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  overview: string;
  category: "Full-Stack" | "Web Development" | "System & Tools" | "Mobile & AI";
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl: string;
  highlights: string[];
  likesCount: number;
  featured: boolean;
}

export interface Post {
  id: string;
  content: string;
  contentTh?: string;
  category: string;
  categoryTh?: string;
  images?: string[];
  likesCount: number;
  isPublished: boolean;
  publishedAt: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

export interface PortfolioStats {
  projectsCount: number;
  followersCount: number;
  totalLikesCount: number;
  totalPostLikesCount: number;
  repositoriesCount: number;
  postsCount: number;
}
