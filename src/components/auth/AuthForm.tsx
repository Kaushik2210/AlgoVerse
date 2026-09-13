"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Loader2,
  LogIn,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useToastStore } from "@/lib/store/toast";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

const inputClass =
  "w-full glass rounded-lg px-3 py-2.5 pr-10 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-cyan/50 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.08)] placeholder:text-text-muted/60";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const pushToast = useToastStore((s) => s.push);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const isSignup = mode === "signup";
  const emailInvalid = emailTouched && email.length > 0 && !EMAIL_RE.test(email);
  const passwordTooShort = isSignup && password.length > 0 && password.length < 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!EMAIL_RE.test(email)) {
      setEmailTouched(true);
      setError("Enter a valid email address.");
      return;
    }
    if (isSignup && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

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
        // Confirmation is off — Supabase handed back a real session already.
        pushToast({
          title: "Welcome aboard, Operative",
          description: "Your account is live and syncing across devices.",
          variant: "cyan",
          icon: "level",
        });
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // Confirmation is still required (e.g. re-enabled later) — no session yet.
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
                className="w-full glass rounded-lg px-3 py-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-cyan/50 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.08)] placeholder:text-text-muted/60"
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
              onBlur={() => setEmailTouched(true)}
              placeholder="you@example.com"
              className={cn(
                inputClass,
                "pr-3",
                emailInvalid && "border-red-500/50 focus:border-red-500/50"
              )}
              autoComplete="email"
            />
            {emailInvalid && (
              <span className="text-[11px] text-red-400">That doesn&apos;t look like a valid email.</span>
            )}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-mono-data text-text-muted">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn(
                  inputClass,
                  passwordTooShort && "border-red-500/50 focus:border-red-500/50"
                )}
                autoComplete={isSignup ? "new-password" : "current-password"}
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
            {isSignup && (
              <span
                className={cn(
                  "text-[11px]",
                  passwordTooShort ? "text-red-400" : "text-text-muted"
                )}
              >
                At least 6 characters
              </span>
            )}
          </label>

          {!isSignup && (
            <div className="-mt-1 text-right">
              <Link href="/forgot-password" className="text-[11px] text-text-muted hover:text-cyan transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

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
              <>
                <Loader2 size={16} className="animate-spin" />
                {isSignup ? "Creating account…" : "Signing in…"}
              </>
            ) : (
              <>
                {isSignup ? <UserPlus size={16} /> : <LogIn size={16} />}
                {isSignup ? "Create account" : "Sign in"}
              </>
            )}
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

function mapAuthError(message: string): React.ReactNode {
  const lower = message.toLowerCase();
  if (lower.includes("already registered") || lower.includes("already exists")) {
    return (
      <span>
        That email&apos;s already registered —{" "}
        <Link href="/login" className="underline hover:text-red-300">
          try logging in instead
        </Link>
        .
      </span>
    );
  }
  if (lower.includes("invalid login credentials")) {
    return "Wrong email or password. Double-check and try again.";
  }
  if (lower.includes("password") && lower.includes("6")) {
    return "Password must be at least 6 characters.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before signing in — check your inbox for the link.";
  }
  if (lower.includes("rate limit") || lower.includes("too many")) {
    return "Too many attempts — give it a minute and try again.";
  }
  if (lower.includes("network") || lower.includes("fetch")) {
    return "Connection hiccup — check your internet and try again.";
  }
  return message;
}
