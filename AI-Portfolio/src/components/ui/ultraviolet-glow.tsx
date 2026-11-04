import React from "react";
import { cn } from "@/lib/utils";

interface UltravioletGlowProps {
  className?: string;
  intensity?: "subtle" | "medium" | "vibrant";
}

export const UltravioletGlow: React.FC<UltravioletGlowProps> = ({
  className,
  intensity = "medium",
}) => {
  const opacities = {
    subtle: "opacity-40",
    medium: "opacity-70",
    vibrant: "opacity-90",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute select-none animate-ultraviolet -z-10",
        opacities[intensity],
        className
      )}
    >
      {/* Radiant Violet Horizon Glow Field */}
      <div
        className="w-[340px] sm:w-[600px] md:w-[800px] h-[300px] md:h-[450px] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(133, 98, 255, 0.6) 0%, rgba(113, 61, 255, 0.45) 45%, rgba(183, 164, 251, 0.15) 70%, transparent 100%)",
        }}
      />
    </div>
  );
};
