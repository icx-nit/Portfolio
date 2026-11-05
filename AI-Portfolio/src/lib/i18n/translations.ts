export type Language = "en" | "th";

export const translations = {
  en: {
    // Navigation
    nav: {
      brand: "Portfolio",
      home: "Home",
      about: "About Me",
      posts: "Posts",
      skills: "Skills",
      contact: "Contact Me",
      login: "Login",
      downloadResume: "Download Resume",
      follow: "Follow Me",
      following: "Following",
      askAi: "Ask Chatbot",
    },

    // Hero Section
    hero: {
      greeting: "Hi, I'm Nittaya",
      role: "UX/UI Designer",
      subheadline:
        "Passionate about user-centered design, crafting intuitive interfaces, and bridging aesthetics with seamless functionality.",
      downloadResume: "Download Resume",
      followMe: "Follow Me",
      following: "Following",
      githubTitle: "GitHub Portfolio",
      followersCount: "followers",
    },

    // Social Feed / Posts
    feed: {
      title: "Posts & Stories",
      subtitle: "Behind-the-scenes UX research, design systems, and daily design thoughts.",
      like: "Like",
      liked: "Liked",
      emptyState: "No posts published yet.",
    },

    // About Section
    about: {
      title: "About Me",
      fullNameLabel: "Full Name",
      fullNameValue: "Nittaya Pana (Miss Nittaya Pana)",
      universityLabel: "Institution",
      universityValue: "University of Phayao",
      facultyLabel: "Faculty",
      facultyValue: "School of Information and Communication Technology",
      majorLabel: "Major",
      majorValue: "Software Engineering",

      // 5 Topics
      topic1Title: "1. Technology Interests",
      topic1Desc:
        "Passionate about UX/UI Design and web development with a strong focus on user-centered principles. Deeply interested in crafting intuitive user interfaces, elevating user experience, and applying modern technology to solve real-world problems.",

      topic2Title: "2. Career Goals",
      topic2Desc:
        "Dedicated to advancing UX/UI Design capabilities through real internship experience. Eager to master the end-to-end design lifecycle from user research and wireframing to high-fidelity prototyping, while collaborating seamlessly with developers.",

      topic3Title: "3. Strengths",
      topic3Desc:
        "Highly responsible, detail-oriented, and eager to learn new concepts. Receptive to constructive feedback and committed to continuously refining design work to achieve the highest quality standards.",

      topic4Title: "4. Currently Learning",
      topic4Items: [
        "UX Research and user needs analysis",
        "Wireframing and interactive Prototyping",
        "Design Systems and Component Design",
        "Responsive Web Design for all viewports",
        "HTML, CSS, and Frontend Development fundamentals",
      ],

      topic5Title: "5. Working Approach",
      topic5Desc:
        "Committed to clean, accessible, and intuitive design. Working process begins with understanding the core problem, structuring user flow, crafting mockups, usability testing, and continuous iterative improvement.",
    },

    // Skills Section
    skills: {
      title: "Skills & Tools",
      subtitle: "Comprehensive overview of design capabilities, interpersonal strengths, and industry tools.",
      hardSkillsTitle: "Hard Skills",
      softSkillsTitle: "Soft Skills",
      toolsTitle: "Tools & Technologies",

      // Hard skills
      hard1Title: "Wireframing",
      hard1Desc: "Structuring screen layouts, information architecture, and user journeys prior to visual design.",
      hard2Title: "Design System",
      hard2Desc: "Establishing unified color tokens, typography scales, components, and design guidelines for consistency.",
      hard3Title: "Interaction & Motion Design",
      hard3Desc: "Designing intuitive micro-interactions, states, page transitions, and subtle animations that enhance UX.",

      // Soft skills
      soft1Title: "Continuous Learning",
      soft1Desc: "Actively seeking knowledge, exploring cutting-edge design trends, and embracing modern web technologies.",
      soft2Title: "Responsibility",
      soft2Desc: "Accountable, organized, and dedicated to delivering tasks punctually with high craftsmanship.",
      soft3Title: "Dedication & Commitment",
      soft3Desc: "Diligent, detail-oriented, and persistent in iterating designs to achieve optimal usability.",
    },

    // Contact Section
    contact: {
      title: "Contact Me",
      subtitle:
        "Feel free to reach out for UX/UI internship opportunities, collaborative projects, or design discussions.",
      directEmail: "Direct Email",
      copyEmail: "Copy Email",
      copied: "Copied!",
      githubProfile: "GitHub Profile",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "your.email@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Write your message here...",
      sendButton: "Send Message",
      sending: "Sending Message...",
      successTitle: "Message Sent Successfully!",
      successDesc: "Thank you for reaching out. Your message has been delivered to Nittaya Pana.",
      validationError: "Please fill in all required fields with a valid email address.",
    },

    // Footer
    footer: {
      role: "UX/UI Designer",
      copyright: "© 2026 Nittaya Pana. All Rights Reserved.",
      tagline: "Designed & Developed by Nittaya Pana",
      subtagline: "Creating meaningful digital experiences through design and technology.",
      adminLogin: "Owner Login",
    },

    // Chatbot
    chat: {
      title: "Portfolio Assistant",
      subtitle: "Chatbot for Inquiries",
      welcome:
        "Hello! I'm Nittaya's UX/UI Portfolio Assistant. Feel free to ask about education, UX/UI skills, design process, or contact details!",
      placeholder: "Ask about UX/UI skills, education, or projects...",
      sourcePrefix: "Source:",
      loading: "Searching portfolio knowledge...",
      cleared: "Chat conversation cleared.",
    },

    // Legacy Stats, Education, Projects (for compatibility)
    stats: {
      university: "ICT Student",
      universityLabel: "University of Phayao",
      repos: "Public Repos",
      reposLabel: "Synced via GitHub API",
      projects: "Showcase Projects",
      projectsLabel: "Software Engineering",
      followers: "Followers",
      followersLabel: "Community Subscriptions",
    },
    education: {
      title: "Academic Background",
      subtitle: "Higher education details at University of Phayao",
      degree: "Bachelor of Science (Software Engineering)",
      institution: "University of Phayao",
      faculty: "School of ICT",
      status: "Current Student",
      timeline: "2023 — Present",
      location: "Phayao, Thailand",
      description: "Focusing on UX/UI design, software architecture, and web technologies.",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Software systems and design work",
      filterAll: "All",
      filterFullStack: "Full-Stack",
      filterWeb: "Web Apps",
      filterTools: "Tools",
      viewDetails: "View Details",
      githubRepo: "GitHub Repository",
      liveDemo: "Live Demo",
      keyHighlights: "Architecture Highlights",
      technologies: "Technologies Used",
      close: "Close",
    },
  },

  th: {
    // Navigation
    nav: {
      brand: "Portfolio",
      home: "หน้าแรก",
      about: "เกี่ยวกับฉัน",
      posts: "โพสต์",
      skills: "ทักษะ",
      contact: "ติดต่อฉัน",
      login: "เข้าสู่ระบบ",
      downloadResume: "ดาวน์โหลดเรซูเม่",
      follow: "ติดตาม",
      following: "กำลังติดตาม",
      askAi: "ถามแชทบอท",
    },

    // Hero Section
    hero: {
      greeting: "สวัสดี ฉัน นิตยา",
      role: "UX/UI Designer",
      subheadline:
        "มุ่งมั่นพัฒนาการออกแบบที่คำนึงถึงผู้ใช้งานเป็นหลัก สร้างสรรค์หน้าจอที่เข้าใจง่าย สวยงาม ทันสมัย และตอบโจทย์การใช้งานจริง",
      downloadResume: "ดาวน์โหลดเรซูเม่",
      followMe: "ติดตาม",
      following: "กำลังติดตาม",
      githubTitle: "GitHub Portfolio",
      followersCount: "ผู้ติดตาม",
    },

    // Social Feed / Posts
    feed: {
      title: "โพสต์และบันทึกผลงาน",
      subtitle: "เบื้องหลังการวิจัย UX การจัดทำ Design System และบันทึกกระบวนการออกแบบ",
      like: "ถูกใจ",
      liked: "ถูกใจแล้ว",
      emptyState: "ยังไม่มีโพสต์เผยแพร่ในขณะนี้",
    },

    // About Section
    about: {
      title: "เกี่ยวกับฉัน",
      fullNameLabel: "ชื่อ-นามสกุล",
      fullNameValue: "นางสาวนิตยา ปานา",
      universityLabel: "สถาบันการศึกษา",
      universityValue: "มหาวิทยาลัยพะเยา",
      facultyLabel: "คณะ",
      facultyValue: "คณะเทคโนโลยีสารสนเทศและการสื่อสาร",
      majorLabel: "สาขาวิชา",
      majorValue: "สาขาวิชาวิศวกรรมซอฟต์แวร์",

      // 5 Topics
      topic1Title: "1. ความสนใจด้านเทคโนโลยี (Technology Interests)",
      topic1Desc:
        "มีความสนใจด้าน UX/UI Design และการพัฒนาเว็บไซต์ โดยให้ความสำคัญกับการออกแบบที่คำนึงถึงผู้ใช้งานเป็นหลัก สนใจการออกแบบ User Interface การสร้าง User Experience ที่ดี และการนำเทคโนโลยีมาประยุกต์ใช้เพื่อแก้ไขปัญหาในการใช้งานจริง",

      topic2Title: "2. เป้าหมายในการทำงาน (Career Goals)",
      topic2Desc:
        "ต้องการพัฒนาทักษะด้าน UX/UI Design ผ่านการฝึกงานและประสบการณ์ทำงานจริง เรียนรู้กระบวนการออกแบบตั้งแต่การทำความเข้าใจผู้ใช้ การสร้าง Wireframe ไปจนถึงการออกแบบ Prototype พร้อมพัฒนาตนเองให้สามารถทำงานร่วมกับทีม Developer ได้อย่างมีประสิทธิภาพ",

      topic3Title: "3. จุดเด่นในการทำงาน (Strengths)",
      topic3Desc:
        "เป็นคนตั้งใจทำงาน มีความรับผิดชอบ ใส่ใจรายละเอียด และพร้อมเรียนรู้สิ่งใหม่ ๆ สามารถรับฟังความคิดเห็นและนำคำแนะนำมาปรับปรุงงานออกแบบให้ดีขึ้น",

      topic4Title: "4. สิ่งที่กำลังเรียนรู้ (Currently Learning)",
      topic4Items: [
        "UX Research และการวิเคราะห์ความต้องการของผู้ใช้งาน",
        "Wireframing และ Prototyping",
        "Design System และ Component Design",
        "Responsive Web Design",
        "HTML, CSS และพื้นฐาน Frontend Development",
      ],

      topic5Title: "5. แนวทางการทำงาน (Working Approach)",
      topic5Desc:
        "ให้ความสำคัญกับการออกแบบที่ใช้งานง่าย เข้าใจได้ไม่ซับซ้อน และตอบโจทย์ผู้ใช้งาน โดยเริ่มจากการทำความเข้าใจปัญหา วางโครงสร้าง ออกแบบ ทดลองใช้งาน และปรับปรุงผลงานอย่างต่อเนื่อง",
    },

    // Skills Section
    skills: {
      title: "ทักษะและความสามารถ",
      subtitle: "ทักษะความสามารถด้าน UX/UI Design ทักษะการทำงานร่วมกับผู้อื่น และเครื่องมือที่ใช้ทำงานจริง",
      hardSkillsTitle: "Hard Skills",
      softSkillsTitle: "Soft Skills",
      toolsTitle: "Tools & Technologies",

      // Hard skills
      hard1Title: "Wireframing",
      hard1Desc: "ความสามารถในการวางโครงสร้างหน้าจอและจัดลำดับองค์ประกอบ เพื่อกำหนดรูปแบบการใช้งานก่อนเข้าสู่ขั้นตอนการออกแบบจริง",
      hard2Title: "Design System",
      hard2Desc: "ความเข้าใจในการจัดทำระบบสี ตัวอักษร ปุ่ม Component และรูปแบบการออกแบบ เพื่อให้เว็บไซต์หรือแอปพลิเคชันมีความสม่ำเสมอ",
      hard3Title: "Interaction & Motion Design",
      hard3Desc: "ความสามารถในการออกแบบปฏิสัมพันธ์ระหว่างผู้ใช้กับระบบ เช่น การกดปุ่ม การเปลี่ยนหน้า การแสดงสถานะ และ Animation เพื่อเพิ่มประสบการณ์การใช้งาน",

      // Soft skills
      soft1Title: "Continuous Learning",
      soft1Desc: "ชอบเรียนรู้และพัฒนาตนเองอยู่เสมอ พร้อมเปิดรับความรู้และเทคโนโลยีใหม่ ๆ",
      soft2Title: "Responsibility",
      soft2Desc: "มีความรับผิดชอบต่องานที่ได้รับมอบหมาย และพยายามทำงานให้สำเร็จตามเป้าหมาย",
      soft3Title: "Dedication & Commitment",
      soft3Desc: "มีความขยัน ตั้งใจ และใส่ใจในรายละเอียดของงาน พร้อมปรับปรุงผลงานให้ดีขึ้นอยู่เสมอ",
    },

    // Contact Section
    contact: {
      title: "ติดต่อฉัน",
      subtitle:
        "หากท่านมีโอกาสในการฝึกงาน UX/UI Designer หรือต้องการพูดคุยแลกเปลี่ยนด้านการออกแบบ สามารถติดต่อได้โดยตรงครับ",
      directEmail: "อีเมลติดต่อโดยตรง",
      copyEmail: "คัดลอกอีเมล",
      copied: "คัดลอกแล้ว!",
      githubProfile: "GitHub Profile",
      nameLabel: "ชื่อของคุณ",
      namePlaceholder: "กรุณาระบุชื่อของคุณ",
      emailLabel: "อีเมลของคุณ",
      emailPlaceholder: "your.email@example.com",
      messageLabel: "ข้อความ",
      messagePlaceholder: "เขียนข้อความที่ต้องการติดต่อที่นี่...",
      sendButton: "ส่งข้อความ",
      sending: "กำลังส่งข้อความ...",
      successTitle: "ส่งข้อความสำเร็จเรียบร้อย!",
      successDesc: "ขอบคุณสำหรับการติดต่อ ข้อความของคุณถูกส่งไปยัง นิตยา ปานา เรียบร้อยแล้วครับ",
      validationError: "กรุณากรอกข้อมูลให้ครบถ้วนและใช้อีเมลที่ถูกต้อง",
    },

    // Footer
    footer: {
      role: "UX/UI Designer",
      copyright: "© 2026 Nittaya Pana. All Rights Reserved.",
      tagline: "ออกแบบและพัฒนาโดย นิตยา ปานา",
      subtagline: "สร้างสรรค์ประสบการณ์ดิจิทัลที่มีคุณค่าผ่านการออกแบบและเทคโนโลยี",
      adminLogin: "เข้าสู่ระบบเจ้าของเว็บไซต์",
    },

    // Chatbot
    chat: {
      title: "ผู้ช่วยตอบคำถามพอร์ตโฟลิโอ",
      subtitle: "Chatbot สำหรับสอบถาม",
      welcome:
        "สวัสดีค่ะ! ฉันคือผู้ช่วย AI ประจำพอร์ตโฟลิโอของ นิตยา ปานา คุณสามารถสอบถามเกี่ยวกับการศึกษา ทักษะ UX/UI เครื่องมือที่ใช้ หรือข้อมูลการติดต่อได้เลยค่ะ",
      placeholder: "สอบถามเกี่ยวกับทักษะ UX/UI, การศึกษา หรือเครื่องมือ...",
      sourcePrefix: "แหล่งอ้างอิง:",
      loading: "กำลังค้นหาข้อมูลพอร์ตโฟลิโอ...",
      cleared: "ล้างการสนทนาเรียบร้อยแล้วค่ะ",
    },

    // Legacy Stats, Education, Projects (for compatibility)
    stats: {
      university: "นิสิต ICT",
      universityLabel: "มหาวิทยาลัยพะเยา",
      repos: "Public Repos",
      reposLabel: "Synced ผ่าน GitHub API",
      projects: "ผลงานโปรเจกต์",
      projectsLabel: "วิศวกรรมซอฟต์แวร์",
      followers: "ผู้ติดตาม",
      followersLabel: "การติดตามจากผู้เข้าชม",
    },
    education: {
      title: "ประวัติการศึกษาและพื้นฐานทางวิศวกรรม",
      subtitle: "ข้อมูลการศึกษาระดับอุดมศึกษา",
      degree: "วิทยาศาสตรบัณฑิต (วิศวกรรมซอฟต์แวร์)",
      institution: "มหาวิทยาลัยพะเยา",
      faculty: "คณะเทคโนโลยีสารสนเทศและการสื่อสาร",
      status: "กำลังศึกษา",
      timeline: "2566 — ปัจจุบัน",
      location: "พะเยา, ประเทศไทย",
      description: "ศึกษาด้านสถาปัตยกรรมซอฟต์แวร์ และการออกแบบ UX/UI",
    },
    projects: {
      title: "ผลงานโปรเจกต์เด่น",
      subtitle: "ระบบซอฟต์แวร์ที่พัฒนาขึ้นจริง",
      filterAll: "ทั้งหมด",
      filterFullStack: "Full-Stack",
      filterWeb: "เว็บแอปพลิเคชัน",
      filterTools: "เครื่องมือและระบบ",
      viewDetails: "ดูรายละเอียด",
      githubRepo: "ซอร์สโค้ด GitHub",
      liveDemo: "ทดลองใช้งานจริง",
      keyHighlights: "ไฮไลต์สถาปัตยกรรมระบบ",
      technologies: "เทคโนโลยีที่ใช้",
      close: "ปิด",
    },
  },
};
