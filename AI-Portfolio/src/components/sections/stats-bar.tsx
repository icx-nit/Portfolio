import React from "react";
import { Check } from "lucide-react";
import { PortfolioStats } from "@/types/portfolio";

interface StatsBarProps {
  stats: PortfolioStats;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const items = [
    { label: "University of Phayao", value: "ICT Student" },
    { label: "Public Repositories", value: `${stats.repositoriesCount}+ Repos` },
    { label: "Completed Projects", value: `${stats.projectsCount} Showcase` },
    { label: "Community Support", value: `${stats.followersCount} Followers` },
  ];

  return (
    <section className="w-full border-y border-char bg-obsidian py-8 px-6 overflow-x-auto">
      <div className="max-w-container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-char">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 px-4 lg:px-8 py-2 justify-start lg:justify-center"
          >
            <div className="w-6 h-6 rounded-full border border-bone/60 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-bone stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] text-bone font-normal tracking-tight">
                {item.value}
              </span>
              <span className="text-[12px] text-slate tracking-wide">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
