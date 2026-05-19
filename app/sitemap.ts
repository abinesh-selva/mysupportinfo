import { MetadataRoute } from 'next';

const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mysupportinfo.vercel.app';
const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
    const stableDate = new Date('2026-05-19');
    return [
        { url: `${BASE_URL}/`, lastModified: stableDate, changeFrequency: 'monthly', priority: 1.0 },
        { url: `${BASE_URL}/bufferbloat`, lastModified: stableDate, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/faq`, lastModified: stableDate, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/privacy`, lastModified: stableDate, changeFrequency: 'yearly', priority: 0.5 },
        { url: `${BASE_URL}/terms`, lastModified: stableDate, changeFrequency: 'yearly', priority: 0.4 },
    ];
}
