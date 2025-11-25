"use client";
import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            "block text-sm font-medium",
            "text-black/70 dark:text-[#cbd5e1]"
          )}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "w-full px-4 py-3 rounded-xl border backdrop-blur-xl transition-all duration-300",
          "border-white/20 bg-white/10",
          "dark:border-white/10 dark:bg-[rgba(30,30,30,0.5)]",
          "dark:backdrop-blur-[12px]",
          "text-black dark:text-[#cbd5e1]",
          "placeholder:text-black/40 dark:placeholder:text-[#9ca3af]",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
          "dark:focus:ring-indigo-400/50",
          "focus:border-indigo-500/50 dark:focus:border-indigo-400/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "dark:disabled:bg-[rgba(30,30,30,0.3)]",
          className
        )}
        {...props}
      />
    </div>
  );
}

