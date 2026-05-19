import { MetadataRoute } from 'next';

const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mysupportinfo.vercel.app';
const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${BASE_URL}/`, lastModified: '2026-05-19', changeFrequency: 'monthly', priority: 1.0 },
        { url: `${BASE_URL}/bufferbloat`, lastModified: '2026-05-19', changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/faq`, lastModified: '2026-05-19', changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/privacy`, lastModified: '2026-05-19', changeFrequency: 'yearly', priority: 0.5 },
        { url: `${BASE_URL}/terms`, lastModified: '2026-05-19', changeFrequency: 'yearly', priority: 0.4 },
    ];
}
