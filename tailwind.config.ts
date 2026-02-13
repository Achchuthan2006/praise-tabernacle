import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand roles (logo + supporting colors)
        brandPrimary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
        brandSecondary: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
        brandAccent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        brandDark: "rgb(var(--color-bg-dark-rgb) / <alpha-value>)",
        brandDarkAlt: "rgb(var(--color-bg-dark-alt-rgb) / <alpha-value>)",
        brandSurface: "rgb(var(--color-bg-surface-rgb) / <alpha-value>)",
        brandText: "rgb(var(--color-text-main-rgb) / <alpha-value>)",
        brandMuted: "rgb(var(--color-text-muted-rgb) / <alpha-value>)",

        // Backward-compatible names used throughout the app
        churchBlue: "rgb(var(--color-text-main-rgb) / <alpha-value>)",
        churchBlueLight: "rgb(var(--color-text-muted-rgb) / <alpha-value>)",
        churchBlueSoft: "rgb(var(--color-bg-surface-rgb) / <alpha-value>)",
        churchGold: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
        stagePurple: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        stageBlue: "rgb(var(--color-bg-dark-alt-rgb) / <alpha-value>)",
        burgundy: "rgb(var(--burgundy) / <alpha-value>)",
        charcoal: "rgb(var(--charcoal) / <alpha-value>)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--color-bg-dark-rgb) / 0.10), 0 14px 40px rgb(var(--color-bg-dark-rgb) / 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config
