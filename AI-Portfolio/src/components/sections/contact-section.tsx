"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle, Loader2, ArrowUpRight } from "lucide-react";

export const ContactSection: React.FC = () => {
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
      setErrorMessage("Please fill in your name, email address, and message.");
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
    <section id="contact" className="py-24 px-6 bg-obsidian">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-bone font-normal leading-[1.05] tracking-[-0.03em]">
              Let’s Connect
            </h2>

            <p className="text-[16px] text-bone/80 font-normal leading-relaxed">
              Whether you have an internship opportunity, an open-source collaboration idea, or want to discuss a project, my inbox is always open.
            </p>

            <div className="pt-6 space-y-4 border-t border-char">
              <div>
                <span className="text-[12px] text-slate font-mono uppercase tracking-wider block mb-1">
                  Direct Email
                </span>
                <a
                  href="mailto:nittaya503555@gmail.com"
                  className="text-[16px] text-bone hover:underline underline-offset-4 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-slate" />
                  <span>nittaya503555@gmail.com</span>
                </a>
              </div>

              <div>
                <span className="text-[12px] text-slate font-mono uppercase tracking-wider block mb-1">
                  Location & Campus
                </span>
                <p className="text-[15px] text-bone/90">
                  School of Information and Communication Technology
                  <br />
                  University of Phayao, Phayao, Thailand
                </p>
              </div>

              <div>
                <span className="text-[12px] text-slate font-mono uppercase tracking-wider block mb-1">
                  GitHub Profile
                </span>
                <a
                  href="https://github.com/icx-nit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-bone hover:underline underline-offset-4 inline-flex items-center gap-1"
                >
                  <span>github.com/icx-nit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Me Form */}
          <div className="lg:col-span-7 bg-char/30 border border-char rounded-[16px] p-8">
            {status === "success" ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-green-500/50 bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-display text-2xl text-bone">
                  Message Dispatched
                </h3>
                <p className="text-[14px] text-slate max-w-sm">
                  Thank you for reaching out! Your message has been sent to Nittaya Pana. You will receive a response shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus("idle")}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] text-bone/80 font-normal">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] text-bone/80 font-normal">
                      Your Email <span className="text-red-400">*</span>
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
                  <label className="text-[13px] text-bone/80 font-normal">
                    Subject (Optional)
                  </label>
                  <Input
                    placeholder="Project Inquiry, Internship, Collaboration..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] text-bone/80 font-normal">
                    Message <span className="text-red-400">*</span>
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
                  <div className="p-3.5 rounded-[4px] bg-red-950/30 border border-red-900/50 flex items-center gap-2.5 text-[13px] text-red-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="bone"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto min-w-[180px] gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
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
