"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Fallback for the Mission Map on small screens, where the persistent
 * sidebar is hidden — a horizontally scrollable strip of the same links.
 */
export default function MobileNavStrip() {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((i) => i.category !== "page");

  return (
    <nav
      aria-label="Topic navigation"
      className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 border-b border-glass-border-token"
    >
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          className={cn(
            "shrink-0 rounded-full border px-3 py-1.5 text-xs font-mono-data whitespace-nowrap transition-colors",
            pathname === item.href
              ? "border-cyan/60 text-cyan bg-cyan/10"
              : "border-glass-border-token text-text-muted"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
