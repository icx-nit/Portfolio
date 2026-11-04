import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "glass" | "violet" | "outline" | "slate";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "glass",
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        // Wope specification: 999px radius pill badge with translucent fill
        "inline-flex items-center px-3.5 py-1 text-[13px] font-normal rounded-full transition-colors",
        variant === "glass" && "bg-white/[0.04] text-soft-quartz border border-white/10 backdrop-blur-sm",
        variant === "violet" && "bg-ultraviolet-core/15 text-lilac-beam border border-ultraviolet-core/30",
        variant === "outline" && "bg-transparent text-ash-lilac border border-white/10",
        variant === "slate" && "bg-white/[0.02] text-dim-fog border border-white/5",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
