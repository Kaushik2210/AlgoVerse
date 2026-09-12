"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CornerDownLeft, Component, Waypoints, FileText, Code2 } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import { leetcodeIndex } from "@/lib/leetcode-index";
import { cn } from "@/lib/utils";

const iconFor = {
  structure: Component,
  pattern: Waypoints,
  page: FileText,
  leetcode: Code2,
};

/** Command palette entries synthesized from the generated LeetCode index —
 * lets `cmd+k` jump straight to a specific problem by number or title,
 * without hand-wiring all 166+ into NAV_ITEMS. */
const LEETCODE_RESULTS = leetcodeIndex.map((p) => ({
  slug: `leetcode-${p.slug}`,
  title: `#${p.number} ${p.title}`,
  href: `/leetcode/${p.slug}`,
  category: "leetcode" as const,
  description: p.excerpt,
}));

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setActiveIndex(0);
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_ITEMS;

    const navMatches = NAV_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.includes(q)
    );

    // Only search individual LeetCode problems once the user is actually
    // typing something specific — keeps the empty-query view focused on
    // the site's main sections instead of dumping 166 problems into it.
    const leetcodeMatches = LEETCODE_RESULTS.filter((item) =>
      item.title.toLowerCase().includes(q)
    ).slice(0, 8);

    return [...navMatches, ...leetcodeMatches];
  }, [query]);

  function updateQuery(next: string) {
    setQuery(next);
    setActiveIndex(0);
  }

  function openPalette() {
    setActiveIndex(0);
    setOpen(true);
  }

  function go(href: string) {
    router.push(href);
    setOpen(false);
    setQuery("");
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      go(results[activeIndex].href);
    }
  }

  return (
    <>
      <button
        onClick={openPalette}
        aria-label="Open command palette"
        className="hidden sm:flex items-center gap-2 glass rounded-lg px-3 py-1.5 text-xs text-text-muted hover:text-foreground hover:border-cyan/40 transition-colors font-mono-data"
      >
        <Search size={14} />
        <span>Jump to...</span>
        <kbd className="ml-2 rounded border border-glass-border-token px-1.5 py-0.5 text-[10px]">
          Ctrl K
        </kbd>
      </button>
      <button
        onClick={openPalette}
        aria-label="Open command palette"
        className="sm:hidden flex items-center justify-center rounded-lg border border-glass-border-token p-2 text-text-muted hover:text-cyan hover:border-cyan/40 transition-colors"
      >
        <Search size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] bg-void/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-glass-border-token px-4 py-3">
                <Search size={16} className="text-cyan" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => updateQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search structures, patterns, pages..."
                  className="flex-1 bg-transparent outline-none text-sm font-mono-data placeholder:text-text-muted"
                  aria-label="Search"
                />
                <kbd className="rounded border border-glass-border-token px-1.5 py-0.5 text-[10px] text-text-muted">
                  Esc
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {results.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-text-muted">
                    No matches found.
                  </p>
                )}
                {results.map((item, i) => {
                  const Icon = iconFor[item.category];
                  return (
                    <button
                      key={item.slug}
                      onClick={() => go(item.href)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                        i === activeIndex ? "bg-cyan/10" : "hover:bg-white/5"
                      )}
                    >
                      <Icon
                        size={16}
                        className={i === activeIndex ? "text-cyan" : "text-text-muted"}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-text-muted truncate">
                          {item.description}
                        </p>
                      </div>
                      {i === activeIndex && (
                        <CornerDownLeft size={14} className="text-cyan" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
