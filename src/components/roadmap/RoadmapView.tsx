"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, Hash } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { STUDY_PLAN, STUDY_PLAN_TOTAL, type StudyPlanGroup } from "@/data/study-plan";
import type { LeetCodeIndexEntry } from "@/lib/leetcode-index";
import { useProgressStore } from "@/lib/store/progress";
import { useMounted } from "@/lib/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * The "Start Here" curated roadmap — a fixed, hand-ordered subset of the
 * full LeetCode catalog (src/data/study-plan.ts), grouped by pattern and
 * tracked against the same `solvedLeetcodeIds` the rest of the app already
 * uses. Marking a problem solved here marks it solved everywhere (dashboard
 * stat, /leetcode browser, badges) since it's the same store field.
 */
export default function RoadmapView({
  byslug,
}: {
  byslug: Record<string, LeetCodeIndexEntry>;
}) {
  const mounted = useMounted();
  const solvedIds = useProgressStore((s) => s.solvedLeetcodeIds);
  const solvedSet = useMemo(() => new Set(mounted ? solvedIds : []), [mounted, solvedIds]);

  const solvedInPlan = useMemo(
    () =>
      STUDY_PLAN.reduce(
        (n, g) => n + g.slugs.filter((slug) => solvedSet.has(slug)).length,
        0
      ),
    [solvedSet]
  );
  const percent = STUDY_PLAN_TOTAL > 0 ? Math.round((solvedInPlan / STUDY_PLAN_TOTAL) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <GlassCard className="flex flex-col gap-3" glow="violet">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="font-mono-data text-sm uppercase tracking-wider text-text-muted">
            Plan Progress
          </h2>
          <p className="font-mono-data text-lg font-bold">
            <span className="text-violet">{solvedInPlan}</span>
            <span className="text-text-muted"> / {STUDY_PLAN_TOTAL} solved</span>
            <span className="ml-2 text-xs text-text-muted">({percent}%)</span>
          </p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-glass-border-token/60">
          <motion.div
            className="h-full rounded-full bg-violet shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </GlassCard>

      <div className="flex flex-col gap-4">
        {STUDY_PLAN.map((group, idx) => (
          <RoadmapGroup
            key={group.id}
            group={group}
            index={idx}
            byslug={byslug}
            solvedSet={solvedSet}
          />
        ))}
      </div>
    </div>
  );
}

function RoadmapGroup({
  group,
  index,
  byslug,
  solvedSet,
}: {
  group: StudyPlanGroup;
  index: number;
  byslug: Record<string, LeetCodeIndexEntry>;
  solvedSet: Set<string>;
}) {
  const [open, setOpen] = useState(index < 2);
  const solvedCount = group.slugs.filter((s) => solvedSet.has(s)).length;
  const total = group.slugs.length;
  const done = solvedCount === total;

  return (
    <GlassCard className="flex flex-col gap-0 !p-0 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-mono-data",
              done
                ? "border-violet bg-violet/20 text-violet"
                : "border-glass-border-token text-text-muted"
            )}
          >
            {done ? <CheckCircle2 size={14} /> : index + 1}
          </span>
          <h3 className="font-semibold text-sm sm:text-base">{group.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-xs text-text-muted">
            {solvedCount}/{total}
          </span>
          <ChevronDown
            size={16}
            className={cn("text-text-muted transition-transform", open && "rotate-180")}
          />
        </div>
      </button>

      {open && (
        <div className="flex flex-col border-t border-glass-border-token">
          {group.slugs.map((slug) => {
            const problem = byslug[slug];
            const solved = solvedSet.has(slug);
            if (!problem) return null;
            return (
              <Link
                key={slug}
                href={`/leetcode/${slug}`}
                className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/5 border-b border-glass-border-token last:border-b-0"
              >
                {solved ? (
                  <CheckCircle2 size={15} className="shrink-0 text-violet" />
                ) : (
                  <Circle size={15} className="shrink-0 text-text-muted" />
                )}
                <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-mono-data text-text-muted">
                  <Hash size={10} />
                  {problem.number}
                </span>
                <span
                  className={cn(
                    "truncate",
                    solved ? "text-text-muted line-through decoration-violet/40" : ""
                  )}
                >
                  {problem.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
