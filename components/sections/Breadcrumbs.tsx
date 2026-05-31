import Link from "next/link";
import { routes } from "@/lib/routes";

/**
 * Visual breadcrumbs. Pair with breadcrumbSchema() for the JSON-LD version.
 */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: "Home", path: routes.home.path }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="container-px pt-24 sm:pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 sm:text-sm">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-navy-700" aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-brand-green-dark">{item.name}</Link>
              )}
              {!last && <span className="text-navy-200" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
