"use client";

import { Flame, Shield, Crown, Sparkles, Star, Target, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlateTier } from "@/lib/badges";

/**
 * Hex-shield achievement plate — the reusable visual unit behind every
 * badge across the badge case, share cards, and certificate pages.
 *
 * Shape/animation spec lives in globals.css (.badge-particle/.badge-sheen/
 * .badge-icon-pulse keyframes) so every plate instance on a page shares one
 * set of @keyframes instead of duplicating them per-instance. This
 * component only supplies the per-tier SVG gradients/colors/icon and toggles
 * the shared classes on/off based on `earned`.
 */

const HEX_PATH = "M88 4 L164 46 V134 L88 176 L12 134 V46 Z";
const BEVEL_PATH = "M88 12 L156 50 V130 L88 168 L20 130 V50 Z";

interface TierStyle {
  /** [highlight, mid, shadow] stops for the metallic plate gradient. */
  gradient: [string, string, string];
  /** Accent color used for the ring, sheen tint, icon, and glow. */
  accent: string;
  /** Fill used for the center value text. */
  text: string;
  icon: React.ElementType;
}

const TIER_STYLE: Record<PlateTier, TierStyle> = {
  copper: {
    gradient: ["#f0b487", "#c97b3d", "#6e3d1c"],
    accent: "#e2915a",
    text: "#fff0e0",
    icon: Flame,
  },
  bronze: {
    gradient: ["#ffcf8a", "#d99a4e", "#7a4a1e"],
    accent: "#d99a4e",
    text: "#fff2df",
    icon: Flame,
  },
  silver: {
    gradient: ["#ffffff", "#c3ccd9", "#6b7482"],
    accent: "#cfd7e3",
    text: "#f7f9fc",
    icon: Shield,
  },
  gold: {
    gradient: ["#fff2c2", "#f0b840", "#8a5c10"],
    accent: "#ffcf5a",
    text: "#fff8e5",
    icon: Crown,
  },
  holo: {
    gradient: ["#baf9ff", "#00e5ff", "#9b5de5"],
    accent: "#7ff2ff",
    text: "#eafcff",
    icon: Sparkles,
  },
  rank: {
    gradient: ["#ffe6a8", "#e0a13a", "#9b5de5"],
    accent: "#e0a13a",
    text: "#fff6df",
    icon: Star,
  },
  target: {
    gradient: ["#c8faff", "#12b8d6", "#054450"],
    accent: "#12b8d6",
    text: "#eafcff",
    icon: Target,
  },
};

const PARTICLES = [
  { cx: 30, cy: 40, r: 1.6, pop: 0.5 },
  { cx: 190, cy: 60, r: 1.3, pop: 0.65 },
  { cx: 178, cy: 165, r: 1.9, pop: 0.4 },
  { cx: 32, cy: 172, r: 1.4, pop: 0.55 },
];

export interface BadgePlateProps {
  tier: PlateTier;
  /** Whether this badge has actually been earned. Locked plates render as
   * an inert grey/locked silhouette regardless of `tier`. */
  earned: boolean;
  /** Center label — a day count ("100"), a short rank code ("CMDR"), or a
   * solved-count ("250"). Kept short; long values shrink to fit. */
  value: string;
  size?: number;
  className?: string;
  /** Disables the orbiting-particle layer (e.g. dense grid renders). */
  particles?: boolean;
}

export default function BadgePlate({
  tier,
  earned,
  value,
  size = 176,
  className,
  particles = true,
}: BadgePlateProps) {
  const style = TIER_STYLE[tier];
  const Icon = style.icon;
  const uid = `${tier}-${earned ? "on" : "off"}`;
  const gradId = `plate-grad-${uid}`;
  const domeId = `plate-dome-${uid}`;
  const clipId = `plate-clip-${uid}`;
  const fontSize = value.length > 2 ? (value.length > 3 ? 15 : 17) : 22;

  return (
    <div
      className={cn("relative shrink-0", !earned && "badge-plate-locked", className)}
      style={{ width: size, height: size }}
    >
      {earned && particles && (
        <svg
          className="pointer-events-none absolute"
          style={{ left: -size * 0.11, top: -size * 0.11 }}
          width={size * 1.22}
          height={size * 1.22}
          viewBox="0 0 216 216"
        >
          {PARTICLES.map((p, i) => (
            <circle
              key={i}
              className="badge-particle"
              style={{ "--pop": p.pop } as React.CSSProperties}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={style.accent}
            />
          ))}
        </svg>
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 176 176"
        style={{ display: "block", filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.55))" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            {earned ? (
              <>
                <stop offset="0%" stopColor={style.gradient[0]} />
                <stop offset="45%" stopColor={style.gradient[1]} />
                <stop offset="100%" stopColor={style.gradient[2]} />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#5a606e" />
                <stop offset="100%" stopColor="#22252d" />
              </>
            )}
          </linearGradient>
          <radialGradient id={domeId} cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor={earned ? "#182238" : "#121319"} />
            <stop offset="100%" stopColor="#050710" />
          </radialGradient>
          <clipPath id={clipId}>
            <path d={HEX_PATH} />
          </clipPath>
        </defs>

        <path d={HEX_PATH} fill={`url(#${gradId})`} />
        <path d={BEVEL_PATH} fill="#0a0b10" />
        <path
          d={BEVEL_PATH}
          fill="none"
          stroke={earned ? style.accent : "#5a606e"}
          strokeWidth={earned ? 1 : 1.4}
          opacity={earned ? 0.4 : 0.8}
        />
        <circle cx="88" cy="82" r="40" fill={`url(#${domeId})`} />
        <circle
          cx="88"
          cy="82"
          r="40"
          fill="none"
          stroke={earned ? style.accent : "#5a606e"}
          strokeWidth="1.4"
          opacity={earned ? 0.65 : 0.9}
        />

        <text
          x="88"
          y="112"
          textAnchor="middle"
          fontFamily="Orbitron, sans-serif"
          fontWeight={900}
          fontSize={fontSize}
          fill={earned ? style.text : "#6b7280"}
        >
          {value}
        </text>

        {earned && (
          <g clipPath={`url(#${clipId})`}>
            <rect
              className="badge-sheen"
              x="-40"
              y="60"
              width="34"
              height="220"
              fill="white"
              opacity="0"
              transform="rotate(24 88 88)"
            />
          </g>
        )}
      </svg>

      <div
        className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        style={{ color: earned ? style.accent : "#6b7280" }}
      >
        {earned ? (
          <Icon className="badge-icon-pulse" size={size * 0.15} strokeWidth={2} />
        ) : (
          <Lock size={size * 0.13} strokeWidth={2} />
        )}
      </div>
    </div>
  );
}
