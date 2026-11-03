import React from "react";
import { cn } from "@/lib/utils";

interface SolsticeOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const SolsticeOrb: React.FC<SolsticeOrbProps> = ({ className, size = "md" }) => {
  const sizeMap = {
    sm: "w-32 h-32 blur-2xl opacity-70",
    md: "w-64 h-64 md:w-80 md:h-80 blur-3xl opacity-80",
    lg: "w-96 h-96 md:w-[480px] md:h-[480px] blur-[90px] opacity-75",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none animate-orb mix-blend-screen transition-all duration-700",
        sizeMap[size],
        className
      )}
      style={{
        background: "linear-gradient(135deg, #feed7a 0%, #ff8400 48.96%, #df91f7 100%)",
        borderRadius: "60% 40% 70% 30% / 40% 50% 60% 50%",
      }}
    />
  );
};
