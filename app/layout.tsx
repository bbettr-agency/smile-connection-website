import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { JsonLd } from "@/components/ui/JsonLd";
import { dentistSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/** Google Tag Manager container ID — loaded globally on every route. */
const GTM_ID = "GTM-PPBC33D";

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
      <head>
        {/* Google Tag Manager — injected as early as possible in <head>,
            loaded on every route via the App Router root layout. */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-dvh">
        {/* Google Tag Manager (noscript) — immediately after opening <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
