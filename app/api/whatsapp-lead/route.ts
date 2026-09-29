import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Node runtime; always dynamic. Thin proxy → GHL Inbound Webhook.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_KEYS = [
  "first_name",
  "last_name",
  "name",
  "email",
  "phone",
  "source",
  "tag",
  "page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "adset_id",
  "ad_id",
] as const;

/**
 * Reply the browser can act on: { ok } signals whether GHL ACCEPTED the lead
 * (webhook returned 2xx). The client fires LeadSubmitted only on ok:true.
 * Errors never throw and never expose internals; a non-ok reply simply means
 * "not confirmed" — the client still opens WhatsApp regardless.
 */
const reply = (ok: boolean, status = 200) => NextResponse.json({ ok }, { status });

function sanitise(value: unknown): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 500);
}

export async function POST(request: Request) {
  // Lightweight same-origin guard (reduces external abuse of the proxy).
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(site.url).host && new URL(origin).host !== request.headers.get("host")) {
        return reply(false, 403);
      }
    } catch {
      return reply(false, 403);
    }
  }

  // Parse the body (fetch sends JSON; a sendBeacon fallback would too).
  let raw: unknown;
  try {
    const text = await request.text();
    if (!text || text.length > 8000) return reply(false); // size cap
    raw = JSON.parse(text);
  } catch {
    return reply(false);
  }
  if (!raw || typeof raw !== "object") return reply(false);

  // Whitelist + sanitise fields.
  const src = raw as Record<string, unknown>;
  const payload: Record<string, string> = {};
  for (const key of ALLOWED_KEYS) {
    const v = sanitise(src[key]);
    if (v) payload[key] = v;
  }
  // Nothing useful to forward.
  if (!payload.name && !payload.email && !payload.phone) return reply(false);

  const webhook = process.env.GHL_WHATSAPP_WEBHOOK_URL;
  if (!webhook) return reply(false); // not configured → cannot confirm

  // Forward to GHL. We report ok:true ONLY if GHL accepts (2xx). Short timeout
  // so a slow/unavailable GHL becomes ok:false rather than hanging.
  let ok = false;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);
    ok = res.ok; // GHL accepted the payload for processing
  } catch {
    ok = false; // timeout / network / abort → not confirmed
  }

  return reply(ok);
}

// Reject other methods quietly.
export async function GET() {
  return reply(false, 405);
}
