import path from 'path';

import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../../node_modules/.vite/libs/utilities',
	plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	resolve: {
		alias: {
			'@core': path.resolve(__dirname, '../../../libs/core/src'),
		},
	},
	test: {
		name: 'libs/utilities',
		watch: false,
		globals: true,
		environment: 'jsdom',
		isolate: true,
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		reporters: ['default'],
		coverage: {
			reportsDirectory: '../../../coverage/libs/utilities',
			provider: 'v8' as const,
		},
	},
}));
