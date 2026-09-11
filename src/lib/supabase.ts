import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client, using the service role key - this bypasses row-level
 * security, which is fine here because it's never exposed to the browser.
 * Every read and write goes through our own API routes and server
 * components, never directly from client code.
 *
 * Returns null (rather than throwing) when the env vars aren't set yet, so
 * the build and every caller can degrade gracefully before Supabase is
 * actually provisioned - see README setup steps.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
