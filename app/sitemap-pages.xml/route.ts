const BASE_URL = "https://mysupportinfo.vercel.app";
const LAST_MODIFIED = "2026-05-21T00:00:00.000Z";

const routes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/bufferbloat", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
}

export function GET() {
  const urls = routes
    .map(({ path, changeFrequency, priority }) => {
      const loc = escapeXml(new URL(path, BASE_URL).toString());

      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${LAST_MODIFIED}</lastmod>`,
        `    <changefreq>${changeFrequency}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
