import fs from "node:fs";
import path from "node:path";
import { leetcodeIndex, type LeetCodeIndexEntry } from "@/lib/leetcode-index";

/** Full problem record — README + all three solutions — for a detail page.
 * Server-only: reads the generated per-problem JSON files off disk, so this
 * must never be imported from a "use client" component. */
export interface LeetCodeProblem extends LeetCodeIndexEntry {
  readme: string;
  code: {
    python: string;
    java: string;
    cpp: string;
  };
}

const PROBLEMS_DIR = path.join(process.cwd(), "src", "data", "leetcode", "problems");

export function getLeetCodeSlugs(): string[] {
  return leetcodeIndex.map((p) => p.slug);
}

export function getLeetCodeProblem(slug: string): LeetCodeProblem | null {
  try {
    const raw = fs.readFileSync(path.join(PROBLEMS_DIR, `${slug}.json`), "utf8");
    return JSON.parse(raw) as LeetCodeProblem;
  } catch {
    return null;
  }
}
