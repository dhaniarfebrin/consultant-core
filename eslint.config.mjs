import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-console": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "react/jsx-pascal-case": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "default",
          "format": ["camelCase"]
        },
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        },
        {
          "selector": "function",
          "format": ["camelCase", "PascalCase"]
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
            "selector": "import",
            "format": ["camelCase", "PascalCase"]
        },
        {
            "selector": "property",
            "format": null // properties in objects (e.g. from API) might be snake_case
        }
      ]
    }
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
