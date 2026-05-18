import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://mysupportinfo.com',
            lastModified: new Date('2026-05-01'),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://mysupportinfo.com/bufferbloat',
            lastModified: new Date('2026-05-01'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://mysupportinfo.com/faq',
            lastModified: new Date('2026-05-01'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://mysupportinfo.com/privacy',
            lastModified: new Date('2026-01-01'),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];
}
