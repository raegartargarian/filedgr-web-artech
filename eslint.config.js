import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "build"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // Formatting is Prettier's job (`npm run format`); turn off the
      // stylistic rules that would fight it.
      prettierConfig,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": false, // Allow @ts-ignore
          "ts-expect-error": true,
          "ts-nocheck": true,
          "ts-check": false,
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "off",
      // React Compiler diagnostics added to the recommended set in
      // eslint-plugin-react-hooks v7. This app doesn't use the compiler, and
      // the flagged patterns (a default selection set in an effect, a ref
      // seeded with Date.now()) are intentional.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      // Placeholder sagas (e.g. the dashboard's) have no effects to yield yet.
      "require-yield": "off",
    },
  }
);
