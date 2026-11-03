# Personal Portfolio Website

A modern, responsive, and interactive personal portfolio website with an owner dashboard, project management system, visitor interaction features, and a portfolio-focused chatbot.

The website is designed to showcase the owner's profile, education, skills, and projects while allowing visitors to explore the portfolio, interact with its content, and contact the owner.

---

## 1. Project Overview

This project is a full-stack personal portfolio website developed to present the owner's professional background, technical skills, and software development projects.

Unlike a traditional static portfolio, this website includes a backend system and an owner dashboard that allows the owner to manage portfolio content without directly modifying the source code.

The website also provides interactive features for visitors, including:

- A chatbot that answers questions about the owner's portfolio.
- A contact form that sends messages to the owner's email.
- Follow and Like features.
- A project showcase with detailed project information.
- A downloadable resume.
- Light and Dark mode.

### Main Objectives

- Showcase personal information and professional experience.
- Present projects in an organized and accessible way.
- Allow the owner to manage portfolio content through an admin dashboard.
- Provide an interactive experience for visitors.
- Demonstrate frontend, backend, database, API, and security development skills.

---

## 2. Main Features

### 2.1 Public Portfolio Website

Visitors can access the portfolio without creating an account or logging in.

Features include:

- **Home:** Introduction and personal profile.
- **About Me:** Personal introduction and background.
- **Education:** Academic history and qualifications.
- **Skills:** Technical and professional skills.
- **Projects:** Project gallery with descriptions, images, categories, and technology tags.
- **Resume:** View and download the owner's resume in PDF format.
- **GitHub:** Display public GitHub repositories.
- **Contact Me:** Submit messages directly to the owner.
- **Portfolio Chatbot:** Ask questions about the owner's background and projects.
- **Follow:** Follow the portfolio owner.
- **Like:** Like the portfolio and individual projects.
- **Theme:** Switch between Light and Dark mode.

### 2.2 Owner Dashboard

The owner can log in to a protected dashboard to manage portfolio information.

Dashboard modules include:

| Module | Description |
|---|---|
| Dashboard Overview | Display portfolio statistics and activity summaries. |
| Profile Management | Create and update personal information. |
| Education Management | Add, edit, and delete education records. |
| Skills Management | Manage technical and professional skills. |
| Project Management | Create, edit, and delete projects. |
| Resume Management | Upload, replace, and manage the resume PDF. |
| Contact Messages | View messages submitted by visitors. |
| Visitor Statistics | View follower and like counts. |
| GitHub Integration | View public GitHub repositories. |

Only the portfolio owner is authorized to access the dashboard and its management functions.

### 2.3 Contact Me System

Visitors can send messages through a contact form.

Required fields:

- Name
- Email
- Message

System behavior:

1. Validate the submitted information.
2. Save the message in the database.
3. Send an email notification to the owner.
4. Allow the owner to view submitted messages in the dashboard.

The first version does not require an integrated email inbox or an in-dashboard reply system. The owner can reply using their own email application.

### 2.4 Portfolio Chatbot

The chatbot helps visitors find information about the owner's portfolio through a normal chat interface.

**Important: The first version must not depend on paid OpenAI or Anthropic API services.**

Use a Rule-Based and Information Retrieval approach.

Expected behavior:

1. Receive a visitor's question.
2. Normalize the text and identify keywords or user intent.
3. Search approved public portfolio information.
4. Calculate a relevance score.
5. Return a predefined response based on the matching information.
6. If the question is unrelated to the portfolio or the search result is insufficient, return a fallback response.

The chatbot may answer questions about:

- Personal profile
- Education
- Technical skills
- Projects
- Work experience, if available
- Public resume information

The chatbot must not access or disclose:

- Owner login credentials
- Private dashboard information
- Contact messages
- Private database records
- Environment variables or API secrets

Possible search libraries include Fuse.js or MiniSearch. A custom keyword-matching solution is also acceptable.

The chatbot is not a generative AI assistant. It should prioritize accurate information and controlled responses rather than attempting to answer every question.

### 2.5 GitHub Integration

Display the owner's public GitHub repositories using the GitHub REST API.

Repository information may include:

- Repository name
- Description
- Programming language
- Repository URL
- Stars
- Forks

The system should support loading, empty, and error states and handle GitHub API rate limits.

Private repository access is optional and requires separate approval and secure authentication.

---

## 3. Technology Stack

The proposed technology stack is:

| Category | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js Route Handlers |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| File Storage | Supabase Storage |
| Email Service | Resend or another approved email provider |
| Chatbot | Rule-Based + Information Retrieval |
| Search Library | Fuse.js or MiniSearch |
| External API | GitHub REST API |
| Deployment | Vercel |
| Version Control | Git and GitHub |

The technology stack may be adjusted when necessary, but changes must be discussed and approved before implementation.

Always check free-tier limitations, usage quotas, and potential costs before enabling external services.

Do not activate paid services without the owner's approval.

---

## 4. Database Overview

The database is expected to support the following tables:

| Table | Purpose |
|---|---|
| profiles | Owner profile information |
| education | Education records |
| skills | Technical and professional skills |
| projects | Portfolio projects |
| project_images | Project images |
| resumes | Resume file information |
| follows | Visitor follow records |
| likes | Portfolio and project likes |
| contact_messages | Messages submitted by visitors |
| github_repositories_cache | Cached public GitHub repository data |

The database must be designed with appropriate relationships, constraints, indexes, and access policies.

Supabase Row Level Security (RLS) must be configured to protect private information and restrict unauthorized operations.

---

## 5. User Roles and Permissions

### Visitor

Visitors do not need to log in.

They can:

- View public portfolio information.
- View projects.
- View and download the resume.
- Follow the owner.
- Like the portfolio and projects.
- Submit contact messages.
- Use the portfolio chatbot.
- View public GitHub repositories.
- Switch between Light and Dark mode.

Visitors cannot:

- Access the owner dashboard.
- Create, edit, or delete portfolio content.
- View private messages.
- Modify owner information.

### Owner

The owner has administrative permissions.

They can:

- Log in to the dashboard.
- Manage profile information.
- Manage education and skills.
- Create, edit, and delete projects.
- Upload and manage the resume.
- View contact messages.
- View visitor interaction statistics.
- View GitHub repository information.

All owner-only operations must be protected by server-side authentication and authorization.

Hiding dashboard elements in the frontend is not sufficient security.

---

## 6. Project Structure

The proposed project structure is:

```text
my-portfolio/
├── AGENTS.md
├── GEMINI.md
├── PLAN.md
├── DESIGN.md
├── README.md
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── admin/
│   │   ├── login/
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   ├── features/
│   │   ├── profile/
│   │   ├── education/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── resume/
│   │   ├── contact/
│   │   ├── follow/
│   │   ├── likes/
│   │   ├── chatbot/
│   │   └── github/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── email/
│   │   ├── chatbot/
│   │   └── github/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── data/
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── .env.example
├── .env.local
├── .gitignore
└── package.json
```

This structure is a proposed organization. The actual structure should be adjusted according to the implementation while maintaining clear separation of responsibilities.

---

## 7. Installation and Setup

### Prerequisites

Before starting, install:

- Node.js (LTS version)
- npm
- Git
- Visual Studio Code or another code editor
- A GitHub account
- A Supabase account

### Step 1: Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### Step 2: Open the Project

```bash
cd my-portfolio
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=

GITHUB_USERNAME=

OWNER_EMAIL=
```

Important:

- Never commit `.env.local` to Git.
- Never expose secret keys in frontend code.
- Only use `NEXT_PUBLIC_` for values that are intentionally public.
- Keep `.env.example` updated with variable names but without real secret values.
- Adjust environment variable names according to the actual provider configuration.

### Step 5: Start the Development Server

```bash
npm run dev
```

Open the following address in your browser:

```text
http://localhost:3000
```

Available scripts depend on the actual `package.json` configuration.

---

## 8. Development Guidelines

The project should follow these development principles:

1. Use TypeScript for type safety.
2. Build reusable components.
3. Separate frontend, backend, and database responsibilities.
4. Follow a feature-based folder structure.
5. Validate all user inputs on the server.
6. Protect owner-only routes and APIs.
7. Use environment variables for secrets and configuration.
8. Avoid unnecessary dependencies.
9. Write readable, maintainable, and reusable code.
10. Test features before considering them complete.
11. Keep the interface responsive across desktop, tablet, and mobile.
12. Use the database as the source of truth for dynamic portfolio content.

The `src/data/` directory should only contain static configuration, initial seed data, or shared reference data. Dynamic portfolio content must be retrieved from the database after integration.

---

## 9. Security Requirements

Security is an essential part of this project.

The implementation must include:

- Server-side authentication and authorization.
- Supabase Row Level Security (RLS).
- Input validation and sanitization.
- API rate limiting.
- Secure handling of environment variables.
- Protection against unauthorized database operations.
- Visitor ID or session-based duplicate interaction prevention.
- Proper error handling without exposing sensitive information.

Follow and Like features should prevent repeated interactions from the same stored visitor identity.

However, a browser-based visitor ID cannot guarantee one interaction per real person. Clearing browser storage or using another device may create a new identity.

Contact and chatbot APIs must also have appropriate rate limits to reduce abuse.

---

## 10. Development Roadmap

Development should follow these phases:

| Phase | Description |
|---|---|
| Phase 0 | Requirement analysis and project planning |
| Phase 1 | Project initialization and environment setup |
| Phase 2 | Core UI components and public website layout |
| Phase 2.5 | Database and authentication integration |
| Phase 2.6 | Visitor interactions, contact system, chatbot, and theme |
| Phase 3 | Owner dashboard and content management |
| Phase 4 | Connect public portfolio pages to database |
| Phase 5 | Chatbot implementation and testing |
| Phase 6 | Security testing and quality assurance |
| Phase 7 | Responsive design and performance optimization |
| Phase 8 | Deployment and documentation |

Each phase should be tested and reviewed before moving to the next phase.

Do not implement the entire project in one step.

---

## 11. Testing and Acceptance Criteria

The project is considered ready when:

- Public pages display the correct portfolio information.
- The website works on desktop, tablet, and mobile.
- Visitors can view projects and download the resume.
- The contact form validates and saves messages correctly.
- Email notifications are sent successfully when the email service is configured.
- The chatbot answers supported portfolio questions and rejects unrelated questions.
- Follow and Like features work correctly and prevent duplicate interactions for the same visitor identity.
- The owner can log in and manage portfolio content.
- Unauthorized users cannot access owner-only APIs or dashboard data.
- GitHub public repositories are displayed correctly.
- Light and Dark modes work correctly.
- Database security policies are configured.
- No secret keys are exposed in frontend code.
- The project can be deployed successfully.

---

## 12. Documentation

The following files provide project documentation and development instructions:

| File | Purpose |
|---|---|
| AGENTS.md | General rules and instructions for AI coding agents |
| GEMINI.md | Additional instructions and context for Gemini-based agents |
| PLAN.md | Project requirements, features, and development roadmap |
| DESIGN.md | UI/UX guidelines, visual design, colors, typography, and layout |
| README.md | Project overview, setup instructions, technology stack, and usage |

All documentation should remain consistent.

When project requirements or implementation decisions change, update the relevant documentation files.

---

## 13. Important Instructions for AI Agents

Before implementing any feature:

1. Read `AGENTS.md`, `GEMINI.md`, `PLAN.md`, and `DESIGN.md`.
2. Understand the existing project structure.
3. Review the requirements and development phase.
4. Explain the implementation approach before making major architectural changes.
5. Implement only the requested phase or task.
6. Avoid changing unrelated files.
7. Do not invent personal information, project details, or credentials.
8. Do not use paid APIs or services without explicit approval.
9. Do not expose private information or secrets.
10. Report completed work, changed files, and remaining issues.

The AI agent should prioritize maintainability, security, correctness, and clear explanations over generating large amounts of code quickly.

---

## 14. Project Status

**Current Status:** Planning and Initial Setup

**Project Type:** Full-Stack Personal Portfolio Website

**Primary Goal:** Build a professional portfolio with interactive visitor features and a secure owner dashboard.

**Development Approach:** Step-by-step implementation with testing and review after each phase.