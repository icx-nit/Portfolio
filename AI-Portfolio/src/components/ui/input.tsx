import React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <div className="w-full relative border-b border-white/15 focus-within:border-ultraviolet-core transition-colors bg-white/[0.02] rounded-t-sm">
        <input
          type={type}
          ref={ref}
          className={cn(
            // Wope specification: borderless input, 0px radius, clean text
            "w-full bg-transparent border-0 px-4 py-3.5 text-[15px] text-soft-quartz placeholder:text-ash-lilac/50",
            "focus:outline-none focus:ring-0 disabled:opacity-40 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full relative border-b border-white/15 focus-within:border-ultraviolet-core transition-colors bg-white/[0.02] rounded-t-sm">
        <textarea
          rows={rows}
          ref={ref}
          className={cn(
            "w-full bg-transparent border-0 px-4 py-3.5 text-[15px] text-soft-quartz placeholder:text-ash-lilac/50",
            "focus:outline-none focus:ring-0 resize-y disabled:opacity-40 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
