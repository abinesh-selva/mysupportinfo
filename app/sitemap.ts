import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const today = new Date();
    return [
        {
            url: 'https://mysupportinfo.vercel.app',
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: 'https://mysupportinfo.vercel.app/bufferbloat',
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://mysupportinfo.vercel.app/faq',
            lastModified: today,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://mysupportinfo.vercel.app/privacy',
            lastModified: today,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://mysupportinfo.vercel.app/terms',
            lastModified: today,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];
}
