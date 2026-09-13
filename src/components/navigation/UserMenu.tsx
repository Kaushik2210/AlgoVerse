"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, User as UserIcon, Cloud } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { createClient } from "@/lib/supabase/client";
import { useMounted } from "@/lib/hooks/useMounted";

/** Sign-in state pill in the top bar. Signed out: a plain "Sign In" link.
 * Signed in: username + a dropdown with a sign-out action. */
export default function UserMenu() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const mounted = useMounted();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!mounted || loading) {
    return <div className="h-8 w-8 rounded-lg border border-glass-border-token opacity-40" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-1.5 rounded-lg border border-glass-border-token px-2.5 py-1.5 text-xs font-mono-data hover:border-cyan/40 hover:text-cyan transition-colors"
      >
        <LogIn size={14} />
        <span className="hidden sm:inline">Sign In</span>
      </Link>
    );
  }

  const username =
    (user.user_metadata?.username as string | undefined) ?? user.email?.split("@")[0] ?? "operative";

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg border border-glass-border-token px-2.5 py-1.5 text-xs font-mono-data hover:border-violet/40 hover:text-violet transition-colors"
        title="Cloud sync active"
      >
        <Cloud size={14} className="text-violet" />
        <span className="hidden sm:inline max-w-[9rem] truncate">{username}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 glass rounded-xl p-1.5 z-50">
          <div className="flex items-center gap-2 px-2.5 py-2 text-xs text-text-muted border-b border-glass-border-token/60 mb-1">
            <UserIcon size={13} />
            <span className="truncate">{user.email}</span>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-mono-data text-left hover:bg-glass-border-token/40 hover:text-red-400 transition-colors"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
