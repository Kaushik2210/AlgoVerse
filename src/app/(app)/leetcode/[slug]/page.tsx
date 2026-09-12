import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Hash } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import CodeTabs from "@/components/ui/CodeTabs";
import LeetCodeMarkdown from "@/components/leetcode/LeetCodeMarkdown";
import { getLeetCodeProblem, getLeetCodeSlugs } from "@/lib/leetcode-problem";

export function generateStaticParams() {
  return getLeetCodeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const problem = getLeetCodeProblem(slug);
  if (!problem) return { title: "Problem not found — AlgoVerse" };
  return {
    title: `${problem.number}. ${problem.title} — AlgoVerse`,
    description: problem.excerpt,
  };
}

export default async function LeetCodeProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getLeetCodeProblem(slug);
  if (!problem) notFound();

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        <Link
          href="/leetcode"
          className="inline-flex items-center gap-1.5 self-start text-xs font-mono-data text-text-muted hover:text-cyan transition-colors"
        >
          <ArrowLeft size={13} /> All problems
        </Link>

        <div className="flex items-start gap-3">
          <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-cyan font-mono-data text-sm">
            <Hash size={12} className="mr-0.5" />
            {problem.number}
          </span>
          <div>
            <h1 className="font-mono-data text-2xl font-bold tracking-tight">
              {problem.title}
            </h1>
            <p className="text-sm text-text-muted mt-1">{problem.excerpt}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-start">
          <GlassCard className="lg:sticky lg:top-[80px]">
            <LeetCodeMarkdown content={problem.readme} />
          </GlassCard>

          <CodeTabs
            codeSamples={problem.code}
            langs={["python", "java", "cpp"]}
            className="lg:sticky lg:top-[80px]"
          />
        </div>
      </div>
    </div>
  );
}
