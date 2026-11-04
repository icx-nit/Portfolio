"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Trash2, Bot, User, Loader2 } from "lucide-react";
import { useApp } from "@/lib/i18n/context";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  sourceTitle?: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const { language, t } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: t.chat.welcome,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const defaultSuggestedQuestions =
    language === "th"
      ? [
          "นิตยา ศึกษาอยู่ที่ไหน?",
          "มีทักษะเขียนโปรแกรมอะไรบ้าง?",
          "มีผลงานโปรเจกต์อะไรบ้าง?",
          "ติดต่อ นิตยา ได้ทางไหน?",
        ]
      : [
          "What is Nittaya's educational background?",
          "What technologies does Nittaya use?",
          "What projects has Nittaya developed?",
          "How can I contact Nittaya?",
        ];

  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(defaultSuggestedQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update suggestions when language changes
  useEffect(() => {
    setSuggestedQuestions(defaultSuggestedQuestions);
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "welcome") {
        return [{ id: "welcome", sender: "bot", text: t.chat.welcome, timestamp: new Date() }];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date(),
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

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.answer || "No response received.",
        sourceTitle: data.sourceTitle,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
        setSuggestedQuestions(data.suggestedQuestions);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text:
            language === "th"
              ? "ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้งครับ"
              : "Sorry, I encountered a temporary connection issue. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "reset",
        sender: "bot",
        text: t.chat.cleared,
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-night-violet border border-white/15 rounded-card flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-lilac-beam" />
          </div>
          <div>
            <h3 className="font-display font-bold text-[16px] text-soft-quartz tracking-tight">
              {t.chat.title}
            </h3>
            <span className="text-[11px] text-ash-lilac block">
              {t.chat.subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-2 rounded-full text-ash-lilac hover:text-soft-quartz hover:bg-white/[0.08] transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-ash-lilac hover:text-soft-quartz hover:bg-white/[0.08] transition-colors"
            title="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="w-7 h-7 rounded-full border border-white/15 bg-ultraviolet-core/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-lilac-beam" />
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-[14px] p-3.5 text-[14px] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-ultraviolet-core text-white font-normal"
                  : "bg-white/[0.04] border border-white/10 text-soft-quartz/95"
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
              {msg.sourceTitle && (
                <span className="mt-2 block text-[11px] text-lilac-beam/70 font-mono">
                  {t.chat.sourcePrefix} {msg.sourceTitle}
                </span>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-7 h-7 rounded-full border border-white/20 bg-white/[0.1] text-soft-quartz flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 justify-start items-center text-ash-lilac text-[13px]">
            <div className="w-7 h-7 rounded-full border border-white/15 bg-ultraviolet-core/20 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-lilac-beam" />
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-[12px] px-3.5 py-2 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-lilac-beam" />
              <span>{t.chat.loading}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {suggestedQuestions.length > 0 && (
        <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] overflow-x-auto flex gap-2 no-scrollbar">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[12px] text-ash-lilac hover:text-soft-quartz bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-full px-3 py-1 shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t border-white/10 bg-night-violet">
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
            className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 text-[14px] text-soft-quartz placeholder:text-ash-lilac/60 focus:outline-none focus:border-ultraviolet-core transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send Message"
            className="w-10 h-10 rounded-full bg-ultraviolet-core text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-horizon-glow transition-colors shrink-0 shadow-[0_0_15px_rgba(113,61,255,0.4)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
