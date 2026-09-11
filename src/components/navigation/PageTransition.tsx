"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Smooth cross-fade + slight rise between routes. Keyed on the pathname so
 * AnimatePresence treats every navigation as a real mount, without the
 * exit animation blocking navigation (mode="popLayout" lets the new page
 * mount while the old one finishes fading).
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
