"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Trash2, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am Nittaya Pana's portfolio assistant. You can ask me anything about Nittaya's Software Engineering studies at University of Phayao, projects, tech stack, or contact information.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "What is Nittaya's educational background?",
    "What technologies does Nittaya use?",
    "What projects has Nittaya developed?",
    "How can I contact Nittaya?",
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          text: "Sorry, I encountered a temporary connection issue. Please try again.",
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
        text: "Conversation cleared. Feel free to ask another question about Nittaya's portfolio!",
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-obsidian border border-char rounded-[16px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="p-4 border-b border-char flex items-center justify-between bg-char/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-char bg-obsidian flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#feed7a]" />
          </div>
          <div>
            <h3 className="font-display text-[16px] text-bone tracking-tight">
              Portfolio Assistant
            </h3>
            <span className="text-[11px] text-slate block">
              Rule-Based & Information Retrieval
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            className="p-2 rounded-full text-slate hover:text-bone hover:bg-char/50 transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate hover:text-bone hover:bg-char/50 transition-colors"
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
              <div className="w-7 h-7 rounded-full border border-char bg-char/60 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-bone" />
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-[12px] p-3.5 text-[14px] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-bone text-obsidian font-normal"
                  : "bg-char/50 border border-char text-bone/90"
              }`}
            >
              <p>{msg.text}</p>
              {msg.sourceTitle && (
                <span className="mt-2 block text-[11px] text-slate font-mono">
                  Source: {msg.sourceTitle}
                </span>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-7 h-7 rounded-full border border-bone/40 bg-bone text-obsidian flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-obsidian" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 justify-start items-center text-slate text-[13px]">
            <div className="w-7 h-7 rounded-full border border-char bg-char/60 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-bone" />
            </div>
            <div className="bg-char/40 border border-char rounded-[12px] px-3.5 py-2 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-bone" />
              <span>Retrieving portfolio data...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {suggestedQuestions.length > 0 && (
        <div className="px-4 py-2 border-t border-char/40 bg-char/10 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[12px] text-bone/80 hover:text-bone bg-char/40 hover:bg-char border border-char rounded-full px-3 py-1 shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t border-char bg-obsidian">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about Nittaya's education, skills, projects..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-char/60 border border-char rounded-full px-4 py-2.5 text-[14px] text-bone placeholder:text-slate focus:outline-none focus:border-bone transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send Message"
            className="w-10 h-10 rounded-full bg-bone text-obsidian flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
