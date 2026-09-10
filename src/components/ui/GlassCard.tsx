"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  glow?: "cyan" | "violet" | "amber" | "none";
  tilt?: boolean;
}

/**
 * Frosted glass panel — the base surface for nearly everything in the app.
 * Optional subtle tilt-on-hover micro-interaction and semantic glow.
 */
export default function GlassCard({
  className,
  glow = "none",
  tilt = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-5",
        glow === "cyan" && "glow-cyan",
        glow === "violet" && "glow-violet",
        glow === "amber" && "glow-amber",
        className
      )}
      whileHover={
        tilt
          ? { rotateX: -2, rotateY: 2, scale: 1.01, transition: { duration: 0.25 } }
          : undefined
      }
      style={tilt ? { transformStyle: "preserve-3d", perspective: 800 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
