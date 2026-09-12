"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Radar,
  Boxes,
  GitBranch,
  Waypoints,
  Gauge,
  Palette,
  Map,
  Code2,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import ProgressRing from "@/components/ui/ProgressRing";
import Badge from "@/components/ui/Badge";
import { STRUCTURE_ITEMS, PATTERN_ITEMS } from "@/lib/nav";
import { leetcodeIndex } from "@/lib/leetcode-index";
import { useProgressStore } from "@/lib/store/progress";

const FEATURES = [
  {
    icon: Gauge,
    title: "Real Step-Through Engine",
    body: "Play, pause, step, scrub, and change speed on every algorithm — not a canned GIF.",
  },
  {
    icon: Palette,
    title: "Color With Meaning",
    body: "Cyan = active pointer. Violet = visited. Amber = found. Consistent everywhere.",
  },
  {
    icon: Map,
    title: "Mission Map",
    body: "A skill-tree sidebar that tracks your real progress through every topic.",
  },
];

export default function Home() {
  const modules = useProgressStore((s) => s.modules);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <Badge variant="cyan">
            <Radar size={11} className="mr-1 inline" /> now in scoped preview
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-mono-data text-4xl sm:text-6xl font-extrabold tracking-tight"
        >
          ALGO<span className="text-cyan text-glow-cyan">VERSE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-xl text-text-muted text-base sm:text-lg"
        >
          Learn data structures &amp; algorithms the way they actually work — a real
          step-through visualizer, theory that doesn&apos;t waste your time, and a HUD
          that tracks what you&apos;ve actually mastered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/dsa/arrays">
            <Button variant="primary">
              Start Learning <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </Link>
          <Link href="/patterns/two-pointers">
            <Button variant="secondary">Explore Patterns</Button>
          </Link>
        </motion.div>
      </section>

      {/* Feature strip */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <GlassCard key={f.title} tilt className="flex flex-col gap-2">
              <f.icon size={18} className="text-cyan" />
              <p className="font-semibold text-sm">{f.title}</p>
              <p className="text-xs text-text-muted leading-relaxed">{f.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Data structures */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <Boxes size={16} className="text-cyan" />
            <h2 className="font-mono-data text-sm uppercase tracking-wider text-text-muted">
              Data Structures
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STRUCTURE_ITEMS.map((item) => (
              <ModuleCard
                key={item.slug}
                href={item.href}
                title={item.title}
                description={item.description}
                percent={modules[item.slug]?.percent ?? 0}
                icon={GitBranch}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Patterns */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <Waypoints size={16} className="text-violet" />
            <h2 className="font-mono-data text-sm uppercase tracking-wider text-text-muted">
              Pattern Library
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PATTERN_ITEMS.map((item) => (
              <ModuleCard
                key={item.slug}
                href={item.href}
                title={item.title}
                description={item.description}
                percent={modules[item.slug]?.percent ?? 0}
                icon={Waypoints}
                color="violet"
              />
            ))}
          </div>
        </div>
      </section>

      {/* LeetCode callout */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <Link href="/leetcode">
            <GlassCard
              tilt
              glow="cyan"
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:border-cyan/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-cyan">
                  <Code2 size={20} />
                </span>
                <div>
                  <p className="font-mono-data text-sm uppercase tracking-wider text-cyan">
                    LeetCode Vault
                  </p>
                  <p className="font-semibold text-base mt-1">
                    {leetcodeIndex.length} problems solved and explained
                  </p>
                  <p className="text-xs text-text-muted mt-1 max-w-md leading-relaxed">
                    Full approach write-ups plus Python, Java &amp; C++ solutions for every
                    problem — searchable by number or title.
                  </p>
                </div>
              </div>
              <Button variant="secondary" className="shrink-0">
                Browse Problems <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </GlassCard>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ModuleCard({
  href,
  title,
  description,
  percent,
  icon: Icon,
  color = "cyan",
}: {
  href: string;
  title: string;
  description: string;
  percent: number;
  icon: React.ElementType;
  color?: "cyan" | "violet";
}) {
  return (
    <Link href={href}>
      <GlassCard tilt className="h-full flex flex-col gap-3 hover:border-cyan/40 transition-colors">
        <div className="flex items-start justify-between">
          <Icon size={18} className={color === "cyan" ? "text-cyan" : "text-violet"} />
          <ProgressRing percent={percent} size={36} strokeWidth={3.5} color={color} />
        </div>
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">{description}</p>
        </div>
      </GlassCard>
    </Link>
  );
}
