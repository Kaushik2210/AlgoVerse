import { cn } from "@/lib/utils";

type BadgeVariant = "cyan" | "violet" | "amber" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  cyan: "text-cyan border-cyan/30 bg-cyan/10",
  violet: "text-violet border-violet/30 bg-violet/10",
  amber: "text-amber border-amber/30 bg-amber/10",
  neutral: "text-text-muted border-glass-border-token bg-white/5",
};

export default function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-mono-data uppercase tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
