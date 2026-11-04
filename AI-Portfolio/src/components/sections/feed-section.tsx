"use client";

import React, { useState } from "react";
import { Post } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Sparkles, MessageSquareOff } from "lucide-react";
import { useApp } from "@/lib/i18n/context";

interface FeedSectionProps {
  posts: Post[];
  likedPostIds?: string[];
  onLikePost?: (postId: string) => void;
}

export const FeedSection: React.FC<FeedSectionProps> = ({
  posts,
  likedPostIds = [],
  onLikePost,
}) => {
  const { language, t } = useApp();

  return (
    <section id="feed" className="py-24 px-6 bg-night-violet border-b border-white/10 relative">
      <div className="max-w-container mx-auto space-y-12">
        {/* Section Heading */}
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[12px] text-lilac-beam">
            <Sparkles className="w-3.5 h-3.5 text-ultraviolet-core" />
            <span>{t.feed.launchBadge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold tracking-tight">
            {t.feed.title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-ash-lilac">
            {t.feed.subtitle}
          </p>
        </div>

        {/* Social Feed Stream */}
        <div className="space-y-6 max-w-3xl">
          {posts.map((post) => {
            const isLiked = likedPostIds.includes(post.id);
            const content =
              language === "th" && post.contentTh ? post.contentTh : post.content;
            const category =
              language === "th" && post.categoryTh ? post.categoryTh : post.category;

            return (
              <Card
                key={post.id}
                variant="surface"
                className="p-6 sm:p-8 space-y-5 border-white/10 hover:border-white/20 transition-all duration-200"
              >
                {/* Post Header: Category & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Badge variant="violet" className="text-[12px]">
                      {category}
                    </Badge>
                    <span className="text-white/20">·</span>
                    <span className="text-[12px] text-ash-lilac flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-dim-fog" />
                      <span>{post.publishedAt}</span>
                    </span>
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => onLikePost?.(post.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] border transition-colors min-h-[36px] ${
                      isLiked
                        ? "border-red-500/50 text-red-400 bg-red-500/10"
                        : "border-white/10 text-ash-lilac hover:border-white/30 hover:text-soft-quartz"
                    }`}
                    title={isLiked ? t.feed.liked : t.feed.like}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isLiked ? "fill-red-400 text-red-400" : ""}`}
                    />
                    <span className="font-mono text-[12px]">
                      {post.likesCount + (isLiked ? 1 : 0)}
                    </span>
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-[15px] sm:text-[16px] text-soft-quartz/90 font-normal leading-relaxed whitespace-pre-line">
                  {content}
                </p>

                {/* Post Images if present */}
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {post.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-card border border-white/10 overflow-hidden bg-void-plum/50"
                      >
                        <img
                          src={img}
                          alt="Post attachment"
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Post Footer note */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[12px] text-ash-lilac/60">
                  <span>Author: Nittaya Pana · University of Phayao</span>
                  <span className="flex items-center gap-1">
                    <MessageSquareOff className="w-3 h-3 text-dim-fog" />
                    <span>Public Read & Like Only</span>
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
