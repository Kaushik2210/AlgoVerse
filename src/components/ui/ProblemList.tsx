import { ExternalLink } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";

export interface Problem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  note: string;
}

const difficultyVariant: Record<Problem["difficulty"], "violet" | "cyan" | "amber"> = {
  Easy: "violet",
  Medium: "cyan",
  Hard: "amber",
};

export default function ProblemList({ problems }: { problems: Problem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {problems.map((p) => (
        <a
          key={p.title}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlassCard
            tilt
            className="!py-3 !px-4 flex items-center justify-between gap-3 hover:border-cyan/40 transition-colors"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{p.title}</p>
                <Badge variant={difficultyVariant[p.difficulty]}>{p.difficulty}</Badge>
              </div>
              <p className="text-xs text-text-muted mt-1 truncate">{p.note}</p>
            </div>
            <ExternalLink size={15} className="text-text-muted shrink-0" />
          </GlassCard>
        </a>
      ))}
    </div>
  );
}
