import React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Clyde specification: 4px border radius, flat dark surface, hairline border
          "w-full rounded-[4px] bg-char/80 border border-char px-4 py-3 text-[15px] text-bone placeholder:text-slate",
          "transition-colors duration-150 focus:border-bone focus:bg-char focus:outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, ...props }, ref) => {
    return (
      <textarea
        rows={rows}
        ref={ref}
        className={cn(
          "w-full rounded-[4px] bg-char/80 border border-char px-4 py-3 text-[15px] text-bone placeholder:text-slate",
          "transition-colors duration-150 focus:border-bone focus:bg-char focus:outline-none resize-y",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
