import type { CodeLang } from "@/lib/highlight";

/** One code sample in each of the four languages the site teaches. */
export interface CodeSamples {
  js: string;
  python: string;
  java: string;
  cpp: string;
}

export const LANG_LABELS: Record<CodeLang, string> = {
  js: "JavaScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
};

export const LANG_FILENAMES: Record<CodeLang, string> = {
  js: "solution.js",
  python: "solution.py",
  java: "Solution.java",
  cpp: "solution.cpp",
};

export const LANGS: CodeLang[] = ["js", "python", "java", "cpp"];
