"use client";

import { forwardRef, ComponentProps } from "react";
import clsx from "clsx";
import { GlassCard as BaseGlassCard } from "@developer-hub/liquid-glass";

export type GlassCardProps = ComponentProps<typeof BaseGlassCard>;

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      displacementScale = 34,
      blurAmount = 0.0,
      cornerRadius = 28,
      padding = "2.25rem",
      shadowMode = false,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <div 
        ref={ref}
        className={clsx(
          "relative overflow-hidden rounded-[36px] border backdrop-blur-xl transition-all duration-300",
          "border-white/25 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
          "dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
          className
        )}
        style={{ padding }}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

