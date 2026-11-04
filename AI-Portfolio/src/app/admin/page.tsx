"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Heart,
  Mail,
  Github,
  FolderGit2,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea } from "@/components/ui/input";
import {
  initialProfile,
  initialProjects,
  initialSkills,
  initialPosts,
  initialStats,
} from "@/data/portfolio-seed";
import { Post } from "@/types/portfolio";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "posts" | "projects" | "skills" | "messages" | "github">("overview");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [isSyncingGithub, setIsSyncingGithub] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  // New post form state
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Announcement");

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

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: "post-" + Date.now(),
      content: newPostContent,
      category: newPostCategory,
      likesCount: 0,
      isPublished: true,
      publishedAt: new Date().toISOString().split("T")[0],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setIsCreatingPost(false);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <Users className="w-4 h-4" /> },
    { id: "posts", label: "Social Feed", icon: <FileText className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Sparkles className="w-4 h-4" /> },
    { id: "github", label: "GitHub Repos", icon: <Github className="w-4 h-4" /> },
    { id: "messages", label: "Messages", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-night-violet text-soft-quartz flex flex-col">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-night-violet/90 backdrop-blur-md px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-ash-lilac hover:text-soft-quartz transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg tracking-tight text-soft-quartz">
              Owner Dashboard
            </span>
            <Badge variant="violet" className="text-[11px]">
              Nittaya Pana (นิตยา ปานา)
            </Badge>
          </div>
        </div>

        <div className="text-[12px] text-ash-lilac font-mono">
          University of Phayao · ICT
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-container mx-auto px-6 py-10 w-full flex-1 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] transition-all min-h-[40px] ${
                activeTab === tab.id
                  ? "bg-ultraviolet-core text-white border border-ultraviolet-core font-medium shadow-[0_0_15px_rgba(113,61,255,0.4)]"
                  : "bg-white/[0.04] text-ash-lilac border border-white/10 hover:border-white/25 hover:text-soft-quartz"
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
              <Card variant="surface" className="p-6 space-y-2">
                <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider block">
                  Total Followers
                </span>
                <p className="font-display font-bold text-4xl text-soft-quartz">
                  {initialStats.followersCount}
                </p>
                <span className="text-[12px] text-ash-lilac">Visitor subscriptions</span>
              </Card>

              <Card variant="surface" className="p-6 space-y-2">
                <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider block">
                  Project Likes
                </span>
                <p className="font-display font-bold text-4xl text-soft-quartz">
                  {initialStats.totalLikesCount}
                </p>
                <span className="text-[12px] text-ash-lilac">Across 3 projects</span>
              </Card>

              <Card variant="surface" className="p-6 space-y-2">
                <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider block">
                  Post Likes
                </span>
                <p className="font-display font-bold text-4xl text-soft-quartz">
                  {posts.reduce((acc, p) => acc + p.likesCount, 0)}
                </p>
                <span className="text-[12px] text-ash-lilac">Social feed engagement</span>
              </Card>

              <Card variant="surface" className="p-6 space-y-2">
                <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider block">
                  GitHub Repos
                </span>
                <p className="font-display font-bold text-4xl text-soft-quartz">
                  {githubRepos.length || initialStats.repositoriesCount}
                </p>
                <span className="text-[12px] text-ash-lilac">Synced from icx-nit</span>
              </Card>
            </div>

            {/* Profile Summary Card */}
            <Card variant="surface" className="p-8 space-y-4">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-2xl text-soft-quartz">
                    Developer Profile Summary
                  </h3>
                  <p className="text-[13px] text-ash-lilac">
                    Managed profile information displayed on public landing page.
                  </p>
                </div>
                <Badge variant="violet">Active</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14px]">
                <div>
                  <span className="text-ash-lilac block text-[12px] font-mono">Display Name</span>
                  <span className="text-soft-quartz font-medium">{initialProfile.name}</span>
                </div>
                <div>
                  <span className="text-ash-lilac block text-[12px] font-mono">Professional Title</span>
                  <span className="text-soft-quartz font-medium">{initialProfile.title}</span>
                </div>
                <div>
                  <span className="text-ash-lilac block text-[12px] font-mono">Email Address</span>
                  <span className="text-soft-quartz font-medium">{initialProfile.email}</span>
                </div>
                <div>
                  <span className="text-ash-lilac block text-[12px] font-mono">Institution</span>
                  <span className="text-soft-quartz font-medium">{initialProfile.institution}</span>
                </div>
                <div>
                  <span className="text-ash-lilac block text-[12px] font-mono">Faculty</span>
                  <span className="text-soft-quartz font-medium">{initialProfile.faculty}</span>
                </div>
                <div>
                  <span className="text-ash-lilac block text-[12px] font-mono">Major</span>
                  <span className="text-soft-quartz font-medium">{initialProfile.major}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 2: Social Feed Posts Management */}
        {activeTab === "posts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl text-soft-quartz">
                  Social Feed Posts ({posts.length})
                </h3>
                <p className="text-[13px] text-ash-lilac">
                  Create and manage personal announcements and updates shown on homepage feed.
                </p>
              </div>

              <Button
                variant="violet"
                size="sm"
                onClick={() => setIsCreatingPost(!isCreatingPost)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isCreatingPost ? "Cancel" : "Create Post"}</span>
              </Button>
            </div>

            {/* Create Post Form Drawer */}
            {isCreatingPost && (
              <Card variant="surface" className="p-6 space-y-4 border-ultraviolet-core/40">
                <h4 className="font-display font-bold text-lg text-soft-quartz">
                  Publish New Feed Post
                </h4>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[12px] text-ash-lilac font-mono uppercase">
                      Post Category
                    </label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="w-full bg-void-plum border border-white/10 rounded-sm px-4 py-2.5 text-[14px] text-soft-quartz focus:outline-none focus:border-ultraviolet-core"
                    >
                      <option value="Announcement">Announcement (ประกาศ)</option>
                      <option value="Academic">Academic (การศึกษา)</option>
                      <option value="Project Launch">Project Launch (เปิดตัวโปรเจกต์)</option>
                      <option value="Milestone">Milestone (ความก้าวหน้า)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] text-ash-lilac font-mono uppercase">
                      Post Content
                    </label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Share an update, launch announcement, or coursework note..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </div>

                  <Button type="submit" variant="violet" size="md">
                    Publish Post to Feed
                  </Button>
                </form>
              </Card>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} variant="surface" className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <Badge variant="violet">{post.category}</Badge>
                      <span className="text-[12px] text-ash-lilac font-mono">{post.publishedAt}</span>
                    </div>
                    <p className="text-[14px] text-soft-quartz/90 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[12px] text-ash-lilac font-mono">
                      {post.likesCount} Likes
                    </span>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 rounded-full border border-white/10 text-ash-lilac hover:text-red-400 hover:border-red-400/50 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Projects Manager */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-2xl text-soft-quartz">
              Manage Projects ({initialProjects.length})
            </h3>
            <div className="space-y-4">
              {initialProjects.map((p) => (
                <Card key={p.id} variant="surface" className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-lg text-soft-quartz">{p.title}</span>
                      <Badge variant="slate" className="text-[11px]">{p.category}</Badge>
                    </div>
                    <p className="text-[13px] text-ash-lilac">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.map((tag, i) => (
                        <span key={i} className="text-[11px] font-mono text-ash-lilac bg-white/[0.04] px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[13px] text-ash-lilac font-mono">
                      {p.likesCount} Likes
                    </span>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-white/10 text-ash-lilac hover:text-soft-quartz hover:border-white/30"
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

        {/* Tab 4: Skills Manager */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-2xl text-soft-quartz">
              Manage Technical Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initialSkills.map((cat, idx) => (
                <Card key={idx} variant="surface" className="p-6 space-y-4">
                  <h4 className="font-display font-bold text-lg text-soft-quartz border-b border-white/10 pb-2">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((s, i) => (
                      <Badge key={i} variant="glass">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: GitHub Integration */}
        {activeTab === "github" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-soft-quartz">
                  GitHub Repositories (icx-nit)
                </h3>
                <p className="text-[13px] text-ash-lilac">
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
                  variant="glass"
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
                <Card key={idx} variant="surface" className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-soft-quartz tracking-tight">
                      {repo.name}
                    </span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ash-lilac hover:text-soft-quartz"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-[13px] text-ash-lilac leading-relaxed">
                    {repo.description || "Public repository from icx-nit"}
                  </p>

                  <div className="flex items-center gap-4 text-[12px] text-ash-lilac font-mono pt-2 border-t border-white/10">
                    <span className="text-soft-quartz/80">{repo.language || "TypeScript"}</span>
                    <span>★ {repo.stargazers_count}</span>
                    <span>Forks: {repo.forks_count}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Contact Messages */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-2xl text-soft-quartz">
              Visitor Contact Messages
            </h3>
            <p className="text-[14px] text-ash-lilac">
              Submissions are forwarded to <span className="text-soft-quartz">nittaya503555@gmail.com</span> and logged in Supabase.
            </p>

            <Card variant="surface" className="p-8 text-center space-y-3">
              <Mail className="w-8 h-8 text-ash-lilac mx-auto" />
              <p className="text-[15px] text-soft-quartz font-medium">
                All visitor messages trigger real-time notifications via Resend.
              </p>
              <p className="text-[13px] text-ash-lilac">
                You can respond directly to visitors via your personal email application.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
