import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * These used to live in `metadata.other`, which renders `<meta name="...">` —
 * not `http-equiv` — so none of them were actually enforced. CSP only works as
 * a real response header (and X-Frame-Options only ever works as one), so they
 * are served here instead.
 *
 * `frame-src` is what lets the GitHub Sponsors card embed render; without it
 * `default-src 'self'` blocks the iframe silently.
 */
const csp = [
  "default-src 'self'",
  "img-src 'self' data: blob: https://github.com https://avatars.githubusercontent.com",
  // va.vercel-scripts.com is where @vercel/analytics and @vercel/speed-insights
  // actually load their scripts from. It was missing, which went unnoticed only
  // because the policy was previously an inert <meta name> tag.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://vitals.vercel-insights.com https://*.vercel-insights.com",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://*.vercel-insights.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "frame-src https://github.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "browsing-topics=(), interest-cohort=(), camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    // All imagery is served from /public now; no remote hosts are needed.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Everything that has ever pointed at the builder page. `/download` and
      // `/installer` predate the move to a browser-only builder; `/build`,
      // `/features` and `/product` were intermediate names; `/install` came
      // from the pre-rebuild site.
      { source: "/download", destination: "/use", permanent: true },
      { source: "/installer", destination: "/use", permanent: true },
      { source: "/install", destination: "/use", permanent: true },
      { source: "/build", destination: "/use", permanent: true },
      { source: "/features", destination: "/use", permanent: true },
      { source: "/product", destination: "/use", permanent: true },
      // The FAQ has been /about and /faq at different points.
      { source: "/about", destination: "/faqs", permanent: true },
      { source: "/faq", destination: "/faqs", permanent: true },
      { source: "/involved", destination: "/faqs#involved", permanent: true },
    ];
  },
};

export default nextConfig;
