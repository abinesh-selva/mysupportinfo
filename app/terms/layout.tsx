import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for MySupportInfo — a free, privacy-first device diagnostic and network testing tool. Read about permitted use, limitations of liability, and our no-data-collection commitment.",
  keywords: [
    "terms of use",
    "terms of service",
    "MySupportInfo terms",
    "acceptable use policy",
    "no data collection",
    "free diagnostic tool terms",
  ],
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Use | MySupportInfo",
    description:
      "Terms governing use of MySupportInfo — a free diagnostic tool. No data collection, no warranties, no tracking.",
    url: "/terms",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo Terms of Use" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | MySupportInfo",
    description:
      "Terms governing use of MySupportInfo — a free diagnostic tool. No data collection, no warranties, no tracking.",
    images: ["/og-image.png"],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
