// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dbsz-wishlist.pages.dev',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) => !page.includes('404') && !page.includes('500'),
      serialize(item) {
        const url = item.url;
        let priority = 0.5;

        if (url.endsWith('/') || url.match(/\/[a-z]{2}\/?$/)) {
          priority = 1.0;
        } else if (url.includes('/fighters/')) {
          priority = 0.85;
        } else if (url.includes('/stages/')) {
          priority = 0.75;
        } else if (url.includes('/como-contribuir')) {
          priority = 0.6;
        }

        return { ...item, priority };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
