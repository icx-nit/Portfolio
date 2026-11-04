# PLAN.md — Personal Portfolio Website

## 1. Project Overview

### 1.1 Project Name

Personal Portfolio Website with Admin Dashboard and Interactive Social Feed.

### 1.2 Project Description

Develop a modern, responsive, full-stack personal portfolio website that allows visitors to explore the owner's profile, educational background, projects, technical skills, resume, and social posts.

The website will also provide interactive features such as following the portfolio owner, liking posts and projects, contacting the owner through an email form, and asking questions through a free, knowledge-based chatbot.

The owner will have access to a secure Admin Dashboard where they can manage all website content, including profile information, education, projects, posts, resume files, contact messages, and GitHub repositories.

### 1.3 Access Permissions

The website must support two types of users:

**Public Visitors**
- Anyone can access and view the portfolio without logging in.
- Visitors can view public posts, projects, profile information, education, and skills.
- Visitors can follow the owner.
- Visitors can like the portfolio, posts, and individual projects.
- Visitors can contact the owner.
- Visitors can interact with the portfolio chatbot.
- Visitors can download the owner's resume.
- Visitors cannot create, edit, or delete any content.
- Visitors cannot comment on posts or projects.

**Portfolio Owner (Administrator)**
- Only the owner can log in.
- The owner must authenticate before accessing the Admin Dashboard.
- The owner can manage all portfolio content.
- The owner can create, edit, and delete posts.
- The owner can manage projects, profile information, education, and resume files.
- The owner can view contact messages, followers, and likes.
- The owner can view GitHub repositories from the Admin Dashboard.

Important: The public portfolio must remain accessible without authentication. Authentication is required only for the owner's administrative area.

---

## 2. Technology Stack

Use the following technologies as the primary development stack.

| Category | Technology | Responsibility |
|---|---|---|
| Frontend | Next.js | Main web framework |
| Language | TypeScript | Application development |
| Styling | Tailwind CSS | Responsive styling and layouts |
| UI Components | React | Reusable interface components |
| Backend | Next.js Route Handlers | Server-side logic and APIs |
| Database | Supabase PostgreSQL | Store website data |
| Authentication | Supabase Auth | Owner authentication |
| File Storage | Supabase Storage | Store images and PDF files |
| Email | Resend | Contact notifications |
| Chatbot | Rule-Based + Information Retrieval | Free knowledge-based chatbot |
| GitHub Integration | GitHub REST API | Retrieve repository information |
| Deployment | Vercel | Website hosting |
| Version Control | Git / GitHub | Source code management |

### 2.1 Important Technology Requirements

- Use TypeScript throughout the project.
- Use Next.js App Router.
- Use reusable React components.
- Use Tailwind CSS for consistent styling.
- Use Supabase as the primary database and storage service.
- Use server-side authentication and authorization.
- Do not expose API keys or sensitive environment variables to the browser.
- Avoid unnecessary paid services.
- Prefer free-tier services where practical.
- Check service limits and pricing before integrating external services.

---

## 3. Website Structure and Main Features

### 3.1 Public Website

The public website must contain the following sections:

1. Home / Social Feed
2. About Me
3. Education
4. Skills
5. Projects
6. Resume
7. Contact Me
8. Chatbot

The website must be responsive and support desktop, tablet, and mobile devices.

### 3.2 Home Page — Social Feed

The homepage will function as a personal social feed.

The owner can publish posts containing:

- Text content.
- One or multiple images.
- Publication date.
- Optional post categories or tags.
- Like count.

Visitors can:

- View all published posts.
- Like and unlike posts.
- View the number of likes.
- Open images.
- View publication dates.

Visitors cannot:

- Create posts.
- Edit posts.
- Delete posts.
- Comment on posts.
- Reply to other users.
- Upload content.

Only the owner can create, edit, and delete posts through the Admin Dashboard.

The feed should have a clean social-media-inspired layout without unnecessary social networking features.

### 3.3 About Me — Owner Profile

The owner must be able to manage:

- Display name.
- Professional title or career interests.
- Short personal introduction.
- Profile picture.
- Optional additional profile information.

The information must be editable through the Admin Dashboard.

### 3.4 Education

The owner can add, edit, and delete educational records.

Each education record should contain:

- Institution name.
- Major or field of study.
- Start year.
- Graduation year or expected graduation year.
- Optional description.

Default major: Software Engineering.

The default value must be editable.

### 3.5 Skills

Display the owner's technical skills in organized categories, such as:

- Programming Languages.
- Frontend Development.
- Backend Development.
- Database.
- Tools and Technologies.
- Other Technical Skills.

The owner must be able to add, edit, and delete skills through the Dashboard.

### 3.6 Projects

Display projects in a structured project gallery.

Each project should contain:

- Project name.
- Short description.
- Detailed description.
- Project images.
- Technology tags.
- Project category.
- GitHub repository URL.
- Live demo URL (optional).
- Publication or creation date.
- Like count.

Visitors can:

- View project cards.
- Open project details.
- Like individual projects.
- Visit the project's GitHub repository.
- Open the live demo when available.

Important: Visitors must be able to click the GitHub link to view the actual source code and repository on GitHub.

The owner can:

- Create projects.
- Edit project information.
- Upload and replace project images.
- Delete projects.

### 3.7 Resume

The owner can:

- Upload a resume in PDF format.
- Replace the existing resume.
- Delete the resume.
- Manage the currently published resume.

Visitors can:

- View the resume information.
- Download the latest published PDF.

Only the owner can upload, replace, or delete resume files.

### 3.8 Contact Me

Provide a contact form with three required fields:

1. Name.
2. Email.
3. Message.

Requirements:

- Validate all input fields.
- Validate email format.
- Sanitize user input.
- Save contact messages in Supabase.
- Send an email notification to the owner using Resend.
- Display success and error messages.
- Prevent spam through server-side rate limiting.
- Do not expose email service credentials to the client.

The owner must be able to view submitted messages through the Admin Dashboard.

The owner can respond to messages through their normal email account.

### 3.9 Follow System

Visitors can follow the portfolio owner without logging in.

Requirements:

- Provide a Follow / Following button.
- Display the total follower count.
- Allow visitors to follow and unfollow.
- Store visitor identification using a persistent anonymous visitor ID.
- Enforce one active follow per visitor.
- Validate all follow requests on the server.
- Apply rate limiting to prevent abuse.

The system must not require visitor registration.

### 3.10 Like System

Visitors can like the following items:

- Main portfolio.
- Individual social posts.
- Individual projects.

Requirements:

- Display the number of likes for each item.
- Allow visitors to like and unlike.
- Store anonymous visitor identification.
- Enforce one active like per visitor per item.
- Prevent duplicate active likes.
- Apply server-side validation and rate limiting.

There must be no comment or discussion system.

Note: Anonymous visitor identification is a best-effort mechanism. It cannot completely prevent abuse through browser data resets or identity changes.

### 3.11 Language Switching

The website must support two languages:

- Thai (TH).
- English (EN).

Requirements:

- Provide a language switcher in the website navigation.
- Allow visitors to switch between Thai and English.
- Translate interface elements, navigation, buttons, labels, validation messages, and system notifications.
- Support Thai and English content in the chatbot.
- Store the selected language in localStorage.
- Remember the selected language when visitors return.
- Use English as the default language unless another preference is detected.

The website must not automatically translate user-generated content incorrectly. Owner-created content should support language-specific versions where appropriate.

### 3.12 Dark Mode and Light Mode

Requirements:

- Support Dark Mode and Light Mode.
- Follow the operating system preference on the first visit.
- Allow visitors to switch themes manually.
- Store the selected theme in localStorage.
- Remember the selected theme on subsequent visits.
- Ensure all components remain readable in both themes.

---

## 4. Free Knowledge-Based Chatbot

### 4.1 Objective

Implement a chatbot that can answer questions about the portfolio owner's information without using paid AI APIs.

Do not use:

- OpenAI API.
- Anthropic API.
- Other paid generative AI APIs.

Use a combination of:

- Rule-Based Responses.
- Information Retrieval.
- Keyword Matching.
- Text Search.
- Relevance Scoring.
- Predefined Response Templates.

The chatbot must retrieve information from the website's public content.

### 4.2 Supported Knowledge Sources

The chatbot can answer questions based on:

- Owner profile.
- Personal introduction.
- Education.
- Technical skills.
- Projects.
- Project descriptions.
- Resume information.
- Public portfolio information.

The chatbot should retrieve the latest published information from the database instead of relying on outdated hardcoded content.

### 4.3 Chatbot Behavior

Examples of supported questions:

- Who is the portfolio owner?
- What is the owner's educational background?
- What programming languages does the owner know?
- What projects has the owner developed?
- What technologies were used in a particular project?
- Where can I view the owner's GitHub?
- How can I contact the owner?

The chatbot must:

1. Analyze the visitor's question.
2. Identify relevant keywords and topics.
3. Search the available portfolio information.
4. Calculate a relevance score.
5. Return a response using retrieved information.
6. Provide related project links when applicable.
7. Refuse questions that are unrelated to the portfolio.

Example refusal:

"I'm sorry, I can only answer questions related to the portfolio owner's profile, education, skills, projects, and contact information."

### 4.4 Language Support

- Support Thai and English questions.
- Detect the language of the visitor's question.
- Return answers in the same language when possible.
- Use predefined Thai and English response templates.
- Support Thai and English keyword dictionaries.

### 4.5 Chatbot Limitations

The chatbot must not:

- Answer general knowledge questions.
- Answer unrelated personal questions.
- Invent information that does not exist in the portfolio.
- Generate unsupported technical claims.
- Pretend to have information that cannot be retrieved.
- Access private Dashboard information.
- Reveal contact messages or administrative information.

### 4.6 Cost and Performance

- No paid AI API is required.
- All retrieval and response generation must run through the application's own server.
- Use lightweight search and matching algorithms.
- Cache frequently requested public information when appropriate.
- Apply server-side rate limiting.
- Keep the implementation modular so a future AI integration can be added if explicitly approved.

Important: This chatbot is a deterministic retrieval-based assistant, not a full generative AI model. Its answers will be limited to the available portfolio information.

---

## 5. Admin Dashboard

### 5.1 Authentication

Only the portfolio owner can access the Admin Dashboard.

Use Supabase Auth.

Requirements:

- Owner login using email and password.
- Secure session management.
- Protected Dashboard routes.
- Server-side authorization.
- Logout functionality.
- Secure password handling.
- Prevent public registration.

Do not rely on hiding Dashboard buttons or frontend route protection alone.

Every administrative API endpoint must verify the authenticated owner's identity and authorization on the server.

Unauthorized requests must return HTTP 401 or 403.

### 5.2 Dashboard Overview

The Dashboard should display:

- Total followers.
- Total portfolio likes.
- Total post likes.
- Total project likes.
- Total published posts.
- Total projects.
- New contact messages.
- GitHub repository overview.

### 5.3 Profile Management

The owner can:

- Edit display name.
- Edit professional title.
- Edit personal introduction.
- Upload a profile picture.
- Replace the profile picture.
- Delete or update the profile picture.

### 5.4 Education Management

The owner can:

- Add education records.
- Edit education records.
- Delete education records.

### 5.5 Skills Management

The owner can:

- Add skills.
- Edit skills.
- Delete skills.
- Organize skills by category.

### 5.6 Post Management

The owner can:

- Create new posts.
- Write text content.
- Upload one or multiple images.
- Edit existing posts.
- Delete posts.
- Publish or unpublish posts.
- View post publication dates.
- View post likes.

Only the owner can manage posts.

### 5.7 Project Management

The owner can:

- Add projects.
- Edit project information.
- Upload project images.
- Manage technology tags.
- Add GitHub repository URLs.
- Add live demo URLs.
- Delete projects.
- View project likes.

### 5.8 Resume Management

The owner can:

- Upload PDF files.
- Replace the current PDF.
- Delete old files.
- Set the currently published resume.

Validate file types and file sizes on the server.

### 5.9 Contact Message Management

The owner can:

- View all contact messages.
- View sender names.
- View sender email addresses.
- Read message content.
- View submission dates.
- Mark messages as read or unread.
- Delete messages.

The owner can reply through their normal email account.

### 5.10 GitHub Repository Management

Integrate GitHub REST API into the Admin Dashboard.

The owner should be able to:

- Connect or configure their GitHub account.
- View public repositories.
- View repository names.
- View repository descriptions.
- View programming languages.
- View repository URLs.
- View stars and forks.
- View last updated dates.
- Open repositories directly on GitHub.
- Refresh repository information.

Requirements:

- Use public repository data where possible.
- Keep GitHub tokens on the server if authentication is necessary.
- Never expose private GitHub tokens to the browser.
- Cache repository information to reduce unnecessary API requests.
- Handle GitHub API rate limits.
- Do not automatically publish repositories as portfolio projects.

The owner must manually select which repositories should appear in the public Projects section.

---

## 6. Database and Storage Architecture

Use Supabase PostgreSQL as the primary database.

### 6.1 Suggested Database Tables

| Table | Purpose |
|---|---|
| profiles | Owner profile information |
| education | Educational records |
| skills | Technical skills |
| projects | Portfolio projects |
| posts | Social feed posts |
| post_images | Images attached to posts |
| follows | Anonymous visitor follow records |
| likes | Portfolio, post, and project likes |
| contact_messages | Contact form submissions |
| resumes | Published resume information |

Additional tables may be introduced when necessary.

### 6.2 Database Requirements

- Use UUID primary keys where appropriate.
- Define foreign key relationships.
- Add appropriate indexes.
- Add unique constraints to prevent duplicate active likes and follows.
- Use timestamps for created_at and updated_at.
- Use database constraints to protect data integrity.
- Use migrations for database changes.

### 6.3 Storage Buckets

Create appropriate Supabase Storage buckets for:

- Profile images.
- Project images.
- Post images.
- Resume PDF files.

Storage requirements:

- Validate file types.
- Validate file sizes.
- Restrict uploads to the owner.
- Allow public reading only for intended public assets.
- Protect private files when necessary.
- Delete unused files when their associated records are deleted.

### 6.4 Row Level Security (RLS)

Enable Row Level Security for all relevant tables.

Policies must ensure:

- Public visitors can only read published public content.
- Public visitors cannot modify portfolio content.
- Only the authenticated owner can create, update, and delete administrative content.
- Anonymous visitors can interact with Follow and Like through validated server-side operations.
- Contact messages cannot be publicly retrieved.
- Administrative information remains private.

Never rely on frontend restrictions as the primary security mechanism.

---

## 7. Development Phases

Development must be completed in the following order.

Each phase must be tested and verified before moving to the next phase.

### Phase 1 — Project Setup and Environment

- [x] Initialize the Next.js project.
- [x] Configure TypeScript.
- [x] Configure Tailwind CSS.
- [x] Configure ESLint and code formatting.
- [x] Set up the App Router structure.
- [x] Create the initial folder structure.
- [x] Configure environment variables.
- [x] Set up Git and GitHub.
- [x] Create the initial README.md.
- [x] Verify that the project runs successfully.

### Phase 2 — UI Design and Core Components

- [x] Design the website layout.
- [x] Create the navigation bar.
- [x] Create the footer.
- [x] Create reusable UI components.
- [x] Build the homepage layout.
- [x] Build the social feed layout.
- [x] Build the profile section.
- [x] Build the education section.
- [x] Build the skills section.
- [x] Build the project gallery.
- [x] Build the contact section.
- [x] Build the chatbot interface.
- [x] Implement responsive layouts.
- [x] Implement dark mode and light mode.
- [x] Implement Thai and English language switching.

At this stage, use temporary sample data where necessary.

### Phase 2.5 — Database, Authentication, and Storage

Before implementation, the AI Agent must:

- [ ] Present the required external services.
- [ ] Explain the purpose of each service.
- [ ] Explain free-tier limitations and possible costs.
- [ ] Present the proposed database schema.
- [ ] Present the storage configuration.
- [ ] Request explicit approval before connecting external services.

After approval:

- [ ] Configure Supabase.
- [ ] Create database tables.
- [ ] Configure relationships and indexes.
- [ ] Configure Row Level Security.
- [ ] Configure Supabase Storage.
- [ ] Configure Supabase Auth.
- [ ] Create the owner's login system.
- [ ] Disable public registration.
- [ ] Implement secure session management.
- [ ] Protect administrative routes on the server.
- [ ] Create API routes for administrative operations.
- [ ] Test authentication and authorization.

### Phase 2.6 — Public Visitor Features

- [ ] Implement the Follow system.
- [ ] Implement portfolio likes.
- [ ] Implement post likes.
- [ ] Implement project likes.
- [ ] Implement anonymous visitor identification.
- [ ] Prevent duplicate active likes and follows.
- [ ] Implement server-side rate limiting.
- [ ] Implement the Contact Me form.
- [ ] Save contact messages to Supabase.
- [ ] Integrate Resend for email notifications.
- [ ] Implement input validation and sanitization.
- [ ] Implement the free Rule-Based chatbot.
- [ ] Implement Information Retrieval.
- [ ] Implement relevance scoring and refusal behavior.
- [ ] Implement Thai and English chatbot responses.
- [ ] Test public access and visitor permissions.

### Phase 3 — Admin Dashboard

- [ ] Create the Admin Dashboard layout.
- [ ] Implement the Dashboard overview.
- [ ] Implement profile management.
- [ ] Implement education management.
- [ ] Implement skills management.
- [ ] Implement post creation.
- [ ] Implement post editing.
- [ ] Implement post deletion.
- [ ] Implement image uploads.
- [ ] Implement project management.
- [ ] Implement resume upload and deletion.
- [ ] Implement contact message management.
- [ ] Display follower statistics.
- [ ] Display portfolio, post, and project likes.
- [ ] Integrate GitHub REST API.
- [ ] Display GitHub repositories.
- [ ] Implement logout.
- [ ] Verify all administrative operations on the server.

### Phase 4 — Database Integration and Dynamic Content

Replace temporary sample data and static content with database-driven content.

- [ ] Connect the public profile section to Supabase.
- [ ] Connect education data to Supabase.
- [ ] Connect skills data to Supabase.
- [ ] Connect projects to Supabase.
- [ ] Connect social posts to Supabase.
- [ ] Connect likes and follows to Supabase.
- [ ] Connect contact messages to Supabase.
- [ ] Connect resume information to Supabase.
- [ ] Connect the chatbot to published portfolio data.
- [ ] Implement loading states.
- [ ] Implement empty states.
- [ ] Implement error handling.
- [ ] Verify that content updates appear on the public website.

The `/data` directory must only contain initial seed data, shared constants, schemas, and TypeScript types when appropriate.

It must not be used as the permanent database for dynamic website content.

### Phase 5 — GitHub Integration

- [ ] Configure GitHub REST API.
- [ ] Retrieve public repository information.
- [ ] Display repository details in the Dashboard.
- [ ] Handle API errors and rate limits.
- [ ] Implement repository refresh.
- [ ] Allow the owner to select repositories for portfolio projects.
- [ ] Verify that public visitors can open the selected GitHub repositories.

### Phase 6 — Security and Validation

- [ ] Verify authentication.
- [ ] Verify server-side authorization.
- [ ] Verify Supabase RLS policies.
- [ ] Verify file upload permissions.
- [ ] Validate file types and file sizes.
- [ ] Sanitize user inputs.
- [ ] Prevent SQL injection through safe database operations.
- [ ] Prevent XSS through proper output handling.
- [ ] Implement rate limiting.
- [ ] Protect API routes.
- [ ] Verify environment variables are not exposed.
- [ ] Verify that private contact messages cannot be accessed publicly.
- [ ] Verify that visitors cannot modify website content.
- [ ] Test unauthorized API requests.

### Phase 7 — Testing and Quality Assurance

- [ ] Test public website navigation.
- [ ] Test responsive layouts.
- [ ] Test Thai and English switching.
- [ ] Test dark mode and light mode.
- [ ] Test Follow and Like functionality.
- [ ] Test duplicate interaction prevention.
- [ ] Test Contact Me submission.
- [ ] Test email notifications.
- [ ] Test chatbot supported questions.
- [ ] Test chatbot refusal behavior.
- [ ] Test project GitHub links.
- [ ] Test resume downloads.
- [ ] Test Dashboard authentication.
- [ ] Test CRUD operations.
- [ ] Test image and PDF uploads.
- [ ] Test GitHub integration.
- [ ] Test loading and error states.
- [ ] Fix all critical bugs.

### Phase 8 — Deployment and Final Verification

- [ ] Configure production environment variables.
- [ ] Configure Supabase production settings.
- [ ] Configure Resend production settings.
- [ ] Configure Vercel deployment.
- [ ] Deploy the website.
- [ ] Verify the public website.
- [ ] Verify owner login.
- [ ] Verify Dashboard permissions.
- [ ] Verify database connections.
- [ ] Verify file storage.
- [ ] Verify email notifications.
- [ ] Verify GitHub integration.
- [ ] Verify chatbot functionality.
- [ ] Run final security checks.
- [ ] Update README.md.
- [ ] Document deployment and maintenance procedures.

---

## 8. Security Requirements

Security must be considered throughout the entire development process.

### 8.1 Authentication and Authorization

- Only the owner can authenticate.
- Public registration must be disabled.
- All Dashboard routes must be protected.
- Every administrative API request must verify the owner session on the server.
- Never trust client-side role information.
- Unauthorized requests must return HTTP 401 or 403.

### 8.2 Environment Variables

Store secrets in `.env.local` during development and configure production secrets through the deployment platform.

Never commit sensitive files to Git.

Examples of protected variables:

- Supabase service role key.
- Resend API key.
- GitHub personal access token.
- Authentication secrets.

Never expose server-only variables through `NEXT_PUBLIC_` prefixes.

### 8.3 API Security

- Validate all incoming requests.
- Sanitize user-provided data.
- Apply rate limiting.
- Use secure database operations.
- Verify authorization before performing administrative actions.
- Return only the information required by the client.
- Avoid exposing internal error details.

### 8.4 File Upload Security

- Allow only approved file formats.
- Validate MIME types and file extensions.
- Enforce upload size limits.
- Restrict upload operations to the owner.
- Use safe file naming.
- Prevent unauthorized file deletion.

---

## 9. Acceptance Criteria

The project is considered complete only when all the following conditions are satisfied.

### Public Website

- [ ] Anyone can access the public portfolio without logging in.
- [ ] Visitors can view the owner's profile and education.
- [ ] Visitors can view technical skills and projects.
- [ ] Visitors can view published social posts.
- [ ] Visitors can open project GitHub repositories.
- [ ] Visitors can download the published resume.
- [ ] Visitors can follow the owner.
- [ ] Visitors can like the portfolio, posts, and projects.
- [ ] Duplicate active likes and follows are prevented.
- [ ] Visitors cannot create, edit, or delete content.
- [ ] Visitors cannot comment on posts.
- [ ] Visitors can submit the Contact Me form.
- [ ] The chatbot answers only portfolio-related questions.
- [ ] The chatbot refuses unrelated questions.
- [ ] Thai and English language switching works.
- [ ] Dark mode and light mode work.
- [ ] Selected language and theme preferences persist after refreshing.

### Admin Dashboard

- [ ] Only the owner can log in.
- [ ] Only the owner can access the Dashboard.
- [ ] Unauthenticated administrative API requests return HTTP 401 or 403.
- [ ] The owner can manage profile information.
- [ ] The owner can manage education and skills.
- [ ] The owner can create, edit, and delete posts.
- [ ] The owner can manage projects.
- [ ] The owner can upload, replace, and delete resume files.
- [ ] The owner can view contact messages.
- [ ] The owner can view follower and like statistics.
- [ ] The owner can view GitHub repositories.

### Backend and Security

- [ ] Dynamic content is stored in Supabase.
- [ ] Database access is protected by appropriate RLS policies.
- [ ] File uploads are restricted to the owner.
- [ ] Contact messages are stored successfully.
- [ ] Email notifications are delivered successfully.
- [ ] Rate limiting is implemented.
- [ ] No secret API keys are exposed in client-side code.
- [ ] No unauthorized user can modify portfolio data.

### Chatbot

- [ ] No paid AI API is required.
- [ ] The chatbot retrieves information from published portfolio content.
- [ ] The chatbot supports Thai and English.
- [ ] The chatbot does not invent information.
- [ ] The chatbot refuses unrelated questions.
- [ ] The chatbot cannot access private administrative information.

---

## 10. AI Agent Instructions (Antigravity)

The AI Agent must follow these instructions throughout the project.

### 10.1 Development Workflow

1. Read `AGENTS.md`, `PLAN.md`, `DESIGN.md`, `GEMINI.md`, and `README.md` before starting development when these files are available.
2. Understand the existing project structure before creating or modifying files.
3. Follow the development phases in this PLAN.md.
4. Complete one phase at a time.
5. Do not skip phases without explicit approval.
6. Do not implement unnecessary features.
7. Reuse existing components and code whenever appropriate.
8. Follow TypeScript best practices.
9. Keep the code modular and maintainable.
10. Update this PLAN.md checklist after completing and verifying each task.

### 10.2 Approval Requirements

Before Phase 2.5:

- Present all required external services.
- Explain their purpose.
- Identify free-tier limitations and potential costs.
- Present the database schema.
- Explain the authentication and storage configuration.
- Ask for explicit approval before connecting external services.

Do not make decisions about unclear requirements without asking the owner.

### 10.3 Cost Control

- Prefer free-tier services.
- Do not use OpenAI API or Anthropic API for the chatbot.
- Do not introduce paid services without approval.
- Explain potential usage costs before integrating external services.
- Avoid unnecessary API requests.

### 10.4 Security Rules

- Never expose API keys or secrets to the client.
- Use environment variables.
- Never commit `.env` files.
- Verify all administrative permissions on the server.
- Implement appropriate RLS policies.
- Validate all user inputs.
- Do not bypass authentication or authorization for convenience.

### 10.5 Testing Requirements

After completing each phase:

1. Run the application.
2. Run TypeScript checks.
3. Run ESLint.
4. Run relevant tests.
5. Check for runtime errors.
6. Verify the implemented features.
7. Fix identified issues before moving forward.
8. Report the completed work and remaining tasks.

### 10.6 Progress Reporting

After each phase, provide:

- Completed tasks.
- Files created or modified.
- Features implemented.
- Tests performed.
- Test results.
- Known issues.
- Remaining tasks.
- Next development phase.

Update the checkboxes in PLAN.md only after the corresponding work has been completed and verified.

Never mark an incomplete or untested task as completed.

### 10.7 Git and GitHub Rules

- Follow the project's Git workflow.
- Check `git status` before committing.
- Review all changes before committing.
- Never commit secrets, credentials, or private configuration files.
- Never force-push or overwrite remote history without explicit approval.
- Request permission before performing Git commits and pushes if not already authorized.
- Keep commits focused and descriptive.

---

## 11. Final Project Goal

The final product should be a professional, secure, responsive, and maintainable personal portfolio website.

It should combine:

- A professional personal portfolio.
- A social-media-inspired public feed.
- An interactive Follow and Like system.
- A project showcase with GitHub integration.
- A secure owner-only Admin Dashboard.
- A free knowledge-based chatbot.
- A contact form with email notifications.
- Thai and English language support.
- Dark mode and light mode.

The website must provide a smooth experience for public visitors while ensuring that only the owner can manage and modify portfolio content.

The implementation must prioritize security, maintainability, accessibility, performance, and cost efficiency.

