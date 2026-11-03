# Nittaya Pana — AI-Powered Developer Portfolio

A modern, responsive, and full-stack personal developer portfolio built for **Nittaya Pana**, Software Engineering student at the School of Information and Communication Technology, University of Phayao.

Features the **"Clyde" luxury dark editorial aesthetic**, a zero-cost rule-based & Information Retrieval portfolio assistant, interactive visitor follow/like engagement, server-side contact delivery with Resend, GitHub REST API repository sync, and Supabase PostgreSQL persistence with Row Level Security (RLS).

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components & Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with bespoke "Clyde" tokens
- **Design System**: Flat surfaces, zero box-shadows, 1px hairline borders, 100px pill buttons, Recoleta display headlines, Solstice gradient 3D atmospheric orb
- **Database**: Supabase PostgreSQL with Row Level Security
- **Email Delivery**: Resend API
- **Chatbot**: Rule-Based + Information Retrieval (Fuse.js) with strict out-of-scope guardrails
- **External Integration**: GitHub REST API (`icx-nit`)
- **Deployment**: Vercel

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the following variables when ready:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
CONTACT_RECEIVER_EMAIL=nittaya503555@gmail.com
GITHUB_USERNAME=icx-nit
```
*(The website includes automatic resilient fallbacks for all APIs if external keys are not configured yet).*

### 3. Apply Supabase Database Schema
In your Supabase project SQL Editor, run the SQL script located at:
```bash
supabase/schema.sql
```
This sets up all 9 relational tables, indexes, and Row Level Security policies.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Type Checking
```bash
npm run type-check   # Verify TypeScript types
npm run build        # Build optimized production bundle
npm run start        # Start production server
```

---

## Portfolio Structure

- `/` — Main public portfolio landing page:
  - **Navigation**: Transparent luxury header with live follow counter and instant resume download.
  - **Hero**: Recoleta serif display headline, bio, Solstice gradient orb, and call-to-actions.
  - **Credibility Bar**: 4-column hairline stats strip.
  - **About Me**: University of Phayao Software Engineering background and architectural philosophy.
  - **Education**: Degree timeline and key engineering coursework.
  - **Skills**: Categorized technical competencies.
  - **Projects Showcase**: Interactive category filters, detailed modal views, live like counter, and GitHub source links.
  - **Contact Me**: Form with client/server validation, spam protection, and Resend email dispatch.
  - **AI Portfolio Assistant**: Floating chat widget powered by Fuse.js fuzzy retrieval answering visitor queries with zero hallucination.
- `/admin` — Owner administration dashboard:
  - Overview metrics (followers, likes, active projects, GitHub repos).
  - Project management view.
  - Skills category breakdown.
  - Public GitHub repository sync from `icx-nit` with manual refresh action.
  - Visitor contact message viewer.
