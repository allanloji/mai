import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
const path = p => fileURLToPath(new URL(p, import.meta.url));
export default defineConfig({
  root: 'support-kb',
  resolve: { alias: { '#lib': path('./support-kb/src/lib') } },
  plugins: [svelte({ extensions: ['.svelte', '.svx'], preprocess: mdsvex({extensions:['.svx'],layout:{runbook:path('./support-kb/src/lib/layouts/runbook.svelte')}}) })],
  build: { outDir: '../dist', emptyOutDir: true }
});
