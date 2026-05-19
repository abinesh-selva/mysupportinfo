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
    url: "https://mysupportinfo.com",
    siteName: "MySupportInfo",
    title: "MySupportInfo – Device Info & Bufferbloat Test",
    description:
      "Instantly check your device specs and test network quality. Privacy-first, client-side only. No tracking.",
    images: [
      {
        url: "https://mysupportinfo.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "MySupportInfo – Device & Network Diagnostics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MySupportInfo – Device Info & Network Test",
    description:
      "Check your OS, browser, IP, GPU and test bufferbloat — no tracking, 100% private.",
    images: ["https://mysupportinfo.com/og-image.png"],
  },
  alternates: {
    canonical: "https://mysupportinfo.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
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
              "@type": "WebApplication",
              name: "MySupportInfo",
              url: "https://mysupportinfo.com",
              description:
                "Privacy-first device analytics and network testing tool. Detect OS, browser, IP, GPU and test bufferbloat — no tracking.",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "Device & browser detection",
                "IP address lookup",
                "GPU & hardware detection",
                "Bufferbloat network test",
                "GDPR compliant, zero tracking",
              ],
              creator: {
                "@type": "Organization",
                name: "MySupportInfo",
                url: "https://mysupportinfo.com",
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
