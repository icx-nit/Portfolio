import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "outline" | "bone" | "slate";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "outline",
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        // Clyde specification: 100px radius pill tag
        "inline-flex items-center px-3.5 py-1 text-[13px] font-normal rounded-full transition-colors",
        variant === "outline" && "border border-char text-bone/80 bg-obsidian",
        variant === "bone" && "border border-bone text-obsidian bg-bone",
        variant === "slate" && "border border-char text-slate bg-char/50",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
