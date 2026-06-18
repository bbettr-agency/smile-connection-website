/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The homepage now lives at "/". Permanently redirect the old "/home" URL to
  // the root so existing/indexed links don't 404 and pass their SEO equity.
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
