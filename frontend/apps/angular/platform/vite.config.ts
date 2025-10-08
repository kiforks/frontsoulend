import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import angular from '@analogjs/vite-plugin-angular';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../../../node_modules/.vite/frontend/apps/angular/platform',
	plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	test: {
		name: 'frontend/apps/angular/platform',
		watch: false,
		globals: true,
		environment: 'jsdom',
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		setupFiles: ['../../../../configs/vitest/environment.angular.ts'],
		reporters: ['default'],
		coverage: {
			reportsDirectory: '../../../../coverage/frontend/apps/angular/platform',
			provider: 'v8' as const,
		},
	},
}));
