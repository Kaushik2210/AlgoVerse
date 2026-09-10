"use client";

import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export default function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  formatValue,
  className,
}: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs font-mono-data text-text-muted">
          <span>{label}</span>
          <span className="text-cyan">{formatValue ? formatValue(value) : value}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label ?? "slider"}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none accent-cyan"
        style={{
          background: `linear-gradient(to right, var(--color-cyan) 0%, var(--color-cyan) ${percent}%, var(--color-glass-border) ${percent}%, var(--color-glass-border) 100%)`,
        }}
      />
    </div>
  );
}
