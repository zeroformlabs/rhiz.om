// @ts-check

const globals = require("globals");
const tseslint = require("typescript-eslint");
const pluginJs = require("@eslint/js");
const pluginReactRecommended = require("eslint-plugin-react/configs/recommended.js");
const pluginReactHooks = require("eslint-plugin-react-hooks");
const pluginJsxA11y = require("eslint-plugin-jsx-a11y");
const pluginReactRefresh = require("eslint-plugin-react-refresh");

module.exports = tseslint.config([
  // 1. Global ignores
  {
    ignores: ["dist", "node_modules", "eslint.config.cjs"],
  },

  // 2. Base configuration for all JavaScript/TypeScript files
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  
  // 3. Configuration for React
  {
    ...pluginReactRecommended,
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ...pluginReactRecommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },

  // 4. Custom rules and plugins for the project
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  
  // 5. TypeScript Parser Configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json" ],
      },
    },
  },
]);