"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useThemeStore } from "@/lib/store/theme";
import { useMounted } from "@/lib/hooks/useMounted";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((s) => s.theme);
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme, mounted]);

  // Respects prefers-reduced-motion for every Framer Motion animation in the tree.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
