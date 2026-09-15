"use client";

import { CheckCircle2, Circle, CloudOff } from "lucide-react";
import Button from "@/components/ui/Button";
import { useProgressStore } from "@/lib/store/progress";
import { useAuthStore } from "@/lib/store/auth";
import { useMounted } from "@/lib/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * "Mark as Solved" toggle for a LeetCode detail page. Reads/writes the local
 * Zustand progress store directly (src/lib/store/progress.ts), so a click
 * flips the button instantly — no waiting on a network round-trip. If the
 * user is signed in, SupabaseSyncProvider notices the store change and
 * pushes it to the `solved_problems` table in the background; if not, the
 * mark just stays local (persisted via localStorage like the rest of the
 * progress store) and we show a hint that signing in would carry it across
 * devices — the same "sign in to unlock cloud stuff" pattern BadgeCase uses.
 */
export default function MarkSolvedButton({ slug }: { slug: string }) {
  const mounted = useMounted();
  const solved = useProgressStore((s) => s.solvedLeetcodeIds.includes(slug));
  const toggle = useProgressStore((s) => s.toggleLeetcodeSolved);
  const user = useAuthStore((s) => s.user);

  const isSolved = mounted && solved;

  return (
    <div className="flex flex-col items-start gap-1.5">
      <Button
        variant={isSolved ? "secondary" : "primary"}
        size="md"
        onClick={() => toggle(slug)}
        className={cn(isSolved && "border-cyan/50 text-cyan bg-cyan/10 hover:bg-cyan/15")}
        aria-pressed={isSolved}
      >
        {isSolved ? <CheckCircle2 size={15} /> : <Circle size={15} />}
        {isSolved ? "Solved" : "Mark as Solved"}
      </Button>
      {mounted && !user && (
        <p className="flex items-center gap-1 text-[10px] text-text-muted font-mono-data">
          <CloudOff size={11} />
          Sign in to track your progress across devices
        </p>
      )}
    </div>
  );
}
