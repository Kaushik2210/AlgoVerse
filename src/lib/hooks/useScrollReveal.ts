"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/**
 * Staggers the direct card children of `containerRef` in as each one
 * scrolls into view, using GSAP's ScrollTrigger.batch — cards that are
 * already on screen at mount (e.g. above the fold, or a short filtered
 * list) just settle into place immediately instead of waiting on a scroll
 * event that may never come.
 *
 * `deps` lets a caller re-run the reveal when the underlying list changes
 * (e.g. a search filter producing a new set of cards) — previous triggers
 * are killed first so stale ScrollTriggers never pile up.
 */
export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  deps: React.DependencyList = []
) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(selector);
    if (cards.length === 0) return;

    if (reducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(cards, { opacity: 0, y: 24 });

    const batch = ScrollTrigger.batch(cards, {
      start: "top 88%",
      once: true,
      onEnter: (batchTargets) => {
        gsap.to(batchTargets, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
        });
      },
    });

    return () => {
      batch.forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector, reducedMotion, ...deps]);
}
