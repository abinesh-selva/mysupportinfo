import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mysupportinfo.vercel.app"
  ),
  title: {
    default: "MySupportInfo – Check Your Device Info, Browser & Network Speed",
    template: "%s | MySupportInfo",
  },
  description:
    "Free privacy-first tool to instantly detect your OS, browser, IP address, GPU, RAM, and test internet bufferbloat. No tracking. GDPR compliant.",
  keywords: [
    "device detection",
    "system information",
    "check browser",
    "find IP address",
    "bufferbloat test",
    "network speed test",
    "check OS",
    "find ISP",
    "what is my browser",
    "what is my IP",
    "internet latency test",
    "network quality test",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "MySupportInfo",
    title: "MySupportInfo – Device Info & Bufferbloat Test",
    description:
      "Instantly check your device specs and test network quality. Privacy-first, client-side only. No tracking.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo – Device & Network Diagnostics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MySupportInfo – Device Info & Network Test",
    description:
      "Check your OS, browser, IP, GPU and test bufferbloat — no tracking, 100% private.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ovUSpsHQs2UT2KMpT_KVxGPB4w7l61CBllMsVdgegcA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <link rel="preconnect" href="https://ipapi.co" />
        <link rel="dns-prefetch" href="https://ipapi.co" />
        <link rel="preconnect" href="https://api64.ipify.org" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            width: 1em;
            height: 1em;
            line-height: 1;
            overflow: hidden;
            vertical-align: middle;
            white-space: nowrap;
            word-wrap: normal;
          }
          .material-symbols-outlined.fill-1 {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MySupportInfo",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://mysupportinfo.vercel.app",
              description:
                "Free privacy-first tool to instantly detect your OS, browser, IP address, GPU, RAM, and test internet bufferbloat.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "MySupportInfo",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://mysupportinfo.vercel.app",
              description:
                "Privacy-first device analytics and network testing tool. Detect OS, browser, IP, GPU and test bufferbloat — no tracking.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires a modern browser with JavaScript enabled",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "Device & browser detection",
                "IP address lookup",
                "GPU & hardware detection",
                "Bufferbloat network test",
                "WebRTC leak detection",
                "Battery & orientation detection",
                "GDPR compliant, zero tracking",
              ],
              creator: {
                "@type": "Organization",
                name: "MySupportInfo",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://mysupportinfo.vercel.app",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${cormorant.variable} antialiased bg-[#FAF6F0] font-sans text-[#002924] selection:bg-primary/40 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
