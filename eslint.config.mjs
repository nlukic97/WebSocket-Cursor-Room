import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", eslintConfigPrettier],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-alert": "error",
      "no-console": ["warn", { allow: ["error"] }],
      "no-await-in-loop": "error",
      "no-eval": "error",
    },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
]);
