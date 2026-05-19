import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://mysupportinfo.vercel.app';

export const dynamic = 'force-static';

// Segments to exclude from sitemap
const EXCLUDED_SEGMENTS = new Set(['api', '_components', '_lib', '_hooks', '_utils']);

function getRoutes(dir: string, baseDir: string): string[] {
    const routes: string[] = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Skip route groups (parentheses), dynamic segments (brackets), private (_), and excluded names
            const name = entry.name;
            if (name.startsWith('(') || name.startsWith('[') || name.startsWith('_') || EXCLUDED_SEGMENTS.has(name)) {
                continue;
            }
            routes.push(...getRoutes(fullPath, baseDir));
        } else if (entry.name === 'page.tsx' || entry.name === 'page.ts' || entry.name === 'page.jsx' || entry.name === 'page.js') {
            const relative = path.relative(baseDir, dir);
            routes.push(relative === '' ? '/' : `/${relative.replace(/\\/g, '/')}`);
        }
    }

    return routes;
}

function routeConfig(route: string): { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number } {
    if (route === '/') return { changeFrequency: 'monthly', priority: 1.0 };
    if (['/privacy', '/terms'].includes(route)) return { changeFrequency: 'yearly', priority: 0.4 };
    return { changeFrequency: 'monthly', priority: 0.7 };
}

export default function sitemap(): MetadataRoute.Sitemap {
    const appDir = path.join(process.cwd(), 'app');
    const routes = getRoutes(appDir, appDir);

    return routes.map((route) => ({
        url: `${BASE_URL}${route === '/' ? '/' : route}`,
        lastModified: new Date().toISOString().split('T')[0],
        ...routeConfig(route),
    }));
}
