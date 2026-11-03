import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "bone" | "char";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "char", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Clyde specification: 16px radius, flat (no box-shadows), 1px hairline border
          "rounded-[16px] p-6 transition-all duration-200",
          variant === "char" && "bg-obsidian border border-char hover:border-bone/40 text-bone",
          variant === "dark" && "bg-char/40 border border-char hover:border-bone/30 text-bone",
          variant === "bone" && "bg-bone border border-bone text-obsidian",
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
