import path from 'path';

import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import angular from '@analogjs/vite-plugin-angular';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../../../node_modules/.vite/frontend/libs/angular/core',
	plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	resolve: {
		alias: {
			'@utilities': path.resolve(__dirname, '../../../../frontend/libs/utilities/src'),
			'@core': path.resolve(__dirname, '../../../../frontend/libs/core/src'),
		},
	},
	test: {
		coverage: {
			reportsDirectory: '../../../../coverage/frontend/libs/angular/core',
			provider: 'v8' as const,
		},
		environment: 'jsdom',
		globals: true,
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		isolate: true,
		name: 'frontend/libs/angular/core',
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
