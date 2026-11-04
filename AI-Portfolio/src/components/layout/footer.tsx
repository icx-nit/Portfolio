"use client";

import React from "react";
import Link from "next/link";
import { Github, Mail, ArrowUpRight } from "lucide-react";
import { useApp } from "@/lib/i18n/context";

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="w-full border-t border-white/10 bg-night-violet text-soft-quartz py-16 px-6">
      <div className="max-w-container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Column */}
        <div className="space-y-2">
          <p className="font-display font-bold text-2xl tracking-tight text-soft-quartz">
            Nittaya Pana (นิตยา ปานา)
          </p>
          <p className="text-[14px] text-ash-lilac max-w-md">
            {t.footer.description}
          </p>
          <p className="text-[12px] text-dim-fog pt-2 font-mono">
            {t.footer.builtWith}
          </p>
        </div>

        {/* Right Column: Links */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/icx-nit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] text-ash-lilac hover:text-soft-quartz transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub (icx-nit)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-dim-fog" />
          </a>

          <a
            href="mailto:nittaya503555@gmail.com"
            className="inline-flex items-center gap-2 text-[14px] text-ash-lilac hover:text-soft-quartz transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>nittaya503555@gmail.com</span>
          </a>

          <Link
            href="/admin"
            className="text-[13px] text-dim-fog hover:text-soft-quartz underline underline-offset-4 transition-colors font-mono"
          >
            {t.footer.adminLink}
          </Link>
        </div>
      </div>
    </footer>
  );
};
