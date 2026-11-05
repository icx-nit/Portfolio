"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { FeedSection } from "@/components/sections/feed-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { IntroCard } from "@/components/intro/IntroCard";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { initialPosts, initialStats } from "@/data/portfolio-seed";
import { Post } from "@/types/portfolio";

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [followerCount, setFollowerCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("portfolio_follower_count");
      if (cached !== null) return parseInt(cached, 10);
    }
    return initialStats.followersCount;
  });
  const [hasFollowed, setHasFollowed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio_has_followed") === "true";
    }
    return false;
  });
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("portfolio_posts");
        if (cached !== null) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (e) {}
    }
    return [];
  });
  const [showIntro, setShowIntro] = useState(true);

  // Dynamic CMS States synced from Admin Dashboard
  const [cmsProfile, setCmsProfile] = useState<any>(null);
  const [cmsEducation, setCmsEducation] = useState<any[]>([]);
  const [cmsSkills, setCmsSkills] = useState<any[]>([]);
  const [cmsAboutDetails, setCmsAboutDetails] = useState<any>(null);
  const [cmsResumes, setCmsResumes] = useState<any[]>([]);

  // Fetch initial follow status, posts cache, and CMS content
  useEffect(() => {
    // 1. Instant cache recovery and real-time sync with Admin Dashboard
    const syncPosts = () => {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("portfolio_posts");
        if (cached !== null) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) setPosts(parsed);
          } catch (e) {}
        }
      }
    };
    syncPosts();

    const syncFollowers = () => {
      if (typeof window !== "undefined") {
        const cachedCount = localStorage.getItem("portfolio_follower_count");
        const cachedFollowed = localStorage.getItem("portfolio_has_followed");
        if (cachedCount !== null) setFollowerCount(parseInt(cachedCount, 10));
        if (cachedFollowed !== null) setHasFollowed(cachedFollowed === "true");
      }
    };
    syncFollowers();

    window.addEventListener("portfolio-posts-change", syncPosts);
    window.addEventListener("portfolio-followers-change", syncFollowers);
    window.addEventListener("storage", syncPosts);
    window.addEventListener("storage", syncFollowers);

    const visitorId = typeof window !== "undefined" ? localStorage.getItem("portfolio_visitor_id") : null;
    const followUrl = visitorId ? `/api/interactions/follow?visitorId=${encodeURIComponent(visitorId)}` : "/api/interactions/follow";
    fetch(followUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setFollowerCount(data.count);
          setHasFollowed(Boolean(data.hasFollowed));
          if (typeof window !== "undefined") {
            localStorage.setItem("portfolio_follower_count", String(data.count));
            localStorage.setItem("portfolio_has_followed", String(Boolean(data.hasFollowed)));
          }
        }
      })
      .catch(() => {});

    // Fetch CMS Content from Admin
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) setCmsProfile(data.profile);
        if (data.education) setCmsEducation(data.education);
        if (data.skills) setCmsSkills(data.skills);
        if (data.aboutDetails) setCmsAboutDetails(data.aboutDetails);
        if (data.resumes) setCmsResumes(data.resumes);
        if (data.posts !== undefined && Array.isArray(data.posts)) {
          setPosts(data.posts);
          if (typeof window !== "undefined") {
            localStorage.setItem("portfolio_posts", JSON.stringify(data.posts));
          }
        }
      })
      .catch(() => {});

    // Track real visitor reach count
    fetch("/api/analytics/reach", { method: "POST" }).catch(() => {});

    return () => {
      window.removeEventListener("portfolio-posts-change", syncPosts);
      window.removeEventListener("portfolio-followers-change", syncFollowers);
      window.removeEventListener("storage", syncPosts);
      window.removeEventListener("storage", syncFollowers);
    };
  }, []);

  const handleFollow = async () => {
    const nextFollowed = !hasFollowed;
    const nextCount = nextFollowed ? followerCount + 1 : Math.max(0, followerCount - 1);

    // Optimistic instant feedback
    setHasFollowed(nextFollowed);
    setFollowerCount(nextCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_has_followed", String(nextFollowed));
      localStorage.setItem("portfolio_follower_count", String(nextCount));
      window.dispatchEvent(new Event("portfolio-followers-change"));
    }

    try {
      const visitorId = typeof window !== "undefined" ? localStorage.getItem("portfolio_visitor_id") : null;
      const res = await fetch("/api/interactions/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: nextFollowed ? "follow" : "unfollow",
          visitorId,
        }),
      });
      const data = await res.json();
      if (data && data.success) {
        setHasFollowed(data.hasFollowed);
        setFollowerCount(data.count);
        if (typeof window !== "undefined") {
          if (data.visitorId) localStorage.setItem("portfolio_visitor_id", data.visitorId);
          localStorage.setItem("portfolio_has_followed", String(data.hasFollowed));
          localStorage.setItem("portfolio_follower_count", String(data.count));
          window.dispatchEvent(new Event("portfolio-followers-change"));
        }
      }
    } catch (err) {
      console.error("Follow error:", err);
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
          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId ? { ...p, likesCount: data.count ?? p.likesCount + 1 } : p
            )
          );
        } else {
          setLikedPostIds((prev) => prev.filter((id) => id !== postId));
          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId
                ? { ...p, likesCount: Math.max(0, data.count ?? p.likesCount - 1) }
                : p
            )
          );
        }
      }
    } catch (err) {
      console.error("Like post error:", err);
    }
  };

  return (
    <>
      {/* 1. Intro Card Animation (Tilted -4.5deg) */}
      {showIntro && (
        <IntroCard
          profile={cmsProfile}
          onComplete={() => {
            setShowIntro(false);
            if (typeof window !== "undefined") {
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent("layout-updated"));
              }, 150);
            }
          }}
        />
      )}

      <div
        className={`relative z-10 min-h-screen bg-transparent text-soft-quartz flex flex-col transition-opacity duration-700 ${
          showIntro ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Sticky Navigation Bar */}
        <Navbar />

        {/* 5 Main Sections (In Exact User-Specified Order) */}
        <main className="flex-1 overflow-x-clip">
          {/* 1. Home / Hero Section: Slide up */}
          <ScrollReveal direction="up" amount={0.15} once={false}>
            <HeroSection
              followerCount={followerCount}
              hasFollowed={hasFollowed}
              onFollow={handleFollow}
              profile={cmsProfile}
              activeResume={cmsResumes?.find((r) => r.isDefault) || cmsResumes?.[0]}
            />
          </ScrollReveal>

          {/* 2. About Me Section: Center photo, Left slides in from left, Right from right */}
          <AboutSection
            profile={cmsProfile}
            education={cmsEducation}
            aboutDetails={cmsAboutDetails}
          />

          {/* 3. Posts / Social Feed Section: Slide up from bottom */}
          <ScrollReveal direction="up" amount={0.15} once={false}>
            <FeedSection
              posts={posts}
              likedPostIds={likedPostIds}
              onLikePost={handleLikePost}
            />
          </ScrollReveal>

          {/* 4. Skills Section: Sub-sections animate individually (Hard Skills: left, Soft Skills: right, Tools: left) */}
          <SkillsSection cmsSkills={cmsSkills} />

          {/* 5. Contact Me Section: Slide up from bottom */}
          <ScrollReveal direction="up" amount={0.15} once={false}>
            <ContactSection />
          </ScrollReveal>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Bilingual IR Chatbot Widget */}
        <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </>
  );
}
