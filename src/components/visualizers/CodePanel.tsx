"use client";

import { tokenizeLine, tokenColorClass } from "@/lib/highlight";
import { cn } from "@/lib/utils";

export default function CodePanel({
  code,
  highlightedLine,
  className,
}: {
  code: string;
  highlightedLine?: number;
  className?: string;
}) {
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
        <span className="ml-2 text-[11px] text-text-muted">solution.js</span>
      </div>
      <pre className="overflow-x-auto p-3">
        <code>
          {lines.map((line, i) => {
            const lineNo = i + 1;
            const active = lineNo === highlightedLine;
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
                  {tokenizeLine(line).map((tok, ti) => (
                    <span key={ti} className={tokenColorClass[tok.type]}>
                      {tok.text}
                    </span>
                  ))}
                  {line.length === 0 && " "}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
