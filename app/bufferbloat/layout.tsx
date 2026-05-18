import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bufferbloat Test – Check Network Latency Under Load",
  description:
    "Test your internet connection for bufferbloat. Measure latency spikes, jitter, download and upload speed under real network load. Free, private, no tracking.",
  alternates: { canonical: "https://mysupportinfo.com/bufferbloat" },
  openGraph: {
    title: "Bufferbloat Test – Check Network Latency Under Load | MySupportInfo",
    description:
      "Detect hidden latency spikes that cause lag during gaming, video calls, and streaming. Free bufferbloat test — no tracking.",
    url: "https://mysupportinfo.com/bufferbloat",
  },
};

export default function BufferbloatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
