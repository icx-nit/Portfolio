"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";
import { useApp } from "@/lib/i18n/context";

export const ContactSection: React.FC = () => {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage(t.contact.validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-night-violet">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold leading-[1.14] tracking-[-1.12px]">
              {t.contact.title}
            </h2>

            <p className="text-[15px] sm:text-[16px] text-ash-lilac font-normal leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="pt-6 space-y-4 border-t border-white/10">
              <div>
                <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider block mb-1">
                  {t.contact.directEmail}
                </span>
                <a
                  href="mailto:nittaya503555@gmail.com"
                  className="text-[16px] text-soft-quartz hover:text-lilac-beam hover:underline underline-offset-4 flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4 text-ash-lilac" />
                  <span>nittaya503555@gmail.com</span>
                </a>
              </div>

              <div>
                <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider block mb-1">
                  {t.contact.location}
                </span>
                <p className="text-[15px] text-soft-quartz/90">
                  {t.contact.locationDetail}
                </p>
              </div>

              <div>
                <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider block mb-1">
                  {t.contact.githubProfile}
                </span>
                <a
                  href="https://github.com/icx-nit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-soft-quartz hover:text-lilac-beam hover:underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
                >
                  <span>github.com/icx-nit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ash-lilac" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Me Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-card p-8">
            {status === "success" ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-green-500/50 bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-display text-2xl text-soft-quartz font-bold">
                  {t.contact.successTitle}
                </h3>
                <p className="text-[14px] text-ash-lilac max-w-sm">
                  {t.contact.successDesc}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus("idle")}
                  className="mt-4"
                >
                  {t.contact.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] text-soft-quartz/80 font-normal">
                      {t.contact.nameLabel} <span className="text-ultraviolet-core">*</span>
                    </label>
                    <Input
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] text-soft-quartz/80 font-normal">
                      {t.contact.emailLabel} <span className="text-ultraviolet-core">*</span>
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] text-soft-quartz/80 font-normal">
                    {t.contact.subjectLabel}
                  </label>
                  <Input
                    placeholder="Project Inquiry, Internship, Collaboration..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] text-soft-quartz/80 font-normal">
                    {t.contact.messageLabel} <span className="text-ultraviolet-core">*</span>
                  </label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {status === "error" && (
                  <div className="p-3.5 rounded-sm bg-red-950/30 border border-red-900/50 flex items-center gap-2.5 text-[13px] text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="violet"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto min-w-[180px] gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <span>{t.contact.sendButton}</span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
