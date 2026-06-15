import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { JsonLd } from "@/components/ui/JsonLd";
import { MetaPixelView } from "@/components/analytics/MetaPixel";
import { dentistSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/** Google Tag Manager container ID — loaded globally on every route. */
const GTM_ID = "GTM-PPBC33D";
/** Meta Pixel ID — installed directly in code (not via GTM). */
const META_PIXEL_ID = "1727615574819876";

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

        {/* Meta Pixel — installed directly in code (NOT via GTM). Loads on
            every route; fires the initial PageView here, with SPA route-change
            PageViews handled by <MetaPixelView />. */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        {/* End Meta Pixel */}
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

        {/* Meta Pixel (noscript fallback) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* End Meta Pixel (noscript) */}

        {/* Fires Meta Pixel PageView on client-side route changes */}
        <MetaPixelView />

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
