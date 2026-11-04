import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "surface" | "frosted" | "overlay" | "char";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "surface", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Wope specification: 16px radius, flat (no drop-shadows), 1px translucent border or glow edge
          "rounded-[16px] transition-all duration-200",
          variant === "surface" && "bg-night-violet border border-white/10 text-soft-quartz hover:border-white/20",
          variant === "frosted" && "bg-white/[0.02] border border-white/10 backdrop-blur-[4px] text-soft-quartz",
          variant === "overlay" && "bg-[#0a0118]/80 border border-white/10 rounded-[10px] backdrop-blur-[8px]",
          variant === "char" && "bg-night-violet border border-white/10 text-soft-quartz hover:border-white/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
