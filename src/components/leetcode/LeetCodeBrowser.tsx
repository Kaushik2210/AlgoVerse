"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Hash, ArrowUpRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import type { LeetCodeIndexEntry } from "@/lib/leetcode-index";

export default function LeetCodeBrowser({ problems }: { problems: LeetCodeIndexEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return problems;
    return problems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        String(p.number).includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }, [problems, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="glass flex items-center gap-2.5 rounded-xl px-4 py-3 focus-within:border-cyan/50 transition-colors">
        <Search size={16} className="text-cyan shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by number or title..."
          aria-label="Search LeetCode problems"
          className="flex-1 bg-transparent outline-none text-sm font-mono-data placeholder:text-text-muted"
        />
        <span className="shrink-0 text-[11px] text-text-muted font-mono-data">
          {filtered.length} / {problems.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-text-muted">
          No problems match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/leetcode/${p.slug}`}>
              <GlassCard
                tilt
                className="h-full flex flex-col gap-2.5 hover:border-cyan/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[11px] font-mono-data text-cyan">
                    <Hash size={10} />
                    {p.number}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5"
                  />
                </div>
                <p className="font-semibold text-sm leading-snug">{p.title}</p>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {p.excerpt}
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
