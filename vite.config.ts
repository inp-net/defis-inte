import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Features } from 'lightningcss';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['svelte-sonner']
	},
    build: {
        cssCodeSplit: true,
        assetsInlineLimit: 4096
    }
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
	},
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			exclude: Features.LightDark
		}
	}
});
