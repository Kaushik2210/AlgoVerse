"use client";

import { useEffect, useRef, useState } from "react";
import { Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useLevelProgress } from "@/lib/store/selectors";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/** Prominent level/rank/XP display — the dashboard's centerpiece. Bar fill
 * and the XP counter tween together with GSAP whenever xp changes: the
 * numeric readout counts up in sync with the bar filling, driven by a
 * single tween's onUpdate rather than two independent animations that
 * could drift out of step. */
export default function XPBar() {
  const level = useLevelProgress();
  const reducedMotion = usePrefersReducedMotion();
  const fillRef = useRef<HTMLDivElement>(null);
  // Both start at 0 so a fresh mount counts up from zero, matching the
  // bar's own "initial width 0" behavior — later xp changes then tween
  // from wherever they last landed instead of resetting to 0 again.
  const [displayXp, setDisplayXp] = useState(0);
  const prevXpRef = useRef(0);
  const prevPercentRef = useRef(0);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    if (reducedMotion) {
      gsap.set(fill, { width: `${level.percentToNextLevel}%` });
      prevXpRef.current = level.xp;
      prevPercentRef.current = level.percentToNextLevel;
      return;
    }

    const tweenState = { percent: prevPercentRef.current, xp: prevXpRef.current };
    const tween = gsap.to(tweenState, {
      percent: level.percentToNextLevel,
      xp: level.xp,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        fill.style.width = `${tweenState.percent}%`;
        setDisplayXp(Math.round(tweenState.xp));
      },
      onComplete: () => {
        prevPercentRef.current = level.percentToNextLevel;
        prevXpRef.current = level.xp;
      },
    });

    return () => {
      tween.kill();
    };
  }, [level.xp, level.percentToNextLevel, reducedMotion]);

  return (
    <GlassCard glow="violet" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono-data text-[11px] uppercase tracking-wider text-text-muted">
            Operative Status
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold font-mono-data text-violet text-glow-cyan">
              Lv.{level.level}
            </span>
            <span className="text-lg font-semibold">{level.rank}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-3 py-1.5 text-amber font-mono-data text-sm">
          <Zap size={14} />
          {(reducedMotion ? level.xp : displayXp).toLocaleString()} XP
        </div>
      </div>

      <div>
        <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden border border-glass-border-token">
          <div
            ref={fillRef}
            className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
            style={{ width: 0, boxShadow: "0 0 10px rgba(168,85,247,0.5)" }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[11px] font-mono-data text-text-muted">
          <span>
            {level.xpIntoLevel.toLocaleString()} / {level.xpForNextLevel.toLocaleString()} XP to Lv.
            {level.level + 1}
          </span>
          {level.nextRank && (
            <span>
              {level.levelsToNextRank} level{level.levelsToNextRank === 1 ? "" : "s"} to{" "}
              <span className="text-violet">{level.nextRank}</span>
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
