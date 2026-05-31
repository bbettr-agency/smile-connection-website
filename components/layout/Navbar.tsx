"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks, serviceLinks, routes } from "@/lib/routes";
import { site } from "@/lib/site";
import { PhoneIcon, CalendarIcon, ChevronDownIcon } from "@/components/ui/Icons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "bg-white/90 backdrop-blur"
      }`}
    >
      <nav className="container-px flex h-[68px] items-center justify-between gap-3" aria-label="Primary">
        <Logo priority />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.path === routes.services.path ? (
              <div key={link.path} className="group relative">
                <Link
                  href={link.path}
                  className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive(link.path) ? "text-brand-green-dark" : "text-navy-700 hover:text-brand-green-dark"
                  }`}
                >
                  {link.label}
                  <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </Link>
                {/* Services dropdown */}
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-navy-50 bg-white p-2 shadow-soft">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.path}
                        href={s.path}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-brand-green-light hover:text-navy-900"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                href={link.path}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(link.path) ? "text-brand-green-dark" : "text-navy-700 hover:text-brand-green-dark"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button href={`tel:${site.contact.phoneTel}`} external variant="ghost" size="md" ariaLabel={`Call ${site.name}`}>
            <PhoneIcon className="h-4 w-4" /> {site.contact.phoneDisplay}
          </Button>
          <Button href={routes.contact.path} variant="primary" size="md">
            <CalendarIcon className="h-4 w-4" /> Book Appointment
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 text-navy-800 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 bottom-0 h-0.5 w-5 bg-current transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`fixed inset-0 top-[68px] z-40 bg-navy-900/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`fixed inset-x-0 top-[68px] z-50 max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-navy-50 bg-white px-5 pb-8 pt-2 shadow-soft transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <ul className="flex flex-col">
            {navLinks.map((link) =>
              link.path === routes.services.path ? (
                <li key={link.path} className="border-b border-navy-50">
                  <div className="flex items-center">
                    <Link
                      href={link.path}
                      className="flex-1 py-3.5 text-base font-semibold text-navy-800"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="p-2 text-navy-500"
                      aria-label="Toggle services"
                      aria-expanded={servicesOpen}
                    >
                      <ChevronDownIcon className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <ul className={`overflow-hidden transition-all ${servicesOpen ? "max-h-96 pb-3" : "max-h-0"}`}>
                    {serviceLinks.map((s) => (
                      <li key={s.path}>
                        <Link
                          href={s.path}
                          className="block rounded-lg py-2.5 pl-4 text-[15px] font-medium text-navy-600"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.path} className="border-b border-navy-50">
                  <Link
                    href={link.path}
                    className={`block py-3.5 text-base font-semibold ${
                      isActive(link.path) ? "text-brand-green-dark" : "text-navy-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="mt-5 grid grid-cols-1 gap-3">
            <Button href={routes.contact.path} variant="primary" size="lg" className="w-full">
              <CalendarIcon className="h-5 w-5" /> Book Appointment
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button href={`tel:${site.contact.phoneTel}`} external variant="secondary" size="md" className="w-full">
                <PhoneIcon className="h-4 w-4" /> Call Us
              </Button>
              <Button href={site.contact.whatsappLink} external variant="ghost" size="md" className="w-full">
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
