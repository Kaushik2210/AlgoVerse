import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client. Safe to import from any client component —
 * uses the public anon key only. Auth state lives in cookies so it's shared
 * with server components/route handlers via lib/supabase/server.ts.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
