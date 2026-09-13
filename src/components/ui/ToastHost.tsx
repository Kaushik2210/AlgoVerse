"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Sparkles, X } from "lucide-react";
import { useToastStore } from "@/lib/store/toast";
import { cn } from "@/lib/utils";

const variantClasses = {
  amber: "border-amber/40 text-amber",
  cyan: "border-cyan/40 text-cyan",
  violet: "border-violet/40 text-violet",
};

/** Global toast renderer — mounted once at the root layout. Anything in
 * the app can push a toast via useToastStore.getState().push(...). Used
 * right now for badge-unlock and level-up notifications. */
export default function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 w-[min(360px,calc(100vw-2rem))]">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ReturnType<typeof useToastStore.getState>["toasts"][number];
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 6000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Icon = toast.icon === "level" ? Sparkles : Award;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className={cn(
        "glass rounded-xl border px-4 py-3 shadow-2xl relative overflow-hidden",
        variantClasses[toast.variant]
      )}
      role="status"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(120px 60px at 0% 0%, currentColor, transparent 70%)",
        }}
      />
      <div className="relative flex items-start gap-3">
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border", variantClasses[toast.variant])}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono-data text-xs uppercase tracking-wide">{toast.title}</p>
          {toast.description && (
            <p className="text-xs text-text-muted mt-0.5">{toast.description}</p>
          )}
        </div>
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="text-text-muted hover:text-foreground shrink-0"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}
