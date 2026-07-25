import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', 'dist');
const site = 'https://dbsz-wishlist.pages.dev';

const locales = [
  { code: 'es', hreflang: 'es', prefix: '' },
  { code: 'en', hreflang: 'en', prefix: '/en' },
  { code: 'pt', hreflang: 'pt', prefix: '/pt' },
  { code: 'ja', hreflang: 'ja', prefix: '/ja' },
];

function barePath(url) {
  const u = new URL(url);
  let path = u.pathname.replace(/\/$/, '') || '/';
  for (const { prefix } of locales) {
    if (prefix && path === prefix) return '/';
    if (prefix && path.startsWith(prefix + '/')) return path.slice(prefix.length);
    if (prefix && path === prefix) return '/';
  }
  return path;
}

function localeCode(url) {
  const u = new URL(url);
  const path = u.pathname.replace(/\/$/, '') || '/';
  for (const { code, prefix } of locales) {
    if (code === 'es') continue;
    if (path === prefix || path.startsWith(prefix + '/')) return code;
  }
  return 'es';
}

try {
  const sitemapFile = readdirSync(dist).find((f) => f.startsWith('sitemap-') && f.endsWith('.xml'));
  if (!sitemapFile) {
    console.log('[seo-postbuild] No sitemap found, skipping.');
    process.exit(0);
  }

  const raw = readFileSync(join(dist, sitemapFile), 'utf-8');
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  const locRegex = /<loc>([^<]+)<\/loc>/;
  const priorityRegex = /<priority>([^<]+)<\/priority>/;
  const changefreqRegex = /<changefreq>([^<]+)<\/changefreq>/;
  const match = (block, re) => { const m = block.match(re); return m ? m[1] : ''; };

  const entries = [];
  for (const block of raw.matchAll(urlRegex)) {
    const content = block[1];
    const loc = match(content, locRegex);
    if (!loc) continue;
    entries.push({
      loc,
      raw: content,
      bare: barePath(loc),
      lang: localeCode(loc),
    });
  }

  const grouped = new Map();
  for (const e of entries) {
    if (!grouped.has(e.bare)) grouped.set(e.bare, []);
    grouped.get(e.bare).push(e);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `  xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const [, group] of grouped) {
    const main = group.find((g) => g.lang === 'es') ?? group[0];
    xml += `  <url>\n`;
    xml += `    <loc>${main.loc}</loc>\n`;

    const prio = match(main.raw, priorityRegex);
    const freq = match(main.raw, changefreqRegex);
    if (prio) xml += `    <priority>${prio}</priority>\n`;
    if (freq) xml += `    <changefreq>${freq}</changefreq>\n`;

    if (group.length > 1) {
      for (const alt of group) {
        const lc = locales.find((l) => l.code === alt.lang);
        xml += `    <xhtml:link rel="alternate" hreflang="${lc?.hreflang ?? alt.lang}" href="${alt.loc}" />\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${main.loc}" />\n`;
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  writeFileSync(join(dist, 'sitemap.xml'), xml, 'utf-8');
  console.log(`[seo-postbuild] Generated sitemap.xml with ${grouped.size} unique pages across ${locales.length} languages.`);

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site}/sitemap.xml</loc>
  </sitemap>
</sitemapindex>\n`;

  writeFileSync(join(dist, 'sitemap-index.xml'), sitemapIndex, 'utf-8');
  console.log('[seo-postbuild] Generated sitemap-index.xml.');

  const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap-index.xml
`;
  writeFileSync(join(dist, 'robots.txt'), robots, 'utf-8');
  writeFileSync(join(dist, '..', 'public', 'robots.txt'), robots, 'utf-8');
  console.log('[seo-postbuild] Updated robots.txt.');
  console.log('[seo-postbuild] Done.');
} catch (err) {
  console.error('[seo-postbuild] Error:', err.message);
  process.exit(1);
}
