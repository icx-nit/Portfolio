import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "outline" | "violet" | "ghost" | "bone";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "glass", size = "md", children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Wope specification: 999px full pill, 44px min touch target
          "inline-flex items-center justify-center font-normal transition-all duration-200 select-none rounded-full min-h-[44px]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ultraviolet-core focus-visible:ring-offset-2 focus-visible:ring-offset-night-violet",
          "disabled:opacity-40 disabled:cursor-not-allowed",

          // Variants
          variant === "glass" && [
            "bg-white/[0.04] text-soft-quartz border border-white/10 backdrop-blur-sm",
            "hover:bg-white/[0.08] hover:border-white/20 active:opacity-90",
          ],
          variant === "outline" && [
            "bg-transparent text-ash-lilac border border-white/10",
            "hover:text-soft-quartz hover:border-white/25 active:opacity-90",
          ],
          variant === "violet" && [
            "bg-ultraviolet-core text-white border border-ultraviolet-core",
            "hover:bg-[#8562ff] hover:border-[#8562ff] shadow-[0_0_20px_rgba(113,61,255,0.4)] active:opacity-90",
          ],
          variant === "ghost" && [
            "bg-transparent text-ash-lilac hover:text-soft-quartz hover:bg-white/[0.04]",
          ],
          variant === "bone" && [
            // Backward-compatible alias for primary glass CTA
            "bg-white/[0.06] text-soft-quartz border border-white/15 backdrop-blur-sm hover:bg-white/[0.12]",
          ],

          // Sizes
          size === "sm" && "text-[13px] px-4 py-2 min-h-[38px]",
          size === "md" && "text-[14px] px-6 py-2.5 min-h-[44px]",
          size === "lg" && "text-[15px] px-8 py-3.5 min-h-[48px]",

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
