import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import angular from '@analogjs/vite-plugin-angular';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../../node_modules/.vite/libs/core',
	plugins: [angular(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	test: {
		name: 'libs/core',
		watch: false,
		globals: true,
		environment: 'jsdom',
		passWithNoTests: true,
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		reporters: ['default'],
		coverage: {
			reportsDirectory: '../../../coverage/libs/core',
			provider: 'v8' as const,
		},
		server: {
			deps: {
				inline: ['@ngneat/spectator'],
			},
		},
	},
}));
