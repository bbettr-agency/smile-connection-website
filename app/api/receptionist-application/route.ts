import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  POSITION_TITLE,
  MAX_FILE_BYTES,
  MAX_FILE_MB,
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  MIN_SUBMIT_MS,
  EXPERIENCE_OPTIONS,
  YES_NO,
  EMAIL_FIELD_LABELS,
  isValidEmail,
  isValidMobile,
} from "@/lib/application";

// Node runtime: needs Buffer + the Resend SDK (not Edge). Always dynamic.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECIPIENT = process.env.APPLICATION_RECIPIENT || "mydentist@smileconnection.co.za";
const FROM = process.env.APPLICATION_FROM || "careers@smileconnection.co.za";

/** Generic error → client. Never leak internals. */
function fail(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

/** Trim, strip ASCII control chars, cap length. */
function clean(value: FormDataEntryValue | null, max = 200): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Verify the CV's leading bytes match a genuine PDF / DOC / DOCX. */
function hasValidSignature(bytes: Uint8Array): boolean {
  const startsWith = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  const pdf = startsWith([0x25, 0x50, 0x44, 0x46]); // %PDF
  const zip = startsWith([0x50, 0x4b, 0x03, 0x04]); // PK.. (docx = zip)
  const ole = startsWith([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]); // legacy .doc
  return pdf || zip || ole;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("We couldn’t read your submission. Please try again.");
  }

  // 1) Honeypot — bots fill this hidden field; humans never see it.
  if (clean(form.get("company"), 100) !== "") {
    return fail("We couldn’t submit your application. Please try again.");
  }

  // 2) Timing trap — reject implausibly fast (bot) submissions.
  const startedAt = Number(form.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_SUBMIT_MS) {
    return fail("We couldn’t submit your application. Please try again.");
  }

  // 3) Field validation (server-side; whitelist option values).
  const fullName = clean(form.get("fullName"), 120);
  const mobile = clean(form.get("mobile"), 40);
  const email = clean(form.get("email"), 160);
  const experience = clean(form.get("experience"), 60);
  const fluent = clean(form.get("fluent"), 10);
  const computerLiterate = clean(form.get("computerLiterate"), 10);
  const goodX = clean(form.get("goodX"), 10);
  const area = clean(form.get("area"), 120);

  if (!fullName) return fail("Please enter your full name.");
  if (!isValidMobile(mobile)) return fail("Please enter a valid mobile number.");
  if (!isValidEmail(email)) return fail("Please enter a valid email address.");
  if (!EXPERIENCE_OPTIONS.includes(experience as (typeof EXPERIENCE_OPTIONS)[number]))
    return fail("Please select your dental reception experience.");
  if (!YES_NO.includes(fluent as (typeof YES_NO)[number]))
    return fail("Please answer the language question.");
  if (!YES_NO.includes(computerLiterate as (typeof YES_NO)[number]))
    return fail("Please answer the computer literacy question.");
  if (!YES_NO.includes(goodX as (typeof YES_NO)[number]))
    return fail("Please answer the GoodX question.");
  if (!area) return fail("Please enter the area/suburb you live in.");

  // 4) CV validation.
  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0) return fail("Please attach your CV.");
  if (cv.size > MAX_FILE_BYTES) return fail(`Your CV must be ${MAX_FILE_MB} MB or smaller.`);

  const lowerName = cv.name.toLowerCase();
  const extOk = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  const mimeOk =
    cv.type === "" || ALLOWED_MIME_TYPES.includes(cv.type as (typeof ALLOWED_MIME_TYPES)[number]);
  if (!extOk || !mimeOk) return fail("Your CV must be a PDF, DOC or DOCX file.");

  const buffer = Buffer.from(await cv.arrayBuffer());
  if (!hasValidSignature(new Uint8Array(buffer.subarray(0, 8)))) {
    return fail("That file doesn’t look like a valid PDF, DOC or DOCX. Please try another file.");
  }

  // 5) Email config check (fail cleanly if not yet configured).
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return fail("The application service isn’t available right now. Please try again later.", 503);
  }

  // 6) Build + send the email with the CV attached.
  const rows: Array<[string, string]> = [
    [EMAIL_FIELD_LABELS.fullName, fullName],
    [EMAIL_FIELD_LABELS.mobile, mobile],
    [EMAIL_FIELD_LABELS.email, email],
    [EMAIL_FIELD_LABELS.experience, experience],
    [EMAIL_FIELD_LABELS.fluent, fluent],
    [EMAIL_FIELD_LABELS.computerLiterate, computerLiterate],
    [EMAIL_FIELD_LABELS.goodX, goodX],
    [EMAIL_FIELD_LABELS.area, area],
    ["CV", "Attached"],
  ];

  const text = rows.map(([k, v]) => `${k}:\n${v}\n`).join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0f172a">
  <h2 style="color:#002570;margin:0 0 16px">New ${POSITION_TITLE} Application</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap"><strong>${escapeHtml(
            k
          )}:</strong></td><td style="padding:6px 0;color:#0f172a">${escapeHtml(v)}</td></tr>`
      )
      .join("")}
  </table>
</div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Smile Connection Careers <${FROM}>`,
      to: [RECIPIENT],
      replyTo: email, // reply goes straight to the applicant
      subject: `New ${POSITION_TITLE} Application — ${fullName}`,
      text,
      html,
      attachments: [{ filename: cv.name, content: buffer }],
    });

    if (error) {
      return fail("We couldn’t submit your application. Please try again.", 502);
    }
  } catch {
    return fail("We couldn’t submit your application. Please try again.", 502);
  }

  // Only a genuine, provider-confirmed send reaches here.
  return NextResponse.json({ ok: true });
}

// Reject non-POST methods cleanly.
export async function GET() {
  return fail("Method not allowed.", 405);
}
