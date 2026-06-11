import { defineConfig } from 'astro/config';

// Static output — deploy the dist/ folder to Cloudflare Pages.
// Build command: npm run build, output directory: dist
export default defineConfig({
  site: 'https://www.indiev.org',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
