import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Device Detection & Network Testing",
  description:
    "Frequently asked questions about MySupportInfo: how bufferbloat testing works, privacy policy, data storage, and browser compatibility.",
  alternates: { canonical: "https://mysupportinfo.com/faq" },
  openGraph: {
    title: "FAQ – Device Detection & Network Testing | MySupportInfo",
    description:
      "Answers to common questions about privacy, data collection, and our network diagnostic tools.",
    url: "https://mysupportinfo.com/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
