import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bufferbloat Test – Check Internet Latency, Jitter & Lag",
  description:
    "Run a free bufferbloat test to measure internet latency under load, jitter, lag, download speed and upload speed. Diagnose gaming, video call and WiFi lag privately.",
  keywords: [
    "bufferbloat test",
    "network latency test",
    "internet latency test",
    "internet quality test",
    "latency under load",
    "jitter test",
    "gaming lag test",
    "video call lag test",
    "router bufferbloat",
    "wifi latency test",
    "network diagnostic",
  ],
  alternates: { canonical: "/bufferbloat" },
  openGraph: {
    title: "Bufferbloat Test – Check Internet Latency, Jitter & Lag | MySupportInfo",
    description:
      "Measure latency under load, jitter and lag that affect gaming, video calls, streaming and WiFi. Free private bufferbloat test.",
    url: "/bufferbloat",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MySupportInfo Bufferbloat Test" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bufferbloat Test – Check Internet Latency, Jitter & Lag | MySupportInfo",
    description:
      "Measure latency under load, jitter and lag that affect gaming, video calls, streaming and WiFi. Free private bufferbloat test.",
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
