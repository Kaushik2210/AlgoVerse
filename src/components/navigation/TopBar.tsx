"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Moon, Sun, Orbit, Code2, LayoutDashboard, Trophy, Map } from "lucide-react";
import CommandPalette from "@/components/ui/CommandPalette";
import UserMenu from "@/components/navigation/UserMenu";
import { useThemeStore } from "@/lib/store/theme";
import { useStreakInfo, useLevelProgress } from "@/lib/store/selectors";
import { useMounted } from "@/lib/hooks/useMounted";

export default function TopBar() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const { streak } = useStreakInfo();
  const level = useLevelProgress();
  const mounted = useMounted();
  const pathname = usePathname();
  const onLeetCode = pathname?.startsWith("/leetcode");
  const onDashboard = pathname?.startsWith("/dashboard");
  const onLeaderboard = pathname?.startsWith("/leaderboard");
  const onRoadmap = pathname?.startsWith("/roadmap");

  return (
    <header className="sticky top-0 z-40 glass border-b border-glass-border-token">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Orbit size={20} className="text-cyan group-hover:animate-spin-slow" />
          <span className="font-mono-data text-sm font-bold tracking-wider">
            ALGO<span className="text-cyan">VERSE</span>
          </span>
        </Link>

        <div className="flex-1 flex justify-center">
          <CommandPalette />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            title={`Level ${level.level} · ${level.rank}`}
            className={`hidden md:flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-mono-data transition-colors ${
              onDashboard
                ? "border-violet/60 text-violet bg-violet/10"
                : "border-glass-border-token text-text-muted hover:text-violet hover:border-violet/40"
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Lv.{mounted ? level.level : 1}</span>
            <span className="hidden lg:inline text-[10px] uppercase tracking-wide opacity-80">
              {mounted ? level.rank : "Recruit"}
            </span>
          </Link>
          <Link
            href="/leetcode"
            className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-mono-data transition-colors ${
              onLeetCode
                ? "border-cyan/60 text-cyan bg-cyan/10"
                : "border-glass-border-token text-text-muted hover:text-cyan hover:border-cyan/40"
            }`}
          >
            <Code2 size={14} />
            LeetCode
          </Link>
          <Link
            href="/roadmap"
            title="75 Essential Problems — a hand-ordered study plan"
            className={`hidden lg:flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-mono-data transition-colors ${
              onRoadmap
                ? "border-violet/60 text-violet bg-violet/10"
                : "border-glass-border-token text-text-muted hover:text-violet hover:border-violet/40"
            }`}
          >
            <Map size={14} />
            Roadmap
          </Link>
          <Link
            href="/leaderboard"
            className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-mono-data transition-colors ${
              onLeaderboard
                ? "border-amber/60 text-amber bg-amber/10"
                : "border-glass-border-token text-text-muted hover:text-amber hover:border-amber/40"
            }`}
          >
            <Trophy size={14} />
            Leaderboard
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg border border-glass-border-token px-2.5 py-1.5 text-xs font-mono-data hover:border-amber/40 hover:text-amber transition-colors"
            title="Daily streak — view dashboard"
          >
            <Flame size={14} className="text-amber" />
            <span>{mounted ? streak : 0}</span>
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg border border-glass-border-token p-2 hover:border-cyan/50 hover:text-cyan transition-colors"
          >
            {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
