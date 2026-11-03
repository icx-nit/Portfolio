"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Heart,
  Mail,
  Github,
  FolderGit2,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialEducation,
  initialStats,
} from "@/data/portfolio-seed";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "skills" | "messages" | "github">("overview");
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // Fetch GitHub repos
  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.repositories) {
          setGithubRepos(data.repositories);
        }
      })
      .catch(() => {});
  }, []);

  const handleRefreshGithub = async () => {
    setIsSyncingGithub(true);
    setSyncSuccess(false);
    try {
      const res = await fetch("/api/github");
      const data = await res.json();
      if (data && data.repositories) {
        setGithubRepos(data.repositories);
        setSyncSuccess(true);
        setTimeout(() => setSyncSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Sync error:", err);
    } finally {
      setIsSyncingGithub(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <Users className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Sparkles className="w-4 h-4" /> },
    { id: "github", label: "GitHub Repos", icon: <Github className="w-4 h-4" /> },
    { id: "messages", label: "Messages", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-bone flex flex-col">
      {/* Admin Header */}
      <header className="border-b border-char bg-obsidian/90 backdrop-blur-md px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-slate hover:text-bone transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="text-char">|</span>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg tracking-tight text-bone">
              Owner Dashboard
            </span>
            <Badge variant="outline" className="text-[11px] text-bone/60">
              Nittaya Pana
            </Badge>
          </div>
        </div>

        <div className="text-[12px] text-slate font-mono">
          University of Phayao · ICT
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-container mx-auto px-6 py-10 w-full flex-1 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-char pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] transition-all min-h-[40px] ${
                activeTab === tab.id
                  ? "bg-bone text-obsidian border border-bone font-medium"
                  : "bg-char/30 text-bone/70 border border-char hover:border-bone/40 hover:text-bone"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="char" className="p-6 space-y-2">
                <span className="text-[12px] text-slate font-mono uppercase tracking-wider block">
                  Total Followers
                </span>
                <p className="font-display text-4xl text-bone">
                  {initialStats.followersCount}
                </p>
                <span className="text-[12px] text-slate">Visitor subscriptions</span>
              </Card>

              <Card variant="char" className="p-6 space-y-2">
                <span className="text-[12px] text-slate font-mono uppercase tracking-wider block">
                  Total Likes
                </span>
                <p className="font-display text-4xl text-bone">
                  {initialStats.totalLikesCount}
                </p>
                <span className="text-[12px] text-slate">Across all projects</span>
              </Card>

              <Card variant="char" className="p-6 space-y-2">
                <span className="text-[12px] text-slate font-mono uppercase tracking-wider block">
                  Active Projects
                </span>
                <p className="font-display text-4xl text-bone">
                  {initialProjects.length}
                </p>
                <span className="text-[12px] text-slate">Published on portfolio</span>
              </Card>

              <Card variant="char" className="p-6 space-y-2">
                <span className="text-[12px] text-slate font-mono uppercase tracking-wider block">
                  GitHub Repos
                </span>
                <p className="font-display text-4xl text-bone">
                  {githubRepos.length || initialStats.repositoriesCount}
                </p>
                <span className="text-[12px] text-slate">Synced from icx-nit</span>
              </Card>
            </div>

            {/* Profile Summary Card */}
            <Card variant="char" className="p-8 space-y-4">
              <div className="border-b border-char pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-bone">
                    Developer Profile Summary
                  </h3>
                  <p className="text-[13px] text-slate">
                    Managed profile information displayed on the public landing page.
                  </p>
                </div>
                <Badge variant="bone">Active</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14px]">
                <div>
                  <span className="text-slate block text-[12px] font-mono">Display Name</span>
                  <span className="text-bone font-medium">{initialProfile.name}</span>
                </div>
                <div>
                  <span className="text-slate block text-[12px] font-mono">Professional Title</span>
                  <span className="text-bone font-medium">{initialProfile.title}</span>
                </div>
                <div>
                  <span className="text-slate block text-[12px] font-mono">Email Address</span>
                  <span className="text-bone font-medium">{initialProfile.email}</span>
                </div>
                <div>
                  <span className="text-slate block text-[12px] font-mono">Institution</span>
                  <span className="text-bone font-medium">{initialProfile.institution}</span>
                </div>
                <div>
                  <span className="text-slate block text-[12px] font-mono">Faculty</span>
                  <span className="text-bone font-medium">{initialProfile.faculty}</span>
                </div>
                <div>
                  <span className="text-slate block text-[12px] font-mono">Major</span>
                  <span className="text-bone font-medium">{initialProfile.major}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 2: Projects Manager */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl text-bone">
                  Manage Projects ({initialProjects.length})
                </h3>
                <p className="text-[13px] text-slate">
                  Projects showcased on the portfolio homepage.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {initialProjects.map((p) => (
                <Card key={p.id} variant="char" className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl text-bone">{p.title}</span>
                      <Badge variant="slate" className="text-[11px]">{p.category}</Badge>
                    </div>
                    <p className="text-[13px] text-slate">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.map((tag, i) => (
                        <span key={i} className="text-[11px] font-mono text-bone/60 bg-char/50 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[13px] text-slate font-mono">
                      {p.likesCount} Likes
                    </span>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-char text-slate hover:text-bone hover:border-bone"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Skills Manager */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-bone">
              Manage Technical Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initialSkills.map((cat, idx) => (
                <Card key={idx} variant="char" className="p-6 space-y-4">
                  <h4 className="font-display text-xl text-bone border-b border-char pb-2">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((s, i) => (
                      <Badge key={i} variant="outline">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: GitHub Integration */}
        {activeTab === "github" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-char pb-4">
              <div>
                <h3 className="font-display text-2xl text-bone">
                  GitHub Repositories (icx-nit)
                </h3>
                <p className="text-[13px] text-slate">
                  Public repositories fetched via GitHub REST API.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {syncSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Repositories Synced</span>
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefreshGithub}
                  disabled={isSyncingGithub}
                  className="gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGithub ? "animate-spin" : ""}`} />
                  <span>Refresh Repos</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {githubRepos.map((repo, idx) => (
                <Card key={idx} variant="char" className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg text-bone tracking-tight">
                      {repo.name}
                    </span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-bone"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-[13px] text-slate leading-relaxed">
                    {repo.description || "Public repository from icx-nit"}
                  </p>

                  <div className="flex items-center gap-4 text-[12px] text-slate font-mono pt-2 border-t border-char/60">
                    <span className="text-bone/80">{repo.language || "TypeScript"}</span>
                    <span>★ {repo.stargazers_count}</span>
                    <span>Forks: {repo.forks_count}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Contact Messages */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <h3 className="font-display text-2xl text-bone">
              Visitor Contact Messages
            </h3>
            <p className="text-[14px] text-slate">
              Contact submissions are forwarded to <span className="text-bone">nittaya503555@gmail.com</span> and logged in the database.
            </p>

            <Card variant="char" className="p-8 text-center space-y-3">
              <Mail className="w-8 h-8 text-slate mx-auto" />
              <p className="text-[15px] text-bone">
                All submitted contact messages are delivered directly to your inbox via Resend.
              </p>
              <p className="text-[13px] text-slate">
                You can reply directly to visitors using your email client.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
