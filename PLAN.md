# PLAN.md 
# Personal Portfolio Website - Project Development Plan

## 1. Project Overview

### 1.1 Project Name

Personal Portfolio Website

### 1.2 Project Description

Develop an interactive and professional Personal Portfolio Website that showcases the developer's personal information, educational background, technical skills, projects, resume, and contact information.

The website will include an owner-only administration dashboard and interactive visitor features.

The owner can manage portfolio content through the dashboard without manually editing source code.

Visitors can explore the portfolio, follow the owner, like projects, download the resume, contact the owner, and interact with a portfolio chatbot.

### 1.3 Project Objectives

- Create a professional online portfolio.
- Present personal and educational information.
- Showcase software development projects.
- Allow the owner to manage portfolio content.
- Provide visitor interaction without requiring visitor accounts.
- Implement a secure owner-only dashboard.
- Provide a chatbot that answers questions using portfolio information without paid AI APIs.
- Integrate GitHub repositories into the owner dashboard.
- Provide a responsive experience across devices.

### 1.4 Target Users

**Owner (Administrator)**
- Has exclusive access to the administration dashboard.
- Can manage all portfolio content.
- Can manage projects and resume files.
- Can view visitor interactions and contact messages.

**Visitors**
- Can view public portfolio information.
- Can follow and like content.
- Can send contact messages.
- Can ask questions through the chatbot.
- Cannot modify portfolio content.

---

## 2. Proposed Technology Stack

The following technology stack is recommended for this project. Final provider selection must be approved before Phase 2.5.

| Category | Proposed Technology | Purpose |
|---|---|---|
| Frontend | Next.js | Website and application framework |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Responsive styling |
| UI Components | Reusable React Components | Consistent interface |
| Backend | Next.js Route Handlers | Server-side APIs |
| Database | Supabase PostgreSQL | Store portfolio and visitor data |
| Authentication | Supabase Auth | Owner authentication |
| File Storage | Supabase Storage | Images and PDF resume |
| Email | Resend or another approved provider | Contact notifications |
| Chatbot | Rule-Based + Information Retrieval | Free portfolio Q&A |
| GitHub Integration | GitHub REST API | Display repository information |
| Deployment | Vercel | Website hosting |
| Version Control | Git and GitHub | Source code management |

### 2.1 Technology Selection Rules

- Prefer Supabase PostgreSQL over Firebase for the initial implementation because the project contains relational data.
- Use Supabase Auth for the single owner account.
- Use Supabase Storage for portfolio images and resume files.
- Use server-side API routes for privileged operations.
- Use GitHub REST API to retrieve public repository information.
- Use a free or open-source chatbot implementation without paid AI API calls.
- Avoid introducing additional services unless necessary.

All third-party providers, service limits, and potential costs must be reviewed and approved before implementation.

### 2.2 Cost Considerations

Prioritize free tiers and open-source tools.

However, free-tier availability, quotas, storage limits, email limits, and deployment restrictions may change.

Do not assume that all infrastructure is permanently free.

Before implementation, report:
- Expected service costs.
- Free-tier limitations.
- Usage quotas.
- Potential paid features.
- Alternative providers.

Do not activate paid services without owner approval.

---

## 3. Website Features and Functional Requirements

## 3.1 Personal Profile Management

The owner can create, view, update, and delete or replace personal profile information through the dashboard.

Profile fields:

| Field | Description |
|---|---|
| Display Name | Name displayed on the website |
| Professional Title | Interested career or professional role |
| Introduction | Short personal introduction |
| Profile Image | Upload, replace, and delete profile image |

Requirements:

- Display public profile information on the homepage.
- Allow the owner to edit information through the dashboard.
- Support profile image uploads.
- Validate uploaded image types and file sizes.
- Display a default image when no profile image exists.
- Save updated information to the database.

---

## 3.2 Education Management

The owner can add, view, edit, and delete education records.

Each education record contains:

- Institution Name.
- Degree or Qualification.
- Field of Study.

Default field of study: Software Engineering.

The default value must remain editable.

Requirements:

- Support multiple education records.
- Display education information on the public website.
- Allow the owner to manage education records through the dashboard.
- Validate required fields.
- Store education records in the database.

---

## 3.3 Contact Information Management

The owner can manage public contact information.

Fields:

- Contact Email.
- GitHub Profile URL.

Public website requirements:

- Display the owner's contact email.
- Display a link to the owner's GitHub profile.
- Open external GitHub links in a new browser tab.
- Use safe external link attributes such as `rel="noopener noreferrer"` when appropriate.
- Validate email and URL formats.

### Contact Form

The website must provide a Contact Me form.

Form fields:

1. Name.
2. Email.
3. Message.

Requirements:

- Validate all fields.
- Sanitize user input.
- Prevent empty submissions.
- Apply rate limiting.
- Save messages to the database.
- Send an email notification to the owner.
- Display success and error feedback.
- Do not expose email provider credentials to the browser.

The owner can read contact messages through the dashboard and reply using their email application.

An integrated email inbox or reply system is not required in the initial version.

---

## 3.4 Project Management

The owner can add, view, edit, and delete projects through the dashboard.

Each project contains:

| Field | Description |
|---|---|
| Project Name | Project title |
| Description | Project overview |
| Images | Project screenshots or cover images |
| Tags | Technologies or relevant keywords |
| Category | Project classification |
| Demo URL | Live project link |
| GitHub URL | Source code repository link |

Requirements:

- Support multiple projects.
- Upload and manage project images.
- Allow project details to be edited.
- Allow projects to be deleted.
- Display projects on the public portfolio.
- Provide project detail pages or an appropriate project detail view.
- Display technologies and project categories.
- Support external demo and GitHub links.
- Validate URLs and uploaded files.
- Save project information in the database.

### Project Interaction

Visitors can like individual projects.

Visitors cannot:
- Create projects.
- Edit projects.
- Delete projects.
- Publish posts.
- Comment on projects.
- Reply to other visitors.

Only the owner can manage project content.

---

## 3.5 Resume Management

The owner can manage resume files through the dashboard.

Requirements:

- Upload PDF resume files.
- Replace existing resume files.
- Delete resume files.
- Store files in Supabase Storage.
- Validate PDF file types and file sizes.
- Display a resume viewing option on the public website.
- Allow visitors to download the resume.
- Prevent unauthorized file management.
- Ensure the public resume is accessible without owner authentication.

The website should clearly display the latest available resume.

---

## 3.6 Visitor Follow System

Visitors can follow the owner without creating an account.

Requirements:

- Provide a Follow button.
- Display the total follower count.
- Record visitor follow status.
- Allow each visitor to follow only once.
- Prevent duplicate follow records.
- Provide feedback when the visitor has already followed.
- Update the displayed follower count after successful actions.

Visitor identification:

- Generate a unique visitor identifier.
- Store the identifier in a persistent first-party cookie or another appropriate browser storage mechanism.
- Associate follow records with the visitor identifier.
- Enforce uniqueness at the database level.
- Apply server-side rate limiting.

Important limitations:

Browser-based visitor identifiers are not equivalent to verified user identities.

Visitors may create a new identifier by clearing browser storage, using another browser, or using another device.

The system should prevent ordinary duplicate requests but must not claim to guarantee one follow per real person.

---

## 3.7 Visitor Like System

Visitors can like:

1. The overall portfolio.
2. Individual projects.

Requirements:

- Display the total like count.
- Allow one like per visitor for each target item.
- Prevent duplicate likes.
- Record visitor identification.
- Store like records in the database.
- Enforce uniqueness at the database level.
- Apply server-side rate limiting.
- Update like counts after successful actions.
- Provide visual feedback when an item has already been liked.

Visitors cannot:
- Add comments.
- Reply to comments.
- Publish content.
- Edit or delete existing content.

Only the owner can manage portfolio and project content.

---

## 3.8 Portfolio Chatbot (No Paid AI API)

### 3.8.1 Objective

Implement a chat-style Portfolio Assistant that answers visitor questions using only the information available on the public portfolio.

The chatbot must not require OpenAI API, Anthropic API, or another paid generative AI service.

### 3.8.2 Recommended Approach

Use a combination of:

- Rule-Based Question Matching.
- Keyword Matching.
- Synonym Matching.
- Information Retrieval.
- Structured Portfolio Data.
- Predefined Response Templates.

Optional open-source libraries may be used when they provide a clear benefit.

For example:
- Fuse.js for fuzzy text searching.
- MiniSearch for lightweight full-text search.
- A custom keyword and intent matching engine.

Do not introduce unnecessary machine learning models or paid API dependencies.

### 3.8.3 Knowledge Sources

The chatbot may retrieve information only from approved public portfolio data:

- Personal Profile.
- Education.
- Technical Skills.
- Projects.
- Professional Experience, if available.
- Public Resume Information.

The chatbot must use the latest published portfolio data.

Do not expose:
- Owner account credentials.
- Private dashboard data.
- Contact messages.
- Visitor identifiers.
- Private database records.
- Environment variables.
- Internal system information.

### 3.8.4 Question Processing

The chatbot should follow this process:

1. Receive the visitor's message.
2. Normalize the text.
3. Identify relevant keywords and question intent.
4. Search approved portfolio information.
5. Calculate a relevance score.
6. Check whether the retrieved information is sufficient.
7. Generate a response using predefined templates.
8. Return a relevant answer or an out-of-scope response.

### 3.8.5 Supported Questions

Examples:

- What is the developer's name?
- What does the developer study?
- What programming languages does the developer know?
- What projects has the developer developed?
- What technologies were used in a particular project?
- What is the developer's educational background?
- Where can I find the developer's GitHub?
- How can I contact the developer?
- Can I view the developer's resume?

### 3.8.6 Out-of-Scope Questions

The chatbot must refuse questions unrelated to the portfolio.

Examples:

- General knowledge questions.
- Mathematics problems.
- Restaurant recommendations.
- Weather forecasts.
- Programming tutorials unrelated to the developer's portfolio.
- Questions requiring information that does not exist in the portfolio.

Suggested response:

"I'm sorry, I can only answer questions about the portfolio owner, including their profile, education, skills, projects, and experience."

### 3.8.7 Accuracy Rules

- Never invent missing information.
- Never guess answers when information is insufficient.
- Never answer unrelated questions.
- Use only retrieved portfolio information.
- Return a clarification or fallback response when no reliable match is found.
- Clearly distinguish unavailable information from negative information.

### 3.8.8 User Interface

The chatbot interface should include:

- Chat window.
- Welcome message.
- Message input.
- Send button.
- Conversation history during the current session.
- Loading or searching indicator.
- Clear conversation option.
- Suggested questions.
- Error and fallback messages.

### 3.8.9 Cost and Performance

- No paid AI API calls.
- No external generative AI dependency.
- Use lightweight search logic.
- Cache public portfolio data when appropriate.
- Apply rate limiting to prevent abuse.
- Avoid storing unnecessary visitor messages.
- Keep chatbot processing efficient.

Important limitation:

This chatbot is a retrieval-based assistant, not a fully generative AI model.

It can answer questions that match available information but may not understand complex or ambiguous natural-language questions as effectively as paid AI models.

The system should prioritize accurate answers over attempting to answer every question.

---

## 3.9 Dark Mode and Light Mode

Visitors can switch between:

- Light Mode.
- Dark Mode.

Requirements:

- Follow the operating system theme by default.
- Provide a manual theme toggle.
- Save the visitor's selected theme in localStorage.
- Restore the selected theme on subsequent visits.
- Maintain consistent colors across all pages.
- Prevent unnecessary theme flashing during page loading.
- Ensure sufficient contrast in both themes.

---

## 3.10 GitHub Integration

The website must integrate with GitHub to display the owner's repositories inside the administration dashboard.

### Dashboard Requirements

- Connect the owner's GitHub profile.
- Retrieve public repository information using the GitHub REST API.
- Display repository names.
- Display repository descriptions.
- Display programming languages when available.
- Display repository URLs.
- Display repository visibility when available.
- Display stars and forks when available.
- Provide a link to open the repository on GitHub.
- Allow the owner to refresh repository information.
- Display loading, empty, and error states.

### Technical Requirements

- Use GitHub's public API for public repositories.
- Keep API requests server-side when appropriate.
- Respect GitHub API rate limits.
- Cache repository information when appropriate.
- Do not expose private GitHub tokens to the browser.

Private repository access is optional and requires explicit approval before implementing GitHub authentication or token-based access.

The initial version only requires public repository information.

---

## 4. Visitor Permissions and Owner Permissions

### 4.1 Visitor Permissions

| Feature | Permission |
|---|---|
| View portfolio | Allowed |
| View projects | Allowed |
| View education | Allowed |
| View resume | Allowed |
| Download resume | Allowed | 
| Follow owner | Allowed |
| Like portfolio | Allowed |
| Like projects | Allowed |
| Contact owner | Allowed |
| Use chatbot | Allowed |
| Change theme | Allowed |
| Create posts | Not allowed |
| Comment | Not allowed |
| Edit portfolio | Not allowed |
| Delete portfolio content | Not allowed |
| Access dashboard | Not allowed | 

### 4.2 Owner Permissions

| Feature | Permission |
|---|---|
| Login | Allowed |
| Access dashboard | Allowed |
| Edit profile | Allowed |
| Manage education | Allowed |
| Edit contact information | Allowed |
| Manage projects | Allowed |
| Manage resume | Allowed |
| View contact messages | Allowed |
| View follower count | Allowed |
| View like counts | Allowed |
| View GitHub repositories | Allowed |
| Refresh GitHub data | Allowed |
| Manage public portfolio content | Allowed |

There must be only one authorized owner account.

Do not implement public registration.

---

## 5. Database Design

Use Supabase PostgreSQL as the proposed database.

The following tables are recommended.

| Table | Purpose |
|---|---|
| profiles | Owner profile information |
| education | Education records |
| skills | Technical skills |
| projects | Project information |
| project_images | Project image references |
| resumes | Resume metadata |
| follows | Visitor follow records |
| likes | Portfolio and project likes |
| contact_messages | Visitor contact messages |
| github_repositories_cache | Cached GitHub repository information |

### 5.1 Database Requirements

- Use primary keys.
- Use appropriate foreign keys.
- Define timestamps.
- Add unique constraints where needed.
- Add indexes for frequently queried fields.
- Validate relationships.
- Prevent unauthorized database access.
- Use database policies appropriately.

### 5.2 Visitor Identification

Visitor IDs must not be treated as authenticated user accounts.

Use appropriate uniqueness constraints for follow and like records.

Apply server-side validation before inserting records.

---

## 6. Authentication and Security Architecture

### 6.1 Owner Authentication

- Use Supabase Auth.
- Support owner email and password authentication.
- Allow only the pre-authorized owner account.
- Disable public registration.
- Protect dashboard routes.
- Implement secure session handling.
- Provide logout functionality.

### 6.2 Server-Side Authorization

All owner-specific operations must be authorized on the server.

Examples:

- Create project.
- Update project.
- Delete project.
- Update profile.
- Manage education.
- Upload resume.
- Delete resume.
- Read contact messages.
- Access private dashboard data.

Unauthenticated requests must receive HTTP 401.

Authenticated users without the required permissions must receive HTTP 403.

Hiding dashboard buttons is not sufficient security.

### 6.3 Database Security

- Enable Row Level Security (RLS) where appropriate.
- Restrict owner-only database operations.
- Prevent visitors from directly modifying portfolio content.
- Allow visitors to perform only approved interactions.
- Never expose service-role credentials to the client.
- Validate all API requests on the server.

### 6.4 File Security

- Validate file types.
- Validate file sizes.
- Restrict upload permissions.
- Use appropriate storage policies.
- Prevent unauthorized file deletion.
- Keep private configuration out of public assets.

---

## 7. API and Backend Requirements

Create server-side API routes for the following operations.

### Public APIs

- Retrieve public profile.
- Retrieve education records.
- Retrieve technical skills.
- Retrieve public projects.
- Retrieve public resume information.
- Follow owner.
- Like portfolio.
- Like projects.
- Submit contact form.
- Search portfolio knowledge for chatbot responses.

### Owner APIs

- Update profile.
- Create education record.
- Update education record.
- Delete education record.
- Manage technical skills.
- Create project.
- Update project.
- Delete project.
- Upload resume.
- Replace resume.
- Delete resume.
- Retrieve contact messages.
- Retrieve follow statistics.
- Retrieve like statistics.
- Retrieve GitHub repositories.
- Refresh GitHub repository information.

All owner APIs must verify authentication and authorization on the server.

### API Protection

- Validate request bodies.
- Sanitize user input.
- Apply rate limiting.
- Use appropriate HTTP status codes.
- Return consistent error responses.
- Avoid exposing internal errors or sensitive information.

---

## 8. Development Phases

Development must be performed incrementally.

Do not start multiple major phases simultaneously.

Complete testing and update the checklist before moving to the next phase.

### Phase 0 - Requirement Analysis and Planning

- [x] Confirm project objectives. (Owner: Nittaya Pana, Software Developer, University of Phayao)
- [x] Confirm functional requirements. (Public portfolio first, then owner dashboard)
- [x] Confirm visitor permissions. (Resume download explicitly allowed)
- [x] Confirm owner permissions. (Exclusive management of content via Supabase Auth)
- [x] Review project documentation. (AGENTS.md, DESIGN.md Clyde theme, GEMINI.md, README.md)
- [x] Confirm the proposed technology stack. (Next.js, TypeScript, Tailwind, Supabase, Resend, Fuse.js)
- [x] Identify required third-party services. (Supabase free tier, Resend free tier, GitHub REST public)
- [x] Estimate potential costs. (Zero cost / $0 under free-tier limits)
- [x] Create the initial project architecture. (Documented in AI-Portfolio/IMPLEMENTATION_PLAN.md)

**Deliverable:** Approved project requirements and development architecture.

### Phase 1 - Project Setup

- [ ] Create the Next.js project.
- [ ] Configure TypeScript.
- [ ] Configure Tailwind CSS.
- [ ] Set up the source directory.
- [ ] Configure global styles.
- [ ] Create the initial folder structure.
- [ ] Configure environment variables.
- [ ] Set up Git.
- [ ] Create the initial README.md.

**Deliverable:** A working development environment and initial application.

### Phase 2 - Core UI Components

- [ ] Create the main website layout.
- [ ] Create navigation components.
- [ ] Create reusable buttons.
- [ ] Create reusable cards.
- [ ] Create form components.
- [ ] Create modal components when needed.
- [ ] Create loading states.
- [ ] Create error states.
- [ ] Establish design tokens.
- [ ] Implement responsive foundations.

**Deliverable:** Reusable UI components and the initial design system.

### Phase 2.5 - Database and Authentication

IMPORTANT:

Before starting this phase, present the proposed external services and request owner approval.

Required service decisions:

- Database provider.
- Authentication provider.
- File storage provider.
- Email provider.
- GitHub integration method.
- Chatbot implementation approach.

After approval:

- [ ] Create and configure the Supabase project.
- [ ] Design the PostgreSQL database schema.
- [ ] Create the required database tables.
- [ ] Define primary keys and relationships.
- [ ] Add unique constraints and indexes.
- [ ] Configure Row Level Security.
- [ ] Configure storage buckets.
- [ ] Implement owner authentication.
- [ ] Disable public registration.
- [ ] Protect owner dashboard routes.
- [ ] Implement server-side authorization.
- [ ] Create owner-specific API routes.
- [ ] Configure `.env.local`.
- [ ] Verify that secrets are not exposed to the client.

**Deliverable:** A secure database, storage system, authentication system, and protected backend.

### Phase 2.6 - Visitor Interaction Features

- [ ] Implement visitor identification.
- [ ] Implement the Follow button.
- [ ] Display follower counts.
- [ ] Prevent duplicate follows.
- [ ] Implement portfolio likes.
- [ ] Implement project likes.
- [ ] Display like counts.
- [ ] Prevent duplicate likes.
- [ ] Implement server-side rate limiting.
- [ ] Implement the Contact Me form.
- [ ] Save contact messages to the database.
- [ ] Integrate email notifications.
- [ ] Implement the retrieval-based chatbot.
- [ ] Implement out-of-scope question rejection.
- [ ] Add suggested chatbot questions.
- [ ] Test chatbot accuracy.
- [ ] Implement dark and light themes.
- [ ] Persist theme preferences.

**Deliverable:** Fully functional visitor interaction features.

### Phase 3 - Owner Administration Dashboard

Create a private dashboard accessible only to the owner.

#### 3.1 Dashboard Overview

- [ ] Create dashboard layout.
- [ ] Create dashboard navigation.
- [ ] Create overview page.
- [ ] Display total followers.
- [ ] Display total portfolio likes.
- [ ] Display project like statistics.
- [ ] Display contact message statistics.
- [ ] Display recent contact messages.

#### 3.2 Profile Management

- [ ] Display existing profile information.
- [ ] Edit display name.
- [ ] Edit professional title.
- [ ] Edit personal introduction.
- [ ] Upload profile image.
- [ ] Replace profile image.
- [ ] Delete profile image when appropriate.
- [ ] Save changes to the database.

#### 3.3 Education Management

- [ ] Display education records.
- [ ] Add education records.
- [ ] Edit education records.
- [ ] Delete education records.
- [ ] Save changes to the database.

#### 3.4 Skills Management

- [ ] Add technical skills.
- [ ] Edit technical skills.
- [ ] Delete technical skills.
- [ ] Organize skills by category.
- [ ] Save changes to the database.

#### 3.5 Project Management

- [ ] Display all projects.
- [ ] Add new projects.
- [ ] Edit project details.
- [ ] Upload project images.
- [ ] Replace project images.
- [ ] Delete projects.
- [ ] Manage project tags.
- [ ] Manage project categories.
- [ ] Manage demo and GitHub links.

#### 3.6 Resume Management

- [ ] Display current resume.
- [ ] Upload PDF resume.
- [ ] Replace existing resume.
- [ ] Delete resume.
- [ ] Verify public resume access.

#### 3.7 Contact Message Management

- [ ] Display contact messages.
- [ ] View message details.
- [ ] Display sender name.
- [ ] Display sender email.
- [ ] Display message content.
- [ ] Display submission date.
- [ ] Mark messages as read.
- [ ] Allow the owner to reply using their email application.

#### 3.8 Visitor Statistics

- [ ] Display follower count.
- [ ] Display portfolio like count.
- [ ] Display project like counts.
- [ ] Provide clear statistics.

#### 3.9 GitHub Repository Management

- [ ] Connect to the owner's public GitHub profile.
- [ ] Retrieve public repositories.
- [ ] Display repository names.
- [ ] Display descriptions.
- [ ] Display programming languages.
- [ ] Display repository URLs.
- [ ] Display stars and forks when available.
- [ ] Add repository refresh functionality.
- [ ] Handle API rate limits.
- [ ] Display loading and error states.

**Deliverable:** A functional owner dashboard for managing portfolio content and viewing visitor activity.

### Phase 4 - Public Portfolio Integration

Replace temporary local data with database-driven information.

- [ ] Retrieve profile information from the database.
- [ ] Retrieve education records.
- [ ] Retrieve technical skills.
- [ ] Retrieve public projects.
- [ ] Retrieve project images.
- [ ] Retrieve public resume information.
- [ ] Integrate Follow functionality.
- [ ] Integrate Like functionality.
- [ ] Integrate Contact Me functionality.
- [ ] Integrate chatbot functionality.
- [ ] Integrate GitHub profile links.
- [ ] Ensure the public website displays the latest published data.

Important:

The `/data` directory should only contain:

- Initial or seed data.
- Static configuration.
- Type definitions when appropriate.

Do not use local JSON files as the primary database for dynamic portfolio content.

The database must be the source of truth for managed content.

**Deliverable:** A fully integrated public portfolio website.

### Phase 5 - Chatbot Knowledge and Accuracy Testing

- [ ] Verify that the chatbot uses current public portfolio information.
- [ ] Test profile-related questions.
- [ ] Test education-related questions.
- [ ] Test technical skill questions.
- [ ] Test project-related questions.
- [ ] Test resume-related questions.
- [ ] Test synonym matching.
- [ ] Test spelling variations.
- [ ] Test ambiguous questions.
- [ ] Test unrelated questions.
- [ ] Verify that unsupported questions are rejected.
- [ ] Verify that the chatbot does not invent information.
- [ ] Optimize search performance.

**Deliverable:** A reliable retrieval-based Portfolio Assistant.

### Phase 6 - Security and Quality Assurance

- [ ] Test owner login and logout.
- [ ] Test unauthorized dashboard access.
- [ ] Test unauthorized API requests.
- [ ] Verify HTTP 401 and 403 responses.
- [ ] Test database access policies.
- [ ] Test visitor Follow restrictions.
- [ ] Test visitor Like restrictions.
- [ ] Test duplicate request prevention.
- [ ] Test API rate limiting.
- [ ] Test contact form validation.
- [ ] Test file upload validation.
- [ ] Verify API keys remain server-side.
- [ ] Verify environment variables are protected.
- [ ] Test chatbot scope restrictions.
- [ ] Test error handling.

**Deliverable:** A secure and verified application.

### Phase 7 - Responsive Design and Performance

- [ ] Test desktop layout.
- [ ] Test laptop layout.
- [ ] Test tablet layout.
- [ ] Test mobile layout.
- [ ] Fix horizontal overflow.
- [ ] Optimize images.
- [ ] Optimize page loading.
- [ ] Review accessibility.
- [ ] Review SEO metadata.
- [ ] Test dark and light modes.
- [ ] Verify navigation and interactions.

**Deliverable:** A responsive and optimized portfolio website.

### Phase 8 - Deployment and Final Documentation

- [ ] Prepare production environment variables.
- [ ] Configure production database access.
- [ ] Configure production storage.
- [ ] Configure email provider.
- [ ] Configure deployment.
- [ ] Deploy the application.
- [ ] Test the production website.
- [ ] Test owner authentication.
- [ ] Test public interactions.
- [ ] Test contact email notifications.
- [ ] Test resume downloads.
- [ ] Test chatbot functionality.
- [ ] Update README.md.
- [ ] Document environment configuration.
- [ ] Document deployment instructions.

**Deliverable:** A deployed and documented production portfolio website.

---

## 9. Acceptance Criteria

The project is considered successful when all the following conditions are met.

### 9.1 Public Portfolio

- [ ] Visitors can access public portfolio information.
- [ ] Visitors can view education and technical skills.
- [ ] Visitors can view projects.
- [ ] Visitors can open external project links.
- [ ] Visitors can view and download the resume.
- [ ] Visitors can view the owner's GitHub profile.

### 9.2 Owner Management

- [ ] Only the owner can access the dashboard.
- [ ] The owner can update personal information.
- [ ] The owner can add, edit, and delete education records.
- [ ] The owner can manage technical skills.
- [ ] The owner can add, edit, and delete projects.
- [ ] The owner can upload, replace, and delete resume files.
- [ ] The owner can view contact messages.
- [ ] The owner can view Follow and Like statistics.
- [ ] The owner can retrieve and view GitHub repositories.

### 9.3 Visitor Interaction

- [ ] Visitors can follow without logging in.
- [ ] Visitors can like the portfolio without logging in.
- [ ] Visitors can like individual projects.
- [ ] Duplicate Follow and Like requests are prevented.
- [ ] Visitors cannot create or modify portfolio content.
- [ ] Visitors cannot comment.
- [ ] Visitors can submit the contact form.
- [ ] Contact messages are stored in the database.
- [ ] The owner receives email notifications.

### 9.4 Chatbot
 
- [ ] The chatbot can answer questions about public portfolio information.
- [ ] The chatbot can retrieve profile information.
- [ ] The chatbot can retrieve education information.
- [ ] The chatbot can retrieve technical skills.
- [ ] The chatbot can retrieve project information.
- [ ] The chatbot can answer supported resume questions.
- [ ] The chatbot rejects unrelated questions.
- [ ] The chatbot does not invent information.
- [ ] The chatbot does not use paid AI APIs.
- [ ] The chatbot does not expose private information.

### 9.5 Security

- [ ] Only the owner can access administrative functions.
- [ ] Unauthenticated owner API requests return HTTP 401.
- [ ] Unauthorized authenticated requests return HTTP 403.
- [ ] Owner permissions are verified server-side.
- [ ] Database access policies are configured.
- [ ] No API keys or private credentials are exposed to the client.
- [ ] Rate limiting is implemented for public interaction APIs.

### 9.6 User Experience

- [ ] Dark mode works.
- [ ] Light mode works.
- [ ] Theme preference persists after refreshing.
- [ ] The website supports desktop, tablet, and mobile.
- [ ] Buttons and links work correctly.
- [ ] Loading, success, and error states are displayed appropriately.

---

## 10. Environment Variables

Sensitive configuration must be stored in `.env.local`.

Potential variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=

GITHUB_USERNAME=

OWNER_EMAIL=
```

Important rules:

- Never commit `.env.local`.
- Never expose service-role keys to the browser.
- Never expose email API keys to the browser.
- Only use `NEXT_PUBLIC_` for values explicitly intended to be public.
- Keep private credentials in server-side code.
- Document required variables in `.env.example` using placeholder values.

The final variable names must match the actual implementation and selected providers.

---

## 11. AI Agent Instructions for This Project

Antigravity must follow these instructions.

### Before Development

1. Read AGENTS.md.
2. Read GEMINI.md.
3. Read PLAN.md.
4. Read DESIGN.md.
5. Inspect the current project structure.
6. Identify missing requirements.
7. Present the implementation plan for major features.

### Before Phase 2.5

Present the proposed providers for:

- Database.
- Authentication.
- Storage.
- Email.
- GitHub integration.
- Chatbot implementation.

Explain costs, limitations, and alternatives.

Wait for explicit owner approval before configuring external services.

### During Development

- Follow the development phases.
- Do not skip security implementation.
- Do not expose private credentials.
- Do not use paid AI APIs for the chatbot.
- Use the database as the source of truth.
- Keep `/data` for seed data and static configuration.
- Validate all user inputs.
- Enforce owner permissions server-side.
- Test each feature after implementation.
- Avoid unnecessary code changes.

### After Each Phase

1. Run relevant tests.
2. Review modified files.
3. Fix identified issues.
4. Update the corresponding checklist in PLAN.md.
5. Report completed tasks.
6. Report remaining issues.
7. Ask for approval before proceeding to a major phase when required.

Only mark a checklist item as completed after its implementation has been verified.

### Important Restrictions

- Do not invent personal information.
- Do not invent project achievements.
- Do not create fake visitor statistics.
- Do not implement visitor comments.
- Do not allow visitor content management.
- Do not create public owner registration.
- Do not bypass server-side authorization.
- Do not claim that an untested feature works.
- Do not activate paid services without approval.

---

## 12. Project Completion Definition

The project is complete when:

- All approved requirements are implemented.
- Public portfolio features work correctly.
- Owner dashboard features work correctly.
- Owner authentication and authorization are secure.
- Visitor interactions work as specified.
- Contact messages are saved and email notifications are delivered.
- The chatbot answers only from approved portfolio information without paid AI APIs.
- GitHub public repository integration works.
- Resume uploads and downloads work.
- Dark mode and light mode work.
- Responsive layouts are verified.
- Security and quality tests are completed.
- Production deployment is verified.
- Project documentation is updated.

## Final Project Principle

Build a professional, secure, interactive, and maintainable portfolio website.

Prioritize real functionality, accurate information, security, and a good user experience.

Develop incrementally, test every phase, and never sacrifice security or code quality for implementation speed.