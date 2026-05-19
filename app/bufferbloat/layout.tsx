import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bufferbloat Test – Check Network Latency Under Load",
  description:
    "Test your internet connection for bufferbloat. Measure latency spikes, jitter, download and upload speed under real network load. Free, private, no tracking.",
  keywords: [
    "bufferbloat test",
    "network latency test",
    "internet quality test",
    "bufferbloat grade",
    "latency under load",
    "jitter test",
    "router bufferbloat",
    "network diagnostic",
  ],
  alternates: { canonical: "/bufferbloat" },
  openGraph: {
    title: "Bufferbloat Test – Check Network Latency Under Load | MySupportInfo",
    description:
      "Detect hidden latency spikes that cause lag during gaming, video calls, and streaming. Free bufferbloat test — no tracking.",
    url: "/bufferbloat",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo Bufferbloat Test" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bufferbloat Test – Check Network Latency Under Load | MySupportInfo",
    description:
      "Detect hidden latency spikes that cause lag during gaming, video calls, and streaming. Free bufferbloat test — no tracking.",
    images: ["/og-image.png"],
  },
};

export default function BufferbloatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Test Your Internet Connection for Bufferbloat",
            description:
              "Test your internet connection for bufferbloat using MySupportInfo's free network diagnostic tool.",
            step: [
              {
                "@type": "HowToStep",
                name: "Visit the Bufferbloat Test page",
                text: "Navigate to the MySupportInfo Bufferbloat Test page on any modern browser.",
              },
              {
                "@type": "HowToStep",
                name: "Click Start Test",
                text: "Press the Start Test button to begin. The tool will saturate your connection with upload and download traffic.",
              },
              {
                "@type": "HowToStep",
                name: "Wait for results",
                text: "The test runs for approximately 15–30 seconds, measuring latency throughout the load period.",
              },
              {
                "@type": "HowToStep",
                name: "Read your grade",
                text: "You receive a grade from A+ to F. A and B grades indicate low bufferbloat; C and lower means your router likely needs queue management (like CAKE or FQ-CoDel).",
              },
            ],
            tool: [
              { "@type": "HowToTool", name: "Modern web browser (Chrome, Firefox, Edge, Safari)" },
            ],
            totalTime: "PT1M",
          }),
        }}
      />
      {children}
    </>
  );
}
