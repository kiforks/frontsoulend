const { esbuildDecorators } = require('esbuild-decorators');

/** @type {import('esbuild').BuildOptions} */
const config = {
	plugins: [
		esbuildDecorators({
			tsconfig: 'backend/apps/nestjs/platform/tsconfig.app.json',
		}),
	],
	keepNames: true,
	sourcemap: true,
};

module.exports = config;
