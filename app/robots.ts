import { MetadataRoute } from 'next';

const BASE_URL = 'https://mysupportinfo.vercel.app';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/sitemap-pages.xml`],
    };
}
