"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, KeyRound, AlertCircle, Eye, EyeOff } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useToastStore } from "@/lib/store/toast";
import { cn } from "@/lib/utils";

/**
 * Set a new password after arriving via the Supabase recovery link — by the
 * time this renders, /auth/callback has already exchanged the code for a
 * real (recovery-scoped) session, so this just calls updateUser().
 */
export default function ResetPasswordForm() {
  const router = useRouter();
  const pushToast = useToastStore((s) => s.push);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordTooShort = password.length > 0 && password.length < 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    pushToast({
      title: "Password updated",
      description: "You're all set — signed in with your new password.",
      variant: "cyan",
      icon: "level",
    });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm"
    >
      <GlassCard glow="cyan" className="flex flex-col gap-5">
        <div>
          <p className="font-mono-data text-xs uppercase tracking-wider text-cyan">Account Recovery</p>
          <h1 className="text-xl font-bold mt-1">Choose a new password</h1>
          <p className="text-sm text-text-muted mt-1">Make it a good one.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-mono-data text-text-muted">New password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  "w-full glass rounded-lg px-3 py-2.5 pr-10 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-cyan/50 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.08)] placeholder:text-text-muted/60",
                  passwordTooShort && "border-red-500/50 focus:border-red-500/50"
                )}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-cyan transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <span className={cn("text-[11px]", passwordTooShort ? "text-red-400" : "text-text-muted")}>
              At least 6 characters
            </span>
          </label>

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" disabled={loading} className="mt-1 w-full">
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Updating…
              </>
            ) : (
              <>
                <KeyRound size={16} />
                Update password
              </>
            )}
          </Button>
        </form>
      </GlassCard>
    </motion.div>
  );
}
