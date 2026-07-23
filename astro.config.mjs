// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Cámbialo por tu dominio real: se usa para el sitemap, el canonical y las OG.
  site: 'https://dbsz-wishlist.pages.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
