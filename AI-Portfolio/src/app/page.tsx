"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { FeedSection } from "@/components/sections/feed-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import {
  initialProfile,
  initialPosts,
  initialEducation,
  initialSkills,
  initialProjects,
  initialStats,
} from "@/data/portfolio-seed";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [followerCount, setFollowerCount] = useState(initialStats.followersCount);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [likedProjectIds, setLikedProjectIds] = useState<string[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  // Fetch initial follow status
  useEffect(() => {
    fetch("/api/interactions/follow")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setFollowerCount(data.count);
          setHasFollowed(data.hasFollowed);
        }
      })
      .catch(() => {});
  }, []);

  const handleFollow = async () => {
    if (hasFollowed) return;
    try {
      const res = await fetch("/api/interactions/follow", { method: "POST" });
      const data = await res.json();
      if (data && data.success) {
        setFollowerCount(data.count);
        setHasFollowed(true);
      }
    } catch (err) {
      console.error("Follow error:", err);
    }
  };

  const handleLikeProject = async (projectId: string) => {
    try {
      const res = await fetch("/api/interactions/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: projectId, targetType: "project" }),
      });
      const data = await res.json();
      if (data && data.success) {
        if (data.action === "liked") {
          setLikedProjectIds((prev) => [...prev, projectId]);
        } else {
          setLikedProjectIds((prev) => prev.filter((id) => id !== projectId));
        }
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const res = await fetch("/api/interactions/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: postId, targetType: "post" }),
      });
      const data = await res.json();
      if (data && data.success) {
        if (data.action === "liked") {
          setLikedPostIds((prev) => [...prev, postId]);
        } else {
          setLikedPostIds((prev) => prev.filter((id) => id !== postId));
        }
      }
    } catch (err) {
      console.error("Like post error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-night-violet text-soft-quartz flex flex-col transition-colors duration-300">
      {/* Top Navigation Bar with Language and Theme Switchers */}
      <Navbar
        onOpenChat={() => setIsChatOpen(true)}
        followerCount={followerCount}
        onFollow={handleFollow}
        hasFollowed={hasFollowed}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenChat={() => setIsChatOpen(true)} />
        <FeedSection
          posts={initialPosts}
          likedPostIds={likedPostIds}
          onLikePost={handleLikePost}
        />
        <StatsBar stats={{ ...initialStats, followersCount: followerCount }} />
        <AboutSection profile={initialProfile} />
        <EducationSection education={initialEducation} />
        <SkillsSection skills={initialSkills} />
        <ProjectsSection
          projects={initialProjects}
          likedProjectIds={likedProjectIds}
          onLikeProject={handleLikeProject}
        />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bilingual Non-Paid IR Chatbot Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
