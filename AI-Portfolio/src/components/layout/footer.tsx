import React from "react";
import Link from "next/link";
import { Github, Mail, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-char bg-obsidian text-bone py-16 px-6">
      <div className="max-w-container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Column */}
        <div className="space-y-2">
          <p className="font-display text-2xl tracking-tight text-bone">
            Nittaya Pana
          </p>
          <p className="text-[14px] text-slate max-w-md">
            Software Engineering · School of Information and Communication Technology · University of Phayao
          </p>
          <p className="text-[12px] text-slate/70 pt-2 font-mono">
            Designed with Clyde Editorial System & Next.js.
          </p>
        </div>

        {/* Right Column: Links */}
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/icx-nit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] text-bone/80 hover:text-bone transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub (icx-nit)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate" />
          </a>

          <a
            href="mailto:nittaya503555@gmail.com"
            className="inline-flex items-center gap-2 text-[14px] text-bone/80 hover:text-bone transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>nittaya503555@gmail.com</span>
          </a>

          <Link
            href="/admin"
            className="text-[13px] text-slate hover:text-bone underline underline-offset-4 transition-colors"
          >
            Owner Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
};
