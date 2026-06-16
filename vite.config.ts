import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
    optimizeDeps: {
		include: ['svelte-sonner']
	},
	resolve: {
    alias: {
      '~generated': path.resolve('./prisma/generated')
    }
  },
  server: {
		fs: {
			// Autorise Vite à servir les fichiers depuis le dossier 'uploads'
			allow: ['uploads'] 
		}
	}
});
