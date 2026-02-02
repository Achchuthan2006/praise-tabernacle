import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        churchBlue: "#0A1D5C",
        churchBlueLight: "#1E3A8A",
        churchBlueSoft: "#EAF0FF",
        churchGold: "#FFD84D",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(10 29 92 / 0.10), 0 14px 40px rgb(10 29 92 / 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config
