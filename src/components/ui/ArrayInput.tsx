"use client";

import { useState } from "react";
import { Shuffle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ArrayInput({
  value,
  onApply,
  min = 4,
  max = 12,
}: {
  value: number[];
  onApply: (values: number[]) => void;
  min?: number;
  max?: number;
}) {
  const [text, setText] = useState(value.join(", "));
  const [error, setError] = useState<string | null>(null);

  function apply() {
    const parsed = text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);

    if (parsed.some((n) => Number.isNaN(n))) {
      setError("Only comma-separated numbers, please.");
      return;
    }
    if (parsed.length < min || parsed.length > max) {
      setError(`Use between ${min} and ${max} values.`);
      return;
    }
    setError(null);
    onApply(parsed);
  }

  function randomize() {
    const len = Math.floor(Math.random() * (max - min + 1)) + min;
    const next = Array.from({ length: len }, () => Math.floor(Math.random() * 90) + 5);
    setText(next.join(", "));
    setError(null);
    onApply(next);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          aria-label="Custom array input, comma separated"
          placeholder="e.g. 8, 3, 5, 1, 9"
          className="flex-1 glass rounded-lg px-3 py-2 text-sm font-mono-data outline-none focus:border-cyan/50"
        />
        <Button variant="secondary" size="sm" onClick={apply}>
          Apply
        </Button>
        <Button variant="ghost" size="icon" aria-label="Randomize" onClick={randomize}>
          <Shuffle size={15} />
        </Button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
