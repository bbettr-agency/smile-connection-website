import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { navLinks, serviceLinks, routes } from "@/lib/routes";
import { PhoneIcon, WhatsAppIcon, MailIcon, PinIcon, ClockIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-gradient text-navy-100">
      <div className="container-px py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-100/90">
              {site.positioning}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <a href={`tel:${site.contact.phoneTel}`} className="inline-flex items-center gap-3 hover:text-white">
                <PhoneIcon className="h-4 w-4 text-brand-green" />
                {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                <WhatsAppIcon className="h-4 w-4 text-brand-green" />
                WhatsApp us
              </a>
              <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-3 break-all hover:text-white">
                <MailIcon className="h-4 w-4 text-brand-green" />
                {site.contact.email}
              </a>
              <a href={site.address.mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-3 hover:text-white">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                {site.address.full}
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-navy-100/90 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Our Services</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-navy-100/90 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h3 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <ClockIcon className="h-4 w-4 text-brand-green" /> Opening Hours
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {site.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-4">
                  <span className="text-navy-100/90">{h.day}</span>
                  <span className={h.open ? "font-medium text-white" : "text-navy-200"}>{h.label}</span>
                </li>
              ))}
            </ul>
            <Link
              href={routes.contact.path}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold text-white shadow-cta transition-colors hover:bg-brand-green-dark"
            >
              Book an Appointment
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-navy-200 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href={routes.contact.path} className="hover:text-white">Contact</Link>
            <span aria-hidden="true">·</span>
            <span>Newlands, Pretoria</span>
            <span aria-hidden="true">·</span>
            <span>Website by Bbettr Agency</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
