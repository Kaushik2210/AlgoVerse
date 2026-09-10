"use client";

import { useEffect, useState } from "react";

/**
 * Standard SSR-safe hydration guard: returns false on the server and on the
 * very first client render, then true afterward. Used anywhere we read from
 * a persisted (localStorage-backed) Zustand store, so the server-rendered
 * markup and the first client render always match before hydration finishes.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time hydration flag
    setMounted(true);
  }, []);

  return mounted;
}
