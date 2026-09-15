"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors the inline `window.matchMedia("(prefers-reduced-motion: reduce)")`
 * checks already used around the app (VisualizerEngine, ParticleField) —
 * pulled into a hook only because the new GSAP-driven components need the
 * same check in several places. Starts `false` on the server/first render
 * (matches the "no motion preference known yet" default used elsewhere)
 * and updates if the OS-level setting changes mid-session.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a real OS-level preference the server can't know, same pattern as useMounted
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
