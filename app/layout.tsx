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
    default: "What Is My Browser? IP, Device & Privacy Checker",
    template: "%s | MySupportInfo",
  },
  description:
    "Instantly check what browser, OS, and IP address you're using. Free device info & privacy checker — see your GPU, RAM, screen size, network quality, and WebRTC leaks. Zero tracking.",
  keywords: [
    "what is my browser",
    "what browser am I using",
    "check my browser version",
    "device info checker",
    "what is my IP address",
    "IP address lookup",
    "what is my operating system",
    "browser version checker",
    "WebRTC leak test",
    "browser privacy test",
    "browser fingerprint checker",
    "what is my screen resolution",
    "GPU detection online",
    "RAM detection",
    "bufferbloat test",
    "network quality checker",
    "internet latency test",
    "what is my ISP",
    "VPN detection",
    "browser security test",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "MySupportInfo",
    title: "What Is My Browser? IP, Device & Privacy Checker",
    description:
      "Instantly check your browser version, IP address, OS, GPU, RAM, and privacy status. Free device info checker — no tracking, runs entirely in your browser.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo – Browser, IP & Device Info Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is My Browser? IP, Device & Privacy Checker",
    description:
      "Find out instantly — free browser version, IP address, OS, GPU, RAM, network quality & WebRTC privacy checker. Zero tracking, runs client-side.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MySupportInfo",
              alternateName: ["What Is My Browser", "Device Info Checker", "IP Address Checker", "Browser Privacy Checker"],
              url: "https://mysupportinfo.vercel.app/",
              description:
                "What is my browser? Free IP, device info, and privacy checker — instantly detect browser version, OS, IP address, GPU, RAM, screen size, WebRTC leaks, and network quality with zero tracking.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "MySupportInfo — What Is My Browser, IP & Device Checker",
              url: "https://mysupportinfo.vercel.app",
              description:
                "Free browser, IP address, and device info checker. Instantly see what browser and OS you're using, your public IP address, GPU, RAM, screen resolution, WebRTC leaks, and network quality. Privacy-first — zero tracking, runs entirely in your browser.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires a modern browser with JavaScript enabled",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "What is my browser — browser version & engine detection",
                "What is my IP address — IPv4 & IPv6 lookup",
                "Operating system & device detection",
                "GPU & hardware info (RAM, CPU cores)",
                "Bufferbloat & network quality test",
                "WebRTC leak detection",
                "Browser fingerprint & privacy checker",
                "GDPR compliant, zero data collection",
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
