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

### 3.13 อนิเมชันเปิดหน้าเว็บ — การ์ด Portfolio (Website Intro Card Animation)

กำหนดอนิเมชันที่แสดงตอนผู้เข้าชมเปิดเว็บไซต์ครั้งแรก ก่อนจะเห็นหน้า Portfolio หลัก

#### 1. ภาพรวม
เมื่อผู้เข้าชมเปิดเว็บไซต์ การ์ดสีน้ำเงินเข้มกรมท่า (สีตาม DESIGN.md: Night Violet `#0a0118` / Void Plum `#0c0616`) จะเลื่อนเข้ามาแบบทแยงมุมจากมุมล่างซ้าย หยุดอยู่ครู่หนึ่ง จากนั้นเลื่อนออกไปทางมุมบนขวา เมื่อการ์ดออกจากหน้าจอ หน้า Portfolio หลักจะปรากฏขึ้น

#### 2. การออกแบบการ์ด
- **รูปทรง**: สี่เหลี่ยมมุมมน มุมโค้งมาก มีเงาจาง ๆ
- **พื้นหลัง**: ไล่สีจากน้ำเงินเข้มไปน้ำเงินเข้มกว่า ให้เหมือนภาพอ้างอิง (Night Violet / Void Plum)
- **ขนาด**: ประมาณ 70% ของความกว้างหน้าจอบนเดสก์ท็อป และ 90% บนมือถือ สัดส่วนแนวนอนประมาณ 16:9
- **การจัดวางภายในการ์ด**:
  - **ด้านซ้าย (กึ่งกลางแนวตั้ง จัดชิดซ้าย)**:
    - หัวข้อ “Portfolio” ตัวใหญ่ หนา สีขาว
    - ใต้หัวข้อ เป็นชื่อที่ใช้แสดง “Nittaya Pana” ตัวเล็กลงและสีอ่อนลง
    - ข้อความอยู่ใกล้ขอบซ้ายของการ์ดแต่มี padding พอสมควร
  - **ด้านขวา**:
    - รูปโปรไฟล์ของเจ้าของ สี่เหลี่ยมมุมมน กินพื้นที่ประมาณหนึ่งในสามของความกว้างการ์ด
    - รูปอยู่กึ่งกลางแนวตั้ง มีขอบบาง ๆ ฟ้าอ่อน
  - **องค์ประกอบตกแต่ง**: วงรูปร่างสีน้ำเงินเบลอจาง ๆ ในพื้นหลัง ไม่มีกราฟิกอื่น
  - *หมายเหตุ*: ไม่ใช้ภาพแล็ปท็อปจากภาพอ้างอิง ให้ใช้รูปของเจ้าของแทนทางด้านขวา

#### 3. ลำดับอนิเมชัน
ระยะเวลารวมประมาณ 3 วินาที

| เวลา | การกระทำ |
|---|---|
| 0.0 วินาที | หน้าจอเป็นสีน้ำเงินเข้ม การ์ดอยู่นอกจอที่มุมล่างซ้าย หมุนเล็กน้อย |
| 0.0 – 0.8 วินาที | การ์ดเลื่อนทแยงมุมขึ้นและไปทางขวา เข้าสู่กึ่งกลางหน้าจอ ใช้ easing แบบ easeOut |
| 0.8 – 1.4 วินาที | ข้อความ “Portfolio” ค่อย ๆ ปรากฏและเลื่อนขึ้นเล็กน้อย ตามด้วย “Nittaya Pana” หลังจากนั้น 0.2 วินาที |
| 0.8 – 1.4 วินาที | รูปโปรไฟล์ค่อย ๆ ปรากฏและขยายจาก 0.9 เป็น 1.0 |
| 1.4 – 2.4 วินาที | หยุดค้างไว้ การ์ดนิ่งเพื่อให้ผู้เข้าชมอ่านได้ |
| 2.4 – 3.2 วินาที | การ์ดเลื่อนทแยงมุมขึ้นและไปทางขวา ออกจากมุมบนขวาของหน้าจอ ใช้ easing แบบ easeIn |
| 3.0 – 3.6 วินาที | หน้า Portfolio หลักค่อย ๆ ปรากฏอยู่ด้านล่าง ขณะที่การ์ดกำลังออก |

#### 4. กฎการทำงาน
- อนิเมชันจะเล่นหนึ่งครั้งต่อหนึ่งเซสชันของเบราว์เซอร์ ใช้ flag ใน `sessionStorage` เพื่อให้การรีโหลดในเซสชันเดียวกันข้ามอนิเมชันนี้ไป
- ปุ่ม “Skip” จะแสดงที่มุมล่างขวาระหว่างอนิเมชัน คลิกแล้วอนิเมชันจบทันที
- หากผู้เข้าชมเปิด `prefers-reduced-motion` ให้เปลี่ยนการเลื่อนทแยงมุมเป็นการค่อย ๆ จางเข้าและจางออกใน 0.5 วินาที
- อนิเมชันต้องไม่บล็อกการใช้คีย์บอร์ดหรือ screen reader ใส่ `aria-hidden` ให้การ์ด และทำให้หน้าหลักโฟกัสได้ทันทีที่ปรากฏ
- หน้าหลักต้องไม่กะพริบหรือเลื่อนตำแหน่งเมื่ออนิเมชันจบ

#### 5. ข้อกำหนดทางเทคนิค
- ใช้ Framer Motion สำหรับอนิเมชันทั้งหมด
- สร้างอนิเมชันเป็นคอมโพเนนต์แยก: `src/components/intro/IntroCard.tsx`
- ครอบหน้าหลักใน `src/app/page.tsx` เพื่อให้แสดงเฉพาะหลังอนิเมชันจบ
- ชื่อและตำแหน่งที่แสดงบนการ์ดต้องดึงจาก `src/data/portfolio-seed.ts` (หรือ `profile.ts`) ไม่ฮาร์ดโค้ด
- รูปโปรไฟล์ต้องใช้รูปเดียวกับส่วน About
- อนิเมชันต้องทำงานที่ 60 fps บนมือถือระดับกลาง ให้อนิเมชันเฉพาะ `transform` และ `opacity` หลีกเลี่ยงการอนิเมชัน `width`, `height`, `top` หรือ `left`

#### 6. เกณฑ์การยอมรับ
- การ์ดเลื่อนเข้าจากมุมล่างซ้ายและออกทางมุมบนขวาตามเส้นทแยงมุมที่กำหนด
- “Portfolio” อยู่เหนือ “Nittaya Pana” และทั้งสองจัดชิดซ้ายของการ์ด
- รูปของเจ้าของอยู่ด้านขวาของการ์ด
- หน้าหลักปรากฏหลังการ์ดออกจากหน้าจอ
- อนิเมชันเล่นเฉพาะการเข้าชมครั้งแรกในเซสชัน และปุ่ม Skip ใช้งานได้
- ผู้ที่เปิด reduced motion เห็นเวอร์ชันจางเข้าจางออกแบบง่าย
- ไม่มี error ใน console และ layout ใช้งานได้ทั้งมือถือและเดสก์ท็อป

#### 7. คำแนะนำสำหรับ AI Agent (Antigravity)
- สร้างคอมโพเนนต์อนิเมชันก่อน ทดสอบแยกต่างหาก แล้วค่อยนำเข้าหน้าหลัก
- ห้ามฮาร์ดโค้ดชื่อหรือ path ของรูปเจ้าของ ให้อ่านจากข้อมูลโปรไฟล์
- หากไม่มีรูปโปรไฟล์ ให้แสดงวงกลมว่างพร้อมอักษรย่อของเจ้าของ
- ถามก่อนเปลี่ยนสีของการ์ดหรือค่าเวลาของอนิเมชัน

### 3.14 Main Portfolio Page — Design and Layout (หน้า Portfolio หลัก — การออกแบบและโครงสร้าง)

> It defines the main portfolio page that appears after the intro animation.
> Visual style must follow DESIGN.md. Content must come from the data files defined in PLAN.md.
> The reference screenshot defines the layout and visual hierarchy. The text and numbers in the screenshot
> are placeholders and must be replaced with the owner's real data.

#### 1. Sources of Truth
- **Layout and section order:** the reference screenshot (dark, full-page, single-column scroll with two-column blocks)
- **Colors, fonts, spacing, radius, shadows, and components:** DESIGN.md. Read it fully before writing any CSS. Do not invent colors. Use the tokens defined there.
- **All text, images, and numbers:** `data/profile.ts`, `data/education.ts`, `data/projects.ts`, `data/skills.ts`, and the database values described in PLAN.md (follow and like counts, contact messages)
- *Precedence:* If DESIGN.md and the screenshot disagree on a color or font, follow DESIGN.md. If they disagree on layout, follow the screenshot.

#### 2. Overall Page Structure
The page is a single scrolling page on a dark navy background. Content sits inside a centered container with a maximum width of about 1200px, with generous vertical spacing between sections. Sections appear in this order:
1. Navigation bar (sticky)
2. Hero
3. About Me and Expertise (two columns)
4. Selected Work (projects)
5. Work Process (optional, see Section 7/9)
6. Testimonials and By the Numbers (two columns, testimonials optional)
7. Contact CTA and contact form (two columns)
8. Footer

#### 3. Navigation Bar
- **Left:** logo badge (owner's initials in a cyan rounded square) followed by the display name from `data/profile.ts`
- **Center:** anchor links to each section (About, Skills, Projects, Contact). Each link scrolls smoothly to its section and highlights when active.
- **Right:** a **Download CV** button (outlined, cyan border) that downloads the resume PDF, and a **Dark / Light mode toggle** icon
- The bar is transparent at the top of the page and gains a subtle dark background with blur after the visitor scrolls.
- On mobile, links collapse into a hamburger menu.

#### 4. Hero Section
Two columns, text on the left, photo on the right.
- **Left column:**
  - Small pill badge with a dot, showing the role from `data/profile.ts` (e.g., "Software Engineer")
  - Large headline in three lines. Line 1 and 3 are white. The middle phrase is cyan with a gradient. Example: "I build / digital experiences / that matter." The owner can edit this text in the profile data.
  - A short intro paragraph from the bio field, limited to about two lines
  - Two buttons: **View Projects** (filled cyan, scrolls to Projects) and **Let's Talk** (outlined, scrolls to Contact)
  - A row of social icon buttons: GitHub (from profile data), email (from profile data), and any other links the owner adds
  - **Follow** button with the follower count beside it. Clicking it toggles follow for this visitor.
- **Right column:**
  - The owner's profile photo, large, placed in front of a blurred blue glowing globe or circle background
  - Three floating stat cards overlaid on the photo edge, with a cyan icon, large number, and small label. Values come from the database or profile data:
    - Years of experience
    - Projects completed (count of projects)
    - Satisfaction rate (optional, hide if the owner does not set it)
  - One floating code card near the bottom of the photo showing three short lines of tags or highlights (e.g., "Clean Code", "Scalable Architecture", "Fast Performance"), taken from a `highlights` field in profile data

#### 5. About Me and Expertise
Two side-by-side cards with equal height.
- **About Me card (left):**
  - Title with a small cyan icon
  - Bio paragraph from `data/profile.ts`
  - A two-column grid of info items, each with an icon, label, and value: Name, Location, Email (from profile data, clickable mailto link), Education (institution name from `data/education.ts`, most recent entry)
  - **Download Resume** button at the bottom
- **Expertise card (right):**
  - Title with an icon
  - A list of skills, each with a label, a thin cyan progress bar, and a percentage on the right
  - Source: `data/skills.ts`. Each skill needs a `level` value (0–100). If the owner does not set levels, show skill tags instead of bars.

#### 6. Selected Work (Projects)
- Section header: small cyan icon, title "Selected Work", and a "View All Projects" link on the right
- Three cards in a row on desktop, one column on mobile
- Each card contains:
  - Project image at the top (from `data/projects.ts`), with a dark gradient overlay at the bottom
  - Project title in bold white
  - One-line description (truncated to two lines)
  - Tag chips showing the first three items from `tags`
  - Two icon buttons: **Live Demo** (opens `liveUrl`) and **GitHub** (opens `repoUrl`)
  - **Like** button with count. Each visitor can like a project once.
- Cards lift slightly with a cyan border glow on hover.
- Only projects marked `featured: true` appear here. If there are more than three, show the first three and link to the full list.
- Add a **category filter** (tabs above the cards) that matches the filtering feature in PLAN.md.

#### 7. Work Process (Optional)
Not in original PLAN.md. Include only if the owner adds process steps in the data file. If not, hide this section.
- A horizontal row of six steps on desktop, stacked on mobile
- Each step has a numbered circle, a cyan icon, a title, and a short description
- A thin cyan line connects the circles

#### 8. Testimonials and By the Numbers
Two side-by-side cards. **Testimonials is optional** and not in original PLAN.md. Hide it until the owner adds testimonial data.
- **Testimonials card (left, optional):** Client photo, quote text, client name, and role. Carousel controls with dots at the bottom.
- **By the Numbers card (right):** A 2×2 grid of stat boxes, each with a cyan icon, large cyan number, and label. Values come from the database or profile data (Happy Clients, Projects Completed, Years of Experience, Satisfaction Rate). Hide any stat the owner does not provide.

#### 9. Contact Section
- **Left column: "Let's Build Something Great" card:**
  - Title and short description
  - **Send Message** button that scrolls to the form or focuses the first input
  - Contact info list with icons: email (from profile data), phone (optional), location (from profile data), and availability status (from profile data, for example "Available for opportunities")
  - A subtle world-map or globe background graphic
- **Right column: Contact form card:**
  - Three fields as required in PLAN.md: Name (required), Email (required, validated), Message (required, textarea)
  - Submit button: full-width, filled cyan, with a send icon
  - Inline validation messages and a success/error state after submission
  - Submitted messages go to the database and trigger the owner's email notification
  - *No comment field exists anywhere on the page.*

#### 10. Footer
- Left: owner's logo and name
- Center: small navigation links
- Right: social icons (GitHub, email)
- Bottom line: copyright with the current year and owner's name
- Back-to-top button (floating, bottom-right, appears after scrolling)

#### 11. Floating Chatbot Button
- A round cyan button fixed to the bottom-right corner (above the back-to-top button)
- Opens a chat panel with the same dark card style as the page
- Chat is limited to questions about the site content, as defined in PLAN.md
- Include a short greeting and three suggested questions

#### 12. Visual Rules & Tokens
- Follow DESIGN.md for all colors, fonts, font sizes, spacing, border radius, shadows, and button styles
- Cards use a dark navy surface, a thin border with low opacity, and rounded corners as defined in DESIGN.md
- Accent color is cyan, used for highlights, primary buttons, progress bars, icons, and gradient text
- Headings use heading font from DESIGN.md. Body text uses body font.
- Dark mode is default. Light mode uses light tokens from DESIGN.md.
- Hover states on buttons and cards are subtle: slight lift or cyan glow, never large movement.
- Animations respect `prefers-reduced-motion`.

#### 13. Responsive Behavior
- **Desktop (1024px and up):** Full layout as described above
- **Tablet (768px–1023px):** Two-column blocks become single column. Project cards show two per row.
- **Mobile (below 768px):** Single column throughout. Hero photo moves below text. Floating stat cards become horizontal row under photo. Navigation uses hamburger menu.

#### 14. Acceptance Criteria
- Layout and section order match the reference screenshot
- Colors, fonts, and components match DESIGN.md in both dark and light mode
- Every piece of text, image, and number comes from data sources in PLAN.md. No sample names ("Abdullah Tariq") or sample numbers from screenshot remain.
- Follow, Like, Contact, Chatbot, Dark/Light toggle, and Resume download all work as specified in PLAN.md
- Sections without data are hidden, not shown empty
- No comment feature exists
- Responsive across all viewports and passes Lighthouse targets in PLAN.md

#### 15. ฉบับภาษาไทย (Thai Translation Reference)

##### 1. แหล่งข้อมูลหลัก
- **โครงสร้างและลำดับส่วนต่าง ๆ:** ภาพอ้างอิง (พื้นมืด หน้าเดียวเลื่อนลง บางส่วนแบ่งสองคอลัมน์)
- **สี ฟอนต์ ระยะห่าง มุมโค้ง เงา และคอมโพเนนต์:** DESIGN.md
- **ข้อความ รูปภาพ และตัวเลขทั้งหมด:** `data/profile.ts`, `data/education.ts`, `data/projects.ts`, `data/skills.ts` และค่าจากฐานข้อมูลตาม PLAN.md

##### 2. โครงสร้างหน้าโดยรวม (เรียงตามลำดับ)
1. แถบนำทาง (sticky)
2. Hero
3. About Me และ Expertise (สองคอลัมน์)
4. Selected Work (โปรเจกต์)
5. Work Process (ไม่บังคับ)
6. Testimonials และ By the Numbers (สองคอลัมน์)
7. CTA ติดต่อและฟอร์มติดต่อ (สองคอลัมน์)
8. Footer

##### 3. แถบนำทาง
- ซ้าย: โลโก้ (อักษรย่อในสี่เหลี่ยมมุมมนสีฟ้าอมเขียว) + ชื่อแสดง
- กลาง: ลิงก์ About, Skills, Projects, Contact (smooth scroll + active highlight)
- ขวา: ปุ่ม Download CV (กรอบฟ้าอมเขียว) + ปุ่มสลับ Dark/Light mode
- เลื่อนลงแล้วมีพื้นหลังมืดเบลอ / มือถือเป็น Hamburger

##### 4. ส่วน Hero
- **ซ้าย:** Badge ตำแหน่ง, หัวข้อใหญ่ 3 บรรทัด (บรรทัดกลางเป็น Cyan gradient), คำแนะนำตัว 2 บรรทัด, ปุ่ม View Projects + Let's Talk, แถว Social icons, ปุ่ม Follow + จำนวนผู้ติดตาม
- **ขวา:** รูปโปรไฟล์ขนาดใหญ่บนพื้นหลังโลก/วงกลมเรืองแสง, การ์ดสถิติลอย 3 ใบ (ปีประสบการณ์, โปรเจกต์สำเร็จ, ความพึงพอใจ), การ์ดโค้ดลอย 3 บรรทัด (Clean Code, Scalable Architecture, Fast Performance)

##### 5. About Me และ Expertise (สองคอลัมน์เท่ากัน)
- **About Me (ซ้าย):** Bio, ข้อมูลกริด 4 ช่อง (ชื่อ, ที่ตั้ง, อีเมล, การศึกษาล่าสุด), ปุ่ม Download Resume
- **Expertise (ขวา):** รายการทักษะพร้อมแถบเปอร์เซ็นต์สีฟ้าอมเขียว (0–100) จาก `skills.ts`

##### 6. Selected Work (โปรเจกต์)
- การ์ด 3 ใบเรียงแนวนอน (รูป, ชื่อ, คำอธิบาย 2 บรรทัด, ชิปแท็ก 3 อัน, ปุ่ม Live Demo + GitHub, ปุ่ม Like + ยอดไลค์)
- แท็บตัวกรองหมวดหมู่ด้านบน

##### 7. Work Process (ไม่บังคับ)
- 6 ขั้นตอนแนวนอน (Discover, Plan, Design, Develop, Test, Deploy) มีเส้นบางเชื่อม

##### 8. Testimonials และ By the Numbers
- **Testimonials (ซ้าย, ไม่บังคับ):** รูปลูกค้า, ข้อความ, ชื่อ, ตำแหน่ง, Carousel dots
- **By the Numbers (ขวา):** กริด 2×2 กล่องสถิติสีฟ้าอมเขียว

##### 9. ส่วนติดต่อ
- **ซ้าย:** การ์ด Let's Build Something Great, ข้อมูลติดต่อ, แผนที่โลกจาง ๆ
- **ขวา:** ฟอร์ม 3 ช่อง (ชื่อ, อีเมล, ข้อความ) + ปุ่มส่งสีฟ้าอมเขียว (ไม่มีคอมเมนต์)

##### 10. Footer, Floating Chatbot & Visual Rules
- Footer ครบชุดพร้อมปุ่ม Back to Top
- ปุ่มแชทบอทลอยสีฟ้าอมเขียวมุมขวาล่าง
- รองรับ Responsive Desktop, Tablet, Mobile ตาม DESIGN.md และภาพอ้างอิง

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

---

## 12. PROJECT REQUIREMENTS: NITTAYA UX/UI DESIGNER PORTFOLIO (ข้อกำหนดโครงการปรับปรุงใหม่)

### 12.1 Project Objective
ปรับปรุงแผนการพัฒนาเว็บไซต์ Portfolio เดิม ให้เป็นเว็บไซต์ Personal Portfolio สำหรับนำเสนอประวัติส่วนตัว ทักษะ ผลงาน และความสามารถด้าน UX/UI Design ของ นางสาวนิตยา ปานา เพื่อใช้ประกอบการสมัครฝึกงานและนำเสนอความสามารถด้านการออกแบบและพัฒนาเว็บไซต์
- เว็บไซต์มีดีไซน์ที่ทันสมัย สวยงาม เรียบหรู ใช้งานง่าย มีความเป็นมืออาชีพ และรองรับทุกขนาดหน้าจอ
- นำเสนอข้อมูลส่วนตัวและความสามารถด้าน UX/UI Design (Hard Skills, Soft Skills, Tools)
- Social Feed สำหรับโพสต์เรื่องราว พร้อมระบบ Follow และ Like
- Download Resume PDF (`Nittaya_Pana_Resume.pdf`)
- Contact Form ส่งข้อความถึงเจ้าของ พร้อมบันทึก Database และแจ้งเตือนทาง Email
- ระบบ Login สำหรับเจ้าของเว็บไซต์เท่านั้น

### 12.2 Website Layout & 5 Main Sections
เรียงลำดับ 5 ส่วนหลัก:
1. **Home / Hero**
2. **About Me**
3. **Posts / Social Feed**
4. **Skills**
5. **Contact Me**

#### Navigation Bar
- **ซ้ายสุด**: ข้อความ `Portfolio` (คลิกแล้วกลับหน้า Home)
- **ตรงกลาง**: `Home`, `About Me`, `Posts`, `Skills`, `Contact Me` (Smooth Scrolling พร้อม Active state)
- **ขวาสุด**: ปุ่ม `Login` สำหรับเจ้าของเว็บไซต์ เข้าสู่ `/admin/login` (ผู้ชมทั่วไปเข้าไม่ถึง)
- Sticky Navigation ติดด้านบนเมื่อเลื่อนหน้าจอ + Hamburger Menu บน Mobile

#### Section 1: Home / Hero Section
- **ฝั่งซ้าย (Introduction & Actions)**:
  - บรรทัดที่ 1: `Hi, I'm Nittaya` (ตัวอักษรใหญ่ โดดเด่น)
  - บรรทัดที่ 2: `UX/UI Designer` (เน้นตำแหน่งงานด้วยสี Accent)
  - ข้อมูล GitHub: `https://github.com/icx-nit/Portfolio` พร้อมไอคอน และดึงจำนวน Followers จาก GitHub API จริง (ห้ามสุ่มตัวเลข)
  - ปุ่ม Action 2 ปุ่ม:
    1. **Download Resume**: ดาวน์โหลด `Nittaya_Pana_Resume.pdf` (ไฟล์จริงเปิดอ่านได้)
    2. **Follow Me**: บันทึกลง Supabase Database พร้อมจำนวนผู้ติดตามจริง ป้องกันการกดซ้ำที่ระดับ Backend/DB
- **ฝั่งขวา (Profile Image)**:
  - รูปภาพจริงของเจ้าของเว็บไซต์ (หรือ Placeholder ที่เหมาะสม) ทรงกลม/มน พร้อมกรอบ Gradient / Shadow นุ่มนวล

#### Section 2: About Me
- หัวข้อหลัก: `About Me`
- ข้อมูลส่วนตัว: **นางสาวนิตยา ปานา** กำลังศึกษาอยู่ที่ **มหาวิทยาลัยพะเยา คณะเทคโนโลยีสารสนเทศและการสื่อสาร สาขาวิชาวิศวกรรมซอฟต์แวร์**
- 5 หัวข้อย่อย:
  1. **ความสนใจด้านเทคโนโลยี (Technology Interests)**: UX/UI Design, การออกแบบ User-centered, UI/UX ที่ดี
  2. **เป้าหมายในการทำงาน (Career Goals)**: ฝึกงาน UX/UI Design, เรียนรู้ตั้งแต่ทำความเข้าใจผู้ใช้ Wireframe ถึง Prototype, ทำงานร่วมกับ Developer
  3. **จุดเด่นในการทำงาน (Strengths)**: รับผิดชอบ, ใส่ใจรายละเอียด, พร้อมเรียนรู้, นำคำแนะนำมาปรับปรุง
  4. **สิ่งที่กำลังเรียนรู้ (Currently Learning)**: UX Research, Wireframing & Prototyping, Design System, Responsive Web Design, HTML/CSS/Frontend
  5. **แนวทางการทำงาน (Working Approach)**: เข้าใจปัญหา $\to$ วางโครงสร้าง $\to$ ออกแบบ $\to$ ทดลอง $\to$ ปรับปรุง

#### Section 3: Posts / Social Feed
- แสดงโพสต์แนวตั้ง เลื่อนดูได้ภายใน Section โดย**ไม่เปลี่ยนไปยัง Section Skills อัตโนมัติ** (แยก Scroll context ชัดเจน)
- รายละเอียดแต่ละโพสต์: Avatar, ชื่อเจ้าของ, วันที่, ข้อความ, รูปภาพ, จำนวน Like, ปุ่ม Like
- ระบบ Like: 1 บัญชี/ผู้ใช้กดได้ 1 ครั้ง บันทึกลง Database ป้องกันการกดซ้ำที่ระดับ DB (ไม่มีช่อง Comment)
- ระบบจัดการโพสต์: เจ้าของเพิ่ม ลบ แก้ไขโพสต์ผ่าน `/admin`

#### Section 4: Skills (3 หมวดหมู่)
1. **Hard Skills**:
   - *Wireframing*: วางโครงสร้างหน้าจอและลำดับองค์ประกอบ
   - *Design System*: ระบบสี ตัวอักษร ปุ่ม Component
   - *Interaction & Motion Design*: ออกแบบปฏิสัมพันธ์ Animation
2. **Soft Skills**:
   - *Continuous Learning*: เปิดรับความรู้และเทคโนโลยีใหม่
   - *Responsibility*: รับผิดชอบต่องาน
   - *Dedication & Commitment*: ขยัน ใส่ใจรายละเอียด
3. **Tools & Technologies** (Grid Layout พร้อม Icon/Logo และชื่อ):
   - GitHub
   - Visual Studio Code
   - Figma
   - Microsoft Word
   - Canva

#### Section 5: Contact Me
- **Contact Form**: 3 ช่อง (Name, Email ตรวจสอบรูปแบบ, Message textarea) + ปุ่ม `Send Message` พร้อม Loading/Success/Error state บันทึกลง DB และส่ง Email
- **ข้อมูลติดต่อเจ้าของ**:
  - Email: `nittaya503555@gmail.com` (มีปุ่ม Copy Email)
  - GitHub: `https://github.com/icx-nit/Portfolio` (เปิดแท็บใหม่)

#### Footer
- Copyright: `© 2026 Nittaya Pana. All Rights Reserved.`
- ตำแหน่ง: `UX/UI Designer`
- Quick Nav: Home, About Me, Skills, Contact Me
- Social: GitHub, Email
- Tagline: `Designed & Developed by Nittaya Pana`

#### Owner Authentication & Security
- Supabase Auth + RLS ป้องกันผู้ชมเข้าถึง Admin Dashboard
- ตรวจสอบสิทธิ์ฝั่ง Server ห้ามเปิดเผย Secret Keys ใน Client
- ห้ามแก้ไขไฟล์หรือฐานข้อมูลจนกว่าจะได้รับการอนุมัติอย่างเป็นทางการตาม Approval Workflow

---

## 14. อัปเดตการแก้ไข — กรอบรูปโปรไฟล์ การแก้บั๊กอนิเมชันเลื่อนหน้า แชทบอทแบบ Rule-Based การเว้นระยะเมนูและฟุตเตอร์ และแถบโพสแบบเลื่อนด้านข้าง

> ส่วนนี้แก้ไขส่วนก่อนหน้า หากขัดแย้งกัน ให้ยึดส่วนนี้เป็นหลัก
> สไตล์ภาพต้องยังเป็นไปตาม DESIGN.md และเนื้อหาทั้งหมดต้องดึงจากไฟล์ข้อมูลตาม PLAN.md

### 14.1 รูปโปรไฟล์ในกรอบ (แทนที่ตัวอักษร "NP") [x]
- [x] ใช้รูปโปรไฟล์ของเจ้าของ (`media_1793786764863_1f53436d.png`) เป็นรูปต้นฉบับ
- [x] นำรูปนี้ไปใส่ในกรอบแทนที่ตัวอักษรย่อ "NP" ทั้งใน Intro Card และ Hero Profile
- [x] ลบ/แทนที่พื้นหลังสีม่วงด้วยพื้นหลังน้ำเงินเข้มกรมท่า พร้อมแสงไล่สีฟ้าอมเขียวจาง ๆ ตาม DESIGN.md
- [x] ครอปและจัดตำแหน่งให้ใบหน้าอยู่กลางกรอบ และเห็นชัดเจนทุกขนาดหน้าจอ
- [x] บันทึกรูปที่ปรับแล้วเป็นไฟล์ WebP ใน `/public/images/profile.webp` และอ้างอิงจาก `data/profile.ts` / `data/portfolio-seed.ts` (ไม่ฮาร์ดโค้ดในคอมโพเนนต์)
- [x] หากยังไม่มีรูปโปรไฟล์ ให้แสดงตัวอักษรย่อ "NP" จากชื่อในข้อมูลโปรไฟล์

### 14.2 แก้บั๊ก: อนิเมชันเมื่อเลื่อนหน้า 1–5 [x]
- [x] เริ่มต้น scroll observer (Framer Motion `whileInView` หรือ IntersectionObserver) เมื่อคอมโพเนนต์ถูก mount
- [x] ผูก observer ใหม่เมื่อเลย์เอาต์เปลี่ยน เมื่ออนิเมชันเปิดหน้าจบ หรือเมื่อสลับโหมดสี
- [x] ปลดบล็อก flag หรือสถานะใด ๆ ไม่ให้ขัดขวางเหตุการณ์เลื่อนหน้าหลังจากนั้น
- [x] ตรวจสอบ element แม่ไม่ให้มี `overflow: hidden` บล็อก container เลื่อน (ปรับเป็น `overflow-x-clip`)
- [x] ใส่ `viewport={{ once: true, amount: 0.2 }}` / `amount={0.2} once={true}` ในทุกส่วนที่มีอนิเมชัน เพื่อให้อนิเมชันทำงานเสถียรเมื่อเลื่อนลง
- [x] รองรับ `prefers-reduced-motion`

### 14.3 แชทบอท: Rule-Based + Information Retrieval (ไม่ใช้ AI API) [x]
- [x] ระบบ Rule-Based และ Information Retrieval ไม่เรียก AI API ภายนอก ไม่มีค่าใช้จ่าย
- [x] ขอบเขต: ตอบเฉพาะข้อมูลพอร์ตโฟลิโอ (โปรไฟล์ การศึกษา ทักษะ โปรเจกต์ ติดต่อ เรซูเม่ ลิงก์)
- [x] คำถามนอกขอบเขต: ตอบด้วยข้อความปฏิเสธที่กำหนดไว้ และแนะนำหัวข้อเกี่ยวกับพอร์ต
- [x] ปรับรูปแบบข้อความ: ตัดวรรคตอน แปลงตัวพิมพ์เล็ก รองรับทั้งภาษาไทยและอังกฤษ
- [x] จับคู่เจตนา (กฎ) + การค้นคืนข้อมูล (Keyword / TF-IDF / Fuzzy Match ด้วย Fuse.js)
- [x] จัดรูปแบบคำตอบให้กระชับ มีลิงก์เมื่อเกี่ยวข้อง
- [x] Rate limit 20 ข้อความ/นาที/คน, ความยาวสูงสุด 300 ตัวอักษร, sanitize input ก่อนแสดงผล
- [x] ผ่านชุดทดสอบอัตโนมัติทั้ง 9 ข้อใน `src/lib/chatbot/chatbot.test.ts` (0 errors)

### 14.4 การเว้นระยะเมนูนำทาง (Navbar) [x]
- [x] เพิ่มระยะห่างแนวนอนระหว่างรายการเมนู เช่น `gap-8` บนเดสก์ท็อป
- [x] ปรับระยะให้ยืดหยุ่นตามขนาดหน้าจอ และมี hamburger บนมือถือ
- [x] แต่ละลิงก์สูงอย่างน้อย 44px สำหรับ touch target

### 14.5 การเว้นระยะขอบของฟุตเตอร์ (Footer) [x]
- [x] ขยับเนื้อหาฟุตเตอร์ให้กว้างขึ้นและชิดขอบจอมากขึ้น (padding `px-4` บนมือถือ, `px-8` บนเดสก์ท็อป)
- [x] ขยาย container เป็น `max-w-[1400px]` ให้โปร่ง ไม่กระจุกตรงกลาง

### 14.6 ส่วนโพส: แถบเลื่อนด้านข้างแบบแนวนอน (Horizontal Carousel) [x]
- [x] แถบเลื่อนแนวนอน (horizontal carousel) แสดงโพส 2 รายการเต็มบนเดสก์ท็อป ที่เหลือเลื่อนดูได้
- [x] ไม่เลื่อนอัตโนมัติ (manual scroll เท่านั้น)
- [x] เลื่อนได้ด้วย wheel / swipe / ปุ่มลูกศรซ้ายขวา
- [x] CSS scroll snap (`scroll-snap-type: x mandatory`)
- [x] ตัวบอกตำแหน่ง (dots indicator) ด้านล่าง คลิกเพื่อเลื่อนได้
- [x] มือถือ: 1 โพสเต็ม + peek โพสถัดไป
- [x] คงระบบกด Like ในแต่ละโพส

---

## 15. Portfolio Admin Dashboard (CMS Specification) [x]

- [x] **Layout & Bento Grid Design**: พัฒนา Admin Dashboard ดีไซน์ SaaS Bento Grid ตามภาพตัวอย่าง พร้อมแถบไอคอนนำทางแนวตั้ง (Slim Icon Rail Sidebar) โทนสี Night Violet และ Neon Cyan
- [x] **Bilingual Support (TH/EN)**: สลับภาษาไทย/อังกฤษได้ทันทีในหน้าแดชบอร์ดโดยไม่ต้องโหลดหน้าเว็บใหม่
- [x] **Section 3.1 Overview**: กราฟคลื่นเรืองแสง (Hero Wave Chart), กราฟโดนัทอัตราคงอยู่ (Retention Rate), การ์ดสถิติ 2x2 (ผู้ติดตาม, ไลค์, ข้อความ, GitHub), กราฟโดนัทจัดสรรทักษะ และกราฟแท่งความถี่การเข้าชมรายสัปดาห์
- [x] **Section 3.2 Profile Management**: แก้ไขชื่อ, ตำแหน่งงาน, คำแนะนำตัว, อีเมล, ลิงก์โซเชียลมีเดีย, และรูปโปรไฟล์ ซิงก์กับหน้าเว็บหลัก
- [x] **Section 3.3 Education & About Me Management**: ระบบเพิ่ม แก้ไข ลบ ประวัติการศึกษา และจัดการเนื้อหา 5 หัวข้อหลักของหน้า About Me
- [x] **Section 3.4 Skills Management**: จัดการ Hard Skills, Soft Skills และ Tools & Technologies (เปิด/ปิดการแสดงผล, ปรับระดับความเชี่ยวชาญ)
- [x] **Section 3.5 Post Management**: สร้างโพสต์ (รองรับ 2 ภาษา), แก้ไข, ลบ, จัดการหมวดหมู่ และพรีวิวแบบเรียลไทม์
- [x] **Section 3.6 Resume Management**: จัดการเวอร์ชันเรซูเม่ PDF, กำหนดไฟล์ Default ที่ใช้ดาวน์โหลดในหน้าเว็บหลักจริง และดูตัวอย่างเอกสาร
- [x] **Section 3.7 Contact Messages Management**: แสดงข้อความติดต่อจากฟอร์มหน้าเว็บ, ระบบแจ้งเตือนกระดิ่ง (Unread Badge), ฟิลเตอร์ All/Unread/Read, ทำเครื่องหมายอ่านแล้ว และปุ่มตอบกลับทางอีเมล
- [x] **Section 3.8 Followers & Likes Analytics**: แสดงสถิติผู้ติดตามและจำนวนหัวใจจริงแบบเรียลไทม์
- [x] **Section 3.9 GitHub Repositories Management**: ซิงก์คลังจาก GitHub `@icx-nit` แสดง Stars, Forks, ภาษาที่ใช้ และเลือก Feature แสดงบนพอร์ตโฟลิโอ
- [x] **Section 3.10 Authentication & Settings**: ตรวจสอบสิทธิ์การเข้าถึง (Protected route), บังคับใส่รหัสผ่านทุกครั้ง (ป้องกันการเด้งเข้าอัตโนมัติ), และปุ่มออกจากระบบปลอดภัย



