"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Send, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Requests a Supabase password-reset email. Unlike signup, this flow always
 * needs the email round-trip — there's no instant-session shortcut here.
 */
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const emailInvalid = emailTouched && email.length > 0 && !EMAIL_RE.test(email);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!EMAIL_RE.test(email)) {
      setEmailTouched(true);
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
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
          <h1 className="text-xl font-bold mt-1">Reset your password</h1>
          <p className="text-sm text-text-muted mt-1">
            We&apos;ll email you a link to set a new one.
          </p>
        </div>

        {sent ? (
          <div className="flex items-start gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-3 py-2 text-xs text-cyan">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
            <span>Check your inbox — click the link there to choose a new password.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-mono-data text-text-muted">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                placeholder="you@example.com"
                className={`w-full glass rounded-lg px-3 py-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-cyan/50 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.08)] placeholder:text-text-muted/60 ${
                  emailInvalid ? "border-red-500/50 focus:border-red-500/50" : ""
                }`}
                autoComplete="email"
              />
              {emailInvalid && (
                <span className="text-[11px] text-red-400">That doesn&apos;t look like a valid email.</span>
              )}
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
                  Sending…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send reset link
                </>
              )}
            </Button>
          </form>
        )}

        <p className="text-center text-xs text-text-muted">
          <Link href="/login" className="inline-flex items-center gap-1 text-cyan hover:underline">
            <ArrowLeft size={12} />
            Back to sign in
          </Link>
        </p>
      </GlassCard>
    </motion.div>
  );
}
