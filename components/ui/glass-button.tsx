"use client";
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type GlassButtonProps = Omit<HTMLMotionProps<"button">, "ref"> & {
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<GlassButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ size = "md", className, children, ...props }, ref) => {
  const MotionButton = motion.button;

  return (
    <MotionButton
        ref={ref}
      {...props}
      whileHover={!props.disabled ? { scale: 1.05 } : {}}
      whileTap={!props.disabled ? { scale: 0.95 } : {}}
      className={[
        "rounded-lg border backdrop-blur-xl inline-flex items-center justify-center transition-all duration-300 font-semibold",
        // Light
        "border-black/10 bg-white/60 text-black hover:bg-white/90",
        // Dark
        "dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "dark:focus-visible:ring-white/30 dark:focus-visible:ring-offset-black",
        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/60 dark:disabled:hover:bg-white/5",
        sizeClasses[size],
        className ?? "",
      ].join(" ")}
    >
      {children}
    </MotionButton>
  );
  }
);

GlassButton.displayName = "GlassButton";