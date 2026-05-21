import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mysupportinfo.vercel.app"),
  applicationName: "MySupportInfo",
  title: {
    default: "What Is My Browser? Device Info & IP Address Checker",
    template: "%s | MySupportInfo",
  },
  description:
    "Check your browser, operating system, IP address, screen size, GPU, RAM, device info and network quality instantly. Free private diagnostics with no tracking.",
  keywords: [
    "what is my browser",
    "check my browser",
    "device info checker",
    "system information checker",
    "what is my IP",
    "find IP address",
    "check operating system",
    "browser version checker",
    "screen resolution checker",
    "GPU detection",
    "RAM detection",
    "bufferbloat test",
    "internet latency test",
    "network quality test",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "MySupportInfo",
    title: "What Is My Browser? Device Info & IP Address Checker",
    description:
      "Free browser and device information checker. Detect OS, browser version, IP address, screen size, GPU, RAM, and network quality privately.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo – Device & Network Diagnostics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is My Browser? Device Info & IP Address Checker",
    description:
      "Check your browser, OS, IP address, device specs and network quality instantly with private client-side diagnostics.",
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
              alternateName: "My Support Info",
              url: "https://mysupportinfo.vercel.app/",
              description:
                "Free privacy-first tool to check your browser, OS, IP address, screen size, GPU, RAM, device info, and network quality.",
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
              url: "https://mysupportinfo.vercel.app",
              description:
                "Privacy-first device information checker and network testing tool. Detect browser, OS, IP address, GPU, RAM, screen details, and bufferbloat with no tracking.",
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
              publisher: {
                "@type": "Organization",
                name: "MySupportInfo",
                url: "https://mysupportinfo.vercel.app/",
              },
              creator: {
                "@type": "Organization",
                name: "MySupportInfo",
                url: "https://mysupportinfo.vercel.app",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${cormorant.variable} antialiased bg-background font-sans text-foreground selection:bg-primary/40 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <Script
          id="material-symbols"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';document.head.appendChild(l);})()`,
          }}
        />
      </body>
    </html>
  );
}
