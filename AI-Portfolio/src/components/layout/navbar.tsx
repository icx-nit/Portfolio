"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenChat?: () => void;
  followerCount?: number;
  onFollow?: () => void;
  hasFollowed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenChat,
  followerCount = 28,
  onFollow,
  hasFollowed = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-char"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="group flex flex-col focus:outline-none">
          <span className="font-display text-xl tracking-tight text-bone group-hover:opacity-80 transition-opacity">
            Nittaya Pana
          </span>
          <span className="text-[12px] text-slate tracking-wide">
            UP · Software Engineering
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-bone/80 hover:text-bone tracking-normal transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Follow button */}
          <button
            onClick={onFollow}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] border transition-all duration-200 min-h-[38px] ${
              hasFollowed
                ? "border-bone/40 text-bone/60 bg-char/30"
                : "border-char text-bone hover:border-bone hover:bg-char/50"
            }`}
            title={hasFollowed ? "Following" : "Follow Nittaya"}
          >
            <span>{hasFollowed ? "Following" : "+ Follow"}</span>
            <span className="text-slate font-mono text-[12px]">({followerCount})</span>
          </button>

          {/* AI Assistant button */}
          {onOpenChat && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChat}
              className="gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#feed7a]" />
              <span>Ask AI</span>
            </Button>
          )}

          {/* Resume Download Pill */}
          <a
            href="/resume.pdf"
            download="Nittaya_Pana_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[14px] bg-bone text-obsidian border border-bone hover:bg-transparent hover:text-bone transition-all duration-200 min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              aria-label="Open AI Assistant"
              className="p-2.5 rounded-full border border-char text-bone hover:border-bone"
            >
              <Sparkles className="w-4 h-4 text-[#feed7a]" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="p-2.5 rounded-full border border-char text-bone hover:border-bone min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian border-b border-char px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] text-bone/90 hover:text-bone py-2 border-b border-char/40"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                onFollow?.();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 rounded-full border border-char text-bone text-[15px]"
            >
              {hasFollowed ? "Following" : "+ Follow Nittaya"} ({followerCount})
            </button>
            <a
              href="/resume.pdf"
              download="Nittaya_Pana_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-bone text-obsidian font-medium text-[15px] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
