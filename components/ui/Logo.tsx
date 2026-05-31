import Link from "next/link";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";

/**
 * Brand logo. Uses the file at `site.logo` (currently a branded placeholder
 * SVG). Replace /public/logo.svg with the official artwork — no code change
 * needed unless you change the filename.
 */
export function Logo({
  className = "",
  onDark = false,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={routes.home.path}
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center ${className}`}
    >
      {/* On dark backgrounds we sit the logo on a soft white chip so the
          full-colour artwork stays legible. */}
      <span className={onDark ? "rounded-lg bg-white px-3 py-2 shadow-sm" : ""}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.logo}
          alt={`${site.name} logo`}
          className="h-10 w-auto sm:h-11"
          width={220}
          height={55}
          {...(priority ? { fetchPriority: "high" as const } : {})}
        />
      </span>
    </Link>
  );
}
