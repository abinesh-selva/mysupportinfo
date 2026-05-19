import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MySupportInfo privacy policy. We process all data client-side only — nothing is stored or shared. GDPR and CCPA compliant.",
  keywords: [
    "privacy policy",
    "GDPR compliant",
    "CCPA compliant",
    "no tracking",
    "client-side only",
    "data privacy",
    "MySupportInfo privacy",
    "no data collection",
  ],
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | MySupportInfo",
    description:
      "Zero tracking cookies, fully GDPR compliant, client-side only data processing. Your data never leaves your device.",
    url: "/privacy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MySupportInfo",
    description:
      "Zero tracking cookies, fully GDPR compliant, client-side only data processing. Your data never leaves your device.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
