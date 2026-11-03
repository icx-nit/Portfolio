import Fuse from "fuse.js";
import { portfolioKnowledgeBase, KnowledgeItem } from "./knowledge-base";

const OUT_OF_SCOPE_WORDS = [
  "weather",
  "forecast",
  "temperature",
  "recipe",
  "restaurant",
  "food",
  "stock",
  "crypto",
  "bitcoin",
  "president",
  "election",
  "politics",
  "movie",
  "song",
  "lyrics",
  "calculate",
  "math",
  "solve",
  "joke",
  "capital of",
];

const fuseOptions = {
  includeScore: true,
  threshold: 0.45,
  keys: [
    { name: "questionPatterns", weight: 0.5 },
    { name: "keywords", weight: 0.3 },
    { name: "title", weight: 0.15 },
    { name: "answer", weight: 0.05 },
  ],
};

const fuse = new Fuse(portfolioKnowledgeBase, fuseOptions);

export interface ChatbotResponse {
  answer: string;
  sourceTitle?: string;
  isFallback: boolean;
  suggestedQuestions?: string[];
}

export function queryPortfolioChatbot(userMessage: string): ChatbotResponse {
  const query = userMessage.trim().toLowerCase();

  if (!query) {
    return {
      answer: "Please ask a question regarding Nittaya Pana's portfolio, skills, projects, or education.",
      isFallback: true,
    };
  }

  // Check out-of-scope keywords
  const isOutOfScope = OUT_OF_SCOPE_WORDS.some((word) => query.includes(word));
  if (isOutOfScope) {
    return {
      answer:
        "I'm sorry, I can only answer questions about the portfolio owner, Nittaya Pana, including their profile, education, skills, projects, and experience.",
      isFallback: true,
      suggestedQuestions: [
        "What is Nittaya's educational background?",
        "What projects has Nittaya built?",
        "What programming languages does Nittaya know?",
        "How can I contact Nittaya?",
      ],
    };
  }

  // Exact greetings check
  if (["hi", "hello", "hey", "sawasdee", "greetings"].includes(query)) {
    return {
      answer:
        "Hello! I am Nittaya Pana's portfolio assistant. Feel free to ask about Nittaya's Software Engineering studies at University of Phayao, technical skills, projects, or how to get in touch.",
      isFallback: false,
      suggestedQuestions: [
        "What is Nittaya's educational background?",
        "What tech stack does Nittaya use?",
        "Can I download Nittaya's resume?",
      ],
    };
  }

  // Execute fuzzy Information Retrieval via Fuse.js
  const results = fuse.search(query);

  if (results && results.length > 0 && results[0].score !== undefined && results[0].score <= 0.55) {
    const bestMatch: KnowledgeItem = results[0].item;
    return {
      answer: bestMatch.answer,
      sourceTitle: bestMatch.title,
      isFallback: false,
    };
  }

  // Fallback for unanswerable/unknown questions
  return {
    answer:
      "I couldn't find specific information matching your question in Nittaya's portfolio. You can ask about their university education, technical skills, software projects, or contact information directly.",
    isFallback: true,
    suggestedQuestions: [
      "Where does Nittaya study?",
      "What programming languages does Nittaya know?",
      "What projects are showcased?",
      "How do I contact Nittaya?",
    ],
  };
}
