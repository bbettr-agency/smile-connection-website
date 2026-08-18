/**
 * Receptionist application — shared config (no secrets).
 * Imported by BOTH the client form and the server route handler so the option
 * lists and limits are a single source of truth (server re-validates every
 * value against these — client validation is UX only).
 */

export const POSITION_TITLE = "Dental Receptionist";

/** CV upload limits. 4 MB keeps us safely under Vercel's ~4.5 MB request-body cap. */
export const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4 MB
export const MAX_FILE_MB = 4;

export const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
] as const;

/** Minimum time (ms) a genuine human takes to complete the form. */
export const MIN_SUBMIT_MS = 3000;

export const EXPERIENCE_OPTIONS = [
  "No dental reception experience",
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "5+ years",
] as const;

export const YES_NO = ["Yes", "No"] as const;

export type ApplicationField =
  | "fullName"
  | "mobile"
  | "email"
  | "experience"
  | "fluent"
  | "computerLiterate"
  | "goodX"
  | "area";

/** Human-readable labels used in the email (keeps the email format in sync). */
export const EMAIL_FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  mobile: "Mobile Number",
  email: "Email Address",
  experience: "Dental Reception Experience",
  fluent: "Fluent in Afrikaans & English",
  computerLiterate: "Computer Literate",
  goodX: "GoodX Experience",
  area: "Area/Suburb",
};

/** Lenient email check (server also relies on provider-level rejection). */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * SA-friendly mobile validation — intentionally permissive.
 * Accepts 0821234567, 082 123 4567, +27 82 123 4567 and reasonable variants.
 */
export function isValidMobile(value: string): boolean {
  const normalised = value.replace(/[\s\-().]/g, "");
  return (
    /^(\+?27\d{9}|0\d{9})$/.test(normalised) || // SA formats
    /^\+?\d{10,15}$/.test(normalised) // reasonable international fallback
  );
}
