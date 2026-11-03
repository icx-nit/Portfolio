# Nittaya Pana Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `vercel-react-best-practices`, `frontend-design`, `ui-taste`, `responsive-design`, and `supabase-postgres-best-practices` to execute this plan.

**Goal:** Build a luxury editorial, responsive, full-stack personal developer portfolio for Nittaya Pana with an AI-powered portfolio assistant (rule-based + IR), contact delivery (Resend), visitor engagement (follow & like), GitHub integration, and Supabase PostgreSQL backend.

**Architecture:** Next.js App Router with TypeScript and Tailwind CSS. Client/Server separation following Vercel React best practices. Supabase PostgreSQL for persistence with Row Level Security (RLS). Next.js Route Handlers for privileged server-side integrations (Resend, GitHub REST API, visitor interaction tracking). Zero-cost rule-based and fuzzy retrieval for portfolio chatbot.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Supabase PostgreSQL & Auth, Resend, Fuse.js, GitHub REST API, Playwright.

---

## Developer Profile & Initial Data
- **Name:** Nittaya Pana
- **Role:** Software Developer / Software Engineer
- **Institution:** University of Phayao
- **Faculty / School:** School of Information and Communication Technology
- **Major:** Software Engineering
- **Email:** nittaya503555@gmail.com
- **GitHub:** https://github.com/icx-nit (Username: `icx-nit`)
- **Resume Access:** Public view and download allowed

---

## Visual Design Specification ("Clyde" Luxury Editorial)
- **Palette:**
  - Obsidian Canvas: `#000000` (Default background)
  - Bone Text & Borders: `#f6f6f4` (Primary typography and 1px hairline borders)
  - Slate: `#7d7d7d` (Muted elements and secondary surfaces)
  - Paper: `#ffffff` (Inner card containers / product spotlight)
  - Char: `#1a1a1a` (Subtle dark surface separation)
  - Solstice Gradient: `linear-gradient(90deg, #feed7a 0%, #ff8400 48.96%, #df91f7 100%)` (Reserved strictly for decorative 3D floating orb)
- **Typography:**
  - Display / Headings: Editorial Serif (`Recoleta`, fallback to `Canela`, `Georgia`, or system serif) with tight line-height (1.00 - 1.10) and negative tracking.
  - UI / Body: Grotesque Sans (`Oldschool Grotesk`, fallback to `Inter`, `system-ui`) with weights 300 (quiet secondary) and 400 (primary).
- **Geometry & Elevation:**
  - Flat surfaces, **zero box-shadows**.
  - 100px radius for interactive pills (buttons, tags, filter pills).
  - 16px radius for cards.
  - 4px radius for inputs.
  - 1px hairline border separation (`#f6f6f4` or `#1a1a1a`).

---

## Application Directory Structure (`u:\portfolio\AI-Portfolio/`)

```text
AI-Portfolio/
├── .agents/skills/              # Installed development skills
├── public/                      # Static assets, resume PDF, favicon, profile image
│   ├── images/
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts            # Non-paid IR chatbot API
│   │   │   ├── contact/route.ts         # Contact form submission + Resend
│   │   │   ├── github/route.ts          # GitHub REST API repository sync
│   │   │   └── interactions/
│   │   │       ├── follow/route.ts      # Visitor follow counter & toggle
│   │   │       └── like/route.ts        # Visitor like counter & toggle
│   │   ├── admin/                       # Owner administration dashboard
│   │   │   ├── login/page.tsx
│   │   │   └── page.tsx
│   │   ├── projects/[id]/page.tsx       # Dedicated project detail page
│   │   ├── layout.tsx                   # Root layout (fonts, metadata, theme)
│   │   ├── page.tsx                     # Main portfolio landing page
│   │   └── globals.css                  # Clyde design tokens & reset
│   ├── components/
│   │   ├── ui/                          # Reusable atomic UI components
│   │   │   ├── button.tsx               # 100px pill buttons (ghost & filled)
│   │   │   ├── card.tsx                 # 16px border-radius flat card
│   │   │   ├── badge.tsx                # 100px pill tech tag
│   │   │   ├── input.tsx                # 4px border-radius form inputs
│   │   │   ├── textarea.tsx
│   │   │   └── solstice-orb.tsx         # 3D gradient abstract hero atmosphere
│   │   ├── layout/
│   │   │   ├── navbar.tsx               # Minimalist transparent header
│   │   │   └── footer.tsx               # Clean editorial footer with social links
│   │   ├── sections/
│   │   │   ├── hero-section.tsx         # Recoleta display headline, bio, CTAs
│   │   │   ├── about-section.tsx        # Personal narrative & university details
│   │   │   ├── education-section.tsx    # University of Phayao timeline
│   │   │   ├── skills-section.tsx       # Categorized technical competencies
│   │   │   ├── projects-section.tsx     # Project showcase with filter pills
│   │   │   ├── stats-bar.tsx            # Hairline credibility row
│   │   │   └── contact-section.tsx      # Contact form with validation & states
│   │   ├── chat/
│   │   │   ├── chat-widget.tsx          # Floating chatbot trigger & drawer
│   │   │   ├── chat-messages.tsx        # Message history stream
│   │   │   └── suggested-questions.tsx  # Quick prompt pills
│   │   └── admin/                       # Owner dashboard UI modules
│   │       ├── dashboard-overview.tsx
│   │       ├── project-manager.tsx
│   │       ├── skills-manager.tsx
│   │       └── messages-viewer.tsx
│   ├── lib/
│   │   ├── chatbot/
│   │   │   ├── knowledge-base.ts        # Ground-truth portfolio data & chunks
│   │   │   ├── search-engine.ts         # Fuse.js / token matching engine
│   │   │   └── intent-classifier.ts     # Out-of-scope & intent detector
│   │   ├── supabase/
│   │   │   ├── client.ts                # Browser client
│   │   │   ├── server.ts                # Server-component client
│   │   │   └── admin.ts                 # Service-role privileged client
│   │   ├── github.ts                    # GitHub REST API fetcher
│   │   ├── email.ts                     # Resend notification helper
│   │   ├── visitor.ts                   # Client visitor ID cookie management
│   │   └── rate-limiter.ts              # In-memory / timestamp rate limiter
│   ├── types/
│   │   ├── portfolio.ts                 # Project, Education, Skill types
│   │   ├── database.ts                  # Supabase schema definitions
│   │   └── chat.ts                      # Chat message & response types
│   └── data/
│       └── portfolio-seed.ts            # Nittaya Pana factual portfolio seed
├── supabase/
│   └── schema.sql                       # PostgreSQL DDL, RLS policies, indexes
├── .env.example                         # Environment variable template
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## Step-by-Step Implementation Roadmap

### Phase 3: Project Foundation Setup
- [ ] Initialize Git repository in root and create `.gitignore` (ignoring `.env*`, `node_modules`, `.next`).
- [ ] Initialize Next.js project with TypeScript, Tailwind CSS, App Router, and ESLint in `AI-Portfolio/`.
- [ ] Install core dependencies: `clsx`, `tailwind-merge`, `lucide-react`, `fuse.js`, `zod`, `@supabase/supabase-js`, `@supabase/ssr`, `resend`.
- [ ] Configure `tailwind.config.ts` and `globals.css` with exact "Clyde" tokens (`obsidian`, `bone`, `slate`, `paper`, `char`, `solstice-gradient`).
- [ ] Build atomic components: `Button` (100px pill), `Card` (16px flat), `Input`/`Textarea` (4px), `SolsticeOrb` (atmospheric gradient graphic).
- [ ] Create `.env.example` with clear instructions.

### Phase 4: Public Portfolio Frontend
- [ ] Create `Navbar` (transparent luxury header, Nittaya Pana wordmark, navigation links, resume download pill).
- [ ] Create `HeroSection` (Recoleta display typography, Nittaya Pana title, Solstice gradient orb, ghost & filled buttons).
- [ ] Create `AboutSection` & `EducationSection` (University of Phayao, School of ICT, Major: Software Engineering).
- [ ] Create `SkillsSection` (Languages: JavaScript, TypeScript, Python, etc.; Frontend: React, Next.js, Tailwind; Backend: Node.js, REST APIs; Database: PostgreSQL, Supabase).
- [ ] Create `ProjectsSection` (Cards with live demo link, GitHub repo link, like counter, and detail view).
- [ ] Create `StatsBar` (Full-width hairline credibility strip with verified stats).
- [ ] Create `ContactSection` (Contact form, client-side validation with Zod, success & loading states).
- [ ] Create `Footer` (Social links, GitHub profile link `https://github.com/icx-nit`, copyright).
- [ ] Create `ChatWidget` (Floating toggle, conversational message list, suggested prompts, accurate non-paid responses).

### Phase 5: Backend, Database & Service Integrations
- [ ] Create `supabase/schema.sql` with tables: `profiles`, `education`, `skills`, `projects`, `project_images`, `resumes`, `follows`, `likes`, `contact_messages`, `github_repositories_cache`.
- [ ] Define comprehensive Row Level Security (RLS) policies allowing public read of portfolio data, public rate-limited write of interactions/messages, and owner-only administrative access.
- [ ] Build `/api/contact` route handler: server-side validation, Resend dispatch, Supabase message persistence.
- [ ] Build `/api/interactions/like` and `/api/interactions/follow` route handlers: visitor ID tracking and duplicate suppression.
- [ ] Build `/api/github` route handler: fetch public repos for `icx-nit` from GitHub REST API with caching.
- [ ] Build `/api/chat` route handler: Rule-Based + Information Retrieval over Nittaya Pana's verified knowledge base with fallback rejection for out-of-scope questions.

### Phase 6: Owner Administration Dashboard (`/admin`)
- [ ] Build owner authentication page (`/admin/login`) with Supabase Auth.
- [ ] Build owner dashboard overview (`/admin`): follower count, like count, recent contact messages.
- [ ] Build project and skills management interfaces.
- [ ] Add GitHub repository viewer and manual refresh action.

### Phase 7: Testing, Verification & Quality Assurance
- [ ] Run type checking (`rtk npm run type-check` or `rtk npx tsc --noEmit`).
- [ ] Run production build (`rtk npm run build`) to ensure zero bundling errors.
- [ ] Test responsive layouts across mobile (375px), tablet (768px), and desktop (1280px).
- [ ] Verify accessibility, keyboard focus indicators, and 44px min touch targets.
- [ ] Update `README.md` with full setup, local running instructions, and Vercel deployment guide.
