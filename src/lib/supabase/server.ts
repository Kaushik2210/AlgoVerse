import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client for use in Server Components, Route Handlers,
 * and Server Actions. Reads/writes auth cookies via next/headers. Still uses
 * only the public anon key — RLS policies handle per-user access.
 *
 * Note: `cookies().set()` calls here throw when invoked from a Server
 * Component render (Next.js restriction) — that's expected and safe to
 * swallow, since middleware or a Route Handler is what actually persists
 * refreshed session cookies.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — ignore, middleware refreshes
            // the session cookie on the next request instead.
          }
        },
      },
    }
  );
}
