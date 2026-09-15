"use client";

import { useEffect, useRef } from "react";
import BadgePlate from "@/components/badges/BadgePlate";
import { plateValue } from "@/lib/badges";
import { useBadgeUnlockStore } from "@/lib/store/badgeUnlock";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const PARTICLE_COUNT = 14;

/**
 * Mounted once at the app root, alongside ToastHost. Plays a theatrical
 * "badge unlock" sequence — a full-screen moment, not just another toast —
 * whenever ProgressWatcher enqueues a newly-earned badge onto
 * useBadgeUnlockStore. A GSAP timeline choreographs the plate scaling in
 * with a rotation flourish, a burst of particles flying outward, then the
 * icon settling with a soft pulse before the whole thing dismisses itself.
 *
 * Badges (theatrical overlay) and level-ups (ToastHost) intentionally use
 * different notification styles — a badge is the rarer, bigger moment.
 */
export default function BadgeUnlockOverlay() {
  const queue = useBadgeUnlockStore((s) => s.queue);
  const advance = useBadgeUnlockStore((s) => s.advance);
  const reducedMotion = usePrefersReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const plateWrapRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  const current = queue[0];

  useEffect(() => {
    if (!current) return;
    const overlay = overlayRef.current;
    const plateWrap = plateWrapRef.current;
    if (!overlay || !plateWrap) return;

    let dismissTimer: ReturnType<typeof setTimeout>;

    if (reducedMotion) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(plateWrap, { opacity: 1, scale: 1, rotate: 0 });
      dismissTimer = setTimeout(() => advance(), 1800);
      return () => clearTimeout(dismissTimer);
    }

    const particles = particleContainerRef.current
      ? Array.from(particleContainerRef.current.children)
      : [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          dismissTimer = setTimeout(() => advance(), 1100);
        },
      });

      tl.set(overlay, { opacity: 0 })
        .set(plateWrap, { opacity: 0, scale: 0.3, rotate: -35 })
        .set(particles, { opacity: 0, x: 0, y: 0, scale: 0.5 })
        .to(overlay, { opacity: 1, duration: 0.3, ease: "power1.out" })
        // The rotation flourish: overshoots slightly past 0deg then settles,
        // instead of a plain scale-up.
        .to(
          plateWrap,
          { opacity: 1, scale: 1.12, rotate: 8, duration: 0.45, ease: "back.out(2.2)" },
          "-=0.1"
        )
        .to(plateWrap, { scale: 1, rotate: 0, duration: 0.35, ease: "power2.out" })
        .to(
          particles,
          {
            opacity: 1,
            scale: 1,
            x: (i) => Math.cos((i / PARTICLE_COUNT) * Math.PI * 2) * (80 + Math.random() * 40),
            y: (i) => Math.sin((i / PARTICLE_COUNT) * Math.PI * 2) * (80 + Math.random() * 40),
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.015,
          },
          "-=0.35"
        )
        .to(particles, { opacity: 0, duration: 0.5, ease: "power1.in" }, "-=0.15")
        .to(overlay, { opacity: 0, duration: 0.4, ease: "power1.in" }, "+=0.9");
    }, overlay);

    return () => {
      clearTimeout(dismissTimer);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, reducedMotion]);

  if (!current) return null;

  const value = plateValue(current);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050710]/80 backdrop-blur-sm opacity-0"
      role="status"
      aria-live="polite"
      onClick={() => advance()}
    >
      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <div
          ref={particleContainerRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
            <span
              key={i}
              className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_8px_rgba(255,191,71,0.8)]"
            />
          ))}
        </div>

        <div ref={plateWrapRef}>
          <BadgePlate tier={current.tier} earned value={value} size={160} />
        </div>

        <div>
          <p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-amber">
            Badge Unlocked
          </p>
          <h2 className="mt-1 text-2xl font-bold text-white">{current.name}</h2>
          <p className="mt-1 text-sm text-white/70 max-w-xs">{current.description}</p>
          <p className="mt-1 font-mono-data text-xs text-cyan">+{current.xpBonus} XP</p>
        </div>
      </div>
    </div>
  );
}
