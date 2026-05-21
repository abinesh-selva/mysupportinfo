import type { MetadataRoute } from "next";

const BASE_URL = "https://mysupportinfo.vercel.app";
const LAST_MODIFIED = new Date("2026-05-21");

const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/bufferbloat", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, BASE_URL).toString(),
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
