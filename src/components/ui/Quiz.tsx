"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function Quiz({
  moduleSlug,
  questions,
}: {
  moduleSlug: string;
  questions: QuizQuestion[];
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const recordQuizResult = useProgressStore((s) => s.recordQuizResult);
  const completeModule = useProgressStore((s) => s.completeModule);

  const allAnswered = answers.every((a) => a !== null);
  const score = answers.reduce<number>(
    (acc, a, i) => acc + (a === questions[i].correctIndex ? 1 : 0),
    0
  );

  function select(qIndex: number, optIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
  }

  function submit() {
    setSubmitted(true);
    recordQuizResult(moduleSlug, score, questions.length);
    if (score === questions.length) completeModule(moduleSlug);
  }

  function retry() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="flex flex-col gap-4">
      {questions.map((q, qi) => (
        <GlassCard key={qi}>
          <p className="font-medium text-sm mb-3">
            <span className="text-cyan font-mono-data mr-2">Q{qi + 1}.</span>
            {q.question}
          </p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isCorrect = oi === q.correctIndex;
              const showState = submitted && (selected || isCorrect);
              return (
                <button
                  key={oi}
                  onClick={() => select(qi, oi)}
                  disabled={submitted}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                    !submitted &&
                      selected &&
                      "border-cyan/60 bg-cyan/10 text-cyan",
                    !submitted && !selected && "border-glass-border-token hover:bg-white/5",
                    submitted && isCorrect && "border-violet/60 bg-violet/10 text-violet",
                    submitted && selected && !isCorrect && "border-red-500/50 bg-red-500/10 text-red-400"
                  )}
                >
                  <span>{opt}</span>
                  {showState && isCorrect && <CheckCircle2 size={16} />}
                  {showState && selected && !isCorrect && <XCircle size={16} />}
                </button>
              );
            })}
          </div>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 text-xs text-text-muted border-t border-glass-border-token pt-3"
            >
              {q.explanation}
            </motion.p>
          )}
        </GlassCard>
      ))}

      <div className="flex items-center gap-3">
        {!submitted ? (
          <Button variant="primary" disabled={!allAnswered} onClick={submit}>
            Submit quiz
          </Button>
        ) : (
          <>
            <span className="font-mono-data text-sm">
              Score: <span className="text-cyan font-semibold">{score}</span> / {questions.length}
            </span>
            <Button variant="ghost" size="sm" onClick={retry}>
              <RotateCcw size={14} className="mr-1.5" /> Retry
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
