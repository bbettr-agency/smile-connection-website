"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  EXPERIENCE_OPTIONS,
  YES_NO,
  MAX_FILE_MB,
  MAX_FILE_BYTES,
  ALLOWED_EXTENSIONS,
  isValidEmail,
  isValidMobile,
} from "@/lib/application";
import { CheckIcon, AlertIcon } from "@/components/ui/Icons";

/** Public site key. Falls back to Cloudflare's always-passes TEST key for local dev. */
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

const inputCls =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-base text-navy-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-green focus:ring-4 focus:ring-brand-green/20";

type Values = {
  fullName: string;
  mobile: string;
  email: string;
  experience: string;
  fluent: string;
  computerLiterate: string;
  goodX: string;
  area: string;
};

const EMPTY: Values = {
  fullName: "",
  mobile: "",
  email: "",
  experience: "",
  fluent: "",
  computerLiterate: "",
  goodX: "",
  area: "",
};

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600">
      <AlertIcon className="h-4 w-4 shrink-0" /> {msg}
    </p>
  );
}

/** Accessible single-choice group rendered as large, tappable cards. */
function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns = 1,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns?: 1 | 2;
}) {
  const errId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errId : undefined}>
      <legend className="mb-2 block text-sm font-semibold text-navy-800">{legend}</legend>
      <div className={`grid gap-2.5 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <label
              key={opt}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-base transition ${
                selected
                  ? "border-brand-green bg-brand-green-light font-semibold text-navy-900 ring-2 ring-brand-green/30"
                  : "border-navy-100 bg-white text-navy-800 hover:border-brand-green/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={selected}
                onChange={() => onChange(opt)}
                className="h-5 w-5 shrink-0 accent-brand-green"
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={errId} msg={error} />
    </fieldset>
  );
}

export function ApplicationForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setStartedAt(Date.now()), []);

  const setField = (k: keyof Values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => {
      const n = { ...e };
      delete n[k];
      return n;
    });
  };

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!values.fullName.trim()) e.fullName = "Please enter your full name.";
    if (!values.mobile.trim()) e.mobile = "Please enter your mobile number.";
    else if (!isValidMobile(values.mobile)) e.mobile = "Please enter a valid mobile number.";
    if (!values.email.trim()) e.email = "Please enter your email address.";
    else if (!isValidEmail(values.email)) e.email = "Please enter a valid email address.";
    if (!values.experience) e.experience = "Please select an option.";
    if (!values.fluent) e.fluent = "Please select an option.";
    if (!values.computerLiterate) e.computerLiterate = "Please select an option.";
    if (!values.goodX) e.goodX = "Please select an option.";
    if (!values.area.trim()) e.area = "Please enter your area/suburb.";
    if (!file) e.cv = "Please attach your CV.";
    else if (!ALLOWED_EXTENSIONS.some((x) => file.name.toLowerCase().endsWith(x)))
      e.cv = "Your CV must be a PDF, DOC or DOCX file.";
    else if (file.size > MAX_FILE_BYTES) e.cv = `Your CV must be ${MAX_FILE_MB} MB or smaller.`;
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (status === "submitting") return; // prevent duplicate submissions
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setFormError("Please check the highlighted fields and try again.");
      return;
    }
    setFormError("");
    setStatus("submitting");
    try {
      const fd = new FormData(formRef.current!);
      const res = await fetch("/api/receptionist-application", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        // Fire the Meta conversion ONLY on genuine, server-confirmed success.
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("trackCustom", "ReceptionistApplication");
        }
      } else {
        setStatus("error");
        setFormError(
          data.error || "We couldn’t submit your application. Please check your information and try again."
        );
      }
    } catch {
      setStatus("error");
      setFormError("We couldn’t submit your application. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-navy-50 bg-white p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green-dark">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-navy-900">Application Submitted</h2>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-600">
          Thank you for applying to join Smile Connection. Your application and CV have been received.
          If your application is shortlisted, the team will contact you regarding the next step.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        {/* Honeypot — hidden from humans; bots fill it. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          defaultValue=""
        />
        {/* Timing trap (set on mount). */}
        <input type="hidden" name="startedAt" value={startedAt} readOnly />

        {/* 1. Full name */}
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-navy-800">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputCls}
          />
          <FieldError id="fullName-error" msg={errors.fullName} />
        </div>

        {/* 2. Mobile number */}
        <div>
          <label htmlFor="mobile" className="mb-1.5 block text-sm font-semibold text-navy-800">
            Mobile number
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="082 123 4567"
            value={values.mobile}
            onChange={(e) => setField("mobile", e.target.value)}
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? "mobile-error" : undefined}
            className={inputCls}
          />
          <FieldError id="mobile-error" msg={errors.mobile} />
        </div>

        {/* 3. Email address */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy-800">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputCls}
          />
          <FieldError id="email-error" msg={errors.email} />
        </div>

        {/* 4. Experience */}
        <ChoiceGroup
          legend="How many years of dental reception experience do you have?"
          name="experience"
          options={EXPERIENCE_OPTIONS}
          value={values.experience}
          onChange={(v) => setField("experience", v)}
          error={errors.experience}
        />

        {/* 5. Language */}
        <ChoiceGroup
          legend="Are you fluent in both Afrikaans and English?"
          name="fluent"
          options={YES_NO}
          value={values.fluent}
          onChange={(v) => setField("fluent", v)}
          error={errors.fluent}
          columns={2}
        />

        {/* 6. Computer literacy */}
        <ChoiceGroup
          legend="Are you computer literate?"
          name="computerLiterate"
          options={YES_NO}
          value={values.computerLiterate}
          onChange={(v) => setField("computerLiterate", v)}
          error={errors.computerLiterate}
          columns={2}
        />

        {/* 7. GoodX */}
        <ChoiceGroup
          legend="Do you have experience using GoodX software?"
          name="goodX"
          options={YES_NO}
          value={values.goodX}
          onChange={(v) => setField("goodX", v)}
          error={errors.goodX}
          columns={2}
        />

        {/* 8. Area */}
        <div>
          <label htmlFor="area" className="mb-1.5 block text-sm font-semibold text-navy-800">
            Which area/suburb do you currently live in?
          </label>
          <input
            id="area"
            name="area"
            type="text"
            value={values.area}
            onChange={(e) => setField("area", e.target.value)}
            aria-invalid={!!errors.area}
            aria-describedby={errors.area ? "area-error" : undefined}
            className={inputCls}
          />
          <FieldError id="area-error" msg={errors.area} />
        </div>

        {/* 9. CV upload */}
        <div>
          <span className="mb-1.5 block text-sm font-semibold text-navy-800">Upload your CV</span>
          <label
            htmlFor="cv"
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition ${
              file
                ? "border-brand-green bg-brand-green-light"
                : "border-navy-200 bg-white hover:border-brand-green/60"
            }`}
          >
            {file ? (
              <span className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                <CheckIcon className="h-5 w-5 text-brand-green-dark" />
                {file.name}
              </span>
            ) : (
              <span className="text-sm font-semibold text-navy-800">Tap to choose your CV</span>
            )}
            <span className="text-xs text-slate-500">PDF, DOC or DOCX · max {MAX_FILE_MB} MB</span>
            <input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                setErrors((er) => {
                  const n = { ...er };
                  delete n.cv;
                  return n;
                });
              }}
              aria-invalid={!!errors.cv}
              aria-describedby={errors.cv ? "cv-error" : undefined}
              className="sr-only"
            />
          </label>
          <FieldError id="cv-error" msg={errors.cv} />
        </div>

        {/* Cloudflare Turnstile widget (injects cf-turnstile-response into the form) */}
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />

        {/* Privacy consent — immediately above submit */}
        <p className="text-xs leading-relaxed text-slate-500">
          By submitting this application, you consent to Smile Connection using the information provided
          to assess your application for this position.
        </p>

        {/* Form-level error */}
        {formError && status !== "submitting" && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" /> {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-4 text-base font-semibold text-white shadow-cta transition-all duration-200 hover:bg-brand-green-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Submitting application…" : "Submit Application"}
        </button>
      </form>
    </>
  );
}
