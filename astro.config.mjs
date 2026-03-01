import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.burracar4x4.com.au',
  output: 'static',
  integrations: [sitemap()],
});