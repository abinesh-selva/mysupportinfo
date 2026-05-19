import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for MySupportInfo — a free, privacy-first device diagnostic and network testing tool. Read about permitted use, limitations of liability, and our no-data-collection commitment.",
  alternates: { canonical: "https://mysupportinfo.com/terms" },
  openGraph: {
    title: "Terms of Use | MySupportInfo",
    description:
      "Terms governing use of MySupportInfo — a free diagnostic tool. No data collection, no warranties, no tracking.",
    url: "https://mysupportinfo.com/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
