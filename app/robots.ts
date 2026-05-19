import { MetadataRoute } from 'next';

const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mysupportinfo.vercel.app';
const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
