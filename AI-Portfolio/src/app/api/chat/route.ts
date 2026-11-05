import { NextRequest, NextResponse } from "next/server";
import { queryPortfolioChatbot, MAX_MESSAGE_LENGTH, isThaiText } from "@/lib/chatbot/search-engine";

// Rate limiting in-memory store: IP / identifier -> list of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  // Keep only requests within the last minute
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const PORTFOLIO_SYSTEM_PROMPT = `You are the official AI Assistant for Nittaya Pana's Personal Portfolio Website.
Your role is to represent Nittaya Pana professionally, accurately, and politely to recruiters, hiring managers, and visitors.

ABOUT NITTAYA PANA (นิตยา ปานา):
- Name: Nittaya Pana (นิตยา ปานา)
- Professional Title: UX/UI Designer & Frontend Developer
- Education: Bachelor of Science in Software Engineering, School of Information and Communication Technology (คณะเทคโนโลยีสารสนเทศและการสื่อสาร), University of Phayao (มหาวิทยาลัยพะเยา), 2023 - Present
- Core Specialization: User-Centered Design, Wireframing, Interactive Prototyping, Design Systems, Clean Web Interfaces
- Hard Skills: Wireframing, Interactive Prototyping, Design Systems, Component Design, Responsive Web Design, Interaction & Motion Design, UX Research, HTML & CSS
- Tools & Software: Canva, Microsoft Word, Figma, Visual Studio Code, GitHub
- Soft Skills: Problem Solving, Team Collaboration, Empathetic Communication, Attention to Detail, Continuous Learning
- Currently Learning: UX Research and User Needs Analysis, Advanced Design Systems, Frontend Engineering
- Working Approach: Focus on usability, intuitive flow, user-centric problem solving, continuous refinement based on user feedback
- Featured Projects:
  1. Personal Portfolio Website (Next.js, TypeScript, Tailwind CSS, CMS Admin Dashboard, Real-time Interactions)
  2. ngernngern-thongthong (Personal income and expense recording system - Vue)
  3. openclaw (Software development repository - Shell)
  4. Software Document Specification (Software engineering documentation repository)
- Contact Details:
  - Email: nittaya503555@gmail.com
  - GitHub: https://github.com/icx-nit
- Resume: Can be downloaded directly via the "ดาวน์โหลด Resume" button on the hero section (/Nittaya_Pana_Resume.pdf).

STRICT GUARDRAILS & BEHAVIOR RULES:
1. STRICT PORTFOLIO SCOPE: Answer ONLY questions related to Nittaya Pana, her educational background, UX/UI skills, design process, projects, tools, and contact info.
2. OUT OF SCOPE REJECTION: If a user asks about anything outside Nittaya's portfolio (such as general programming homework, solving math equations, weather, general news, politics, financial advice, cryptocurrency, cooking recipes, poems, jokes, or general AI assistance):
   - In Thai, politely respond: "ขออภัยด้วยนะคะ ฉันเป็นผู้ช่วย AI ประจำพอร์ตฟอลิโอของ คุณนิตยา ปานา จึงสามารถให้ข้อมูลได้เฉพาะประวัติ การศึกษา ทักษะ UX/UI และผลงานของคุณนิตยาเท่านั้นค่ะ หากสนใจผลงานหรือต้องการติดต่อ สอบถามได้เลยนะคะ!"
   - In English, politely respond: "I apologize, but I am an AI assistant dedicated specifically to Nittaya Pana's portfolio. I can only provide information regarding Nittaya's background, education, UX/UI skills, projects, and contact info. Please feel free to ask about her design work!"
3. LANGUAGE ADAPTATION: Detect and reply in the same language the user asked (Thai for Thai, English for English).
4. TONE: Warm, professional, polite, humble, and concise (keep answers within 2-4 sentences unless detailed project info is requested).
5. HONESTY: Never hallucinate or invent fake jobs, degrees, or metrics. Stick strictly to the facts provided above.`;

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting check
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          answer: "คุณส่งข้อความเร็วเกินไป (จำกัดไม่เกิน 20 ข้อความต่อนาที) กรุณารอสักครู่แล้วลองใหม่อีกครั้งครับ / Rate limit exceeded. Please wait a moment before sending another message.",
          isFallback: true,
          detectedLanguage: "th",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const rawMessage = body.message;

    if (!rawMessage || typeof rawMessage !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a valid string." },
        { status: 400 }
      );
    }

    // 2. Input Sanitization: strip dangerous HTML tags and control chars
    const sanitized = rawMessage
      .replace(/[<>]/g, "")
      .slice(0, MAX_MESSAGE_LENGTH)
      .trim();

    const lang: "th" | "en" = isThaiText(sanitized) ? "th" : "en";

    // 3. Check for OrcaRouter API Key
    const orcarouterKey = process.env.ORCAROUTER_API_KEY;

    if (orcarouterKey && orcarouterKey.startsWith("sk-orca-")) {
      try {
        console.log("[Chatbot] Querying OrcaRouter AI with Guardrails...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const orcaRes = await fetch("https://api.orcarouter.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${orcarouterKey}`,
          },
          body: JSON.stringify({
            model: "orcarouter/auto",
            messages: [
              { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
              { role: "user", content: sanitized },
            ],
            temperature: 0.25,
            max_tokens: 400,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (orcaRes.ok) {
          const data = await orcaRes.json();
          const answer = data.choices?.[0]?.message?.content?.trim();

          if (answer) {
            console.log("[Chatbot] OrcaRouter Response successfully generated.");
            return NextResponse.json({
              answer,
              sourceTitle: "OrcaRouter AI",
              isFallback: false,
              suggestedQuestions: lang === "th"
                ? ["ทักษะด้าน UX/UI มีอะไรบ้าง?", "ดูผลงานโปรเจกต์เด่น", "ช่องทางการติดต่อ"]
                : ["What are your UX/UI skills?", "Tell me about your projects", "How can I contact you?"],
              detectedLanguage: lang,
            });
          }
        } else {
          const errText = await orcaRes.text().catch(() => "");
          console.warn("[Chatbot] OrcaRouter returned non-200 status:", orcaRes.status, errText);
        }
      } catch (orcaErr: any) {
        console.warn("[Chatbot] OrcaRouter request failed or timed out, falling back to local engine:", orcaErr.message);
      }
    }

    // 4. Seamless Fallback: Query Rule-based + Information Retrieval engine
    console.log("[Chatbot] Running Local Rule-Based & Retrieval Engine...");
    const response = queryPortfolioChatbot(sanitized);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chatbot API route error:", error);
    return NextResponse.json(
      {
        answer: "เกิดข้อผิดพลาดในการประมวลผลคำถาม กรุณาลองใหม่อีกครั้ง / An unexpected error occurred while processing your question.",
        isFallback: true,
        detectedLanguage: "th",
      },
      { status: 500 }
    );
  }
}
