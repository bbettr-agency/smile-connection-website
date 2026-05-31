import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { JsonLd } from "@/components/ui/JsonLd";
import { dentistSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Dentist in Newlands, Pretoria`,
    template: `%s | ${site.shortName}`,
  },
  description: site.positioning,
  applicationName: site.name,
  authors: [{ name: site.name }],
  generator: "Bbettr Website OS",
  keywords: [
    "dentist in Newlands Pretoria",
    "dentist in Pretoria",
    "dental practice Newlands",
    "cosmetic dentist Pretoria",
    "Smile Connection Dental Studio",
  ],
  icons: {
    icon: [{ url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" }],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#002570",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body className="min-h-dvh">
        {/* Global LocalBusiness / Dentist schema */}
        <JsonLd data={dentistSchema()} />

        <Navbar />
        {/* pb-20 keeps content clear of the sticky mobile CTA bar */}
        <main className="pb-20 lg:pb-0">{children}</main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
