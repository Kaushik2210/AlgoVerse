"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tokenizeLine, tokenColorClass } from "@/lib/highlight";
import { LANG_LABELS, LANG_FILENAMES, LANGS, type CodeSamples } from "@/lib/codeSamples/types";
import type { CodeLang } from "@/lib/highlight";
import { useCodeLangStore } from "@/lib/store/codeLang";
import { cn } from "@/lib/utils";

/**
 * Multi-language code panel: a JS / Python / Java / C++ switcher above a
 * syntax-highlighted block. Remembers the last-picked language across pages
 * (persisted via zustand/localStorage) and animates the swap.
 *
 * By default it shows all four languages and shares the global (persisted)
 * language pick across the whole site — that's what every DSA module page
 * wants. Pass `langs` (e.g. LeetCode problems, which have no JS sample) to
 * restrict the tab set; in that case the pick is local to this instance
 * instead of touching the shared store.
 */
export default function CodeTabs({
  codeSamples,
  highlightedLine,
  className,
  langs,
}: {
  codeSamples: CodeSamples;
  /** Only meaningful for the JS sample — the visualizer steps reference JS line numbers. */
  highlightedLine?: number;
  className?: string;
  /** Restrict which language tabs are shown. Defaults to all four. */
  langs?: CodeLang[];
}) {
  const availableLangs = langs ?? LANGS;
  const globalLang = useCodeLangStore((s) => s.lang);
  const setGlobalLang = useCodeLangStore((s) => s.setLang);
  const [localLang, setLocalLang] = useState<CodeLang>(availableLangs[0]);

  const usingLocalState = !!langs;
  const lang = usingLocalState
    ? (availableLangs.includes(localLang) ? localLang : availableLangs[0])
    : globalLang;
  const selectLang = usingLocalState ? setLocalLang : setGlobalLang;

  const code = codeSamples[lang] || "";
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div
      className={cn(
        "glass rounded-xl overflow-hidden font-mono-data text-[12.5px] leading-relaxed",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-glass-border-token px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
        <span className="ml-2 text-[11px] text-text-muted">{LANG_FILENAMES[lang]}</span>

        <div className="ml-auto flex items-center gap-1" role="tablist" aria-label="Code language">
          {availableLangs.map((l) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={lang === l}
              onClick={() => selectLang(l)}
              className={cn(
                "relative px-2 py-1 rounded-md text-[11px] font-mono-data transition-colors duration-150",
                lang === l ? "text-void" : "text-text-muted hover:text-foreground"
              )}
            >
              {lang === l && (
                <motion.span
                  layoutId="code-tabs-active-pill"
                  className="absolute inset-0 rounded-md bg-cyan/90"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{LANG_LABELS[l]}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.pre
          key={lang}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="overflow-x-auto p-3"
        >
          <code>
            {lines.map((line, i) => {
              const lineNo = i + 1;
              const active = lang === "js" && lineNo === highlightedLine;
              return (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3 px-2 -mx-2 rounded",
                    active && "bg-cyan/10 border-l-2 border-cyan"
                  )}
                >
                  <span className="select-none w-5 shrink-0 text-right text-text-muted/50">
                    {lineNo}
                  </span>
                  <span className="whitespace-pre">
                    {tokenizeLine(line, lang).map((tok, ti) => (
                      <span key={ti} className={tokenColorClass[tok.type]}>
                        {tok.text}
                      </span>
                    ))}
                    {line.length === 0 && " "}
                  </span>
                </div>
              );
            })}
          </code>
        </motion.pre>
      </AnimatePresence>
    </div>
  );
}
