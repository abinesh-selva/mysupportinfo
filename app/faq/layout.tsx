import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Device Detection & Network Testing",
  description:
    "Frequently asked questions about MySupportInfo: how bufferbloat testing works, privacy policy, data storage, and browser compatibility.",
  keywords: [
    "FAQ",
    "bufferbloat test questions",
    "how does bufferbloat work",
    "MySupportInfo privacy",
    "device detection FAQ",
    "network test help",
    "what is bufferbloat",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ – Device Detection & Network Testing | MySupportInfo",
    description:
      "Answers to common questions about privacy, data collection, and our network diagnostic tools.",
    url: "/faq",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ – Device Detection & Network Testing | MySupportInfo",
    description:
      "Answers to common questions about privacy, data collection, and our network diagnostic tools.",
    images: ["/og-image.png"],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you store my IP address?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We take a privacy-first approach. Your IP address is used only for real-time geolocation detection (to help troubleshoot region-specific issues) and is not stored in our permanent database logs after your session expires.",
                },
              },
              {
                "@type": "Question",
                name: "How does the Bufferbloat test work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The test simulates network traffic by maxing out your download and upload connection for a short period. While this happens, it continuously pings a central server to measure latency. If latency spikes significantly during the load test, you have bufferbloat.",
                },
              },
              {
                "@type": "Question",
                name: "Is this tool free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, MySupportInfo.com is currently 100% free for individual users. We may introduce premium features for enterprise support teams in the future, but the core diagnostic tools will remain free.",
                },
              },
              {
                "@type": "Question",
                name: "Can I share my results?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. After a test runs, we generate a unique, temporary link you can copy to your clipboard and send to your ISP technician or IT support agent. This link expires automatically after 24 hours.",
                },
              },
              {
                "@type": "Question",
                name: "Why does my grade differ from other speed tests?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most speed tests only measure throughput (Mbps). We measure Quality of Experience by analyzing latency under load. You might have 1000 Mbps internet but still experience lag if your router suffers from bufferbloat (Grade C or lower).",
                },
              },
              {
                "@type": "Question",
                name: "What browser should I use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our tool works best on modern browsers like Chrome, Edge, Firefox, and Safari (versions released within the last 2 years). We leverage the latest Web APIs for accurate timing measurement.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
