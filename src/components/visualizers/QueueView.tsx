"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, RotateCw } from "lucide-react";
import type { QueueVizState } from "@/lib/algorithms/queue";
import { cn } from "@/lib/utils";

export default function QueueView({ state }: { state: QueueVizState }) {
  const { buffer, front, rear, size, capacity, highlight, wrapped } = state;

  return (
    <div
      className="w-full flex flex-col items-center gap-4 py-6"
      role="img"
      aria-label="Queue visualization"
    >
      {wrapped && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-[11px] font-mono-data text-amber glow-amber rounded-full border border-amber/40 bg-amber/10 px-2.5 py-1"
        >
          <RotateCw size={11} /> wraparound
        </motion.div>
      )}

      <div className="flex gap-1.5">
        {buffer.map((slot, i) => {
          const isFront = size > 0 && i === front;
          const isRear = size > 0 && i === rear;
          const isHighlight = highlight === i;
          const filled = slot !== null;

          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="h-4 flex items-center justify-center">
                {isFront && (
                  <span className="flex items-center gap-0.5 text-[9px] font-mono-data text-cyan">
                    <ArrowDown size={10} /> front
                  </span>
                )}
              </div>
              <motion.div
                layout
                animate={{
                  scale: isHighlight ? 1.08 : 1,
                }}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono-data text-sm font-semibold",
                  isHighlight
                    ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                    : filled
                      ? "bg-violet/15 border-violet/60 text-violet"
                      : "bg-white/5 border-dashed border-glass-border-token text-text-muted"
                )}
              >
                {filled ? slot : ""}
              </motion.div>
              <div className="h-4 flex items-center justify-center">
                {isRear && (
                  <span className="flex items-center gap-0.5 text-[9px] font-mono-data text-violet">
                    <ArrowUp size={10} /> rear
                  </span>
                )}
              </div>
              <span className="text-[9px] text-text-muted font-mono-data">{i}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] font-mono-data text-text-muted">
        {size} / {capacity} slots filled
      </p>
    </div>
  );
}
