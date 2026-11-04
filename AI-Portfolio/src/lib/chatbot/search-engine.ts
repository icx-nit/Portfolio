import Fuse from "fuse.js";
import { portfolioKnowledgeBase, KnowledgeItem } from "./knowledge-base";

const OUT_OF_SCOPE_WORDS = [
  "weather", "forecast", "temperature", "recipe", "restaurant", "food",
  "stock", "crypto", "bitcoin", "president", "election", "politics",
  "movie", "song", "lyrics", "calculate", "math", "solve", "joke", "capital of",
  // Thai out of scope keywords
  "อากาศ", "พยากรณ์", "สูตรอาหาร", "ร้านอาหาร", "อาหาร", "หุ้น", "บิตคอยน์",
  "การเมือง", "เลือกตั้ง", "เพลง", "หนัง", "คำนวณ", "ตลก", "เมืองหลวง",
];

const fuseOptions = {
  includeScore: true,
  threshold: 0.5,
  keys: [
    { name: "questionPatterns", weight: 0.5 },
    { name: "keywords", weight: 0.35 },
    { name: "title", weight: 0.1 },
    { name: "answerEn", weight: 0.025 },
    { name: "answerTh", weight: 0.025 },
  ],
};

const fuse = new Fuse(portfolioKnowledgeBase, fuseOptions);

export interface ChatbotResponse {
  answer: string;
  sourceTitle?: string;
  isFallback: boolean;
  suggestedQuestions?: string[];
  detectedLanguage: "en" | "th";
}

// Check if string contains Thai Unicode characters (\u0E00-\u0E7F)
export function isThaiText(text: string): boolean {
  return /[\u0E00-\u0E7F]/.test(text);
}

export function queryPortfolioChatbot(userMessage: string): ChatbotResponse {
  const query = userMessage.trim().toLowerCase();
  const isThai = isThaiText(query);
  const lang = isThai ? "th" : "en";

  if (!query) {
    return {
      answer: isThai
        ? "กรุณาพิมพ์คำถามเกี่ยวกับ นิตยา ปานา เช่น การศึกษา ทักษะ หรือผลงานโปรเจกต์ครับ"
        : "Please ask a question regarding Nittaya Pana's portfolio, skills, projects, or education.",
      isFallback: true,
      detectedLanguage: lang,
    };
  }

  // 1. Check out-of-scope topics
  const isOutOfScope = OUT_OF_SCOPE_WORDS.some((word) => query.includes(word));
  if (isOutOfScope) {
    return {
      answer: isThai
        ? "ขออภัยครับ ผมสามารถตอบได้เฉพาะคำถามที่เกี่ยวข้องกับข้อมูลของ นิตยา ปานา (ประวัติการศึกษา, ทักษะทางเทคนิค, ผลงานโปรเจกต์ และการติดต่อ) เท่านั้นครับ"
        : "I'm sorry, I can only answer questions related to the portfolio owner's profile, education, skills, projects, and contact information.",
      isFallback: true,
      detectedLanguage: lang,
      suggestedQuestions: isThai
        ? [
            "นิตยา ปานา เรียนที่ไหน?",
            "มีทักษะการเขียนโปรแกรมอะไรบ้าง?",
            "มีผลงานโปรเจกต์อะไรบ้าง?",
            "ติดต่อ นิตยา ได้ทางไหน?",
          ]
        : [
            "What is Nittaya's educational background?",
            "What projects has Nittaya built?",
            "What programming languages does Nittaya know?",
            "How can I contact Nittaya?",
          ],
    };
  }

  // 2. Greetings
  if (["hi", "hello", "hey", "greetings"].includes(query)) {
    return {
      answer:
        "Hello! I am Nittaya Pana's portfolio assistant. Feel free to ask about Nittaya's Software Engineering studies at University of Phayao, technical skills, projects, or how to get in touch.",
      isFallback: false,
      detectedLanguage: "en",
      suggestedQuestions: [
        "What is Nittaya's educational background?",
        "What tech stack does Nittaya use?",
        "Can I download Nittaya's resume?",
      ],
    };
  }

  if (["สวัสดี", "หวัดดี", "ดีครับ", "ดีค่ะ", "สวัสดีครับ", "สวัสดีค่ะ"].includes(query)) {
    return {
      answer:
        "สวัสดีครับ! ผมคือผู้ช่วย AI ของ นิตยา ปานา สามารถสอบถามเกี่ยวกับประวัติการศึกษาที่ มหาวิทยาลัยพะเยา ทักษะทางเทคนิค ผลงาน หรือช่องทางการติดต่อได้เลยครับ",
      isFallback: false,
      detectedLanguage: "th",
      suggestedQuestions: [
        "นิตยา ศึกษาอยู่ที่ไหน?",
        "มีทักษะความสามารถอะไรบ้าง?",
        "ดูผลงานโปรเจกต์เด่น",
      ],
    };
  }

  // 3. Information Retrieval with Fuse.js
  const results = fuse.search(query);

  if (results && results.length > 0 && results[0].score !== undefined && results[0].score <= 0.6) {
    const bestMatch: KnowledgeItem = results[0].item;
    return {
      answer: isThai ? bestMatch.answerTh : bestMatch.answerEn,
      sourceTitle: bestMatch.title,
      isFallback: false,
      detectedLanguage: lang,
    };
  }

  // 4. Fallback for unknown questions
  return {
    answer: isThai
      ? "ขออภัยครับ ไม่พบข้อมูลที่ตรงกับคำถามของคุณในพอร์ตโฟลิโอนี้ คุณสามารถสอบถามเกี่ยวกับการศึกษาที่ ม.พะเยา ทักษะการพัฒนาเว็บ ผลงานโปรเจกต์ หรือการติดต่อได้ครับ"
      : "I couldn't find specific information matching your question in Nittaya's portfolio. You can ask about their university education, technical skills, software projects, or contact information directly.",
    isFallback: true,
    detectedLanguage: lang,
    suggestedQuestions: isThai
      ? [
          "นิตยา เรียนคณะอะไร มหาวิทยาลัยไหน?",
          "เชี่ยวชาญภาษาโปรแกรมอะไรบ้าง?",
          "มีโปรเจกต์อะไรที่น่าสนใจบ้าง?",
          "ขอช่องทางติดต่อหน่อย",
        ]
      : [
          "Where does Nittaya study?",
          "What programming languages does Nittaya know?",
          "What projects are showcased?",
          "How do I contact Nittaya?",
        ],
  };
}
