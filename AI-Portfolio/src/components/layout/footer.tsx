"use client";

import React from "react";
import Link from "next/link";
import { Github, Mail, LogIn } from "lucide-react";
import { useApp } from "@/lib/i18n/context";
import { initialProfile } from "@/data/portfolio-seed";

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="border-t border-white/15 bg-[#0a0218]/95 backdrop-blur-md py-12 px-6 sm:px-10 lg:px-12">
      <div className="w-full mx-auto space-y-8">
        {/* Main 3-Part Row: Left aligned with Tabbar left, Center, Right aligned with Tabbar right */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Left: Brand Info (Directly aligns with Tabbar Logo) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl text-white drop-shadow-sm">
                Nittaya Pana
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/35 font-mono font-semibold">
                {t.footer.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white font-medium max-w-sm drop-shadow-sm">
              {t.footer.subtagline}
            </p>
          </div>

          {/* Center: Quick Nav Links (Truly Centered) */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white font-bold">
            <a href="#home" className="hover:text-cyan-300 transition-colors">
              {t.nav.home}
            </a>
            <a href="#about" className="hover:text-cyan-300 transition-colors">
              {t.nav.about}
            </a>
            <a href="#posts" className="hover:text-cyan-300 transition-colors">
              {t.nav.posts}
            </a>
            <a href="#skills" className="hover:text-cyan-300 transition-colors">
              {t.nav.skills}
            </a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">
              {t.nav.contact}
            </a>
          </nav>

          {/* Right: Social Icons (Directly aligns with Tabbar right actions) */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <a
              href={initialProfile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-white/20 bg-white/[0.08] hover:bg-white/[0.15] text-white hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${initialProfile.email}`}
              className="p-2.5 rounded-full border border-white/20 bg-white/[0.08] hover:bg-white/[0.15] text-white hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
              aria-label="Send Direct Email"
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Line: Copyright (far left) & Admin Link (far right) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[13px] text-white font-medium gap-4">
          <p className="text-white drop-shadow-sm">{t.footer.copyright}</p>

          <div className="flex items-center gap-4">
            <p className="text-white font-semibold drop-shadow-sm">{t.footer.tagline}</p>
            <span className="text-white/40">·</span>
            <Link
              href="/admin/login"
              className="text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1.5 font-mono text-xs font-semibold hover:underline"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.footer.adminLogin}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
