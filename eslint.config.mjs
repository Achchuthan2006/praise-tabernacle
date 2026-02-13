import tsParser from "@typescript-eslint/parser"
import nextPlugin from "@next/eslint-plugin-next"

const nextCoreWebVitalsRules = nextPlugin.configs["core-web-vitals"].rules

export default [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextCoreWebVitalsRules,
    },
  },
]
