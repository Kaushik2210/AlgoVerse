"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import { singleNumberXorSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "bit-manipulation";
const DEMO_VALUES = [4, 1, 2, 1, 2];

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does XORing every element of [4, 1, 2, 1, 2] together leave exactly 4?",
    options: [
      "Because 4 is the largest value in the array",
      "Because x ^ x = 0 for any x, and XOR is commutative/associative — so the two 1s cancel each other, the two 2s cancel each other, and only the unpaired 4 survives",
      "Because XOR always returns the first element",
      "It's a coincidence specific to this array",
    ],
    correctIndex: 1,
    explanation:
      "XOR is commutative and associative, so the order of operations doesn't matter — you can freely regroup 1^1 (=0) and 2^2 (=0), leaving 0^0^4 = 4. Any value appearing an even number of times cancels completely; only a value appearing an odd number of times survives.",
  },
  {
    question: "In `n & (n - 1)`, what does this expression do to n's binary representation?",
    options: [
      "It sets the lowest 0 bit to 1",
      "It clears (zeroes out) the lowest set bit of n",
      "It reverses all the bits",
      "It doubles the value of n",
    ],
    correctIndex: 1,
    explanation:
      "Subtracting 1 from n flips all the bits from the lowest set bit downward (that bit becomes 0, everything below becomes 1). ANDing with the original n then clears exactly that lowest set bit and leaves everything else unchanged — repeating this and counting iterations gives you the popcount (Number of 1 Bits).",
  },
  {
    question: "What's the time and space complexity of the Single Number XOR solution on an array of n elements?",
    options: [
      "O(n) time, O(n) space — you need a hash set to track seen values",
      "O(n) time, O(1) space — a single pass with one accumulator variable, no extra data structure needed",
      "O(n log n) time, O(1) space — sorting is required first",
      "O(1) time, O(1) space — bit tricks are always constant time",
    ],
    correctIndex: 1,
    explanation:
      "This is precisely why the bit-manipulation approach beats the 'hash set of seen values' alternative: one pass, one integer accumulator, O(1) extra space — versus a hash set's O(n) space for the same O(n) time.",
  },
  {
    question:
      "\"Given an array where every element appears exactly three times except one which appears exactly once, find that single element.\" Why doesn't plain XOR (as in Single Number) solve this directly?",
    options: [
      "It does — XOR works identically regardless of how many times duplicates repeat",
      "Plain XOR only cancels pairs (even counts) to zero; a value appearing three times (an odd count) does NOT cancel to zero under repeated XOR, so the trick needs a different mechanism — tracking each bit's count modulo 3, not just parity",
      "This problem can't be solved with bit tricks at all",
      "XOR requires the array to be sorted first",
    ],
    correctIndex: 1,
    explanation:
      "x ^ x ^ x = x, not 0 — XOR only relies on parity (even vs odd count), and 3 is odd, so plain XOR doesn't cancel triples. Single Number II needs a mod-3 bit-counting technique (or state-machine bit tricks) instead of a simple running XOR, because the 'cancellation' condition changed from 'even count' to 'count divisible by 3'.",
  },
];

export default function BitManipulationPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => singleNumberXorSteps(DEMO_VALUES), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Bit Tricks</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Bit Manipulation</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Operate directly on a number&apos;s binary representation — XOR to cancel
          duplicates, AND/shift to isolate or clear bits — to turn an O(n) extra-space
          solution into an O(1)-space one-liner.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem involves finding a unique element among duplicates, and a hash set solution works but uses O(n) extra space.",
            "You're asked to count set bits, check if a number is a power of two, or manipulate individual bits of an integer.",
            "The phrase 'without using extra memory' or 'O(1) space' appears alongside a problem that smells like it needs a set or count.",
            "You need to add, swap, or negate values without arithmetic operators — a classic bit-trick constraint.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: finding the single number in{" "}
          <code className="font-mono-data text-cyan">[{DEMO_VALUES.join(", ")}]</code>{" "}
          (every value except one appears exactly twice). A running XOR accumulator
          starts at 0 — each element gets folded in with <code className="font-mono-data text-cyan">acc ^= arr[i]</code>.
          Because <code className="font-mono-data text-cyan">x ^ x = 0</code> and XOR is
          commutative, every pair of equal values cancels itself out regardless of where
          it appears in the array — whatever&apos;s left when the scan finishes is the
          answer.
        </p>
        <p>
          Watch the binary representation in the stats panel as the scan progresses —
          it&apos;s not just &quot;the answer appears at the end&quot;, the accumulator
          is a real, meaningful partial XOR at every single step.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.bitManipulation}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <ArrayBars state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`// XOR-cancellation: find the element that appears an odd
// number of times (typically: everything else appears twice)
function singleNumber(nums) {
  let result = 0;
  for (const n of nums) {
    // 1. Fold n into the running XOR — pairs cancel to 0
    result ^= n;
  }
  return result; // whatever didn't have a pair to cancel with
}

// Popcount via n & (n - 1), which clears the lowest set bit
function countBits(n) {
  let count = 0;
  while (n !== 0) {
    n &= (n - 1); // 2. Clear lowest set bit
    count++;
  }
  return count;
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "XOR-cancellation (Single Number)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
            {
              operation: "Popcount via n & (n - 1)",
              best: "O(1)",
              average: "O(popcount)",
              worst: "O(log n) — number of bits",
              space: "O(1)",
            },
            {
              operation: "Bitmask subset enumeration over n items",
              best: "O(2ⁿ)",
              average: "O(2ⁿ)",
              worst: "O(2ⁿ)",
              space: "O(1) — excluding output",
            },
          ]}
        />
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "A hash set/map solution works but the problem explicitly wants O(1) extra space, and the underlying operation (find unique, count occurrences) has a parity or counting structure XOR/AND can exploit.",
            "The problem is directly about bits — popcount, power-of-two checks, bitmask DP over small n, or implementing arithmetic without +/-.",
            "n (the number of items whose subsets or combinations you're enumerating) is small enough that a bitmask (2ⁿ) is a clean, fast way to represent 'which subset' as a single integer.",
          ]}
          avoid={[
            "The 'cancellation' condition isn't a simple parity (appears exactly twice → XOR) — e.g. 'appears exactly three times except one' needs mod-3 bit counting, not plain XOR, and can be easy to get wrong under interview pressure.",
            "Readability matters more than the O(1) space savings, and a hash set solution is only trivially worse — bit tricks can obscure intent for reviewers unfamiliar with the specific trick.",
            "The values aren't fixed-width integers (e.g. arbitrary-precision numbers, floats, or strings) — most bit tricks assume a fixed binary width to reason about.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["bit-manipulation"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
