/**
 * Central WhatsApp helpers — pre-filled message, deep link and UTM capture.
 * Framework-neutral (all window access is guarded) so it's safe to import from
 * client components and the lib layer alike.
 */
import { site } from "./site";

/** Pre-filled WhatsApp enquiry message. */
export const WHATSAPP_MESSAGE =
  "Hi Smile Connection, I'd like to enquire about booking a dental appointment.";

/** Build the WhatsApp deep link (central number + pre-filled text). */
export function buildWhatsAppUrl(message: string = WHATSAPP_MESSAGE): string {
  return `${site.contact.whatsappLink}?text=${encodeURIComponent(message)}`;
}

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

const UTM_STORAGE_KEY = "sc_utms";

/** Capture UTM params from the current URL into sessionStorage (call on load). */
export function captureUtms(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    if (Object.keys(found).length > 0) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    /* storage unavailable — ignore */
  }
}

/** Read stored UTMs, merged with any present on the current URL. */
export function getStoredUtms(): Record<string, string> {
  const merged: Record<string, string> = {};
  if (typeof window === "undefined") return merged;
  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) Object.assign(merged, JSON.parse(stored));
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) merged[k] = v.slice(0, 200);
    }
  } catch {
    /* ignore */
  }
  return merged;
}
