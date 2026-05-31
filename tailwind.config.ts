import type { Config } from "tailwindcss";

/**
 * Bbettr Website OS — Design Tokens
 * Brand colours are centralised here so the entire template can be
 * re-skinned for future dental clients by editing this one file.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Smile Connection brand
        navy: {
          DEFAULT: "#002570",
          50: "#eef2fb",
          100: "#d6e0f5",
          200: "#aebfe8",
          300: "#7d96d6",
          400: "#4f6cc0",
          500: "#2c47a3",
          600: "#1a3187",
          700: "#0f246e",
          800: "#002570",
          900: "#001a52",
        },
        brand: {
          // CTA / hover / WhatsApp / emergency accent
          green: "#37ca37",
          "green-dark": "#2bab2b",
          "green-light": "#e9faea",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(0, 37, 112, 0.18)",
        card: "0 6px 24px -8px rgba(0, 37, 112, 0.14)",
        cta: "0 8px 24px -6px rgba(55, 202, 55, 0.45)",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #002570 0%, #0f246e 55%, #1a3187 100%)",
        "soft-blue": "linear-gradient(180deg, #f5f8ff 0%, #ffffff 100%)",
        "hero-glow": "radial-gradient(60% 60% at 70% 20%, rgba(55,202,55,0.18) 0%, rgba(55,202,55,0) 70%)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(55,202,55,0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(55,202,55,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(55,202,55,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
        "pulse-ring": "pulse-ring 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
