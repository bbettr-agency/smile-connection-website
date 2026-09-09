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
] as const;

/** Always resolve to 204 for the browser — capture is best-effort and must
 *  never surface an error that could interfere with the WhatsApp hand-off. */
const noContent = () => new NextResponse(null, { status: 204 });

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
        return noContent();
      }
    } catch {
      return noContent();
    }
  }

  // Parse the body (sendBeacon sends a JSON blob; fetch sends JSON too).
  let raw: unknown;
  try {
    const text = await request.text();
    if (!text || text.length > 8000) return noContent(); // size cap
    raw = JSON.parse(text);
  } catch {
    return noContent();
  }
  if (!raw || typeof raw !== "object") return noContent();

  // Whitelist + sanitise fields.
  const src = raw as Record<string, unknown>;
  const payload: Record<string, string> = {};
  for (const key of ALLOWED_KEYS) {
    const v = sanitise(src[key]);
    if (v) payload[key] = v;
  }
  // Nothing useful to forward.
  if (!payload.name && !payload.email && !payload.phone) return noContent();

  const webhook = process.env.GHL_WHATSAPP_WEBHOOK_URL;
  if (!webhook) return noContent(); // not configured yet → silent no-op

  // Forward to GHL with a short timeout. The browser is NOT awaiting this, so
  // GHL being slow/unavailable can never affect the WhatsApp hand-off.
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).catch(() => {});
    clearTimeout(timer);
  } catch {
    /* swallow — best-effort */
  }

  return noContent();
}

// Reject other methods quietly.
export async function GET() {
  return noContent();
}
