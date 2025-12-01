import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["**/node_modules/**", "coverage/**"]
  },
  js.configs.recommended,
  {
    files: ["src/**/*.js", "config/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { args: "none", caughtErrors: "none" }],
      eqeqeq: "error"
    }
  },
  {
    files: ["system/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    rules: {
      "no-console": "off",
      eqeqeq: "error"
    }
  }
];
