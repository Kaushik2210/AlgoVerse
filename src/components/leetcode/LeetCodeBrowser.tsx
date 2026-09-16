"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, Hash, ArrowUpRight, CheckCircle2, Building2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import type { LeetCodeIndexEntry } from "@/lib/leetcode-index";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { useProgressStore } from "@/lib/store/progress";
import { useMounted } from "@/lib/hooks/useMounted";
import { cn } from "@/lib/utils";

type SolveFilter = "all" | "solved" | "unsolved";
const MAX_VISIBLE_COMPANIES = 3;

/** Distinct companies across the index, sorted by how often they appear so
 * the most commonly asked-at ones (Amazon, Google, Meta, ...) sort first. */
function useCompanyOptions(problems: LeetCodeIndexEntry[]) {
  return useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of problems) {
      for (const c of p.companies) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
  }, [problems]);
}

export default function LeetCodeBrowser({ problems }: { problems: LeetCodeIndexEntry[] }) {
  const [query, setQuery] = useState("");
  const [solveFilter, setSolveFilter] = useState<SolveFilter>("all");
  const [company, setCompany] = useState<string>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const solvedIds = useProgressStore((s) => s.solvedLeetcodeIds);
  const solvedSet = useMemo(() => new Set(mounted ? solvedIds : []), [mounted, solvedIds]);
  const companyOptions = useCompanyOptions(problems);
  const taggedCount = useMemo(
    () => problems.filter((p) => p.companies.length > 0).length,
    [problems]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = problems;
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          String(p.number).includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    if (solveFilter === "solved") list = list.filter((p) => solvedSet.has(p.slug));
    if (solveFilter === "unsolved") list = list.filter((p) => !solvedSet.has(p.slug));
    if (company !== "all") list = list.filter((p) => p.companies.includes(company));
    return list;
  }, [problems, query, solveFilter, solvedSet, company]);

  // Re-run the reveal whenever the filtered set changes (a new search) so
  // freshly-filtered cards animate in instead of just appearing.
  useScrollReveal(gridRef, "[data-reveal-card]", [filtered.length, query, solveFilter, company]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="glass flex flex-1 items-center gap-2.5 rounded-xl px-4 py-3 focus-within:border-cyan/50 transition-colors">
          <Search size={16} className="text-cyan shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by number or title..."
            aria-label="Search LeetCode problems"
            className="min-w-0 flex-1 bg-transparent outline-none text-sm font-mono-data placeholder:text-text-muted"
          />
          <span className="shrink-0 text-[11px] text-text-muted font-mono-data">
            {filtered.length} / {problems.length}
          </span>
        </div>

        <div className="glass flex items-center gap-1 rounded-xl p-1 shrink-0" role="tablist" aria-label="Filter by solved status">
          {(["all", "unsolved", "solved"] as SolveFilter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={solveFilter === f}
              onClick={() => setSolveFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-mono-data capitalize transition-colors",
                solveFilter === f
                  ? "bg-cyan/15 text-cyan"
                  : "text-text-muted hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 shrink-0">
          <Building2 size={14} className="text-cyan shrink-0" />
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            aria-label="Filter by company"
            className="bg-transparent outline-none text-xs font-mono-data text-foreground max-w-[9.5rem] sm:max-w-none"
          >
            <option value="all">All companies</option>
            {companyOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-[11px] text-text-muted font-mono-data">
        {taggedCount} / {problems.length} problems tagged with real company interview data
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-text-muted">
          {company !== "all"
            ? `No problems tagged with ${company}${solveFilter !== "all" ? ` (${solveFilter})` : ""}.`
            : solveFilter === "solved"
              ? "You haven't marked any problems solved yet."
              : solveFilter === "unsolved"
                ? "Every matching problem is already solved. Nice."
                : `No problems match “${query}”.`}
        </p>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const solved = solvedSet.has(p.slug);
            return (
              <div key={p.slug} data-reveal-card>
                <Link href={`/leetcode/${p.slug}`}>
                  <GlassCard
                    tilt
                    className={cn(
                      "h-full flex flex-col gap-2.5 hover:border-cyan/40 transition-colors",
                      solved && "border-cyan/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[11px] font-mono-data text-cyan">
                        <Hash size={10} />
                        {p.number}
                      </span>
                      {solved ? (
                        <CheckCircle2 size={15} className="text-cyan shrink-0" />
                      ) : (
                        <ArrowUpRight
                          size={15}
                          className="text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5"
                        />
                      )}
                    </div>
                    <p className="font-semibold text-sm leading-snug">{p.title}</p>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                      {p.excerpt}
                    </p>
                    {p.companies.length > 0 && (
                      <div className="mt-auto flex flex-wrap items-center gap-1 pt-1">
                        {p.companies.slice(0, MAX_VISIBLE_COMPANIES).map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center rounded-full border border-violet/30 bg-violet/10 px-2 py-0.5 text-[10px] font-mono-data text-violet"
                          >
                            {c}
                          </span>
                        ))}
                        {p.companies.length > MAX_VISIBLE_COMPANIES && (
                          <span className="inline-flex items-center rounded-full border border-glass-border-token bg-white/5 px-2 py-0.5 text-[10px] font-mono-data text-text-muted">
                            +{p.companies.length - MAX_VISIBLE_COMPANIES} more
                          </span>
                        )}
                      </div>
                    )}
                  </GlassCard>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
