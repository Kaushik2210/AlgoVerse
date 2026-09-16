import type { Metadata } from "next";
import { Map } from "lucide-react";
import RoadmapView from "@/components/roadmap/RoadmapView";
import { STUDY_PLAN, STUDY_PLAN_TITLE, STUDY_PLAN_TOTAL } from "@/data/study-plan";
import { leetcodeIndex } from "@/lib/leetcode-index";

export const metadata: Metadata = {
  title: "Roadmap — AlgoVerse",
  description:
    "A hand-ordered 75-problem study plan through every core pattern — the fastest path from zero to interview-ready.",
};

export default function RoadmapPage() {
  const byslug = Object.fromEntries(leetcodeIndex.map((p) => [p.slug, p]));

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-violet">
            <Map size={20} />
          </span>
          <div>
            <h1 className="font-mono-data text-2xl font-bold tracking-tight">
              {STUDY_PLAN_TITLE}
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Don&apos;t know where to start? Work through these {STUDY_PLAN_TOTAL} problems in
              order, {STUDY_PLAN.length} patterns at a time — every one is already fully
              explained on this site.
            </p>
          </div>
        </div>

        <RoadmapView byslug={byslug} />
      </div>
    </div>
  );
}
