import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tseslint.configs.recommended,
    ],
    plugins: {
      react: react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Allow unused React import for JSX transform
      // Add any specific rules for this package here
    },
  },
);