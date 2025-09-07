import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ExternalLinkHandler } from "./components/ExternalLinkHandler"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfoli-YOU | Official Site",
  description: "A portfolio for you, by you.",
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
    title: "Portfoli-YOU",
    description: "A portfolio for you, by you. Design, customize, and share in minutes.",
    url: "https://portfoli-you.snxethan.dev",
    siteName: "Portfoli-YOU",
    images: [
      {
        // replace if you host the OG elsewhere
        url: "https://www.snxethan.dev/images/portfoliyou/portfoliyou.png",
        width: 1200,
        height: 630,
        alt: "Portfoli-YOU preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfoli-YOU",
    description: "A portfolio for you, by you.",
    images: ["https://www.snxethan.dev/images/portfoliyou/portfoliyou.png"],
  },
  other: {
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "index, follow, noimageai, noimageindex",
    "Permissions-Policy": "browsing-topics=(), interest-cohort=()",
    // CSP tuned for external image + vercel analytics; adjust if you add more origins
    "Content-Security-Policy":
      [
        "default-src 'self'",
        "img-src 'self' data: blob: https://www.snxethan.dev",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://vitals.vercel-insights.com https://*.vercel-insights.com",
        "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com",
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self' data:",
        "frame-ancestors 'self'",
      ].join("; "),
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a", // page background
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Portfoli-YOU",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  url: "https://portfoli-you.snxethan.dev",
  image: "https://www.snxethan.dev/images/portfoliyou/portfoliyou.png",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: {
    "@type": "Person",
    name: "Ethan Townsend",
    url: "https://www.snxethan.dev",
  },
  sameAs: [
    "https://github.com/snxethan/PortfoliYOU-APP",
    "https://www.linkedin.com/in/ethantownsend",
    "https://www.instagram.com/snxethan",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.className} bg-[#1a1a1a] text-white`}>
        <Toaster position="top-center" />
        <ExternalLinkHandler>
          {children}
        </ExternalLinkHandler>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
