import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

// Known event types only - keeps the table from filling up with arbitrary
// junk if someone pokes at this endpoint directly. Add new names here as new
// trackEvent() calls are added elsewhere in the codebase.
const ALLOWED_EVENT_TYPES = new Set([
  "pageview",
  "embed_card_click",
  "deep_dive_opened",
  "interview_question_opened",
]);

type CollectPayload = {
  type?: unknown;
  path?: unknown;
  referrer?: unknown;
  sessionId?: unknown;
  meta?: unknown;
};

export async function POST(request: NextRequest) {
  // Validate the payload before ever checking whether Supabase is
  // configured - otherwise a malformed request "succeeds" whenever
  // Supabase isn't set up, which masks real bugs in callers.
  let body: CollectPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }

  const { type, path, referrer, sessionId, meta } = body;

  if (typeof type !== "string" || !ALLOWED_EVENT_TYPES.has(type)) {
    return NextResponse.json({ ok: false, reason: "unknown_type" }, { status: 400 });
  }
  if (typeof sessionId !== "string" || sessionId.length === 0 || sessionId.length > 64) {
    return NextResponse.json({ ok: false, reason: "bad_session" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  // Supabase isn't configured yet - accept a *valid* event and drop it
  // silently, so the site works fine before/without analytics set up.
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 202 });
  }

  const { error } = await supabase.from("analytics_events").insert({
    event_type: type,
    path: typeof path === "string" ? path.slice(0, 512) : null,
    referrer: typeof referrer === "string" ? referrer.slice(0, 512) : null,
    session_id: sessionId,
    meta: meta && typeof meta === "object" ? meta : null,
  });

  if (error) {
    // Never let an analytics failure surface to the client as a real error -
    // log it server-side and return ok anyway.
    console.error("analytics insert failed:", error.message);
  }

  return NextResponse.json({ ok: true });
}
