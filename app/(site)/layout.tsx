import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { JsonLd } from "@/components/ui/JsonLd";
import { dentistSchema } from "@/lib/schema";

/**
 * Site chrome layout — wraps all normal public pages with the full website
 * navigation, footer, sticky mobile CTA and the global LocalBusiness schema.
 * Routes outside this group (e.g. /receptionist-application) intentionally
 * render without any of this chrome. URLs are unaffected — "(site)" is a
 * route group, not a path segment.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Global LocalBusiness / Dentist schema */}
      <JsonLd data={dentistSchema()} />

      <Navbar />
      {/* pb-20 keeps content clear of the sticky mobile CTA bar */}
      <main className="pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
