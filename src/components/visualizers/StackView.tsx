"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { StackVizState } from "@/lib/algorithms/stack";
import { cn } from "@/lib/utils";

export default function StackView({ state }: { state: StackVizState }) {
  const { items, pushing, popping, peeking } = state;
  const topIndex = items.length - 1;

  return (
    <div
      className="w-full flex items-end justify-center gap-6 h-full min-h-[220px] py-4"
      role="img"
      aria-label="Stack visualization"
    >
      <div className="flex flex-col-reverse items-center gap-1.5">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const isPushing = pushing === i;
            const isPopping = popping === i;
            const isPeeking = peeking === i;
            const isTop = i === topIndex;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.85 }}
                animate={{ opacity: isPopping ? 0.35 : 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.7 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="relative flex items-center"
              >
                <div
                  className={cn(
                    "flex h-11 w-28 items-center justify-center rounded-lg border-2 font-mono-data text-sm font-semibold",
                    isPeeking
                      ? "bg-amber/20 border-amber text-amber glow-amber"
                      : isPushing
                        ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                        : isPopping
                          ? "bg-cyan/10 border-cyan/60 text-cyan"
                          : isTop
                            ? "bg-violet/15 border-violet/60 text-violet"
                            : "bg-white/5 border-glass-border-token text-foreground"
                  )}
                >
                  {item.value}
                </div>
                {isTop && (
                  <motion.div
                    layout
                    className="absolute -right-14 flex items-center gap-1 text-[10px] font-mono-data text-violet"
                  >
                    <ArrowLeft size={12} />
                    top
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div className="w-32 h-1.5 rounded-b-md bg-glass-border-token" aria-hidden />
        {items.length === 0 && (
          <p className="text-xs text-text-muted font-mono-data mb-2">empty stack</p>
        )}
      </div>
    </div>
  );
}
