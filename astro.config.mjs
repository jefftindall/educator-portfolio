// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
const siteUrl = (process.env.SITE_URL || 'http://localhost:4321').replace(/\/$/, '');

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [],
  image: {
    layout: 'constrained',
  },
});
