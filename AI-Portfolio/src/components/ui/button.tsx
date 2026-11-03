import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "filled" | "bone" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "ghost", size = "md", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base pill styling from DESIGN.md
          "inline-flex items-center justify-center font-normal transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-50 disabled:cursor-not-allowed select-none",
          "rounded-full tracking-normal min-h-[44px]", // Mobile-first 44px min touch target
          
          // Variants
          variant === "ghost" && [
            "bg-transparent text-bone border border-bone",
            "hover:bg-bone hover:text-obsidian active:opacity-90",
          ],
          variant === "filled" && [
            "bg-obsidian text-bone border border-char",
            "hover:border-bone active:opacity-90",
          ],
          variant === "bone" && [
            "bg-bone text-obsidian border border-bone",
            "hover:bg-transparent hover:text-bone active:opacity-90",
          ],
          variant === "outline" && [
            "bg-transparent text-bone border border-char",
            "hover:border-bone hover:text-bone active:opacity-90",
          ],
          
          // Sizes
          size === "sm" && "text-[14px] px-5 py-2",
          size === "md" && "text-[15px] px-7 py-3",
          size === "lg" && "text-[16px] px-9 py-4",

          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
