// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
const siteUrl = (process.env.SITE_URL || 'http://localhost:4321').replace(/\/$/, '');

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  image: {
    layout: 'constrained',
  },
});
