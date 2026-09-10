"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  /** 0-100 */
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: "cyan" | "violet" | "amber";
  label?: string;
  className?: string;
}

const colorHex: Record<NonNullable<ProgressRingProps["color"]>, string> = {
  cyan: "#00f0ff",
  violet: "#a855f7",
  amber: "#ffb020",
};

export default function ProgressRing({
  percent,
  size = 64,
  strokeWidth = 5,
  color = "cyan",
  label,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-glass-border)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorHex[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 4px ${colorHex[color]}88)` }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono-data text-xs font-semibold">
        {label ?? `${Math.round(clamped)}%`}
      </span>
    </div>
  );
}
