import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships real flat configs, so they are imported directly.
 *
 * The previous setup wrapped them with FlatCompat from @eslint/eslintrc. Under
 * v16 that path throws `Converting circular structure to JSON` inside the
 * eslintrc config validator — the plugin objects now self-reference, and the
 * validator tries to JSON.stringify them. Importing the flat configs skips the
 * compat layer entirely.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".eslintcache",
    ],
  },
];

export default eslintConfig;
