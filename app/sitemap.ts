import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mysupportinfo.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return [
        { url: `${BASE_URL}`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
        { url: `${BASE_URL}/bufferbloat`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/privacy`, lastModified: new Date('2026-05-01'), changeFrequency: 'yearly', priority: 0.5 },
        { url: `${BASE_URL}/terms`, lastModified: new Date('2026-05-01'), changeFrequency: 'yearly', priority: 0.4 },
    ];
}
