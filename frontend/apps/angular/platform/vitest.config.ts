import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import angular from '@analogjs/vite-plugin-angular';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../../../node_modules/.vite/frontend/apps/angular/platform',
	plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	test: {
		coverage: {
			reportsDirectory: '../../../../coverage/frontend/apps/angular/platform',
			provider: 'v8' as const,
		},
		environment: 'jsdom',
		globals: true,
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		isolate: true,
		name: 'frontend/apps/angular/platform',
		reporters: ['default'],
		server: {
			deps: {
				inline: ['@ngneat/spectator'],
			},
		},
		setupFiles: ['vitest.environment.ts'],
		watch: false,
	},
}));
