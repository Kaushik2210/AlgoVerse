"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Boxes, Waypoints, Check } from "lucide-react";
import { STRUCTURE_ITEMS, PATTERN_ITEMS } from "@/lib/nav";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

export default function MissionMap() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const modules = useProgressStore((s) => s.modules);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const percentFor = (slug: string) => (mounted ? modules[slug]?.percent ?? 0 : 0);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="sticky top-[57px] h-[calc(100vh-57px)] shrink-0 border-r border-glass-border-token glass !rounded-none overflow-y-auto overflow-x-hidden hidden md:flex flex-col"
    >
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand mission map" : "Collapse mission map"}
        className="flex items-center justify-center self-end m-2 rounded-lg p-1.5 text-text-muted hover:text-cyan hover:bg-white/5"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav className="flex flex-col gap-6 px-3 pb-6">
        <MapSection
          title="Data Structures"
          icon={Boxes}
          items={STRUCTURE_ITEMS}
          collapsed={collapsed}
          pathname={pathname}
          percentFor={percentFor}
        />
        <MapSection
          title="Patterns"
          icon={Waypoints}
          items={PATTERN_ITEMS}
          collapsed={collapsed}
          pathname={pathname}
          percentFor={percentFor}
        />
      </nav>
    </motion.aside>
  );
}

function MapSection({
  title,
  icon: SectionIcon,
  items,
  collapsed,
  pathname,
  percentFor,
}: {
  title: string;
  icon: React.ElementType;
  items: typeof STRUCTURE_ITEMS;
  collapsed: boolean;
  pathname: string;
  percentFor: (slug: string) => number;
}) {
  return (
    <div>
      {!collapsed && (
        <p className="mb-2 flex items-center gap-1.5 px-2 text-[11px] font-mono-data uppercase tracking-wider text-text-muted">
          <SectionIcon size={12} /> {title}
        </p>
      )}
      <ul className="flex flex-col gap-1 relative">
        {items.map((item, idx) => {
          const active = pathname === item.href;
          const percent = percentFor(item.slug);
          const done = percent >= 100;
          return (
            <li key={item.slug} className="relative">
              {idx < items.length - 1 && !collapsed && (
                <span className="absolute left-[19px] top-8 h-[calc(100%-8px)] w-px bg-glass-border-token" />
              )}
              <Link
                href={item.href}
                className={cn(
                  "relative z-10 flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors",
                  active
                    ? "bg-cyan/10 text-cyan"
                    : "text-text-muted hover:bg-white/5 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-mono-data",
                    done
                      ? "border-violet bg-violet/20 text-violet"
                      : active
                        ? "border-cyan text-cyan"
                        : "border-glass-border-token text-text-muted"
                  )}
                >
                  {done ? <Check size={11} /> : percent > 0 ? `${percent}` : idx + 1}
                </span>
                {!collapsed && (
                  <span className="truncate flex-1">{item.title}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
