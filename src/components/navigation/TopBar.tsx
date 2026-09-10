"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Flame, Moon, Sun, Orbit } from "lucide-react";
import CommandPalette from "@/components/ui/CommandPalette";
import { useThemeStore } from "@/lib/store/theme";
import { useProgressStore } from "@/lib/store/progress";
import { useMounted } from "@/lib/hooks/useMounted";

export default function TopBar() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const streak = useProgressStore((s) => s.streak);
  const touchStreak = useProgressStore((s) => s.touchStreak);
  const mounted = useMounted();

  useEffect(() => {
    touchStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div
            className="flex items-center gap-1.5 rounded-lg border border-glass-border-token px-2.5 py-1.5 text-xs font-mono-data"
            title="Daily streak"
          >
            <Flame size={14} className="text-amber" />
            <span>{mounted ? streak : 0}</span>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg border border-glass-border-token p-2 hover:border-cyan/50 hover:text-cyan transition-colors"
          >
            {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
