"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ANALYTICS_AUTH_COOKIE } from "@/lib/analytics-auth";

export async function login(formData: FormData) {
  const password = formData.get("password");
  const next = formData.get("next");
  const secret = process.env.ANALYTICS_DASHBOARD_SECRET;

  const nextParam = typeof next === "string" && next ? `&next=${encodeURIComponent(next)}` : "";

  if (!secret || password !== secret) {
    redirect(`/analytics/login?error=1${nextParam}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(ANALYTICS_AUTH_COOKIE, secret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  redirect(typeof next === "string" && next ? next : "/analytics");
}
