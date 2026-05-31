/**
 * Bbettr Website OS — Route registry.
 * Paths use the EXACT casing required by the client brief.
 * Centralising routes keeps the navbar, footer, sitemap and internal
 * links in sync automatically.
 */

export type RouteDef = {
  path: string;
  label: string;
  /** Show in the primary navbar */
  inNav?: boolean;
  /** Show in the footer "Services" column */
  isService?: boolean;
};

export const routes = {
  home: { path: "/home", label: "Home", inNav: true },
  about: { path: "/about-us", label: "About Us", inNav: true },
  services: { path: "/services", label: "Services", inNav: true },
  gallery: { path: "/gallery", label: "Gallery", inNav: true },
  contact: { path: "/contact-us", label: "Contact Us", inNav: true },

  toothReplacement: { path: "/tooth-replacement", label: "Tooth Replacement", isService: true },
  restorative: { path: "/restorative-treatments", label: "Restorative Treatments", isService: true },
  smileMakeover: { path: "/smile-makeover", label: "Smile Makeover", isService: true },
  rootCanal: { path: "/root-canal-treatment", label: "Root Canal Treatment", isService: true },
  preventive: { path: "/preventive-dentistry", label: "Preventive Dentistry", isService: true },
  facialAesthetics: { path: "/facial-aesthetics", label: "Facial Aesthetics", isService: true },
} as const satisfies Record<string, RouteDef>;

export const allRoutes: RouteDef[] = Object.values(routes);

export const navLinks: RouteDef[] = allRoutes.filter((r) => r.inNav);
export const serviceLinks: RouteDef[] = allRoutes.filter((r) => r.isService);
