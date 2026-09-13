"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useActivityLog } from "@/lib/store/selectors";
import { cn } from "@/lib/utils";

const WEEKS = 26; // ~6 months, keeps the grid readable on smaller screens
const DAY_MS = 86400000;

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Buckets the raw activity log into a per-day event count for the last
 * `WEEKS` weeks, then renders a GitHub-contributions-style grid (weeks as
 * columns, Sun-Sat as rows). Reuses the site's cyan intensity scale rather
 * than GitHub's green. */
export default function ActivityHeatmap() {
  const log = useActivityLog();
  const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null);

  const { cells, maxCount, totalActive } = useMemo(() => {
    const counts = new Map<string, number>();
    for (const event of log) {
      counts.set(event.date, (counts.get(event.date) ?? 0) + 1);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Align the grid so the last column ends on the current week, Sunday-start rows.
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    const totalDays = WEEKS * 7;
    const start = new Date(endOfWeek.getTime() - (totalDays - 1) * DAY_MS);

    const grid: { date: string; count: number; inFuture: boolean }[][] = Array.from(
      { length: WEEKS },
      () => []
    );

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start.getTime() + i * DAY_MS);
      const date = isoDate(d);
      const week = Math.floor(i / 7);
      const count = counts.get(date) ?? 0;
      grid[week].push({ date, count, inFuture: d > today });
    }

    const max = Math.max(1, ...Array.from(counts.values()));
    const active = Array.from(counts.values()).filter((c) => c > 0).length;

    return { cells: grid, maxCount: max, totalActive: active };
  }, [log]);

  function intensityClass(count: number, inFuture: boolean) {
    if (inFuture) return "bg-transparent border-transparent";
    if (count === 0) return "bg-white/5 border-glass-border-token";
    const ratio = count / maxCount;
    if (ratio > 0.75) return "bg-cyan border-cyan/60 shadow-[0_0_6px_rgba(0,240,255,0.6)]";
    if (ratio > 0.45) return "bg-cyan/60 border-cyan/40";
    if (ratio > 0.15) return "bg-cyan/30 border-cyan/25";
    return "bg-cyan/15 border-cyan/15";
  }

  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-cyan" />
          <h3 className="font-mono-data text-sm uppercase tracking-wider">Activity Log</h3>
        </div>
        <span className="text-xs font-mono-data text-text-muted">
          {totalActive} active day{totalActive === 1 ? "" : "s"} (last {WEEKS}w)
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-max">
          {cells.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: wi * 0.008 }}
                  onMouseEnter={() => setHovered({ date: day.date, count: day.count })}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "h-[11px] w-[11px] rounded-[3px] border",
                    intensityClass(day.count, day.inFuture)
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono-data text-text-muted">
        <span>
          {hovered
            ? `${hovered.count} event${hovered.count === 1 ? "" : "s"} on ${hovered.date}`
            : "Hover a cell for details"}
        </span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <span className="h-[11px] w-[11px] rounded-[3px] border bg-white/5 border-glass-border-token" />
          <span className="h-[11px] w-[11px] rounded-[3px] border bg-cyan/15 border-cyan/15" />
          <span className="h-[11px] w-[11px] rounded-[3px] border bg-cyan/30 border-cyan/25" />
          <span className="h-[11px] w-[11px] rounded-[3px] border bg-cyan/60 border-cyan/40" />
          <span className="h-[11px] w-[11px] rounded-[3px] border bg-cyan border-cyan/60" />
          <span>More</span>
        </div>
      </div>
    </GlassCard>
  );
}
