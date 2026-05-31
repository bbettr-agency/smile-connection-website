/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Real client photos will be added to /public/images later.
    formats: ["image/avif", "image/webp"],
  },
  // 301 redirects from the original capitalized paths to the canonical
  // lowercase routes, so any previously-shared links never break.
  async redirects() {
    const map = [
      ["/Services", "/services"],
      ["/Gallery", "/gallery"],
      ["/Tooth-Replacement", "/tooth-replacement"],
      ["/Restorative-Treatments", "/restorative-treatments"],
      ["/Smile-Makeover", "/smile-makeover"],
      ["/Root-Canal-Treatment", "/root-canal-treatment"],
      ["/Preventive-Dentistry", "/preventive-dentistry"],
      ["/Facial-Aesthetics", "/facial-aesthetics"],
    ];
    return map.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

module.exports = nextConfig;
