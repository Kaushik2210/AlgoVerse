"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, LogIn, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

const inputClass =
  "w-full glass rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan/50 placeholder:text-text-muted/60";

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    const supabase = createClient();

    if (isSignup) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: username.trim() ? { username: username.trim() } : undefined,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(mapAuthError(signUpError.message));
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // Email confirmation is required — no session yet.
      setNotice("Check your inbox to confirm your email, then sign in.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(mapAuthError(signInError.message));
      setLoading(false);
      return;
    }

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
          <p className="font-mono-data text-xs uppercase tracking-wider text-cyan">
            {isSignup ? "New Operative" : "Access Terminal"}
          </p>
          <h1 className="text-xl font-bold mt-1">
            {isSignup ? "Create your account" : "Sign in"}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {isSignup
              ? "Sync your XP, streaks, and badges across every device."
              : "Welcome back, operative."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignup && (
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-mono-data text-text-muted">Username (optional)</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="operative_42"
                className={inputClass}
                maxLength={32}
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-mono-data text-text-muted">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              autoComplete="email"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-mono-data text-text-muted">Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </label>

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {notice && (
            <div className="flex items-start gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-3 py-2 text-xs text-cyan">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          <Button type="submit" disabled={loading} className="mt-1 w-full">
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isSignup ? (
              <UserPlus size={16} />
            ) : (
              <LogIn size={16} />
            )}
            {isSignup ? "Create account" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-xs text-text-muted">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-cyan hover:underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              New here?{" "}
              <Link href="/signup" className="text-cyan hover:underline">
                Create an account
              </Link>
            </>
          )}
        </p>
      </GlassCard>
    </motion.div>
  );
}

function mapAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already registered") || lower.includes("already exists")) {
    return "That email is already registered — try signing in instead.";
  }
  if (lower.includes("invalid login credentials")) {
    return "Wrong email or password.";
  }
  if (lower.includes("password") && lower.includes("6")) {
    return "Password must be at least 6 characters.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }
  return message;
}
