"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/lib/i18n/context";
import { Post } from "@/types/portfolio";
import { initialProfile } from "@/data/portfolio-seed";

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
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update scroll buttons and dot indicators based on scroll position
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Calculate approximate active post index based on card width
    const firstCard = carouselRef.current.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, newIndex), posts.length - 1));
    }
  };

  useEffect(() => {
    handleScroll();
  }, [posts]);

  // Scroll by card offset
  const scroll = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 400;
    const scrollAmount = direction === "prev" ? -cardWidth : cardWidth;

    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 400;

    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("prev");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("next");
    }
  };

  // Profile avatar fallback initials
  const initials =
    initialProfile.name
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "NP";

  return (
    <section id="posts" className="py-24 px-6 bg-transparent border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Heading & Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-left">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold tracking-tight">
              {t.feed.title}
            </h2>

            <p className="text-[15px] sm:text-[16px] text-ash-lilac max-w-xl">
              {t.feed.subtitle}
            </p>
          </div>

          {/* Carousel Arrow Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll("prev")}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border border-white/10 bg-white/[0.04] transition-all duration-200 ${
                canScrollLeft
                  ? "hover:bg-white/[0.1] hover:border-cyan-400/30 text-soft-quartz cursor-pointer"
                  : "opacity-40 cursor-not-allowed text-ash-lilac"
              }`}
              aria-label="Previous posts"
              title="Previous posts"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scroll("next")}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border border-white/10 bg-white/[0.04] transition-all duration-200 ${
                canScrollRight
                  ? "hover:bg-white/[0.1] hover:border-cyan-400/30 text-soft-quartz cursor-pointer"
                  : "opacity-40 cursor-not-allowed text-ash-lilac"
              }`}
              aria-label="Next posts"
              title="Next posts"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Horizontal Carousel Container                             */}
        {/* Shows 2 full cards on desktop, 1 + peek on mobile         */}
        {/* CSS scroll snap: scroll-snap-type: x mandatory            */}
        {/* ========================================================= */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Social Feed Posts Carousel"
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2 pt-1 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 rounded-2xl"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {posts.length === 0 ? (
            <div className="w-full text-center py-12 text-ash-lilac text-sm">
              {t.feed.emptyState}
            </div>
          ) : (
            posts.map((post, idx) => {
              const isLiked = likedPostIds.includes(post.id);
              const content =
                language === "th" && post.contentTh ? post.contentTh : post.content;
              const category =
                language === "th" && post.categoryTh ? post.categoryTh : post.category;

              return (
                <div
                  key={post.id}
                  className="w-[85vw] sm:w-[480px] lg:w-[calc(50%-12px)] flex-shrink-0 snap-start"
                >
                  <Card
                    variant="surface"
                    className="h-full p-6 sm:p-7 space-y-4 border-white/10 hover:border-cyan-400/30 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Post Header: Author Avatar & Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full border border-cyan-400/30 bg-gradient-to-tr from-ultraviolet-core/40 to-cyan-500/20 overflow-hidden flex items-center justify-center font-display font-bold text-xs text-soft-quartz flex-shrink-0">
                            {initialProfile.avatarUrl ? (
                              <Image
                                src={initialProfile.avatarUrl}
                                alt={initialProfile.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <span>{initials}</span>
                            )}
                          </div>

                          <div>
                            <h4 className="font-display font-semibold text-sm text-soft-quartz">
                              {initialProfile.name.split(" (")[0]}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-ash-lilac font-mono">
                              <span>{post.publishedAt}</span>
                              <span className="text-white/20">·</span>
                              <Badge
                                variant="violet"
                                className="text-[10px] py-0 px-2 bg-cyan-500/10 text-cyan-300 border-cyan-400/20"
                              >
                                {category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Like Button */}
                        <button
                          onClick={() => onLikePost?.(post.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                            isLiked
                              ? "bg-pink-500/15 text-pink-400 border border-pink-500/30 font-semibold"
                              : "bg-white/[0.04] text-ash-lilac border border-white/10 hover:border-pink-500/40 hover:text-pink-300"
                          }`}
                          aria-label="Like post"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isLiked ? "fill-pink-500 text-pink-500" : ""
                            }`}
                          />
                          <span>{post.likesCount}</span>
                        </button>
                      </div>

                      {/* Post Content */}
                      <p className="text-sm leading-relaxed text-soft-quartz/90 font-sans">
                        {content}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-dim-fog font-mono border-t border-white/5">
                      <span>Post #{idx + 1}</span>
                      <span className="text-cyan-400/70">UX/UI Design Journal</span>
                    </div>
                  </Card>
                </div>
              );
            })
          )}
        </div>

        {/* Position Dots Indicator */}
        {posts.length > 0 && (
          <div className="flex justify-center items-center gap-2 pt-2">
            {posts.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToIndex(dotIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === dotIdx
                    ? "w-8 h-2 bg-cyan-400"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Scroll to post ${dotIdx + 1}`}
                title={`Post ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
