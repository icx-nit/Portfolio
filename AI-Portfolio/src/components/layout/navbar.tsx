"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, Sparkles, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/i18n/context";

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
  const { language, setLanguage, t, theme, toggleTheme } = useApp();
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
    { label: t.nav.about, href: "#about" },
    { label: t.nav.feed, href: "#feed" },
    { label: t.nav.education, href: "#education" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-night-violet/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="group flex flex-col focus:outline-none">
          <span className="font-display font-bold text-xl tracking-tight text-soft-quartz group-hover:text-lilac-beam transition-colors">
            Nittaya Pana
          </span>
          <span className="text-[12px] text-ash-lilac tracking-wide">
            {language === "th" ? "ม.พะเยา · วิศวกรรมซอฟต์แวร์" : "UP · Software Engineering"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-ash-lilac hover:text-soft-quartz tracking-normal transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === "en" ? "th" : "en")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-mono border border-white/10 text-ash-lilac hover:text-soft-quartz hover:border-white/20 transition-colors min-h-[36px]"
            title="Switch Language / เปลี่ยนภาษา"
          >
            <Globe className="w-3.5 h-3.5 text-lilac-beam" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 text-ash-lilac hover:text-soft-quartz hover:border-white/20 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-lilac-beam" />
            ) : (
              <Moon className="w-4 h-4 text-ultraviolet-core" />
            )}
          </button>

          {/* Follow Button */}
          <button
            onClick={onFollow}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] border transition-all duration-200 min-h-[38px] ${
              hasFollowed
                ? "border-ultraviolet-core/50 text-lilac-beam bg-ultraviolet-core/10"
                : "border-white/10 text-soft-quartz hover:border-white/30 bg-white/[0.03]"
            }`}
          >
            <span>{hasFollowed ? t.nav.following : t.nav.follow}</span>
            <span className="text-ash-lilac font-mono text-[11px]">({followerCount})</span>
          </button>

          {/* Ask AI Button */}
          {onOpenChat && (
            <Button
              variant="glass"
              size="sm"
              onClick={onOpenChat}
              className="gap-2 border-white/15 hover:border-ultraviolet-core/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-lilac-beam" />
              <span>{t.nav.askAi}</span>
            </Button>
          )}

          {/* Resume Download Pill */}
          <a
            href="/resume.pdf"
            download="Nittaya_Pana_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] bg-white/[0.08] text-soft-quartz border border-white/20 hover:bg-white/[0.15] hover:border-white/40 transition-all duration-200 min-h-[38px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.nav.resume}</span>
          </a>
        </div>

        {/* Mobile Menu & Quick Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setLanguage(language === "en" ? "th" : "en")}
            className="px-2.5 py-1 rounded-full text-[12px] font-mono border border-white/10 text-ash-lilac"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 text-ash-lilac"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {onOpenChat && (
            <button
              onClick={onOpenChat}
              aria-label="Open AI Assistant"
              className="p-2 rounded-full border border-white/10 text-lilac-beam"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="p-2.5 rounded-full border border-white/10 text-soft-quartz min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-night-violet border-b border-white/10 px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[16px] text-soft-quartz/90 hover:text-soft-quartz py-2 border-b border-white/5"
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
              className="w-full text-center py-3 rounded-full border border-white/10 text-soft-quartz text-[14px]"
            >
              {hasFollowed ? t.nav.following : t.nav.follow} ({followerCount})
            </button>
            <a
              href="/resume.pdf"
              download="Nittaya_Pana_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-white/[0.08] border border-white/20 text-soft-quartz text-[14px] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.nav.resume}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
