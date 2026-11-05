"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Trash2,
  Bot,
  User,
  Loader2,
  AlertCircle,
  Info,
} from "lucide-react";
import { useApp } from "@/lib/i18n/context";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  sourceTitle?: string;
  timestamp: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SESSION_STORAGE_KEY = "nittaya_portfolio_chat_session";

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const { language, t } = useApp();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWidgetOpen, setIsWidgetOpen] = useState(isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync external isOpen prop with local state
  useEffect(() => {
    setIsWidgetOpen(isOpen);
  }, [isOpen]);

  const defaultSuggestedQuestions =
    language === "th"
      ? [
          "นิตยา ศึกษาอยู่ที่ไหน?",
          "มีทักษะ UX/UI อะไรบ้าง?",
          "ใช้เครื่องมืออะไรทำงานบ้าง?",
          "ติดต่อ นิตยา ได้ทางไหน?",
          "ขอดาวน์โหลดเรซูเม่",
        ]
      : [
          "Where does Nittaya study?",
          "What are Nittaya's UX/UI skills?",
          "What design tools does she use?",
          "How can I contact Nittaya?",
          "Can I download the resume?",
        ];

  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(
    defaultSuggestedQuestions
  );

  // 1. Load conversation from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // Fallback
    }

    // Default welcome message on first visit
    setMessages([
      {
        id: "welcome-msg",
        sender: "bot",
        text: t.chat.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [language, t.chat.welcome]);

  // 2. Persist conversation to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  // Update suggestions on language change
  useEffect(() => {
    setSuggestedQuestions(defaultSuggestedQuestions);
  }, [language]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isWidgetOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isWidgetOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setErrorMessage("");

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to retrieve response.");
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.answer || "No response received.",
        sourceTitle: data.sourceTitle,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
        setSuggestedQuestions(data.suggestedQuestions);
      }
    } catch (err: unknown) {
      console.error("Chat error:", err);
      const failText =
        language === "th"
          ? "ขออภัย เกิดข้อผิดพลาดในการค้นหาข้อมูล กรุณาลองใหม่อีกครั้งครับ"
          : "Sorry, I encountered an issue retrieving the information. Please try again.";
      setErrorMessage(failText);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: failText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat: Leave completely empty, NO automatic response!
  const handleClearHistory = () => {
    setMessages([]);
    setErrorMessage("");
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify([]));
    } catch {}
  };

  return (
    <>
      {/* ========================================================= */}
      {/* FLOATING CHAT BUTTON (Bottom-Right Cyan Bubble)            */}
      {/* ========================================================= */}
      <button
        onClick={() => {
          setIsWidgetOpen(!isWidgetOpen);
          if (isWidgetOpen) onClose();
        }}
        aria-label="Toggle Portfolio Chatbot"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-ultraviolet-core text-night-violet font-bold flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-cyan-400/40"
      >
        {isWidgetOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-night-violet" />
          </div>
        )}
      </button>

      {/* ========================================================= */}
      {/* CHAT WINDOW / PANEL                                       */}
      {/* ========================================================= */}
      {isWidgetOpen && (
        <div
          role="dialog"
          aria-label="Chatbot Interface"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[600px] max-h-[82vh] bg-[#0c031d]/95 border border-cyan-500/30 rounded-3xl flex flex-col shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl animate-fade-in"
        >
          {/* Header: Removed IR Model badge & updated subtitle to Chatbot สำหรับสอบถาม */}
          <div className="p-4 sm:px-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-ultraviolet-core/30 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-soft-quartz">
                  {t.chat.title}
                </h3>
                <span className="text-[11px] text-cyan-400/90 font-medium block">
                  {language === "th" ? "Chatbot สำหรับสอบถาม" : "Chatbot for Inquiries"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-2 rounded-xl text-ash-lilac hover:text-pink-400 hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="ล้างประวัติการสนทนา (Clear history)"
                aria-label="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsWidgetOpen(false);
                  onClose();
                }}
                className="p-2 rounded-xl text-ash-lilac hover:text-soft-quartz hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="ปิดหน้าต่าง (Close)"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* System Capability Disclaimer Banner */}
          <div className="px-4 py-2 bg-cyan-500/[0.08] border-b border-cyan-400/15 flex items-start gap-2 text-[11px] text-cyan-300 font-medium leading-tight">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-400" />
            <p>
              {language === "th"
                ? "ข้อจำกัด: แชทบอทนี้เป็นระบบค้นหาข้อมูลจากพอร์ตโฟลิโอเท่านั้น"
                : "Limitation: This chatbot is an information retrieval system for this portfolio only."}
            </p>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain bg-[#080114]/50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-ash-lilac/70 space-y-2">
                <Bot className="w-8 h-8 text-cyan-400/50" />
                <p className="text-xs">
                  {language === "th"
                    ? "ประวัติการสนทนาว่างเปล่า พิมพ์คำถามเพื่อเริ่มต้นสนทนาได้เลยครับ"
                    : "Chat history is empty. Type a question below to start."}
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-lg border border-cyan-400/30 bg-cyan-500/15 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-600 to-ultraviolet-core text-white font-medium rounded-tr-sm border border-cyan-400/20"
                        : "bg-[#070014] border border-cyan-500/25 text-soft-quartz rounded-tl-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    <span className="mt-1 block text-[9px] text-ash-lilac/70 text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-lg border border-white/20 bg-white/[0.08] text-soft-quartz flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Searching State Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center text-ash-lilac text-xs animate-fade-in">
                <div className="w-7 h-7 rounded-lg border border-cyan-400/25 bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-400">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#070014] border border-cyan-500/30 rounded-xl px-3.5 py-2 flex items-center gap-2 text-soft-quartz/90">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>{t.chat.loading}</span>
                </div>
              </div>
            )}

            {/* Error Message Display */}
            {errorMessage && (
              <div className="p-2.5 rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-pink-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions Chips */}
          {suggestedQuestions.length > 0 && (
            <div className="px-4 py-2 border-t border-white/10 bg-[#060010] overflow-x-auto flex gap-2 no-scrollbar">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="text-[11px] text-ash-lilac hover:text-cyan-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 rounded-full px-3 py-1 shrink-0 transition-colors cursor-pointer disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area: Darker, High-Contrast Channel That Stands Out */}
          <div className="p-3 border-t border-cyan-500/20 bg-[#04000a]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={t.chat.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-[#090117] border border-cyan-400/35 rounded-full px-4 py-2.5 text-xs sm:text-[13px] text-white placeholder:text-ash-lilac/60 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send Message"
                className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-night-violet flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 shadow-md shadow-cyan-500/30 cursor-pointer"
              >
                <Send className="w-4 h-4 font-bold" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
