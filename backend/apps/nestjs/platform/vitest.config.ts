import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../../../node_modules/.vite/backend/apps/nestjs/platform',
	plugins: [nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	test: {
		coverage: {
			reportsDirectory: '../../../../coverage/backend/apps/nestjs/platform',
			provider: 'v8' as const,
		},
		environment: 'node',
		globals: true,
		include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		isolate: true,
		name: 'backend/apps/nestjs/platform',
		passWithNoTests: true,
		reporters: ['default'],
		server: {
			deps: {
				inline: ['@ngneat/spectator'],
			},
		},
		watch: false,
	},
}));
