"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  LayoutGrid,
  User,
  GraduationCap,
  Sparkles,
  FileText,
  FileDown,
  Mail,
  Heart,
  Github,
  Settings,
  Power,
  Search,
  Bell,
  ChevronRight,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Save,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
  TrendingUp,
  Award,
  Layers,
  Users,
  Globe,
  Upload,
  Clock,
  ShieldCheck,
  Zap,
  Sliders,
  DollarSign,
  Package,
  Activity,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import {
  initialProfile,
  initialEducation,
  initialSkills,
  initialPosts,
  initialStats,
} from "@/data/portfolio-seed";
import { Post } from "@/types/portfolio";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "profile"
    | "education"
    | "skills"
    | "posts"
    | "resume"
    | "messages"
    | "github"
    | "settings"
  >("overview");

  // Language state: 'th' | 'en'
  const [lang, setLang] = useState<"th" | "en">("th");
  const [searchQuery, setSearchQuery] = useState("");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Calendar historical months state
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getDateRangeForOffset = (offset: number) => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
    const thaiMonths = [
      "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
      "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    const enMonths = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return lang === "th"
      ? `1 ${thaiMonths[targetMonth]} – ${lastDay} ${thaiMonths[targetMonth]} ${targetYear}`
      : `${enMonths[targetMonth]} 1 – ${enMonths[targetMonth]} ${lastDay}, ${targetYear}`;
  };

  const getMonthNameForOffset = (offset: number) => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const enMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return lang === "th"
      ? `${thaiMonths[targetMonth]} ${targetYear}`
      : `${enMonths[targetMonth]} ${targetYear}`;
  };

  const handleToggleLang = (newLang?: "th" | "en") => {
    const target = newLang || (lang === "th" ? "en" : "th");
    setLang(target);
    localStorage.setItem("portfolio_lang", target);
    window.dispatchEvent(new Event("portfolio-lang-change"));
  };

  // Data states
  const [profileData, setProfileData] = useState<any>({
    ...initialProfile,
    socialLinks: {
      linkedin: "https://linkedin.com/in/nittaya-pana",
      dribbble: "https://dribbble.com/nittayaui",
      twitter: "https://x.com/nittaya_ux",
    },
  });

  const [educationList, setEducationList] = useState<any[]>([...initialEducation]);
  const [skillsCategories, setSkillsCategories] = useState<any[]>([
    {
      category: "Hard Skills",
      items: [
        { id: "h1", name: "Wireframing & Prototyping", level: "Advanced", enabled: true },
        { id: "h2", name: "Design System & Component Tokens", level: "Advanced", enabled: true },
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
        { id: "s3", name: "Cross-Functional Collaboration", level: "Expert", enabled: true },
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
  ]);

  const [postsList, setPostsList] = useState<Post[]>(initialPosts);
  const [resumesList, setResumesList] = useState<any[]>([
    {
      id: "res-1",
      title: "Nittaya Pana - UX/UI Designer Resume (2026)",
      fileName: "Nittaya_Pana_Resume.pdf",
      url: "/Nittaya_Pana_Resume.pdf",
      fileSize: "775 KB",
      isDefault: true,
      updatedAt: "2026-11-04",
    },
    {
      id: "res-2",
      title: "Nittaya Pana - General SE Resume",
      fileName: "resume.pdf",
      url: "/resume.pdf",
      fileSize: "775 KB",
      isDefault: false,
      updatedAt: "2026-10-15",
    },
  ]);

  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);
  const [messageFilter, setMessageFilter] = useState<"all" | "unread" | "read">("all");

  const [totalReach, setTotalReach] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [featuredRepoIds, setFeaturedRepoIds] = useState<string[]>([]);

  // Post form modal
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostContentTh, setNewPostContentTh] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Design System");
  const [newPostImageUrl, setNewPostImageUrl] = useState("");

  // New Skill form modal
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Hard Skills");
  const [newSkillLevel, setNewSkillLevel] = useState("Advanced");
  const [newSkillImage, setNewSkillImage] = useState("");
  const [skillImageError, setSkillImageError] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<{
    catIndex: number;
    skillIndex: number;
    name: string;
    level: string;
    category: string;
    image?: string;
  } | null>(null);

  // New Education form modal
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [newEduInstitution, setNewEduInstitution] = useState("");
  const [newEduDegree, setNewEduDegree] = useState("");
  const [newEduMajor, setNewEduMajor] = useState("");
  const [newEduPeriod, setNewEduPeriod] = useState("2023 - Present");
  const [newEduDesc, setNewEduDesc] = useState("");

  // Bilingual Dictionary (100% Comprehensive Translation for All Tabs)
  const t = {
    // Menu & Topbar
    overview: lang === "th" ? "ภาพรวมแดชบอร์ด" : "Dashboard Overview",
    profile: lang === "th" ? "จัดการโปรไฟล์" : "Profile Management",
    education: lang === "th" ? "จัดการการศึกษาและประวัติ" : "Education & About Me",
    skills: lang === "th" ? "จัดการทักษะและเครื่องมือ" : "Skills & Tools",
    posts: lang === "th" ? "จัดการโพสต์" : "Posts & Feed",
    resume: lang === "th" ? "จัดการเรซูเม่" : "Resume Management",
    messages: lang === "th" ? "ข้อความติดต่อ" : "Contact Messages",
    followers: lang === "th" ? "ผู้ติดตามและหัวใจ" : "Followers & Likes",
    github: lang === "th" ? "คลัง GitHub" : "GitHub Repositories",
    settings: lang === "th" ? "ตั้งค่าระบบ" : "Settings",
    searchPlaceholder: lang === "th" ? "ค้นหาข้อมูลในแดชบอร์ด..." : "Search anything...",
    saveSuccess: lang === "th" ? "บันทึกและเชื่อมข้อมูลเรียบร้อย!" : "Changes synchronized successfully!",
    saveButton: lang === "th" ? "บันทึกการเปลี่ยนแปลง" : "Save Changes",
    newPost: lang === "th" ? "สร้างโพสต์ใหม่" : "New Post",
    addSkill: lang === "th" ? "เพิ่มทักษะใหม่" : "Add New Skill",
    addEdu: lang === "th" ? "เพิ่มประวัติการศึกษา" : "Add Education",
    signOut: lang === "th" ? "ออกจากระบบ" : "Sign Out",
    unreadAlert: lang === "th" ? "ข้อความยังไม่ได้อ่าน" : "unread message(s)",
    adminRole: lang === "th" ? "ผู้ดูแลระบบ" : "Admin",

    // Overview
    overviewHeading: lang === "th" ? "ภาพรวมสถิติ" : "Overview",
    dateRangeLabel: getDateRangeForOffset(selectedMonthOffset),
    totalReach: lang === "th" ? "ยอดการเข้าถึงทั้งหมด" : "Total Reach",
    totalFollowers: lang === "th" ? "ยอดผู้ติดตามทั้งหมด" : "Total Followers",
    postLikes: lang === "th" ? "ยอดหัวใจทั้งหมด" : "Post Likes",
    contactInquiries: lang === "th" ? "ข้อความติดต่อ" : "Contact Inquiries",
    vsLastMonth: lang === "th" ? "เทียบกับเดือนก่อน" : "vs last month",
    liveTracked: lang === "th" ? "อัปเดตเรียลไทม์" : "Live Real-time",
    recentPosts: lang === "th" ? "โพสต์ล่าสุดใน Social Feed" : "Recent Social Feed Posts",
    recentPostsDesc: lang === "th" ? "โพสต์ล่าสุดที่เผยแพร่บนหน้า Social Feed" : "Latest updates published on public feed",
    viewAllPosts: lang === "th" ? "ดูโพสต์ทั้งหมด" : "View All Posts",
    postContent: lang === "th" ? "เนื้อหาโพสต์" : "Post Content",
    category: lang === "th" ? "หมวดหมู่" : "Category",
    likes: lang === "th" ? "ยอดหัวใจ" : "Likes",
    status: lang === "th" ? "สถานะ" : "Status",
    date: lang === "th" ? "วันที่" : "Date",
    published: lang === "th" ? "เผยแพร่แล้ว" : "Published",
    recentInquiries: lang === "th" ? "ข้อความติดต่อล่าสุด" : "Recent Inquiries",
    unreadCount: lang === "th" ? "ยังไม่ได้อ่าน" : "unread",
    allRead: lang === "th" ? "อ่านครบแล้ว" : "All read",
    viewAll: lang === "th" ? "ดูทั้งหมด" : "View All",
    openInbox: lang === "th" ? "เปิดกล่องข้อความติดต่อ" : "Open Contact Inbox",
    noMessages: lang === "th" ? "ยังไม่มีข้อความส่งเข้ามา" : "No messages yet",
    skillsInventory: lang === "th" ? "คลังทักษะในระบบ" : "Skills Inventory",
    hardSkillsCount: lang === "th" ? "Hard Skills:" : "Hard Skills:",
    softSkillsCount: lang === "th" ? "Soft Skills:" : "Soft Skills:",
    toolsCount: lang === "th" ? "เครื่องมือ Tools:" : "Tools:",
    manageSkillsBtn: lang === "th" ? "จัดการทักษะ" : "Manage Skills",
    items: lang === "th" ? "รายการ" : "items",

    // Profile Management
    personalProfile: lang === "th" ? "จัดการโปรไฟล์ส่วนตัว" : "Personal Profile Management",
    profileDesc: lang === "th" ? "ข้อมูลและรูปภาพที่แก้ไขตรงนี้จะเชื่อมต่อไปยังหน้าแรก (Hero) และหน้าเกี่ยวกับฉัน (About Me) ทันที" : "Changes made here automatically synchronize with the public Hero and About Me sections.",
    heroAvatarLabel: lang === "th" ? "รูปโปรไฟล์หน้าแรก (Hero Avatar)" : "Hero Profile Avatar",
    heroAvatarSub: lang === "th" ? "รูปสี่เหลี่ยมจัตุรัสสำหรับ Hero Card และหัวข้อโปรไฟล์" : "Square photo for Hero card and profile header",
    aboutAvatarLabel: lang === "th" ? "รูปโปรไฟล์หน้าเกี่ยวกับฉัน (About Me Cutout)" : "About Me Profile Photo (Cutout)",
    aboutAvatarSub: lang === "th" ? "รูปภาพแนวตั้งแบบไดคัทโปร่งใสสำหรับหน้า About Me" : "Transparent portrait cutout for About Me page",
    uploadImageBtn: lang === "th" ? "เลือกไฟล์รูปภาพ" : "Choose Image File",
    orUrlPlaceholder: lang === "th" ? "หรือระบุ URL รูปภาพ (เช่น /images/... หรือ https://...)" : "Or enter Image URL (e.g. /images/... or https://...)",
    displayName: lang === "th" ? "ชื่อที่แสดง (Display Name)" : "Display Name",
    professionalTitle: lang === "th" ? "ตำแหน่งทางวิชาชีพ (Professional Title)" : "Professional Title",
    bioIntro: lang === "th" ? "ประวัติย่อ / แนะนำตัวเอง (Bio)" : "Bio / Personal Introduction",
    emailAddr: lang === "th" ? "อีเมลติดต่อ (Email Address)" : "Email Address",
    githubUrl: lang === "th" ? "ลิงก์ GitHub (GitHub URL)" : "GitHub Profile URL",

    // Education & About Me
    eduHeading: lang === "th" ? "จัดการการศึกษา & ข้อมูลเกี่ยวกับตัวฉัน" : "Education & About Me Details",
    eduSub: lang === "th" ? "จัดการประวัติการศึกษา เพิ่ม ลบ ข้อมูลเกี่ยวกับตัวเอง จะเชื่อมกันกับหน้า About me" : "Manage education records and personal background synced to the About Me section.",
    addEduTitle: lang === "th" ? "เพิ่มประวัติการศึกษาใหม่" : "Add Academic Record",
    instName: lang === "th" ? "ชื่อสถาบันการศึกษา" : "Institution Name",
    instPlaceholder: lang === "th" ? "เช่น มหาวิทยาลัยพะเยา" : "e.g. University of Phayao",
    degree: lang === "th" ? "ระดับการศึกษา / วุฒิ" : "Degree",
    degreePlaceholder: lang === "th" ? "เช่น วิทยาศาสตรบัณฑิต (วท.บ.)" : "e.g. Bachelor of Science",
    major: lang === "th" ? "สาขาวิชา" : "Field of Study / Major",
    majorPlaceholder: lang === "th" ? "เช่น วิศวกรรมซอฟต์แวร์" : "e.g. Software Engineering",
    period: lang === "th" ? "ระยะเวลาศึกษา" : "Period",
    desc: lang === "th" ? "รายละเอียด" : "Description",
    descPlaceholder: lang === "th" ? "เน้นการออกแบบ UX/UI และการพัฒนาเว็บ..." : "Focus on UX/UI design principles...",
    saveEduBtn: lang === "th" ? "บันทึกประวัติการศึกษา" : "Save Education Record",
    deleteRecord: lang === "th" ? "ลบประวัติ" : "Delete Record",

    // Skills Management
    skillsHeading: lang === "th" ? "จัดการทักษะและเครื่องมือ" : "Skills & Tools Management",
    skillsSub: lang === "th" ? "ประกอบไปด้วย Hard Skills, Soft Skills, Tools & Technologies (เพิ่ม ลบ แก้ไข จะเชื่อมกับหน้าทักษะของพอต)" : "Manage Hard Skills, Soft Skills, and Tools & Technologies synced with the public portfolio.",
    addSkillModalTitle: lang === "th" ? "เพิ่มทักษะหรือเครื่องมือใหม่" : "Add New Skill / Tool",
    skillName: lang === "th" ? "ชื่อทักษะ" : "Skill Name",
    skillNamePlaceholder: lang === "th" ? "เช่น Wireframing & Prototyping" : "e.g. Wireframing & Prototyping",
    skillCategory: lang === "th" ? "หมวดหมู่" : "Category",
    skillLevel: lang === "th" ? "ระดับความชำนาญ" : "Proficiency Level",
    beginner: lang === "th" ? "ระดับเริ่มต้น (Beginner)" : "Beginner",
    intermediate: lang === "th" ? "ระดับปานกลาง (Intermediate)" : "Intermediate",
    advanced: lang === "th" ? "ระดับเชี่ยวชาญ (Advanced)" : "Advanced",
    expert: lang === "th" ? "ระดับชำนาญพิเศษ (Expert)" : "Expert",
    toolImgRequired: lang === "th" ? "รูปภาพไอคอนเครื่องมือ (เฉพาะ Tools & Technologies ต้องเพิ่มรูปภาพเท่านั้น)" : "Tool Icon Image (Strictly Required ONLY for Tools & Technologies)",
    quickPick: lang === "th" ? "เลือกไอคอนด่วน:" : "Quick Pick:",
    saveSkill: lang === "th" ? "บันทึกทักษะ" : "Save Skill",
    editSkill: lang === "th" ? "แก้ไขทักษะ" : "Edit Skill",
    updateSkill: lang === "th" ? "บันทึกการแก้ไข" : "Update Skill",
    cancel: lang === "th" ? "ยกเลิก" : "Cancel",
    visibleOnSite: lang === "th" ? "แสดงบนหน้าพอร์ต" : "Visible on site",
    hiddenOnSite: lang === "th" ? "ซ่อนจากหน้าพอร์ต" : "Hidden from site",
    deleteSkill: lang === "th" ? "ลบทักษะ" : "Delete skill",

    // Posts Management
    postsHeading: lang === "th" ? "จัดการโพสต์ Social Feed" : "Social Feed Posts",
    postsSub: lang === "th" ? "สามารถ เพิ่ม ลบ โพสต์ได้ สามารถเพิ่มรูปได้ แล้วเชื่อมกับหน้าโพสต์ของพอต" : "Add, edit, or delete posts. Supports uploading images and syncs with the public feed.",
    composePost: lang === "th" ? "สร้างโพสต์ใหม่" : "Compose New Post",
    contentEn: lang === "th" ? "เนื้อหาโพสต์ (ภาษาอังกฤษ)" : "Content (English)",
    contentEnPlaceholder: lang === "th" ? "พิมพ์ข้อความภาษาอังกฤษ..." : "Write your update in English...",
    contentTh: lang === "th" ? "เนื้อหาโพสต์ (ภาษาไทย)" : "Content (Thai)",
    contentThPlaceholder: lang === "th" ? "พิมพ์ข้อความภาษาไทย..." : "Write your update in Thai...",
    postCategoryLabel: lang === "th" ? "หมวดหมู่โพสต์" : "Category",
    postImgLabel: lang === "th" ? "รูปภาพประกอบโพสต์ (อัปโหลดรูปภาพหรือใส่ URL)" : "Post Image (Upload photo or enter URL)",
    postImgPlaceholder: lang === "th" ? "ระบุ URL รูปภาพ (เช่น /images/... หรือ https://...)" : "Enter image URL (e.g. /images/... or https://...)",
    publishPost: lang === "th" ? "เผยแพร่ไปยังหน้าพอร์ต" : "Publish to Public Feed",
    deletePost: lang === "th" ? "ลบโพสต์" : "Delete post",
    removeImg: lang === "th" ? "ลบรูปภาพ" : "Remove photo",

    // Resume Management
    resumeHeading: lang === "th" ? "จัดการเรซูเม่" : "Resume Management",
    resumeSub: lang === "th" ? "เรซูเม่ที่ตั้งเป็น Default จะเชื่อมกับปุ่มดาวน์โหลดเรซูเม่หน้าแรก" : "The default resume is directly connected to the Hero download button on the public site.",
    uploadResumeTitle: lang === "th" ? "อัปโหลดไฟล์เรซูเม่ใหม่ (PDF)" : "Upload New PDF Resume",
    uploadResumeSub: lang === "th" ? "รองรับไฟล์เอกสาร PDF ขนาดไม่เกิน 10 MB" : "Accepts standard PDF documents up to 10 MB",
    browsePdfBtn: lang === "th" ? "เลือกไฟล์ PDF" : "Browse PDF File",
    resumeVersions: lang === "th" ? "ประวัติเวอร์ชันเรซูเม่" : "Resume Versions",
    defaultPill: lang === "th" ? "เรซูเม่หลักที่ใช้งาน (Active Default)" : "Active Default",
    setDefaultBtn: lang === "th" ? "ตั้งเป็นเรซูเม่หลัก" : "Set as Default",
    previewPdf: lang === "th" ? "เปิดดูไฟล์" : "View",

    // Contact Messages
    messagesHeading: lang === "th" ? "ข้อความติดต่อจากผู้เข้าชม" : "Visitor Contact Messages",
    messagesSub: lang === "th" ? "กล่องข้อความจากการกรอกแบบฟอร์ม Contact Me หน้าพอร์ต พร้อมแจ้งเตือนกระดิ่ง" : "Inquiries submitted through the public Contact Me form with real-time bell alerts.",
    allFilter: lang === "th" ? "ทั้งหมด" : "All",
    unreadFilter: lang === "th" ? "ยังไม่ได้อ่าน" : "Unread",
    readFilter: lang === "th" ? "อ่านแล้ว" : "Read",
    markAsRead: lang === "th" ? "ทำเครื่องหมายว่าอ่านแล้ว" : "Mark as read",
    markAsUnread: lang === "th" ? "ทำเครื่องหมายว่ายังไม่อ่าน" : "Mark as unread",
    replyEmail: lang === "th" ? "ตอบกลับทางอีเมล" : "Reply via Email",
    deleteMessage: lang === "th" ? "ลบข้อความ" : "Delete inquiry",

    // Followers & Likes
    followersHeading: lang === "th" ? "สถิติผู้ติดตามและหัวใจ" : "Followers & Likes Analytics",
    followersSub: lang === "th" ? "ยอดสถิติจริงจากการโต้ตอบของผู้เข้าชมบนพอร์ตโฟลิโอ" : "Live interaction stats recorded from visitors on the public portfolio.",
    followerCountTitle: lang === "th" ? "ยอดผู้ติดตามทั้งหมด" : "Total Followers",
    followerSub: lang === "th" ? "สถานะการกดติดตามจริงของผู้เข้าชม" : "Real-time visitor follow status",
    likesCountTitle: lang === "th" ? "ยอดหัวใจทั้งหมด" : "Total Hearts Given",
    likesSub: lang === "th" ? "รวมหัวใจจากทุกโพสต์ใน Social Feed" : "Aggregated across all journal posts",

    // GitHub
    githubHeading: lang === "th" ? "จัดการคลังโค้ด GitHub" : "GitHub Repositories",
    githubSub: lang === "th" ? "ดึงข้อมูลเรียลไทม์จากบัญชี GitHub ทางการ: " : "Real-time repositories from official GitHub account: ",
    syncGithubBtn: lang === "th" ? "ซิงค์กับ GitHub" : "Sync GitHub",
    syncedBtn: lang === "th" ? "ซิงค์สำเร็จ!" : "Synced!",
    publicRepoLabel: lang === "th" ? "คลังสาธารณะ" : "public repo",
    featuredBadge: lang === "th" ? "★ ไฮไลต์ (Featured)" : "★ Featured",
    featureToggle: lang === "th" ? "ไฮไลต์บนหน้าพอร์ต" : "Feature",
    featureInHighlights: lang === "th" ? "แสดงในไฮไลต์พอร์ต" : "Feature in Highlights",
    accountLabel: lang === "th" ? "บัญชี" : "Account",
    reposLabel: lang === "th" ? "คลังโค้ด" : "Repositories",
    featuredLabel: lang === "th" ? "ไฮไลต์" : "Featured",
    statusLabel: lang === "th" ? "สถานะ API" : "Status",
    apiConnected: lang === "th" ? "เชื่อมต่อสด" : "Live API Connected",

    // Settings
    settingsHeading: lang === "th" ? "ตั้งค่าระบบแดชบอร์ด" : "System Settings",
    settingsSub: lang === "th" ? "กำหนดค่าพารามิเตอร์และการทำงานของ CMS" : "Portfolio CMS configuration and operational parameters.",
    langDefault: lang === "th" ? "ภาษาเริ่มต้นของระบบ" : "Language Default",
    langDefaultSub: lang === "th" ? "เลือกภาษามาตรฐานในการแสดงผลแดชบอร์ด" : "Choose standard initial interface language",
    dbSync: lang === "th" ? "สถานะฐานข้อมูลและแบ็กเอนด์" : "Database & Backend Sync",
    dbSyncSub: lang === "th" ? "สถานะระบบ Supabase: ออนไลน์และเชื่อมต่อสด" : "Supabase state: Online & Connected",
    operational: lang === "th" ? "ทำงานปกติ (Operational)" : "Operational",
    sessionSec: lang === "th" ? "ความปลอดภัยเซสชัน" : "Session Security",
    sessionSecSub: lang === "th" ? "เข้าสู่ระบบในฐานะ nittaya503555@gmail.com" : "Logged in as nittaya503555@gmail.com",
    logoutSession: lang === "th" ? "ออกจากเซสชัน" : "Logout from Session",
  };

  // 0. Synchronize Language with Portfolio Context
  useEffect(() => {
    const syncLang = () => {
      const savedLang = localStorage.getItem("portfolio_lang") as "th" | "en";
      if (savedLang === "th" || savedLang === "en") {
        setLang(savedLang);
      }
    };
    syncLang();
    window.addEventListener("portfolio-lang-change", syncLang);
    window.addEventListener("storage", syncLang);
    return () => {
      window.removeEventListener("portfolio-lang-change", syncLang);
      window.removeEventListener("storage", syncLang);
    };
  }, []);

  // 1. Verify Authentication Session
  useEffect(() => {
    const isLocalAuth =
      typeof window !== "undefined" &&
      sessionStorage.getItem("owner_authenticated") === "true";

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !isLocalAuth) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isLocalAuth) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // 2. Fetch CMS Data & Synchronize
  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) setProfileData(data.profile);
        if (data.education) setEducationList(data.education);
        if (data.skills) setSkillsCategories(data.skills);
        if (data.posts) setPostsList(data.posts);
        if (data.resumes) setResumesList(data.resumes);
      })
      .catch(() => {});

    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.messages) {
          setMessagesList(data.messages);
          setUnreadMessagesCount(data.unreadCount || 0);
        }
      })
      .catch(() => {});

    fetch("/api/interactions/follow")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setFollowerCount(data.count);
        }
      })
      .catch(() => {});

    fetch("/api/analytics/reach")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.reachCount === "number") {
          setTotalReach(data.reachCount);
        }
      })
      .catch(() => {});

    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.repositories) {
          setGithubRepos(data.repositories);
        }
      })
      .catch(() => {});
  }, []);

  const triggerToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("owner_authenticated");
    }
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "profile", data: profileData }),
      });
      triggerToast(t.saveSuccess);
    } catch {
      triggerToast("Error saving profile");
    }
  };

  // Education CRUD
  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEduInstitution.trim() || !newEduDegree.trim()) return;

    const newEdu = {
      id: "edu-" + Date.now(),
      institution: newEduInstitution,
      degree: newEduDegree,
      fieldOfStudy: newEduMajor,
      startDate: newEduPeriod,
      current: true,
      description: newEduDesc,
    };

    const updated = [newEdu, ...educationList];
    setEducationList(updated);
    setIsAddingEducation(false);
    setNewEduInstitution("");
    setNewEduDegree("");
    setNewEduMajor("");
    setNewEduDesc("");

    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "education", data: updated }),
    });
    triggerToast(t.saveSuccess);
  };

  const handleDeleteEducation = async (id: string) => {
    const updated = educationList.filter((e) => e.id !== id);
    setEducationList(updated);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "education", data: updated }),
    });
    triggerToast("Record deleted");
  };

  // Skills CRUD
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    if (newSkillCategory === "Tools & Technologies" && !newSkillImage.trim()) {
      setSkillImageError(
        lang === "th"
          ? "หมวด Tools & Technologies ต้องเพิ่มรูปภาพเท่านั้น!"
          : "Tools & Technologies strictly requires an image!"
      );
      return;
    }
    setSkillImageError(null);

    const updated = skillsCategories.map((cat) => {
      if (cat.category === newSkillCategory) {
        return {
          ...cat,
          items: [
            ...cat.items,
            {
              id: "skill-" + Date.now(),
              name: newSkillName.trim(),
              level: newSkillLevel,
              image: newSkillCategory === "Tools & Technologies" ? newSkillImage.trim() : undefined,
              enabled: true,
            },
          ],
        };
      }
      return cat;
    });

    setSkillsCategories(updated);
    setIsAddingSkill(false);
    setNewSkillName("");
    setNewSkillImage("");

    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "skills", data: updated }),
    });
    triggerToast(t.saveSuccess);
  };

  const handleUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name.trim()) return;

    const cat = skillsCategories[editingSkill.catIndex];
    if (cat.category === "Tools & Technologies" && !editingSkill.image?.trim()) {
      setSkillImageError(
        lang === "th"
          ? "หมวด Tools & Technologies ต้องมีรูปภาพเท่านั้น!"
          : "Tools & Technologies strictly requires an image!"
      );
      return;
    }
    setSkillImageError(null);

    const updated = [...skillsCategories];
    updated[editingSkill.catIndex].items[editingSkill.skillIndex] = {
      ...updated[editingSkill.catIndex].items[editingSkill.skillIndex],
      name: editingSkill.name.trim(),
      level: editingSkill.level,
      image: cat.category === "Tools & Technologies" ? editingSkill.image?.trim() : undefined,
    };

    setSkillsCategories(updated);
    setEditingSkill(null);

    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "skills", data: updated }),
    });
    triggerToast(t.saveSuccess);
  };

  const handleToggleSkill = async (catIndex: number, skillName: string) => {
    const updated = [...skillsCategories];
    updated[catIndex].items = updated[catIndex].items.map((item: any) =>
      item.name === skillName ? { ...item, enabled: !item.enabled } : item
    );
    setSkillsCategories(updated);

    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "skills", data: updated }),
    });
  };

  const handleDeleteSkill = async (catIndex: number, skillName: string) => {
    const updated = [...skillsCategories];
    updated[catIndex].items = updated[catIndex].items.filter(
      (item: any) => item.name !== skillName
    );
    setSkillsCategories(updated);

    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "skills", data: updated }),
    });
    triggerToast("Skill removed");
  };

  // Post CRUD
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: "post-" + Date.now(),
      content: newPostContent,
      contentTh: newPostContentTh || newPostContent,
      category: newPostCategory,
      categoryTh: newPostCategory,
      images: newPostImageUrl ? [newPostImageUrl] : undefined,
      likesCount: 0,
      isPublished: true,
      publishedAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newPost, ...postsList];
    setPostsList(updated);
    setNewPostContent("");
    setNewPostContentTh("");
    setNewPostImageUrl("");
    setIsCreatingPost(false);

    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "posts", data: updated }),
    });
    triggerToast("Post published & synced to portfolio!");
  };

  const handleDeletePost = async (id: string) => {
    const updated = postsList.filter((p) => p.id !== id);
    setPostsList(updated);
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "posts", data: updated }),
    });
    triggerToast("Post removed from feed");
  };

  // Resume Management
  const handleSetDefaultResume = async (id: string) => {
    const updated = resumesList.map((res) => ({
      ...res,
      isDefault: res.id === id,
    }));
    setResumesList(updated);

    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "resumes", data: updated }),
    });
    triggerToast("Active resume updated!");
  };

  // Contact Messages CRUD
  const handleToggleMessageRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      const data = await res.json();
      if (data && data.messages) {
        setMessagesList(data.messages);
        setUnreadMessagesCount(data.unreadCount);
      }
    } catch {}
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data && data.messages) {
        setMessagesList(data.messages);
        setUnreadMessagesCount(data.unreadCount);
        triggerToast("Message removed");
      }
    } catch {}
  };

  // GitHub Sync & Toggle
  const handleRefreshGithub = async () => {
    setIsSyncingGithub(true);
    setSyncSuccess(false);
    try {
      const res = await fetch("/api/github");
      const data = await res.json();
      if (data && data.repositories) {
        setGithubRepos(data.repositories);
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Sync error:", err);
    } finally {
      setIsSyncingGithub(false);
    }
  };

  const handleToggleFeaturedRepo = (repoName: string) => {
    setFeaturedRepoIds((prev) =>
      prev.includes(repoName) ? prev.filter((r) => r !== repoName) : [...prev, repoName]
    );
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#070014] flex items-center justify-center text-ash-lilac gap-3 font-mono text-xs">
        <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <span>Verifying Owner Credentials...</span>
      </div>
    );
  }

  const totalPostLikes = postsList.reduce((sum, p) => sum + p.likesCount, 0);

  // Sidebar Menu Items (Followers tab removed per request, stats displayed in Overview)
  const menuItems = [
    { id: "overview", label: t.overview, icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "profile", label: t.profile, icon: <User className="w-4 h-4" /> },
    { id: "education", label: t.education, icon: <GraduationCap className="w-4 h-4" /> },
    { id: "skills", label: t.skills, icon: <Sparkles className="w-4 h-4" /> },
    { id: "posts", label: t.posts, icon: <FileText className="w-4 h-4" /> },
    { id: "resume", label: t.resume, icon: <FileDown className="w-4 h-4" /> },
    { id: "messages", label: t.messages, icon: <Mail className="w-4 h-4" />, badge: unreadMessagesCount },
    { id: "github", label: t.github, icon: <Github className="w-4 h-4" /> },
    { id: "settings", label: t.settings, icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="h-screen h-[100dvh] w-full bg-[#060012] text-[#f7f7fb] flex flex-col p-2 sm:p-4 lg:p-6 overflow-hidden selection:bg-cyan-500/30 selection:text-white font-sans">
      
      {/* Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed top-8 right-8 z-50 px-4 py-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-sm font-semibold shadow-[0_0_25px_rgba(6,182,212,0.4)] backdrop-blur-md animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Container Card — Fits exact 100dvh viewport, Sidebar & Header fixed, Main content scrolls */}
      <div className="w-full max-w-[1600px] mx-auto flex-1 min-h-0 h-full rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[#160d2b] shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col md:flex-row overflow-hidden relative">
        
        {/* ========================================================= */}
        {/* 1. LEFT SIDEBAR (Fixed Height, Stays Pinned, Clean Indent) */}
        {/* ========================================================= */}
        <aside className="w-full md:w-80 h-auto md:h-full bg-[#22133e] border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between p-4 sm:p-5 shrink-0 z-30 overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0 space-y-5 overflow-hidden">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3 px-2 pt-1 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ultraviolet-core to-cyan-400 p-0.5 shadow-[0_0_15px_rgba(113,61,255,0.4)] flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0218] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-cyan-300">NP</span>
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-base text-white tracking-tight">
                  Portfolio CMS
                </span>
                <span className="block text-xs text-ash-lilac font-mono">
                  Owner Dashboard
                </span>
              </div>
            </div>

            {/* Navigation List Items (Soft Elegant Active State & Clean Alignment) */}
            <nav className="space-y-1.5 pt-1 overflow-y-auto no-scrollbar flex-1 min-h-0 pr-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full h-11 px-3.5 rounded-xl flex items-center justify-between text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white/[0.1] text-white border border-white/20 font-semibold shadow-sm"
                        : "text-ash-lilac hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {/* Left Icon + Text with Equal Indent */}
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className={`w-5 h-5 flex items-center justify-center shrink-0 ${isActive ? "text-white" : "text-ash-lilac"}`}>
                        {item.icon}
                      </span>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </div>

                    {/* Right Badge + Chevron Uniformly Aligned */}
                    <div className="flex items-center gap-2 shrink-0 ml-auto">
                      {typeof item.badge === "number" && item.badge > 0 && (
                        <span className="w-5 h-5 rounded-full bg-cyan-400 text-black font-mono font-bold text-[10px] flex items-center justify-center shadow-sm">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform shrink-0 ${
                          isActive ? "text-white/80 translate-x-0.5" : "text-white/20"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom of Sidebar: Exactly 1 Sign Out Button */}
          <div className="pt-3 border-t border-white/10 shrink-0">
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 text-sm font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
              title={t.signOut}
            >
              <Power className="w-4 h-4" />
              <span>{t.signOut}</span>
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* 2. MAIN CONTENT AREA (Header + Pages + Bottom Bar)         */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full overflow-hidden bg-[#261747]">
          
          {/* Top Bar (Header with Search, Language, Notification, Profile Dropdown) */}
          <header className="h-20 px-6 sm:px-8 border-b border-white/10 flex items-center justify-between gap-4 bg-[#29174c] backdrop-blur-md shrink-0 z-20">
            {/* Search Bar */}
            <div className="relative w-64 sm:w-80">
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 h-11 rounded-full bg-[#1b0d36] border-white/10 text-sm text-soft-quartz placeholder:text-ash-lilac focus:border-cyan-400"
              />
              <Search className="w-4 h-4 text-ash-lilac absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Header Right Controls */}
            <div className="flex items-center gap-3">
              {/* Language Switcher Button (TH / EN) */}
              <button
                onClick={() => handleToggleLang()}
                className="h-11 px-4 rounded-full bg-[#1b0d36] border border-white/10 flex items-center gap-2 text-xs font-mono text-ash-lilac hover:text-white hover:border-cyan-400/50 transition-all cursor-pointer"
                title="Switch Language (TH/EN)"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="font-bold uppercase text-xs">{lang}</span>
              </button>

              {/* Notification Bell (Direct link to Contact Messages with Unread Counter) */}
              <button
                onClick={() => setActiveTab("messages")}
                className="relative w-11 h-11 rounded-full bg-[#1b0d36] border border-white/10 flex items-center justify-center text-ash-lilac hover:text-soft-quartz hover:border-cyan-400/50 transition-colors cursor-pointer"
                title={`${unreadMessagesCount} ${t.unreadAlert}`}
              >
                <Bell className="w-4 h-4" />
                {unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 text-[9px] font-mono font-bold rounded-full bg-cyan-400 text-black shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-pulse">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>

              {/* Settings Gear */}
              <button
                onClick={() => setActiveTab("settings")}
                className="w-11 h-11 rounded-full bg-[#1b0d36] border border-white/10 flex items-center justify-center text-ash-lilac hover:text-soft-quartz hover:border-cyan-400/50 transition-colors cursor-pointer"
                title={t.settings}
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Admin Profile Dropdown */}
              <div className="relative pl-2 border-l border-white/10">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-white/5 transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full border border-cyan-400/40 overflow-hidden bg-gradient-to-tr from-ultraviolet-core to-cyan-500 flex items-center justify-center shadow-md">
                    {profileData.avatarUrl ? (
                      <Image
                        src={profileData.avatarUrl}
                        alt={profileData.name}
                        width={36}
                        height={36}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="font-display text-xs font-bold text-white">NP</span>
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-bold text-white leading-tight">
                      {profileData.name.split(" (")[0]}
                    </p>
                    <span className="text-xs text-cyan-400 font-mono">{t.adminRole}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-ash-lilac hidden sm:block" />
                </button>

                {/* Profile Popup Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#070212] border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white">{profileData.name}</p>
                      <span className="text-[10px] text-ash-lilac font-mono">{profileData.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setActiveTab("profile");
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-soft-quartz hover:bg-white/5 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{t.profile}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Scrollable Content View (100% Viewport Contained, Vertical Scroll Only) */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6 sm:p-8 lg:p-10 space-y-6 bg-[#261747]">
            
            {/* ========================================================= */}
            {/* VIEW 1: OVERVIEW BENTO GRID (Matches BizFlow Screenshot)  */}
            {/* ========================================================= */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                
                {/* Title & Date Range */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    {t.overviewHeading}
                  </h2>
                  {/* Interactive Calendar Dropdown with Historical Months */}
                  <div className="relative self-start sm:self-auto">
                    <button
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b0d36] hover:bg-[#251347] border border-white/10 hover:border-cyan-400/40 text-xs sm:text-sm text-ash-lilac hover:text-white font-mono cursor-pointer transition-all shadow-sm"
                      title={lang === "th" ? "เลือกช่วงเวลาย้อนหลัง" : "Select historical date range"}
                    >
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{t.dateRangeLabel}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform ${isCalendarOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Historical Months Popover Dropdown */}
                    {isCalendarOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsCalendarOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#1b0d36] border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in space-y-1">
                          <div className="px-3 py-1.5 text-[11px] font-mono font-bold text-ash-lilac uppercase tracking-wider border-b border-white/10">
                            {lang === "th" ? "ดูสถิติย้อนหลัง" : "Historical Months"}
                          </div>
                          {[0, 1, 2, 3, 4, 5].map((offset) => {
                            const isSelected = selectedMonthOffset === offset;
                            return (
                              <button
                                key={offset}
                                onClick={() => {
                                  setSelectedMonthOffset(offset);
                                  setIsCalendarOpen(false);
                                }}
                                className={`w-full px-3 py-2 rounded-xl text-xs text-left font-mono transition-colors flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40"
                                    : "text-soft-quartz hover:bg-white/5 hover:text-white"
                                }`}
                              >
                                <span>{getMonthNameForOffset(offset)}</span>
                                {offset === 0 && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-sans">
                                    {lang === "th" ? "ปัจจุบัน" : "Current"}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* ROW 1: 4 TOP KPI STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Total Reach */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ash-lilac font-semibold">{t.totalReach}</span>
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-3xl sm:text-4xl text-white pt-3">
                        {selectedMonthOffset === 0 ? totalReach.toLocaleString() : 0}
                      </p>
                      <span className="text-xs text-cyan-400 font-mono font-semibold pt-1 block">
                        ● {selectedMonthOffset === 0 ? t.liveTracked : (lang === "th" ? "บันทึกตามช่วงเวลา" : "Archived Period")}
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Followers */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ash-lilac font-semibold">{t.totalFollowers}</span>
                      <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-lilac-beam flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-3xl sm:text-4xl text-white pt-3">
                        {selectedMonthOffset === 0 ? followerCount : 0}
                      </p>
                      <span className="text-xs text-cyan-400 font-mono font-semibold pt-1 block">
                        ● {selectedMonthOffset === 0 ? t.liveTracked : (lang === "th" ? "บันทึกตามช่วงเวลา" : "Archived Period")}
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Post Likes */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ash-lilac font-semibold">{t.postLikes}</span>
                      <div className="w-9 h-9 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center">
                        <Heart className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-3xl sm:text-4xl text-white pt-3">
                        {selectedMonthOffset === 0 ? totalPostLikes : 0}
                      </p>
                      <span className="text-xs text-cyan-400 font-mono font-semibold pt-1 block">
                        ● {selectedMonthOffset === 0 ? t.liveTracked : (lang === "th" ? "บันทึกตามช่วงเวลา" : "Archived Period")}
                      </span>
                    </div>
                  </div>

                  {/* Card 4: Contact Inquiries */}
                  <div className="p-5 sm:p-6 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-ash-lilac font-semibold">{t.contactInquiries}</span>
                      <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-3xl sm:text-4xl text-white pt-3">
                        {selectedMonthOffset === 0 ? messagesList.length : 0}
                      </p>
                      <span className="text-xs text-cyan-400 font-mono font-semibold pt-1 block">
                        ● {selectedMonthOffset === 0 ? t.liveTracked : (lang === "th" ? "บันทึกตามช่วงเวลา" : "Archived Period")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* OVERVIEW CONTENT: 2-COLUMN BALANCED LAYOUT (Clean, No-Graph, High-Readability) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Recent Journal Posts Table (7 Cols) */}
                  <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] space-y-5">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">
                          {t.recentPosts}
                        </h3>
                        <p className="text-xs text-ash-lilac">
                          {lang === "th" ? "โพสต์ล่าสุดที่เผยแพร่บนหน้า Social Feed" : "Latest updates published on public feed"}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("posts")}
                        className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors cursor-pointer"
                      >
                        {t.viewAllPosts}
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/10 text-ash-lilac text-xs font-mono uppercase tracking-wider">
                            <th className="pb-3 font-semibold">{t.postContent}</th>
                            <th className="pb-3 font-semibold">{t.category}</th>
                            <th className="pb-3 font-semibold">{t.likes}</th>
                            <th className="pb-3 font-semibold">{t.status}</th>
                            <th className="pb-3 font-semibold">{t.date}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {postsList.slice(0, 5).map((post) => (
                            <tr key={post.id} className="hover:bg-white/[0.03] transition-colors">
                              <td className="py-3.5 pr-3 font-medium text-white max-w-[220px] truncate">
                                {post.content}
                              </td>
                              <td className="py-3.5 pr-3 text-ash-lilac font-mono text-xs">
                                {post.category}
                              </td>
                              <td className="py-3.5 pr-3 text-pink-400 font-mono font-bold">
                                ♥ {post.likesCount}
                              </td>
                              <td className="py-3.5 pr-3">
                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  {t.published}
                                </span>
                              </td>
                              <td className="py-3.5 text-ash-lilac font-mono text-xs">
                                {post.publishedAt}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right Column: Recent Inquiries & Skills Summary (5 Cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Recent Inquiries Card */}
                    <div className="p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div>
                          <h3 className="font-display font-bold text-lg text-white">
                            {t.recentInquiries}
                          </h3>
                          <span className="text-xs text-ash-lilac font-mono">
                            {unreadMessagesCount > 0 ? `${unreadMessagesCount} ${t.unreadCount}` : t.allRead}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveTab("messages")}
                          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                        >
                          {t.viewAll}
                        </button>
                      </div>

                      <div className="space-y-3">
                        {messagesList.length > 0 ? (
                          messagesList.slice(0, 3).map((msg) => (
                            <div
                              key={msg.id}
                              onClick={() => setActiveTab("messages")}
                              className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 flex items-start justify-between gap-3 cursor-pointer transition-all"
                            >
                              <div className="space-y-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{msg.name}</p>
                                <p className="text-xs text-ash-lilac truncate">{msg.subject || msg.message}</p>
                              </div>
                              <span className="text-xs text-ash-lilac font-mono shrink-0">
                                {msg.createdAt?.split("T")[0] || "Recent"}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-sm text-ash-lilac font-mono">
                            {t.noMessages}
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => setActiveTab("messages")}
                        className="w-full py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm shadow-md transition-all cursor-pointer"
                      >
                        {t.openInbox}
                      </Button>
                    </div>

                    {/* Skills Inventory Status Card */}
                    <div className="p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="font-display font-bold text-lg text-white">{t.skillsInventory}</span>
                        <Package className="w-5 h-5 text-cyan-400" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="text-xs text-ash-lilac">{t.hardSkillsCount}</span>
                          <p className="text-base font-bold text-cyan-300 font-mono pt-0.5">
                            {skillsCategories.find((c) => c.category === "Hard Skills")?.items.length || 5} {t.items}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="text-xs text-ash-lilac">{t.softSkillsCount}</span>
                          <p className="text-base font-bold text-lilac-beam font-mono pt-0.5">
                            {skillsCategories.find((c) => c.category === "Soft Skills")?.items.length || 5} {t.items}
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 col-span-2">
                          <span className="text-xs text-ash-lilac">{t.toolsCount}</span>
                          <p className="text-base font-bold text-emerald-400 font-mono pt-0.5">
                            {skillsCategories.find((c) => c.category === "Tools & Technologies")?.items.length || 5} {t.items} (Icon Images)
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => setActiveTab("skills")}
                        variant="outline"
                        className="w-full py-2.5 rounded-2xl text-xs font-semibold hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer"
                      >
                        {t.manageSkillsBtn}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bottom Feature Highlights Ribbon (Matches BizFlow Screenshot Image 1 & 4) */}
                <div className="w-full rounded-3xl bg-[#0b041a] border border-white/10 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-lg">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white tracking-tight">{lang === "th" ? "อัปเดตแบบเรียลไทม์" : "Real-time Updates"}</p>
                      <p className="text-xs text-ash-lilac truncate">{lang === "th" ? "เชื่อมต่อข้อมูลสดทันที" : "Live data synchronization"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-400/30 text-lilac-beam flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white tracking-tight">{lang === "th" ? "ปลอดภัยและขยายได้" : "Secure & Scalable"}</p>
                      <p className="text-xs text-ash-lilac truncate">{lang === "th" ? "ความปลอดภัยระดับองค์กร" : "Enterprise-grade security"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white tracking-tight">{lang === "th" ? "ประสิทธิภาพสูงสุด" : "Performance Optimized"}</p>
                      <p className="text-xs text-ash-lilac truncate">{lang === "th" ? "โหลดข้อมูลเร็วเป็นพิเศษ" : "Lightning fast dashboards"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-pink-500/15 border border-pink-400/30 text-pink-400 flex items-center justify-center shrink-0">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white tracking-tight">{lang === "th" ? "ปรับแต่งได้เต็มที่" : "Fully Customizable"}</p>
                      <p className="text-xs text-ash-lilac truncate">{lang === "th" ? "ออกแบบเพื่อพอร์ตของคุณ" : "Built for your portfolio"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 2: PROFILE MANAGEMENT                                */}
            {/* ========================================================= */}
            {activeTab === "profile" && (
              <div className="space-y-6 w-full">
                <Card className="p-7 sm:p-9 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.65)] space-y-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                        {t.personalProfile}
                      </h3>
                      <p className="text-sm text-ash-lilac pt-1">
                        {t.profileDesc}
                      </p>
                    </div>
                    <Button
                      onClick={handleSaveProfile}
                      className="rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm gap-2 shadow-lg cursor-pointer px-5 py-2.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>{t.saveButton}</span>
                    </Button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* SECTION: PHOTO MANAGEMENT (HERO AVATAR & ABOUT ME CUTOUT) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                      {/* Photo 1: Hero Avatar */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-white">
                            {t.heroAvatarLabel}
                          </label>
                          <span className="text-xs text-ash-lilac">
                            {t.heroAvatarSub}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-cyan-400/40 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                            {profileData.avatarUrl ? (
                              <Image
                                src={profileData.avatarUrl}
                                alt="Hero Avatar Preview"
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="font-display font-bold text-lg text-white">NP</span>
                            )}
                          </div>

                          <div className="flex-1 space-y-2">
                            <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-xs font-semibold text-cyan-300 hover:text-white cursor-pointer transition-all">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{t.uploadImageBtn}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      if (typeof reader.result === "string") {
                                        setProfileData({ ...profileData, avatarUrl: reader.result });
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <Input
                              value={profileData.avatarUrl || ""}
                              onChange={(e) => setProfileData({ ...profileData, avatarUrl: e.target.value })}
                              placeholder={t.orUrlPlaceholder}
                              className="h-9 bg-white/5 border-white/10 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Photo 2: About Me Cutout Portrait */}
                      <div className="space-y-3 md:border-l md:border-white/10 md:pl-6">
                        <div>
                          <label className="block text-sm font-semibold text-white">
                            {t.aboutAvatarLabel}
                          </label>
                          <span className="text-xs text-ash-lilac">
                            {t.aboutAvatarSub}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-400/40 overflow-hidden flex items-center justify-center shrink-0 shadow-md p-1">
                            {profileData.aboutAvatarUrl ? (
                              <Image
                                src={profileData.aboutAvatarUrl}
                                alt="About Me Cutout Preview"
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="font-display font-bold text-xs text-purple-300">About</span>
                            )}
                          </div>

                          <div className="flex-1 space-y-2">
                            <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400/30 text-xs font-semibold text-purple-300 hover:text-white cursor-pointer transition-all">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{t.uploadImageBtn}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      if (typeof reader.result === "string") {
                                        setProfileData({ ...profileData, aboutAvatarUrl: reader.result });
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            <Input
                              value={profileData.aboutAvatarUrl || ""}
                              onChange={(e) => setProfileData({ ...profileData, aboutAvatarUrl: e.target.value })}
                              placeholder={t.orUrlPlaceholder}
                              className="h-9 bg-white/5 border-white/10 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BASIC INFO FIELDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t.displayName}
                        </label>
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="h-11 bg-white/5 border-white/10 text-sm text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t.professionalTitle}
                        </label>
                        <Input
                          value={profileData.title}
                          onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                          className="h-11 bg-white/5 border-white/10 text-sm text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        {t.bioIntro}
                      </label>
                      <Textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="bg-white/5 border-white/10 text-sm text-white leading-relaxed p-3.5"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t.emailAddr}
                        </label>
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="h-11 bg-white/5 border-white/10 text-sm text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          {t.githubUrl}
                        </label>
                        <Input
                          value={profileData.githubUrl}
                          onChange={(e) => setProfileData({ ...profileData, githubUrl: e.target.value })}
                          className="h-11 bg-white/5 border-white/10 text-sm text-white font-mono"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 3: EDUCATION & ABOUT ME MANAGEMENT                   */}
            {/* ========================================================= */}
            {activeTab === "education" && (
              <div className="space-y-6 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {t.eduHeading}
                    </h3>
                    <p className="text-sm text-ash-lilac pt-1">
                      {t.eduSub}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsAddingEducation(!isAddingEducation)}
                    className="rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm gap-2 shadow-md px-5 py-2.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addEdu}</span>
                  </Button>
                </div>

                {isAddingEducation && (
                  <Card className="p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-cyan-400/40 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    <h4 className="font-bold text-base text-white">{t.addEduTitle}</h4>
                    <form onSubmit={handleAddEducation} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.instName}</label>
                          <Input
                            value={newEduInstitution}
                            onChange={(e) => setNewEduInstitution(e.target.value)}
                            placeholder={t.instPlaceholder}
                            required
                            className="h-11 bg-white/5 border-white/10 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.degree}</label>
                          <Input
                            value={newEduDegree}
                            onChange={(e) => setNewEduDegree(e.target.value)}
                            placeholder={t.degreePlaceholder}
                            required
                            className="h-11 bg-white/5 border-white/10 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.major}</label>
                          <Input
                            value={newEduMajor}
                            onChange={(e) => setNewEduMajor(e.target.value)}
                            placeholder={t.majorPlaceholder}
                            className="h-11 bg-white/5 border-white/10 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.period}</label>
                          <Input
                            value={newEduPeriod}
                            onChange={(e) => setNewEduPeriod(e.target.value)}
                            placeholder="2023 - Present"
                            className="h-11 bg-white/5 border-white/10 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-1.5">{t.desc}</label>
                        <Textarea
                          value={newEduDesc}
                          onChange={(e) => setNewEduDesc(e.target.value)}
                          placeholder={t.descPlaceholder}
                          className="bg-white/5 border-white/10 text-sm p-3"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" className="rounded-full bg-cyan-400 text-black font-semibold text-sm px-5 py-2.5 shadow-md">
                          {t.saveEduBtn}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setIsAddingEducation(false)}
                          className="rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white border border-red-500/40 text-sm font-semibold px-6 py-2.5 flex items-center justify-center text-center cursor-pointer transition-colors shadow-sm"
                        >
                          {t.cancel}
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}

                <div className="space-y-4">
                  {educationList.map((edu) => (
                    <Card
                      key={edu.id}
                      className="p-6 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] flex items-start justify-between gap-4 shadow-xl"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="w-5 h-5 text-cyan-400" />
                          <h4 className="font-display font-bold text-lg text-white">
                            {edu.institution}
                          </h4>
                          <Badge variant="violet" className="text-xs">
                            {edu.startDate}
                          </Badge>
                        </div>
                        <p className="text-sm font-semibold text-cyan-300">
                          {edu.degree} · {edu.fieldOfStudy}
                        </p>
                        <p className="text-sm text-ash-lilac pt-1 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="p-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title={t.deleteRecord}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 4: SKILLS & TOOLS MANAGEMENT                         */}
            {/* ========================================================= */}
            {activeTab === "skills" && (
              <div className="space-y-6 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {t.skillsHeading}
                    </h3>
                    <p className="text-sm text-ash-lilac pt-1">
                      {t.skillsSub}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsAddingSkill(!isAddingSkill)}
                    className="rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm gap-2 shadow-md px-5 py-2.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addSkill}</span>
                  </Button>
                </div>

                {isAddingSkill && (
                  <Card className="p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-cyan-400/40 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    <h4 className="font-bold text-base text-white">
                      {t.addSkillModalTitle}
                    </h4>
                    <form onSubmit={handleAddSkill} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.skillName}</label>
                          <Input
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            placeholder={t.skillNamePlaceholder}
                            required
                            className="h-11 bg-white/5 border-white/10 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.skillCategory}</label>
                          <select
                            value={newSkillCategory}
                            onChange={(e) => {
                              setNewSkillCategory(e.target.value);
                              setSkillImageError(null);
                            }}
                            className="w-full h-11 px-3 rounded-xl bg-[#090218] border border-white/10 text-sm text-white"
                          >
                            <option value="Hard Skills">Hard Skills</option>
                            <option value="Soft Skills">Soft Skills</option>
                            <option value="Tools & Technologies">Tools & Technologies</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.skillLevel}</label>
                          <select
                            value={newSkillLevel}
                            onChange={(e) => setNewSkillLevel(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-[#090218] border border-white/10 text-sm text-white"
                          >
                            <option value="Beginner">{t.beginner}</option>
                            <option value="Intermediate">{t.intermediate}</option>
                            <option value="Advanced">{t.advanced}</option>
                            <option value="Expert">{t.expert}</option>
                          </select>
                        </div>

                        {/* Strictly Required Image ONLY for Tools & Technologies */}
                        {newSkillCategory === "Tools & Technologies" && (
                          <div className="col-span-full space-y-3 p-5 rounded-2xl bg-cyan-500/[0.05] border border-cyan-400/30">
                            <div className="flex items-center justify-between">
                              <label className="block text-sm font-bold text-cyan-300">
                                {t.toolImgRequired} *
                              </label>
                              <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-md font-bold">
                                Required Image
                              </span>
                            </div>

                            {/* Preset Quick Select for Official Icons */}
                            <div className="flex flex-wrap gap-2 items-center">
                              <span className="text-xs text-ash-lilac font-mono">{t.quickPick}</span>
                              {[
                                { name: "Canva", img: "/images/tools/canva.webp" },
                                { name: "Microsoft Word", img: "/images/tools/word.webp" },
                                { name: "Figma", img: "/images/tools/figma.png" },
                                { name: "Visual Studio Code", img: "/images/tools/vscode.webp" },
                                { name: "GitHub", img: "/images/tools/github.webp" },
                              ].map((preset) => (
                                <button
                                  key={preset.name}
                                  type="button"
                                  onClick={() => {
                                    setNewSkillImage(preset.img);
                                    if (!newSkillName) setNewSkillName(preset.name);
                                    setSkillImageError(null);
                                  }}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all flex items-center gap-2 cursor-pointer ${
                                    newSkillImage === preset.img
                                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                                      : "bg-white/5 border-white/10 text-ash-lilac hover:text-white"
                                  }`}
                                >
                                  <Image
                                    src={preset.img}
                                    alt={preset.name}
                                    width={16}
                                    height={16}
                                    className="w-4 h-4 object-contain"
                                  />
                                  <span>{preset.name}</span>
                                </button>
                              ))}
                            </div>

                            {/* Custom URL or File Input */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                              <div>
                                <Input
                                  value={newSkillImage}
                                  onChange={(e) => {
                                    setNewSkillImage(e.target.value);
                                    setSkillImageError(null);
                                  }}
                                  placeholder="Image URL (e.g. /images/tools/figma.png or https://...)"
                                  className="h-11 bg-white/5 border-white/10 text-sm"
                                  required
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <label className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-cyan-400/40 text-xs font-semibold text-cyan-300 hover:text-white cursor-pointer transition-all">
                                  <Upload className="w-4 h-4" />
                                  <span>{t.uploadImageBtn}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                          if (typeof reader.result === "string") {
                                            setNewSkillImage(reader.result);
                                            setSkillImageError(null);
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                                {newSkillImage && (
                                  <div className="w-11 h-11 rounded-xl bg-black/60 border border-cyan-400 p-1 flex items-center justify-center shrink-0 shadow-md">
                                    <Image
                                      src={newSkillImage}
                                      alt="Preview"
                                      width={36}
                                      height={36}
                                      className="w-9 h-9 object-contain"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            {skillImageError && (
                              <p className="text-xs text-red-400 font-mono font-semibold pt-1">
                                ⚠️ {skillImageError}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" className="rounded-full bg-cyan-400 text-black font-semibold text-sm px-5 py-2.5 shadow-md">
                          {t.saveSkill}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setIsAddingSkill(false);
                            setSkillImageError(null);
                          }}
                          className="rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white border border-red-500/40 text-sm font-semibold px-6 py-2.5 flex items-center justify-center text-center cursor-pointer transition-colors shadow-sm"
                        >
                          {t.cancel}
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}

                {/* Edit Skill Modal */}
                {editingSkill && (
                  <Card className="p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-lilac-beam/50 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-white flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-lilac-beam" />
                        <span>
                          {t.editSkill}: {editingSkill.name}
                        </span>
                      </h4>
                      <button
                        onClick={() => {
                          setEditingSkill(null);
                          setSkillImageError(null);
                        }}
                        className="text-sm text-ash-lilac hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleUpdateSkill} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.skillName}</label>
                          <Input
                            value={editingSkill.name}
                            onChange={(e) =>
                              setEditingSkill({ ...editingSkill, name: e.target.value })
                            }
                            required
                            className="h-11 bg-white/5 border-white/10 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.skillLevel}</label>
                          <select
                            value={editingSkill.level}
                            onChange={(e) =>
                              setEditingSkill({ ...editingSkill, level: e.target.value })
                            }
                            className="w-full h-11 px-3 rounded-xl bg-[#090218] border border-white/10 text-sm text-white"
                          >
                            <option value="Beginner">{t.beginner}</option>
                            <option value="Intermediate">{t.intermediate}</option>
                            <option value="Advanced">{t.advanced}</option>
                            <option value="Expert">{t.expert}</option>
                          </select>
                        </div>
                      </div>

                      {editingSkill.category === "Tools & Technologies" && (
                        <div className="space-y-3 p-4 rounded-2xl bg-cyan-500/[0.05] border border-cyan-400/30">
                          <label className="block text-sm font-bold text-cyan-300">
                            {t.toolImgRequired} *
                          </label>
                          <div className="flex items-center gap-3">
                            <Input
                              value={editingSkill.image || ""}
                              onChange={(e) =>
                                setEditingSkill({ ...editingSkill, image: e.target.value })
                              }
                              placeholder="Image URL"
                              className="h-11 bg-white/5 border-white/10 text-sm flex-1"
                              required
                            />
                            {editingSkill.image && (
                              <div className="w-11 h-11 rounded-xl bg-black/60 border border-cyan-400 p-1 flex items-center justify-center shrink-0">
                                <Image
                                  src={editingSkill.image}
                                  alt="Preview"
                                  width={36}
                                  height={36}
                                  className="w-9 h-9 object-contain"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {skillImageError && (
                        <p className="text-xs text-red-400 font-mono font-semibold">
                          ⚠️ {skillImageError}
                        </p>
                      )}

                      <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" className="rounded-full bg-cyan-400 text-black font-semibold text-sm px-5 py-2.5 shadow-md">
                          {t.updateSkill}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setEditingSkill(null);
                            setSkillImageError(null);
                          }}
                          className="rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white border border-red-500/40 text-sm font-semibold px-6 py-2.5 flex items-center justify-center text-center cursor-pointer transition-colors shadow-sm"
                        >
                          {t.cancel}
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}

                <div className="space-y-6">
                  {skillsCategories.map((cat, catIdx) => (
                    <Card key={catIdx} className="p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <h4 className="font-display font-bold text-lg text-cyan-300">
                          {cat.category}
                        </h4>
                        <span className="text-xs text-ash-lilac font-mono">{cat.items.length} {t.items}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {cat.items.map((skill: any, i: number) => (
                          <div
                            key={i}
                            className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3 hover:border-cyan-400/30 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              {skill.image ? (
                                <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 p-1.5 flex items-center justify-center shrink-0">
                                  <Image
                                    src={skill.image}
                                    alt={skill.name}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-cyan-300 font-bold text-sm">
                                  {skill.name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-white">{skill.name}</p>
                                <span className="text-xs text-ash-lilac font-mono">
                                  Level: {skill.level}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Edit Skill Button */}
                              <button
                                onClick={() =>
                                  setEditingSkill({
                                    catIndex: catIdx,
                                    skillIndex: i,
                                    name: skill.name,
                                    level: skill.level || "Advanced",
                                    category: cat.category,
                                    image: skill.image || "",
                                  })
                                }
                                className="p-2 rounded-lg text-xs text-lilac-beam hover:bg-purple-500/10 transition-colors cursor-pointer"
                                title={t.editSkill}
                              >
                                <Sliders className="w-4 h-4" />
                              </button>

                              {/* Toggle Visibility on Public Site */}
                              <button
                                onClick={() => handleToggleSkill(catIdx, skill.name)}
                                className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                                  skill.enabled ? "text-cyan-400 bg-cyan-500/10" : "text-ash-lilac bg-white/5"
                                }`}
                                title={skill.enabled ? t.visibleOnSite : t.hiddenOnSite}
                              >
                                {skill.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>

                              {/* Delete Skill */}
                              <button
                                onClick={() => handleDeleteSkill(catIdx, skill.name)}
                                className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                                title={t.deleteSkill}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 5: POST MANAGEMENT (With Image URL / Upload support)  */}
            {/* ========================================================= */}
            {activeTab === "posts" && (
              <div className="space-y-6 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {t.postsHeading}
                    </h3>
                    <p className="text-sm text-ash-lilac pt-1">
                      {t.postsSub}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsCreatingPost(true)}
                    className="rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm gap-2 shadow-md px-5 py-2.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.newPost}</span>
                  </Button>
                </div>

                {isCreatingPost && (
                  <Card className="p-6 sm:p-7 rounded-3xl bg-[#0b041a] border border-cyan-400/40 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    <h4 className="font-bold text-base text-white">{t.composePost}</h4>
                    <form onSubmit={handleCreatePost} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-1.5">{t.contentEn}</label>
                        <Textarea
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder={t.contentEnPlaceholder}
                          required
                          className="bg-white/5 border-white/10 text-sm p-3.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-1.5">{t.contentTh}</label>
                        <Textarea
                          value={newPostContentTh}
                          onChange={(e) => setNewPostContentTh(e.target.value)}
                          placeholder={t.contentThPlaceholder}
                          className="bg-white/5 border-white/10 text-sm p-3.5"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.postCategoryLabel}</label>
                          <select
                            value={newPostCategory}
                            onChange={(e) => setNewPostCategory(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-[#090218] border border-white/10 text-sm text-white"
                          >
                            <option value="Design System">Design System</option>
                            <option value="UX Research">UX Research</option>
                            <option value="Accessibility">Accessibility</option>
                            <option value="Interaction Design">Interaction Design</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white mb-1.5">{t.postImgLabel}</label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              value={newPostImageUrl}
                              onChange={(e) => setNewPostImageUrl(e.target.value)}
                              placeholder={t.postImgPlaceholder}
                              className="h-11 bg-white/5 border-white/10 text-xs flex-1"
                            />
                            <label className="h-11 px-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-xs font-semibold text-cyan-300 hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-all">
                              <Upload className="w-4 h-4" />
                              <span>{t.uploadImageBtn}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      if (typeof reader.result === "string") {
                                        setNewPostImageUrl(reader.result);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Attached Image Preview */}
                      {newPostImageUrl && (
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                          <div className="w-16 h-16 rounded-xl bg-black/60 border border-cyan-400/40 overflow-hidden relative shrink-0">
                            <Image
                              src={newPostImageUrl}
                              alt="Post preview"
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white font-mono truncate">{newPostImageUrl.slice(0, 50)}...</p>
                            <button
                              type="button"
                              onClick={() => setNewPostImageUrl("")}
                              className="text-xs text-red-400 hover:text-red-300 font-semibold mt-1 cursor-pointer"
                            >
                              ✕ {t.removeImg}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-2">
                        <Button type="submit" className="rounded-full bg-cyan-400 text-black font-semibold text-sm px-5 py-2.5 shadow-md">
                          {t.publishPost}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setIsCreatingPost(false);
                            setNewPostImageUrl("");
                          }}
                          className="rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white border border-red-500/40 text-sm font-semibold px-6 py-2.5 flex items-center justify-center text-center cursor-pointer transition-colors shadow-sm"
                        >
                          {t.cancel}
                        </Button>
                      </div>
                    </form>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {postsList.map((post) => (
                    <Card
                      key={post.id}
                      className="p-6 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <Badge variant="violet" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-ash-lilac font-mono text-xs">
                            {post.publishedAt}
                          </span>
                        </div>
                        <p className="text-sm text-soft-quartz leading-relaxed">{post.content}</p>

                        {/* Attached Image inside Post Card */}
                        {post.images && post.images.length > 0 && (
                          <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 relative bg-black/30">
                            <Image
                              src={post.images[0]}
                              alt="Post attached image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>

                      <div className="pt-3 flex items-center justify-between border-t border-white/5 text-sm text-ash-lilac">
                        <span className="flex items-center gap-1.5 font-mono text-pink-400 font-bold">
                          <Heart className="w-4 h-4 fill-pink-500" /> {post.likesCount}
                        </span>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer transition-colors"
                          title={t.deletePost}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 6: RESUME MANAGEMENT                                 */}
            {/* ========================================================= */}
            {activeTab === "resume" && (
              <div className="space-y-6 w-full">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">{t.resumeHeading}</h3>
                  <p className="text-sm text-ash-lilac pt-1">
                    {t.resumeSub}
                  </p>
                </div>

                {/* Upload Card */}
                <Card className="p-8 sm:p-9 rounded-3xl bg-[#0b041a] border border-dashed border-cyan-400/40 text-center space-y-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">{t.uploadResumeTitle}</p>
                    <span className="text-xs text-ash-lilac">{t.uploadResumeSub}</span>
                  </div>
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm cursor-pointer shadow-md transition-all">
                    <span>{t.browsePdfBtn}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          triggerToast(`Uploaded: ${e.target.files[0].name}`);
                        }
                      }}
                    />
                  </label>
                </Card>

                {/* Version History List */}
                <div className="space-y-4">
                  <h4 className="font-bold text-base text-white">{t.resumeVersions}</h4>
                  {resumesList.map((res) => (
                    <Card
                      key={res.id}
                      className={`p-6 sm:p-7 rounded-3xl bg-[#0b041a] border flex items-center justify-between gap-4 shadow-[0_12px_32px_rgba(0,0,0,0.6)] ${
                        res.isDefault ? "border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]" : "border-white/15"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                          <FileDown className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <p className="text-base font-bold text-white">{res.title}</p>
                            {res.isDefault && (
                              <Badge variant="violet" className="text-xs bg-cyan-500/15 text-cyan-300 border-cyan-400/30">
                                {t.defaultPill}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-ash-lilac font-mono pt-0.5">
                            {res.fileName} · {res.fileSize} · Updated: {res.updatedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-full border border-white/10 text-xs sm:text-sm font-semibold text-soft-quartz hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>{t.previewPdf}</span>
                        </a>

                        {!res.isDefault && (
                          <Button
                            size="sm"
                            onClick={() => handleSetDefaultResume(res.id)}
                            className="h-9 px-4 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-black text-xs sm:text-sm font-semibold cursor-pointer"
                          >
                            {t.setDefaultBtn}
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 7: CONTACT MESSAGES MANAGEMENT (With Bell Badge)     */}
            {/* ========================================================= */}
            {activeTab === "messages" && (
              <div className="space-y-6 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">{t.messagesHeading}</h3>
                    <p className="text-sm text-ash-lilac pt-1">
                      {t.messagesSub}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0b041a] border border-white/15 text-xs font-mono">
                    <button
                      onClick={() => setMessageFilter("all")}
                      className={`px-3.5 py-1.5 rounded-full uppercase text-xs font-bold transition-all cursor-pointer ${
                        messageFilter === "all" ? "bg-cyan-400 text-black shadow-md" : "text-ash-lilac hover:text-white"
                      }`}
                    >
                      {t.allFilter}
                    </button>
                    <button
                      onClick={() => setMessageFilter("unread")}
                      className={`px-3.5 py-1.5 rounded-full uppercase text-xs font-bold transition-all cursor-pointer ${
                        messageFilter === "unread" ? "bg-cyan-400 text-black shadow-md" : "text-ash-lilac hover:text-white"
                      }`}
                    >
                      {t.unreadFilter}
                    </button>
                    <button
                      onClick={() => setMessageFilter("read")}
                      className={`px-3.5 py-1.5 rounded-full uppercase text-xs font-bold transition-all cursor-pointer ${
                        messageFilter === "read" ? "bg-cyan-400 text-black shadow-md" : "text-ash-lilac hover:text-white"
                      }`}
                    >
                      {t.readFilter}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {messagesList
                    .filter((m) => {
                      if (messageFilter === "unread") return !m.isRead;
                      if (messageFilter === "read") return m.isRead;
                      return true;
                    })
                    .map((msg) => (
                      <Card
                        key={msg.id}
                        className={`p-6 sm:p-7 rounded-3xl bg-[#0b041a] border space-y-3.5 transition-all shadow-[0_12px_32px_rgba(0,0,0,0.6)] ${
                          !msg.isRead ? "border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]" : "border-white/15"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2.5">
                              <h4 className="font-display font-bold text-lg text-white">{msg.name}</h4>
                              {!msg.isRead && (
                                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                              )}
                            </div>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs sm:text-sm text-cyan-400 font-mono hover:underline"
                            >
                              {msg.email}
                            </a>
                          </div>
                          <span className="text-xs font-mono text-ash-lilac">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-sm text-white font-semibold">{msg.subject}</p>
                        <p className="text-sm text-soft-quartz leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                          {msg.message}
                        </p>

                        <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs sm:text-sm">
                          <button
                            onClick={() => handleToggleMessageRead(msg.id, msg.isRead)}
                            className="text-ash-lilac hover:text-white transition-colors cursor-pointer"
                          >
                            {msg.isRead ? t.markAsUnread : t.markAsRead}
                          </button>

                          <div className="flex items-center gap-3">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Portfolio Contact"}`}
                              className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-semibold cursor-pointer"
                            >
                              <span>{t.replyEmail}</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-red-400 hover:text-red-300 p-1 cursor-pointer transition-colors"
                              title={t.deleteMessage}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}


            {/* ========================================================= */}
            {/* VIEW 9: GITHUB REPOSITORIES MANAGEMENT                    */}
            {/* ========================================================= */}
            {activeTab === "github" && (
              <div className="space-y-6 w-full">
                {/* Header & Sync */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white tracking-tight flex items-center gap-2.5">
                      <Github className="w-6 h-6 text-cyan-400" />
                      <span>{t.githubHeading}</span>
                    </h3>
                    <p className="text-sm text-ash-lilac pt-1">
                      {t.githubSub}
                      <a
                        href="https://github.com/icx-nit"
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline font-mono font-semibold"
                      >
                        github.com/icx-nit
                      </a>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleRefreshGithub}
                      disabled={isSyncingGithub}
                      className="rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-sm gap-2 shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all cursor-pointer px-5 py-2.5"
                    >
                      <RefreshCw className={`w-4 h-4 ${isSyncingGithub ? "animate-spin" : ""}`} />
                      <span>{syncSuccess ? t.syncedBtn : t.syncGithubBtn}</span>
                    </Button>
                  </div>
                </div>

                {/* Cool Obsidian Stats Ribbon (4 Cards including ไฮไลต์ Featured Repos) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0b041a] border border-white/15 flex items-center gap-3.5 shadow-lg">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-ash-lilac uppercase font-mono tracking-wider font-semibold">{t.accountLabel}</p>
                      <p className="text-sm font-bold text-white font-mono">@icx-nit</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0b041a] border border-white/15 flex items-center gap-3.5 shadow-lg">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/30 text-lilac-beam flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-ash-lilac uppercase font-mono tracking-wider font-semibold">{t.reposLabel}</p>
                      <p className="text-sm font-bold text-white font-mono">{githubRepos.length || 2} {t.publicRepoLabel}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0b041a] border border-white/15 flex items-center gap-3.5 shadow-lg">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-ash-lilac uppercase font-mono tracking-wider font-semibold">{t.featuredLabel}</p>
                      <p className="text-sm font-bold text-white font-mono">{featuredRepoIds.length} Repos</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0b041a] border border-white/15 flex items-center gap-3.5 shadow-lg">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-ash-lilac uppercase font-mono tracking-wider font-semibold">{t.statusLabel}</p>
                      <p className="text-sm font-bold text-emerald-400 font-mono">{t.apiConnected}</p>
                    </div>
                  </div>
                </div>

                {/* Repositories Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {githubRepos.map((repo: any) => {
                    const isFeatured = featuredRepoIds.includes(repo.name);
                    const langColor =
                      repo.language === "TypeScript"
                        ? "bg-cyan-400 text-cyan-300 border-cyan-400/30"
                        : repo.language === "JavaScript"
                        ? "bg-amber-400 text-amber-300 border-amber-400/30"
                        : repo.language === "Python"
                        ? "bg-emerald-400 text-emerald-300 border-emerald-400/30"
                        : "bg-lilac-beam text-lilac-beam border-purple-400/30";

                    return (
                      <div
                        key={repo.id || repo.name}
                        className={`group relative p-6 sm:p-7 rounded-3xl bg-[#0b041a] border transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between space-y-4 shadow-xl ${
                          isFeatured
                            ? "border-cyan-400/50 shadow-[0_10px_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/30"
                            : "border-white/15 hover:border-cyan-400/30"
                        }`}
                      >
                        {/* Top Row: Icon + Title + External Link */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 group-hover:scale-105 transition-all">
                                <Github className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                                  {repo.name}
                                </h4>
                                <span className="text-xs text-ash-lilac font-mono">
                                  {t.publicRepoLabel}
                                </span>
                              </div>
                            </div>

                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-ash-lilac hover:text-cyan-300 hover:border-cyan-400/40 transition-all cursor-pointer"
                              title="Open on GitHub"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>

                          <p className="text-sm text-ash-lilac leading-relaxed line-clamp-2">
                            {repo.description || "Interactive software repository and project by Nittaya Pana."}
                          </p>
                        </div>

                        {/* Middle: Badges & Metrics */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 text-xs sm:text-sm">
                          {/* Language Badge */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
                            <span className={`w-2.5 h-2.5 rounded-full ${langColor.split(" ")[0]}`} />
                            <span className="text-white font-medium">{repo.language || "TypeScript"}</span>
                          </div>

                          {/* Stars & Forks */}
                          <div className="flex items-center gap-3 text-ash-lilac font-mono text-xs">
                            <span className="flex items-center gap-1 text-amber-300 font-semibold">
                              ★ {repo.stargazers_count ?? 5}
                            </span>
                            <span className="flex items-center gap-1 text-ash-lilac">
                              Forks: {repo.forks_count ?? 1}
                            </span>
                          </div>
                        </div>

                        {/* Footer Actions: Feature Toggle */}
                        <div className="pt-1 flex items-center justify-between gap-2">
                          <span className="text-xs text-ash-lilac font-mono">
                            {t.featureInHighlights}
                          </span>

                          <button
                            onClick={() => handleToggleFeaturedRepo(repo.name)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              isFeatured
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                : "bg-white/5 border border-white/10 text-ash-lilac hover:text-white hover:border-white/20"
                            }`}
                          >
                            <span>{isFeatured ? t.featuredBadge : t.featureToggle}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 10: SETTINGS                                         */}
            {/* ========================================================= */}
            {activeTab === "settings" && (
              <div className="space-y-6 w-full">
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">{t.settingsHeading}</h3>
                  <p className="text-sm text-ash-lilac pt-1">
                    {t.settingsSub}
                  </p>
                </div>

                <Card className="p-8 sm:p-9 rounded-3xl bg-[#0b041a] border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <div>
                      <h4 className="font-bold text-base text-white">{t.langDefault}</h4>
                      <span className="text-xs sm:text-sm text-ash-lilac">{t.langDefaultSub}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={lang === "th" ? "violet" : "outline"}
                        onClick={() => handleToggleLang("th")}
                        className="rounded-full text-xs sm:text-sm px-4 py-2 cursor-pointer"
                      >
                        ภาษาไทย (TH)
                      </Button>
                      <Button
                        size="sm"
                        variant={lang === "en" ? "violet" : "outline"}
                        onClick={() => handleToggleLang("en")}
                        className="rounded-full text-xs sm:text-sm px-4 py-2 cursor-pointer"
                      >
                        English (EN)
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
                    <div>
                      <h4 className="font-bold text-base text-white">{t.dbSync}</h4>
                      <span className="text-xs sm:text-sm text-ash-lilac">{t.dbSyncSub}</span>
                    </div>
                    <Badge variant="violet" className="text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30 px-3 py-1">
                      {t.operational}
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-base text-white">{t.sessionSec}</h4>
                      <span className="text-xs sm:text-sm text-ash-lilac">{t.sessionSecSub}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={handleLogout}
                      className="rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm font-semibold hover:bg-red-500/25 px-4 py-2 cursor-pointer"
                    >
                      {t.logoutSession}
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
