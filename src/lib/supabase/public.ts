import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-free Supabase client for public, read-only, unauthenticated
 * queries — the certificate view/OG image lookups. Deliberately does NOT
 * go through @supabase/ssr's cookie machinery like lib/supabase/server.ts:
 * reading `next/headers` cookies() forces Next.js to treat the whole route
 * as dynamic (server-rendered on every request), even though a certificate
 * never needs the visitor's session — its data is public and permanent
 * once earned. Using this plain client instead lets those routes opt back
 * into ISR (`export const revalidate = ...`) rather than paying for a
 * fresh render/function invocation on every hit.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
