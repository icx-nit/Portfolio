"use client";

import React, { useState } from "react";
import { Mail, Github, Send, Copy, Check, ExternalLink, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApp } from "@/lib/i18n/context";
import { initialProfile } from "@/data/portfolio-seed";

export const ContactSection: React.FC = () => {
  const { t } = useApp();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(initialProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(t.contact.validationError);
      return;
    }

    // Basic email regex validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setErrorMessage(t.contact.validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="space-y-3 max-w-xl text-left">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold tracking-tight">
            {t.contact.title}
          </h2>

          <p className="text-[15px] sm:text-[16px] text-ash-lilac">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Two-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ======================================================= */}
          {/* LEFT COLUMN: Owner Contact Details                      */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Contact Card */}
            <Card variant="surface" className="p-6 space-y-4 border-white/10 hover:border-cyan-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-soft-quartz">
                    {t.contact.directEmail}
                  </h4>
                  <p className="text-xs text-ash-lilac font-mono">
                    {initialProfile.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-xs font-mono text-soft-quartz transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-sans font-medium">{t.contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>{t.contact.copyEmail}</span>
                  </>
                )}
              </button>
            </Card>

            {/* GitHub Contact Card */}
            <Card variant="surface" className="p-6 space-y-4 border-white/10 hover:border-white/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-soft-quartz">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-soft-quartz">
                    {t.contact.githubProfile}
                  </h4>
                  <p className="text-xs text-ash-lilac font-mono">
                    github.com/icx-nit
                  </p>
                </div>
              </div>

              <a
                href={initialProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-xs font-medium text-soft-quartz transition-all"
              >
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </Card>
          </div>

          {/* ======================================================= */}
          {/* RIGHT COLUMN: Contact Form (3 Fields)                   */}
          {/* ======================================================= */}
          <div className="lg:col-span-7">
            <Card variant="surface" className="p-7 sm:p-9 border-white/10 space-y-6">
              {isSuccess ? (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-soft-quartz">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-ash-lilac max-w-md mx-auto">
                    {t.contact.successDesc}
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="glass"
                    size="sm"
                    className="mt-4 rounded-full border-white/20"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Name */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-soft-quartz">
                      {t.contact.nameLabel} <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-soft-quartz text-sm placeholder:text-dim-fog focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* 2. Email */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-soft-quartz">
                      {t.contact.emailLabel} <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-soft-quartz text-sm placeholder:text-dim-fog focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* 3. Message */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-soft-quartz">
                      {t.contact.messageLabel} <span className="text-pink-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-soft-quartz text-sm placeholder:text-dim-fog focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-night-violet font-semibold rounded-xl text-sm gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.contact.sending : t.contact.sendButton}</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
