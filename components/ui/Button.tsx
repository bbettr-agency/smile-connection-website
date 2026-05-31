import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Green CTA — bookings, primary actions
  primary:
    "bg-brand-green text-white shadow-cta hover:bg-brand-green-dark hover:-translate-y-0.5 active:translate-y-0",
  // Navy secondary
  secondary:
    "bg-navy-800 text-white hover:bg-navy-700 hover:-translate-y-0.5 active:translate-y-0",
  // Outline ghost
  ghost:
    "border-2 border-navy-200 bg-white text-navy-800 hover:border-brand-green hover:text-brand-green-dark",
  // For dark backgrounds
  white:
    "bg-white text-navy-800 hover:bg-navy-50 hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "lg",
  className = "",
  external,
  ariaLabel,
}: ButtonAsLink) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
