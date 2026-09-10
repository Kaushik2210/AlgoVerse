import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export interface ComplexityRow {
  operation: string;
  best: string;
  average: string;
  worst: string;
  space: string;
}

export default function ComplexityTable({ rows }: { rows: ComplexityRow[] }) {
  return (
    <GlassCard className="!p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono-data">
          <thead>
            <tr className="border-b border-glass-border-token text-left text-text-muted text-xs uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Operation</th>
              <th className="px-4 py-3 font-medium">Best</th>
              <th className="px-4 py-3 font-medium">Average</th>
              <th className="px-4 py-3 font-medium">Worst</th>
              <th className="px-4 py-3 font-medium">Space</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.operation}
                className={cn(
                  i !== rows.length - 1 && "border-b border-glass-border-token/60"
                )}
              >
                <td className="px-4 py-2.5 text-foreground">{r.operation}</td>
                <td className="px-4 py-2.5 text-violet">{r.best}</td>
                <td className="px-4 py-2.5 text-cyan">{r.average}</td>
                <td className="px-4 py-2.5 text-amber">{r.worst}</td>
                <td className="px-4 py-2.5 text-text-muted">{r.space}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
