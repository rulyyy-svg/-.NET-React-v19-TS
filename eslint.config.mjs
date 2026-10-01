import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      ".vite/**",
      "dist/",
      "src/routeTree.gen.ts",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  reactPlugin.configs.flat["jsx-runtime"],

  ...pluginQuery.configs["flat/recommended"],

  // 1. Matikan aturan type-checked untuk file konfigurasi root (*.js, *.mjs)
  {
    files: ["*.js", "*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },

  // 2. Konfigurasi umum & parser projectService untuk src/
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  prettier
);