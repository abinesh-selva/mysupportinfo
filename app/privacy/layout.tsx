import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MySupportInfo privacy policy. We process all data client-side only — nothing is stored or shared. GDPR and CCPA compliant.",
  alternates: { canonical: "https://mysupportinfo.com/privacy" },
  openGraph: {
    title: "Privacy Policy | MySupportInfo",
    description:
      "Zero tracking cookies, fully GDPR compliant, client-side only data processing. Your data never leaves your device.",
    url: "https://mysupportinfo.com/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
