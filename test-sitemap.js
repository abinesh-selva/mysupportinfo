const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://mysupportinfo.vercel.app';
const EXCLUDED = new Set(['api', '_components', '_lib', '_hooks', '_utils']);

function getRoutes(dir, baseDir) {
    const routes = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const n = entry.name;
            if (n.startsWith('(') || n.startsWith('[') || n.startsWith('_') || EXCLUDED.has(n)) continue;
            routes.push(...getRoutes(full, baseDir));
        } else if (/^page\.(tsx?|jsx?)$/.test(entry.name)) {
            const rel = path.relative(baseDir, dir);
            routes.push(rel === '' ? '/' : `/${rel.replace(/\\/g, '/')}`);
        }
    }
    return routes;
}

function routeMeta(route) {
    if (route === '/') return { freq: 'monthly', priority: '1.0' };
    if (route === '/privacy' || route === '/terms') return { freq: 'yearly', priority: '0.4' };
    return { freq: 'monthly', priority: '0.7' };
}

const appDir = path.join(process.cwd(), 'app');
const today = new Date().toISOString().split('T')[0];

const urls = getRoutes(appDir, appDir)
    .map(route => {
        const { freq, priority } = routeMeta(route);
        return `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

console.log("XML:\n", xml);
