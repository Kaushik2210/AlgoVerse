import type { Metadata } from "next";
import { Code2 } from "lucide-react";
import LeetCodeBrowser from "@/components/leetcode/LeetCodeBrowser";
import { leetcodeIndex } from "@/lib/leetcode-index";

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

        <LeetCodeBrowser problems={leetcodeIndex} />
      </div>
    </div>
  );
}
