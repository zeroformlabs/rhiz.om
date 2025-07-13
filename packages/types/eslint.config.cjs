const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const pluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = [
  // Global ignores
  {
    ignores: ["dist", "node_modules"],
  },
  // Configuration for JavaScript/CommonJS files (like this config file itself)
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    ...pluginJs.configs.recommended,
  },
  // Configuration for TypeScript files
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },
    ...tseslint.configs.recommended,
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^", varsIgnorePattern: "^" },
      ],
    },
  },
  // Prettier integration (applies to all files)
  pluginPrettierRecommended,
];