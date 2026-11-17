/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The homepage now lives at "/". Permanently redirect the old "/home" URL to
  // the root so existing/indexed links don't 404 and pass their SEO equity.
  // Baseline security headers (CSP intentionally omitted: GTM, Meta Pixel,
  // GHL forms and the reviews widget need a tuned policy — add as Report-Only first).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        statusCode: 301, // permanent (301) Moved Permanently
      },
    ];
  },
};

module.exports = nextConfig;
