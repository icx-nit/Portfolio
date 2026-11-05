"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/i18n/context";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "about", "posts", "skills", "contact"];
      const scrollY = window.scrollY;

      if (scrollY < 200) {
        setActiveSection("home");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { id: "home", label: t.nav.home, href: "#home" },
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "posts", label: t.nav.posts, href: "#posts" },
    { id: "skills", label: t.nav.skills, href: "#skills" },
    { id: "contact", label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-night-violet/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Logo Portfolio */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick("home", e)}
          className="group flex items-center gap-2.5 focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ultraviolet-core to-cyan-400 p-0.5 shadow-md shadow-ultraviolet-core/20 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-night-violet rounded-[10px] flex items-center justify-center">
              <span className="font-display font-bold text-sm text-soft-quartz">NP</span>
            </div>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-soft-quartz group-hover:text-cyan-400 transition-colors">
            {t.nav.brand}
          </span>
        </Link>

        {/* Center: Desktop Navigation Links with Moving Purple Oval Pill */}
        <nav className="hidden md:flex items-center gap-2 md:gap-4 lg:gap-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`min-h-[44px] px-4 lg:px-5 inline-flex items-center justify-center rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-ultraviolet-core text-white shadow-lg shadow-ultraviolet-core/40 font-semibold scale-[1.02]"
                    : "text-ash-lilac hover:text-soft-quartz hover:bg-white/[0.05]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Language Switcher, Owner Login) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === "en" ? "th" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-[12px] text-ash-lilac hover:text-soft-quartz hover:border-white/20 transition-all cursor-pointer"
            title="Switch Language (TH/EN)"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono uppercase font-bold">{language}</span>
          </button>

          {/* Owner Login Button */}
          <Link href="/admin/login">
            <Button
              variant="outline"
              size="sm"
              className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/60 rounded-full text-[13px] font-medium gap-1.5 px-4 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.nav.login}</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setLanguage(language === "en" ? "th" : "en")}
            className="p-2 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono font-bold text-cyan-400"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full border border-white/10 bg-white/[0.04] text-soft-quartz cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-night-violet/98 px-6 py-6 space-y-4 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`min-h-[44px] flex items-center px-4 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === link.id
                    ? "bg-ultraviolet-core text-white font-semibold"
                    : "text-ash-lilac hover:text-soft-quartz hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === "en" ? "th" : "en")}
              className="flex items-center gap-2 text-xs text-ash-lilac"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{language === "th" ? "สลับเป็น English" : "Switch to ภาษาไทย"}</span>
            </button>

            <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400/30 text-cyan-400 text-xs rounded-full gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.nav.login}</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
