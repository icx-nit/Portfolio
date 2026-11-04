"use client";

import React from "react";
import { Check } from "lucide-react";
import { PortfolioStats } from "@/types/portfolio";
import { useApp } from "@/lib/i18n/context";

interface StatsBarProps {
  stats: PortfolioStats;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const { t } = useApp();

  const items = [
    { label: t.stats.universityLabel, value: t.stats.university },
    { label: t.stats.reposLabel, value: `${stats.repositoriesCount}+ Repos` },
    { label: t.stats.projectsLabel, value: `${stats.projectsCount} Showcase` },
    { label: t.stats.followersLabel, value: `${stats.followersCount} Followers` },
  ];

  return (
    <section className="w-full border-y border-white/10 bg-night-violet py-8 px-6 overflow-x-auto">
      <div className="max-w-container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 px-4 lg:px-8 py-2 justify-start lg:justify-center"
          >
            <div className="w-6 h-6 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-lilac-beam stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] text-soft-quartz font-medium tracking-tight">
                {item.value}
              </span>
              <span className="text-[12px] text-ash-lilac tracking-wide">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
