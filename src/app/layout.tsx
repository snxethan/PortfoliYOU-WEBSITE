import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ExternalLinkHandler } from "./components/ExternalLinkHandler";
import { AuthProvider } from "./components/auth/AuthProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import { repos, security, site } from "./lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — build your portfolio site, no code required`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "portfolio builder",
    "personal website builder",
    "no-code website",
    "static site export",
    "developer portfolio",
    "Portfoli-YOU",
  ],
  authors: [{ name: site.author.name, url: site.author.site }],
  creator: site.author.name,
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: `${site.name} — build your portfolio site, no code required`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/icon/portfoliyou.png",
        width: 612,
        height: 612,
        alt: `${site.name} preview`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — build your portfolio site, no code required`,
    description: site.description,
    images: ["/images/icon/portfoliyou.png"],
  },
  // CSP, X-Frame-Options and Permissions-Policy are served as real response
  // headers from next.config.ts — `metadata.other` only emits `<meta name>`,
  // which browsers ignore for those. What stays here is genuinely metadata:
  // the security policy is advertised in the head rather than in the footer,
  // which mirrors the personal portfolio's layout exactly.
  other: {
    "security-policy": `${site.url}/faqs#security`,
    "security-contact": security.contact,
  },
};

export const viewport: Viewport = {
  themeColor: "#080c14",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: site.name,
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser",
  url: site.url,
  image: `${site.url}/images/icon/portfoliyou.png`,
  description: site.description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: {
    "@type": "Person",
    name: site.author.name,
    url: site.author.site,
  },
  sameAs: [
    repos.app,
    repos.website,
    "https://www.snxethan.dev",
    "https://www.linkedin.com/in/ethantownsend",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-py-bg font-sans text-py-text antialiased"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-py-orange focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1a0d02]"
        >
          Skip to content
        </a>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#16202e",
              color: "#edeef0",
              border: "1px solid rgba(112,184,255,0.14)",
              fontSize: "14px",
            },
          }}
        />
        <AuthProvider>
          <ExternalLinkHandler>{children}</ExternalLinkHandler>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
