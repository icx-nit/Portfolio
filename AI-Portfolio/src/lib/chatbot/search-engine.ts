import Fuse from "fuse.js";
import { portfolioKnowledgeBase, KnowledgeItem } from "./knowledge-base";

export const MAX_MESSAGE_LENGTH = 300;

// Explicit out-of-scope keywords (general knowledge, politics, coding problems, other persons, etc.)
const OUT_OF_SCOPE_WORDS = [
  "capital of", "weather", "forecast", "temperature", "recipe", "restaurant", "food",
  "stock", "crypto", "bitcoin", "president", "election", "politics", "war", "news",
  "movie", "song", "lyrics", "calculate", "math", "solve", "joke", "poem", "story",
  "write code", "fix code", "python code", "javascript code", "openai", "chatgpt", "gemini",
  // Thai
  "เมืองหลวง", "อากาศ", "พยากรณ์", "สูตรอาหาร", "ร้านอาหาร", "อาหาร", "หุ้น", "บิตคอยน์",
  "การเมือง", "เลือกตั้ง", "สงคราม", "ข่าว", "เพลง", "หนัง", "คำนวณ", "ตลก", "เขียนโค้ด",
  "แก้โค้ด", "การบ้าน",
];

export interface ChatbotResponse {
  answer: string;
  sourceTitle?: string;
  isFallback: boolean;
  suggestedQuestions?: string[];
  detectedLanguage: "en" | "th";
  actionUrl?: string;
  actionLabel?: string;
}

// Check if string contains Thai Unicode characters (\u0E00-\u0E7F)
export function isThaiText(text: string): boolean {
  return /[\u0E00-\u0E7F]/.test(text);
}

// Text normalization: lowercase, strip punctuation, strip excess spaces
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Initialize Fuse.js with fuzzy matching
const fuseOptions = {
  includeScore: true,
  threshold: 0.55,
  keys: [
    { name: "questionPatterns", weight: 0.5 },
    { name: "keywords", weight: 0.35 },
    { name: "title", weight: 0.1 },
    { name: "answerEn", weight: 0.025 },
    { name: "answerTh", weight: 0.025 },
  ],
};

const fuse = new Fuse(portfolioKnowledgeBase, fuseOptions);

// Intent Rule Matching Keywords
const INTENT_RULES: Record<string, string[]> = {
  education: [
    "education", "study", "school", "degree", "university", "college", "graduated",
    "การศึกษา", "จบจาก", "เรียน", "มหาวิทยาลัย", "ม.พะเยา", "มพ", "คณะ", "สาขา",
  ],
  projects: [
    "project", "projects", "work", "built", "portfolio", "post", "posts", "feed",
    "ผลงาน", "โปรเจกต์", "โปรเจ็ค", "งาน", "งานที่ทำ", "ทำอะไรบ้าง", "โพสต์",
  ],
  skills: [
    "skill", "skills", "tech", "stack", "tool", "tools", "hard skill", "soft skill",
    "ทักษะ", "ความสามารถ", "เครื่องมือ", "ฮาร์ดสกิล", "ซอฟต์สกิล", "figma", "wirefram",
  ],
  contact: [
    "email", "contact", "reach", "hire", "message",
    "ติดต่อ", "อีเมล", "เมล", "ส่งข้อความ", "โทร", "กิตฮับ", "github",
  ],
  resume: [
    "resume", "cv", "download resume",
    "เรซูเม่", "ซีวี", "ดาวน์โหลด", "โหลด", "download",
  ],
  profile: [
    "who", "name", "about you", "developer", "designer", "owner", "nittaya", "pana",
    "ชื่อ", "ใคร", "ผู้พัฒนา", "ดีไซเนอร์", "นิตยา", "ปานา", "เจ้าของ", "ประวัติ",
  ],
};

export function queryPortfolioChatbot(userMessage: string): ChatbotResponse {
  const rawText = userMessage || "";
  const isThai = isThaiText(rawText);
  const lang = isThai ? "th" : "en";

  // Length check: max 300 characters
  if (rawText.length > MAX_MESSAGE_LENGTH) {
    return {
      answer: isThai
        ? `ข้อความยาวเกินกำหนด (สูงสุด ${MAX_MESSAGE_LENGTH} ตัวอักษร) กรุณากระชับคำถามแล้วลองใหม่อีกครั้งครับ`
        : `Message is too long (maximum ${MAX_MESSAGE_LENGTH} characters). Please shorten your question and try again.`,
      isFallback: true,
      detectedLanguage: lang,
    };
  }

  const normalized = normalizeText(rawText);

  if (!normalized) {
    return {
      answer: isThai
        ? "กรุณาพิมพ์คำถามเกี่ยวกับ นิตยา ปานา เช่น การศึกษา ทักษะ ผลงาน หรือการติดต่อค่ะ"
        : "Please ask a question regarding Nittaya Pana's education, skills, projects, or contact details.",
      isFallback: true,
      detectedLanguage: lang,
    };
  }

  // 1. Check out-of-scope rules (General knowledge, math, politics, etc.)
  const isOutOfScope = OUT_OF_SCOPE_WORDS.some((word) => normalized.includes(word));
  if (isOutOfScope) {
    return {
      answer: isThai
        ? "ขออภัย ฉันตอบได้เฉพาะคำถามเกี่ยวกับข้อมูลในพอร์ตโฟลิโอนี้ เช่น การศึกษา ผลงาน ทักษะ และการติดต่อ"
        : "Sorry, I can only answer questions about this portfolio, such as education, projects, skills, and contact details.",
      isFallback: true,
      detectedLanguage: lang,
      suggestedQuestions: isThai
        ? ["คุณสร้างโปรเจกต์อะไรบ้าง", "คุณจบการศึกษาจากที่ไหน", "ติดต่อคุณได้อย่างไร"]
        : ["What projects have you created?", "Where did you study?", "How can I contact you?"],
    };
  }

  // 2. Greetings
  const greetingEn = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon"];
  const greetingTh = ["สวัสดี", "หวัดดี", "ดีครับ", "ดีค่ะ", "สวัสดีครับ", "สวัสดีค่ะ", "ฮัลโหล"];

  if (greetingEn.includes(normalized)) {
    return {
      answer: "Hello! I am Nittaya Pana's portfolio assistant. How can I help you today?",
      isFallback: false,
      detectedLanguage: "en",
      suggestedQuestions: ["What projects have you created?", "Where did you study?", "How can I contact you?"],
    };
  }

  if (greetingTh.includes(normalized)) {
    return {
      answer: "สวัสดีครับ! ผมคือผู้ช่วยพอร์ตโฟลิโอของ นิตยา ปานา มีอะไรให้ผมช่วยแนะนำเกี่ยวกับผลงาน การศึกษา หรือทักษะไหมครับ?",
      isFallback: false,
      detectedLanguage: "th",
      suggestedQuestions: ["คุณสร้างโปรเจกต์อะไรบ้าง", "คุณจบการศึกษาจากที่ไหน", "ติดต่อคุณได้อย่างไร"],
    };
  }

  // 3. Rule-based Intent Matching
  for (const [category, keywords] of Object.entries(INTENT_RULES)) {
    const matched = keywords.some((kw) => normalized.includes(kw));
    if (matched) {
      const item = portfolioKnowledgeBase.find((k) => k.category === category);
      if (item) {
        return {
          answer: isThai ? item.answerTh : item.answerEn,
          sourceTitle: item.title,
          isFallback: false,
          detectedLanguage: lang,
          actionUrl: item.actionUrl,
          actionLabel: isThai ? item.actionLabelTh : item.actionLabelEn,
        };
      }
    }
  }

  // 4. Information Retrieval with Fuzzy Matching (Fuse.js)
  const results = fuse.search(normalized);
  if (results && results.length > 0 && results[0].score !== undefined && results[0].score <= 0.6) {
    const bestMatch: KnowledgeItem = results[0].item;
    return {
      answer: isThai ? bestMatch.answerTh : bestMatch.answerEn,
      sourceTitle: bestMatch.title,
      isFallback: false,
      detectedLanguage: lang,
      actionUrl: bestMatch.actionUrl,
      actionLabel: isThai ? bestMatch.actionLabelTh : bestMatch.actionLabelEn,
    };
  }

  // 5. Fallback: Not found in portfolio
  return {
    answer: isThai
      ? "ฉันไม่พบข้อมูลนี้ในพอร์ตโฟลิโอ ลองติดต่อเจ้าของผ่านฟอร์ม Contact ได้เลย"
      : "I could not find that in the portfolio. You can reach out through the Contact form.",
    isFallback: true,
    detectedLanguage: lang,
    suggestedQuestions: isThai
      ? ["คุณสร้างโปรเจกต์อะไรบ้าง", "คุณจบการศึกษาจากที่ไหน", "ติดต่อคุณได้อย่างไร"]
      : ["What projects have you created?", "Where did you study?", "How can I contact you?"],
  };
}
