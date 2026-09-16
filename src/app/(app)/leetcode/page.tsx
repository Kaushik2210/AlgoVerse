import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Map, ArrowUpRight } from "lucide-react";
import LeetCodeBrowser from "@/components/leetcode/LeetCodeBrowser";
import LeetCodeProgressStat from "@/components/leetcode/LeetCodeProgressStat";
import { leetcodeIndex } from "@/lib/leetcode-index";
import { STUDY_PLAN_TITLE, STUDY_PLAN_TOTAL } from "@/data/study-plan";

export const metadata: Metadata = {
  title: "LeetCode — AlgoVerse",
  description: "Every solved LeetCode problem, explained, with Python/Java/C++ solutions.",
};

export default function LeetCodePage() {
  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-cyan">
            <Code2 size={20} />
          </span>
          <div>
            <h1 className="font-mono-data text-2xl font-bold tracking-tight">LeetCode</h1>
            <p className="text-sm text-text-muted mt-0.5">
              {leetcodeIndex.length} problems solved and explained — approach write-ups plus
              Python, Java &amp; C++ solutions for each.
            </p>
          </div>
        </div>

        <LeetCodeProgressStat total={leetcodeIndex.length} />

        <Link
          href="/roadmap"
          className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3 hover:border-violet/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet/10 text-violet">
              <Map size={15} />
            </span>
            <p className="text-sm">
              Not sure where to start?{" "}
              <span className="font-semibold text-violet">{STUDY_PLAN_TITLE}</span>
              <span className="text-text-muted">
                {" "}
                — a hand-ordered {STUDY_PLAN_TOTAL}-problem study plan through every core pattern.
              </span>
            </p>
          </div>
          <ArrowUpRight size={15} className="shrink-0 text-text-muted" />
        </Link>

        <LeetCodeBrowser problems={leetcodeIndex} />
      </div>
    </div>
  );
}
