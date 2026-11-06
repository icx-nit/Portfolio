# AGENTS.md — Global AI Development Team Guidelines
# Project: Personal Portfolio & Live CMS Website (Nittaya Pana)

## 1. Project Overview & Identity

This project is the official **Personal Portfolio Website & Real-Time Content Management System (CMS)** for:

- **Developer / Designer**: Nittaya Pana (นิตยา ปานา) — Nickname: "Nit" / "Icx"
- **Professional Focus**: UX/UI Designer & Software Engineer
- **Academic Background**: Software Engineering (B.S.), School of Information and Communication Technology (ICT), University of Phayao (มหาวิทยาลัยพะเยา)
- **Primary Email**: `nittaya503555@gmail.com`
- **GitHub**: `https://github.com/icx-nit` (Repository: `icx-nit/Portfolio`)

### Core Mission & Objectives
1. Showcase Nittaya's real-world UX/UI design capabilities, design systems, wireframing, and usability research.
2. Demonstrate strong full-stack software development skills (Next.js 15, React 19, TypeScript, Tailwind CSS, API routes, Docker).
3. Provide recruiters and collaborators with verified academic history, skill matrices, resume downloads, and live contact channels.
4. Deliver an engaging, interactive user experience featuring a 3D tilted holographic intro card, live follower/like interactions, bilingual (TH/EN) localization, and an integrated AI portfolio chatbot.
5. Offer a private, secure, and intuitive Owner Admin Dashboard (`/admin`) allowing Nittaya to manage content dynamically without redeploying code.

---

## 2. Technology Stack & Source of Truth

The codebase is built strictly on modern, enterprise-grade web standards:

| Layer | Technologies | Key Responsibilities |
|---|---|---|
| **Frontend Framework** | **Next.js 15 (App Router)** & **React 19** | Server/Client components, dynamic routing, high-performance rendering |
| **Language** | **TypeScript 5** | Strict type safety, shared interfaces (`src/types/portfolio.ts`) |
| **Styling & Theme** | **Tailwind CSS v3** | Wope Cosmic Dark theme (`#0a0118`), violet/cyan horizon illumination |
| **Icons & UI Primitives** | **Lucide React**, Radix UI | Consistent iconography, accessible dialogs and controls |
| **Search Engine** | **Fuse.js** | Instant fuzzy search across skills, posts, and projects |
| **Data Synchronization** | **Dual-Tier CMS Sync** | Optimistic LocalStorage + disk store (`src/data/cms-store.json`) + Supabase |
| **AI Assistant** | **Knowledge-Based Assistant** | Fast, zero-cost portfolio Q&A for recruiters and visitors |
| **Deployment & Containers** | **Docker (Alpine 22)** & **Railway Cloud** | Multi-stage Docker build, zero-secret production deployment |

---

## 3. Architecture & Project Layout

All active source code resides within `AI-Portfolio/src`:

```
AI-Portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Public Single-Page Portfolio
│   │   ├── layout.tsx                   # Global Root Layout & Fonts
│   │   ├── admin/
│   │   │   ├── page.tsx                 # Owner CMS Dashboard (8 management tabs)
│   │   │   └── login/page.tsx           # Owner Authentication Guard
│   │   └── api/
│   │       ├── admin/content/route.ts   # CMS Data Persistence (cms-store.json)
│   │       ├── analytics/route.ts       # Followers & Page Reach Counter
│   │       ├── chat/route.ts            # AI Assistant Knowledge Service
│   │       ├── contact/route.ts         # Contact Form & Email Pipeline
│   │       ├── github/route.ts          # Live GitHub Repositories Fetcher
│   │       └── posts/route.ts           # Social Feed Posts & Likes
│   ├── components/
│   │   ├── layout/                      # Navbar, Footer, Language Switcher
│   │   ├── sections/                    # Hero, About, Skills, Feed, Contact
│   │   ├── intro/                       # 3D Holographic Intro Card
│   │   ├── chat/                        # Floating AI Chatbot Widget
│   │   └── ui/                          # Button, Card, Badge, ScrollReveal
│   ├── data/                            # profile.ts, posts.ts, portfolio-seed.ts, cms-store.json
│   ├── lib/                             # supabase client, chatbot engine, utils
│   └── types/                           # portfolio.ts type contracts
├── Dockerfile                           # Multi-stage production container
└── railway.json                         # Railway deployment configuration
```

---

## 4. AI Agent Roles & Rules of Engagement

When working on this project, the AI team acts across these primary responsibilities:

### 4.1 Software Architect & Full-Stack Engineer
- Maintain architectural integrity and avoid over-engineering.
- Maintain dual-tier persistence: modifications made in the Admin Dashboard must reflect immediately in memory/LocalStorage and persist safely to `src/data/cms-store.json`.
- Preserve Next.js 15 / React 19 compatibility; never downgrade core framework packages without explicit authorization.

### 4.2 UI/UX Designer & Accessibility Specialist
- Adhere strictly to [DESIGN.md](file:///u:/portfolio/DESIGN.md) (Wope Cosmic Dark violet horizon theme).
- Respect WCAG 2.1 AA accessibility guidelines (color contrast, keyboard focus rings, semantic tags).
- Guarantee responsive layouts across Desktop (1440px+), Laptop (1024px), Tablet (768px), and Mobile (375px+).
- Support smooth bilingual transitions (Thai and English) without layout shift or page reloads.

### 4.3 Security & Owner Access Rules
- **Single-Owner Enforcement**: The administrative dashboard (`/admin`) is strictly restricted to **`nittaya503555@gmail.com`**.
- All login flows in `admin/login/page.tsx` must lock the owner email field and verify authentication via Supabase Auth with fallback master passcodes.
- **Never reveal or commit secrets**: No API keys, passwords, or `.env*` files in Git commits or logs.

---

## 5. Development & Verification Workflow

Before reporting any task as completed:

1. **Read before edit**: Inspect existing components and maintain consistent styling and naming conventions.
2. **Execute changes via RTK**: Run CLI commands through `rtk` where applicable.
3. **Type Safety & Build Verification**:
   - Run `npx tsc --noEmit --project AI-Portfolio/tsconfig.json` to verify zero TypeScript errors.
   - Test responsive layout and verify that no console errors are thrown.
4. **Git Protocol**:
   - Never push or commit without explicit user permission.
   - Always review `git diff` before committing.

---

## 6. Content Authenticity Statement

All portfolio information (academic credentials, skills, projects, and contact channels) represents the genuine achievements of **Nittaya Pana (University of Phayao)**. AI agents must never fabricate fake testimonials, fake work history, or fictitious metrics.
