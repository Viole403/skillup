import { nextJsConfig } from "@workspace/eslint-config/next-js"

/** @type {import("eslint").Config[]} */
export default [
  ...nextJsConfig,

  // Global settings
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        // Browser globals
        window: true,
        document: true,

        // Node.js globals
        process: true,
        module: true,
        require: true,

        // ES6 globals
        Promise: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // JavaScript/TypeScript files
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "error",
    },
  },

  // Config files (ensure Node environment)
  {
    files: ["**/*.config.js", "**/*.config.mjs"],
    languageOptions: {
      globals: {
        process: true,
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
      },
    },
  },
]
