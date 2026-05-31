import Link from "next/link";
import { site } from "@/lib/site";
import { routes } from "@/lib/routes";

/**
 * Brand logo. Renders the official Smile Connection artwork from `site.logo`
 * (/public/logo.png). The image is the full, trimmed lockup; we constrain
 * height only (with width auto) so it always scales without distortion or
 * cropping across mobile, tablet and desktop.
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
      <span className={onDark ? "inline-flex rounded-lg bg-white px-3 py-2 shadow-sm" : ""}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.logo}
          alt={`${site.name} logo`}
          className="h-9 w-auto sm:h-10 lg:h-11"
          width={562}
          height={248}
          decoding="async"
          {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
        />
      </span>
    </Link>
  );
}
