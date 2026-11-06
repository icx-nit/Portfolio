# PLAN.md — Personal Portfolio & Live CMS Implementation Plan
# Project: Nittaya Pana Portfolio Website

## 1. Project Vision & Goals

Develop and maintain an ultra-modern, interactive, responsive Personal Portfolio and Live CMS for **Nittaya Pana (นิตยา ปานา)**, Software Engineering student at University of Phayao, specializing in **UX/UI Design & Frontend Engineering**.

### Key Deliverables:
1. **Public Showcase**: Hero, 3D Tilted Holographic Intro, About Me, Academic Education (University of Phayao), Technical & Soft Skills Matrix, Interactive UX Social Feed with likes, and Contact Form.
2. **Interactive Engagements**: Live Follower counter with optimistic updates, post liking with local storage caching, live AI Assistant chatbot for answering questions about Nittaya, and dual-language (TH/EN) switcher.
3. **Owner Admin CMS (`/admin`)**: Single-owner administrative console with 8 management modules, real-time live reach analytics, post creator/editor, and JSON disk store sync.
4. **Cloud Production Deployment**: Multi-stage Alpine Docker container (`node:22-alpine`) configured for Railway Cloud and Vercel hosting.

---

## 2. Technical Stack Specifications

| Layer | Selected Technology | Implementation Detail |
|---|---|---|
| **Core Framework** | **Next.js 15.0.3 (App Router)** | Server Components, Turbopack, Route Handlers |
| **View Library** | **React 19** | Concurrent features, modern hooks (`useActionState`, `useOptimistic`) |
| **Language** | **TypeScript 5.x** | Fully typed domain entities (`src/types/portfolio.ts`) |
| **Styling** | **Tailwind CSS v3** | Custom design tokens: Violet Horizon `#0a0118`, `#713dff`, `#06b6d4` |
| **Icons & Micro-UI** | **Lucide React** | Consistent, lightweight SVG icon system |
| **Search Engine** | **Fuse.js** | Client-side fuzzy matching for skills and feed posts |
| **Persistence Engine** | **Dual-Tier State Architecture** | Tier 1: LocalStorage + BroadcastChannel<br>Tier 2: Node.js fs `cms-store.json` + Supabase |
| **Deployment** | **Docker & Railway** | Multi-stage build container with production runner |

---

## 3. Architecture & Functional Modules

### 3.1 Public Portfolio Modules (`src/app/page.tsx`)
- **Navigation (`Navbar`)**: Glassmorphic frosted bar with quick anchor jump links, language toggle (TH/EN), and Admin quick link.
- **Intro Experience (`IntroCard`)**: 3D tilted holographic welcome card with photo cutout, title, and smooth entrance/exit animation.
- **Hero Section (`HeroSection`)**: Punchy value proposition, live follower counter with instant Follow/Unfollow action, and dual CTAs (View Work / Contact).
- **About Section (`AboutSection`)**: Professional biography, University of Phayao education details, design philosophy, and verified social badges.
- **Skills Matrix (`SkillsSection`)**: Categorized into Hard Skills (Wireframing, Design Systems, Motion), Soft Skills (Responsibility, Continuous Learning), and Tools (Figma, VS Code, Canva, GitHub).
- **Social Feed (`FeedSection`)**: Feed of design progress updates, UX research notes, and design systems with real-time like buttons.
- **Contact Pipeline (`ContactSection`)**: Direct contact form sending messages to `nittaya503555@gmail.com` with API validation.
- **AI Chatbot (`ChatWidget`)**: Floating interactive assistant with knowledge base covering Nittaya's skills, education, projects, and contact channels.

### 3.2 Owner Administration Dashboard (`src/app/admin/page.tsx`)
Restricted to **`nittaya503555@gmail.com`** via `/admin/login`:
- **Module 1: Profile Manager**: Edit display name, title, bio, avatars, and social links.
- **Module 2: Education Manager**: Update degree, institution, and curriculum notes.
- **Module 3: Skills Controller**: Add, edit, reorder, and toggle visibility of skills.
- **Module 4: Posts & Feed CRUD**: Publish new design posts, edit existing text in Thai & English, and toggle publish status.
- **Module 5: Resume Manager**: Upload and manage active PDF resume versions.
- **Module 6: Contact Inbox**: View incoming visitor messages with unread notification badge.
- **Module 7: Analytics & Live Reach**: Track total followers, post likes, and page reach metrics.
- **Module 8: System Settings**: Manage session security and export JSON backups.

---

## 4. Implementation Roadmap & Milestones

### Phase 1: Foundation & Design System (COMPLETED)
- [x] Configure Next.js 15 App Router, TypeScript, and Tailwind CSS.
- [x] Implement Wope Cosmic Dark design tokens in `tailwind.config.ts`.
- [x] Build reusable UI primitives (`Button`, `Card`, `Badge`, `Input`, `ScrollReveal`).

### Phase 2: Public Sections & Interactive Features (COMPLETED)
- [x] Implement Hero, About, Skills, and Contact sections with full responsiveness.
- [x] Implement 3D tilted holographic intro card (`IntroCard`).
- [x] Build interactive Social Feed with optimistic liking and follower counter.
- [x] Build integrated knowledge-based AI Chatbot (`ChatWidget`).
- [x] Implement real-time bilingual language switcher (TH / EN).

### Phase 3: Owner Admin Dashboard & Storage Architecture (COMPLETED)
- [x] Build secure Owner Access portal (`/admin/login`) with single-owner lock for `nittaya503555@gmail.com`.
- [x] Build 8-tab administrative management console (`/admin`).
- [x] Implement dual-tier synchronization: instant LocalStorage + server disk persistence (`cms-store.json`).
- [x] Provide instant owner bypass and show/hide password helpers.

### Phase 4: Production Deployment & Containerization (COMPLETED)
- [x] Create multi-stage Alpine Dockerfile with Node.js 22.
- [x] Configure `railway.json` with Dockerfile builder.
- [x] Resolve Nixpacks build incompatibilities and ensure zero-downtime deploys.

### Phase 5: Continuous Maintenance & Content Enrichment (ACTIVE)
- [ ] Upload additional project case studies and Figma prototypes via Admin Dashboard.
- [ ] Connect custom domain on Railway/Cloudflare.
- [ ] Monitor analytics reach and recruiter interactions.
